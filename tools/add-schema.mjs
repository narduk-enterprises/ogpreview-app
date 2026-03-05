import fs from 'fs'
import path from 'path'

const dir = '/Users/narduk/new-code/template-apps/ogpreview-app/apps/web/app/pages'
let modifiedCount = 0

const walk = (d) => {
  const files = fs.readdirSync(d)
  files.forEach(f => {
    const full = path.join(d, f)
    if (fs.statSync(full).isDirectory()) walk(full)
    else if (full.endsWith('.vue')) {
      const content = fs.readFileSync(full, 'utf-8')
      if (!content.includes('useWebPageSchema') && !content.includes('useArticleSchema') && !content.includes('useSchemaOrg')) {
        const seoRegexList = [/useAppSeo\([\s\S]*?\)/, /useSeo\([\s\S]*?\)/, /usePageSeo\([\s\S]*?\)/]
        
        for (const regex of seoRegexList) {
          const match = content.match(regex)
          if (match) {
            const titleMatch = match[0].match(/title:\s*['"`](.*?)['"`]/)
            const descMatch = match[0].match(/description:\s*['"`](.*?)['"`]/)
            
            const title = titleMatch ? titleMatch[1] : 'OG Preview Tools'
            let insert = `\n\nuseWebPageSchema({\n  name: '${title}',`
            if (descMatch) {
              insert += `\n  description: '${descMatch[1].replace(/'/g, "\\'")}',`
            }
            insert += `\n})`
            
            const newContent = content.replace(match[0], match[0] + insert)
            fs.writeFileSync(full, newContent)
            modifiedCount++
            break // stop checking other regexes for this file
          }
        }
      }
    }
  })
}
walk(dir)
console.log(`Modified ${modifiedCount} files.`)
