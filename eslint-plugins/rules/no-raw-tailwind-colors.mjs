/**
 * atx/no-raw-tailwind-colors
 *
 * Disallow raw Tailwind color scale classes like `text-gray-400`, `bg-zinc-900`,
 * `bg-emerald-500` in Vue templates. Use Nuxt UI semantic classes instead
 * (text-dimmed, text-muted, text-primary, bg-elevated, bg-muted, etc.)
 */

import { defineTemplateBodyVisitor } from '../utils.mjs'

const GRAY_SCALES = ['gray', 'zinc', 'slate', 'stone', 'neutral']
const BRAND_COLORS = [
  'green', 'emerald', 'blue', 'red', 'yellow', 'orange', 'purple',
  'pink', 'indigo', 'teal', 'cyan', 'amber', 'lime', 'fuchsia',
  'violet', 'rose', 'sky',
]

const ALL_COLORS = [...GRAY_SCALES, ...BRAND_COLORS]

// Matches text-gray-400, bg-emerald-500, border-zinc-800 etc.
const COLOR_REGEX = new RegExp(
  `\\b(?:text|bg|border|ring|shadow|divide|from|via|to|outline|accent|caret|fill|stroke)-(?:${ALL_COLORS.join('|')})-\\d{2,3}\\b`,
  'g'
)

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Disallow raw Tailwind color classes — use Nuxt UI semantic classes',
      category: 'ATX Design System',
    },
    messages: {
      noRawColor:
        'Raw Tailwind color "{{ color }}" — use semantic classes instead (text-dimmed, text-muted, text-primary, bg-elevated, bg-muted, bg-default, border-default).',
    },
    schema: [],
  },

  create(context) {
    if (!context.filename.endsWith('.vue')) return {}

    function checkString(node, str) {
      let match
      COLOR_REGEX.lastIndex = 0
      while ((match = COLOR_REGEX.exec(str)) !== null) {
        const m = match[0]
        let replacement = ''
        const prefix = m.split('-')[0]

        if (prefix === 'text') {
           if (m.match(/(300|400)/)) replacement = 'text-dimmed'
           else if (m.match(/(500|600)/)) replacement = 'text-muted'
           else replacement = 'text-primary'
        } else if (prefix === 'bg') {
           replacement = m.match(/(50|100|200)/) ? 'bg-muted' : 'bg-elevated'
        } else if (['border', 'ring', 'divide', 'outline'].includes(prefix)) {
           replacement = 'border-default'
        } else if (['from', 'via', 'to'].includes(prefix)) {
           // Provide a safe replacement gradient or just strip
           replacement = prefix === 'from' ? 'from-primary-500' : prefix === 'to' ? 'to-primary-500' : 'via-primary-500'
        } else {
           replacement = 'text-primary'
        }

        const matchStart = match.index
        const matchEnd = match.index + m.length

        context.report({
          node,
          messageId: 'noRawColor',
          data: { color: m },
          fix(fixer) {
            let offset = 0
            if (node.type === 'VLiteral' || node.type === 'Literal') {
               // Assuming the string starts with a quote, we do +1
               offset = node.range[0] + 1
            } else {
               // Fallback if it's something unexpected
               offset = node.range[0]
            }
            return fixer.replaceTextRange([offset + matchStart, offset + matchEnd], replacement)
          }
        })
      }
    }

    return defineTemplateBodyVisitor(context, {
      'VAttribute[key.name="class"]'(node) {
        if (node.value && node.value.type === 'VLiteral') {
          checkString(node.value, node.value.value)
        }
      },

      'VAttribute[directive=true][key.argument.name="class"] Literal'(node) {
        if (typeof node.value === 'string') {
          checkString(node, node.value)
        }
      },
    })
  },
}
