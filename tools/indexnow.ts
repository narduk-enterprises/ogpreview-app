import { fetch } from 'ofetch';
import * as cheerio from 'cheerio';
import 'dotenv/config';

async function main() {
  const siteUrl = 'https://ogpreview.app';
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    console.error('❌ INDEXNOW_KEY is not set in environment.');
    process.exit(1);
  }

  console.log(`🔍 Fetching sitemap from ${siteUrl}/sitemap.xml...`);
  
  try {
    const sitemapXml = await fetch(`${siteUrl}/sitemap.xml`).then(r => r.text());
    const $ = cheerio.load(sitemapXml, { xmlMode: true });
    
    const urlList: string[] = [];
    $('url loc').each((_, el) => {
      urlList.push($(el).text());
    });

    console.log(`✅ Found ${urlList.length} URLs in sitemap.`);

    if (urlList.length === 0) return;

    const payload = {
      host: 'ogpreview.app',
      key: key,
      keyLocation: `https://ogpreview.app/${key}.txt`,
      urlList: urlList
    };

    console.log('�� Submitting to IndexNow (Bing, Yandex, Seznam)...');
    
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log('✅ IndexNow submission successful!');
    } else {
      console.error(`❌ IndexNow submission failed with HTTP ${res.status}`);
      console.error(await res.text());
    }
  } catch (error: any) {
    console.error(`❌ Error parsing or submitting sitemap: ${error.message}`);
  }
}

main();
