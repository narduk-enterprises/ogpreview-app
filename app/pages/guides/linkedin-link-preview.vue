<template>
  <ArticleLayout
title="LinkedIn Link Preview Optimization: Professional OG Tag Best Practices"
    description="Optimize your professional content for LinkedIn with the right Open Graph implementation and B2B-focused strategies."
    platform-icon="LinkedIn" :back-link="{ to: '/guides', label: 'Back to Guides' }"
    :metadata="{ date: 'Updated December 2025', readTime: '8 min read' }">
    <template #cta>
      <ContentCTA
title="Test Your LinkedIn Link Preview"
        description="Preview how your professional content will appear on LinkedIn, Facebook, Twitter, and other platforms."
        button-text="Try the Free Preview Tool" button-to="/" variant="blue" />
    </template>

    <h2 id="overview">How LinkedIn Link Previews Work</h2>
    <p>
      LinkedIn uses Open Graph protocol to generate link previews for posts, articles, and messages. Unlike Facebook or
      Twitter, LinkedIn's audience is professional, so your OG tags should emphasize business value, credibility, and
      actionable insights.
    </p>

    <ContentCallout variant="info" title="Preview Your LinkedIn Link" icon="i-heroicons-light-bulb">
      Use our <NuxtLink
to="/"
        class="font-semibold underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn Preview
        Tool
      </NuxtLink> to see exactly how your links will appear on LinkedIn before publishing.
    </ContentCallout>

    <h2 id="required-tags">Required Open Graph Tags for LinkedIn</h2>
    <p>
      LinkedIn follows standard Open Graph protocol. Use these essential tags:
    </p>

    <ContentCodeBlock :code="requiredTagsCode" language="html" />

    <h2 id="image-requirements">LinkedIn Image Requirements</h2>
    <p>
      LinkedIn is strict about image quality. Low-quality images hurt engagement on the platform.
    </p>

    <h3>Recommended Dimensions</h3>
    <ul>
      <li><strong>Optimal size:</strong> 1200×627 pixels (1.91:1 ratio)</li>
      <li><strong>Minimum:</strong> 1200×627px (LinkedIn recommends this minimum)</li>
      <li><strong>Maximum file size:</strong> 5MB</li>
      <li><strong>Formats:</strong> JPG, PNG (WebP not universally supported)</li>
    </ul>

    <h3>LinkedIn Image Best Practices</h3>
    <ul>
      <li><strong>Professional aesthetic:</strong> Clean, corporate-friendly design</li>
      <li><strong>Include data/stats:</strong> Numbers perform well (e.g., "47% increase")</li>
      <li><strong>Brand prominently:</strong> Logo should be clearly visible</li>
      <li><strong>Avoid stock photos:</strong> Custom graphics get 2.3x more engagement</li>
      <li><strong>Text-heavy works:</strong> LinkedIn users read—don't be afraid of text overlays</li>
    </ul>

    <ContentCallout variant="warning" title="LinkedIn Image Mistakes" icon="i-heroicons-exclamation-triangle">
      <ul class="space-y-2 text-sm">
        <li>❌ Using 1200×630px (Facebook size) — LinkedIn prefers 1200×627px</li>
        <li>❌ Casual, meme-style imagery — doesn't match LinkedIn's tone</li>
        <li>❌ Tiny text — LinkedIn previews are often viewed at desk resolution</li>
        <li>❌ Missing company branding — reduces trust</li>
      </ul>
    </ContentCallout>

    <h2 id="title-description">Title & Description for B2B Audiences</h2>

    <h3>Title Strategy</h3>
    <ul>
      <li><strong>Length:</strong> 70-100 characters (LinkedIn shows more than Twitter)</li>
      <li><strong>Professional tone:</strong> Avoid clickbait or overly casual language</li>
      <li><strong>Include numbers:</strong> "5 Strategies", "47% Growth", "2025 Trends"</li>
      <li><strong>Industry keywords:</strong> Use terminology your audience searches for</li>
      <li><strong>Clear benefit:</strong> What will they learn/gain?</li>
    </ul>

    <h3>Description Strategy</h3>
    <ul>
      <li><strong>Length:</strong> 150-200 characters</li>
      <li><strong>Value proposition:</strong> Lead with the business outcome</li>
      <li><strong>Credibility signals:</strong> "Research shows...", "Case study..."</li>
      <li><strong>Target audience:</strong> Be specific about who this is for</li>
      <li><strong>Professional CTA:</strong> "Learn how to...", "Discover the framework..."</li>
    </ul>

    <h3>Example: Consumer vs. Professional</h3>
    <div class="grid md:grid-cols-2 gap-4 not-prose my-6">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="font-bold text-red-900 dark:text-red-100 mb-2">❌ Too Casual</p>
        <p class="text-sm text-red-800 dark:text-red-200">
          <strong>Title:</strong> "You Won't Believe These Marketing Hacks!"<br>
          <strong>Description:</strong> "Mind-blowing secrets that will change everything"
        </p>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p class="font-bold text-green-900 dark:text-green-100 mb-2">✅ Professional</p>
        <p class="text-sm text-green-800 dark:text-green-200">
          <strong>Title:</strong> "5 Data-Driven B2B Marketing Strategies for 2025"<br>
          <strong>Description:</strong> "Research-backed tactics that increased pipeline by 180%. Complete framework for
          SaaS companies."
        </p>
      </div>
    </div>

    <h2 id="linkedin-post-inspector">Using LinkedIn Post Inspector</h2>
    <p>
      LinkedIn provides the <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">Post
        Inspector</a> tool to debug and preview your OG tags:
    </p>

    <h3>How to Use It</h3>
    <ol>
      <li>
Go to <a
href="https://www.linkedin.com/post-inspector/" target="_blank"
          rel="noopener">linkedin.com/post-inspector</a>
</li>
      <li>Enter your URL</li>
      <li>Click "Inspect"</li>
      <li>Review the preview and any warnings</li>
      <li>Click "Clear cache" if you've updated tags</li>
    </ol>

    <h3>Common LinkedIn Errors</h3>
    <table>
      <thead>
        <tr>
          <th>Error Message</th>
          <th>Solution</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>"Image not found"</td>
          <td>Ensure image URL is absolute HTTPS and publicly accessible</td>
        </tr>
        <tr>
          <td>"Image too small"</td>
          <td>Use minimum 1200×627px</td>
        </tr>
        <tr>
          <td>"Missing description"</td>
          <td>
Add
            <ContentInlineCode code="og:description" /> tag
          </td>
        </tr>
        <tr>
          <td>"Slow response time"</td>
          <td>Optimize server response and use CDN for images</td>
        </tr>
      </tbody>
    </table>

    <h2 id="linkedin-specific-features">LinkedIn-Specific Features</h2>

    <h3>Company Page Attribution</h3>
    <p>
      When sharing from a company page, LinkedIn may pull data from your LinkedIn Company Page in addition to OG tags.
      Ensure both are aligned.
    </p>

    <h3>Article vs. Website Content Type</h3>
    <p>
      Use
      <ContentInlineCode code="og:type=&quot;article&quot;" /> for blog posts and thought leadership:
    </p>
    <ContentCodeBlock :code="articleTagsCode" language="html" />

    <h2 id="engagement-optimization">LinkedIn Engagement Optimization</h2>
    <p>
      Beyond technical implementation, optimize for LinkedIn's algorithm:
    </p>

    <h3>Content That Performs on LinkedIn</h3>
    <ul>
      <li><strong>Original research:</strong> Data, surveys, industry reports</li>
      <li><strong>Case studies:</strong> Real results with specific numbers</li>
      <li><strong>Thought leadership:</strong> Unique perspectives, not recycled content</li>
      <li><strong>How-to guides:</strong> Actionable frameworks and processes</li>
      <li><strong>Industry insights:</strong> Trends, predictions, expert analysis</li>
    </ul>

    <h3>Titles That Drive Clicks</h3>
    <ul>
      <li>"How [Company/Person] Achieved [Specific Result]"</li>
      <li>"[Number] Lessons From [Experience/Study]"</li>
      <li>"The [Framework/Strategy] That [Outcome]"</li>
      <li>"Why [Common Belief] Is Wrong About [Topic]"</li>
    </ul>

    <h2 id="mobile-considerations">LinkedIn Mobile Considerations</h2>
    <p>
      Over 60% of LinkedIn traffic comes from mobile apps. Mobile-specific tips:
    </p>
    <ul>
      <li><strong>Large, readable text:</strong> Minimum 30px font size in images</li>
      <li><strong>Portrait images work:</strong> LinkedIn mobile handles them better than other platforms</li>
      <li><strong>Test on device:</strong> The mobile app sometimes renders differently than desktop</li>
      <li><strong>Fast loading:</strong> Mobile users have less patience for slow loads</li>
    </ul>

    <h2 id="b2b-specific-tips">B2B Content Best Practices</h2>

    <h3>For SaaS Companies</h3>
    <ul>
      <li>Highlight ROI and business outcomes</li>
      <li>Include customer logos (in image, not just text)</li>
      <li>Use technical but accessible language</li>
      <li>Link to gated content (whitepapers, demos) strategically</li>
    </ul>

    <h3>For Consultants & Service Providers</h3>
    <ul>
      <li>Showcase expertise through data and insights</li>
      <li>Build thought leadership, not just promotional content</li>
      <li>Use professional headshots in images (builds trust)</li>
      <li>Share client results (with permission)</li>
    </ul>

    <h3>For Recruiters & HR</h3>
    <ul>
      <li>Highlight company culture visually</li>
      <li>Use employee testimonials in descriptions</li>
      <li>Make job titles/roles immediately clear</li>
      <li>Include salary/compensation info when possible (higher engagement)</li>
    </ul>

    <h2 id="cache-management">LinkedIn Cache Management</h2>
    <p>
      LinkedIn caches OG data for approximately 7 days. To force a refresh:
    </p>
    <ol>
      <li>
Use the <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">Post Inspector</a>
        and
        click "Clear cache"
</li>
      <li>
Append a query parameter to your URL (e.g.,
        <ContentInlineCode code="?v=2" />)
      </li>
      <li>Wait 24-48 hours for organic cache expiration if not urgent</li>
    </ol>

    <h2 id="testing-workflow">Complete LinkedIn Testing Workflow</h2>
    <ol>
      <li><strong>Implement SSR/SSG:</strong> Ensure OG tags are server-rendered</li>
      <li>
<strong>Test locally:</strong> Use our <NuxtLink to="/" class="font-semibold">preview tool</NuxtLink>
      </li>
      <li><strong>Deploy to production</strong></li>
      <li><strong>Validate with Post Inspector:</strong> Clear cache if needed</li>
      <li><strong>Test real post:</strong> Share privately (connections only) first</li>
      <li><strong>Monitor engagement:</strong> LinkedIn provides detailed analytics</li>
      <li><strong>Iterate:</strong> A/B test headlines and images</li>
    </ol>

    <h2 id="resources">Additional Resources</h2>
    <ul>
      <li>
<a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">LinkedIn Post Inspector</a>
      </li>
      <li>
<a href="https://www.linkedin.com/help/linkedin/answer/a521928" target="_blank" rel="noopener">LinkedIn
          Sharing
          Best Practices</a>
</li>
      <li>
        <NuxtLink to="/guides/open-graph-preview">Complete Open Graph Guide</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/guides/og-image-sizes">OG Image Size Guide</NuxtLink>
      </li>
    </ul>
  </ArticleLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'LinkedIn Link Preview Optimization - Professional OG Tags Guide (2025)',
  description: 'Master LinkedIn link previews with B2B-optimized Open Graph tags. Includes image requirements (1200×627px), professional title/description strategies, and Post Inspector guide.',
  keywords: 'linkedin link preview, linkedin og tags, linkedin post inspector, linkedin preview optimization, linkedin image size, professional og tags, b2b open graph',
  robots: 'index, follow',
  ogType: 'article'
})

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': 'LinkedIn Link Preview Optimization Guide',
    'description': 'Professional Open Graph optimization for LinkedIn and B2B audiences',
    'datePublished': '2025-12-16',
    'articleSection': 'B2B Marketing'
  }
])

const requiredTagsCode = `<head>
  <!-- Core LinkedIn OG Tags -->
  <meta property="og:title" content="Professional, Value-Driven Title" />
  <meta property="og:description" content="Clear business value proposition" />
  <meta property="og:image" content="https://example.com/linkedin-og.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Your Company Name" />

  <!-- Image Dimensions (Recommended) -->
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  <meta property="og:image:alt" content="Descriptive professional alt text" />

  <!-- Article Metadata (for blog posts) -->
  <meta property="article:author" content="Author Name" />
  <meta property="article:published_time" content="2025-12-16T00:00:00Z" />
</head>`

const articleTagsCode = `<meta property="og:type" content="article" />
<meta property="article:author" content="Jane Smith" />
<meta property="article:published_time" content="2025-12-16T10:00:00Z" />
<meta property="article:section" content="Leadership" />
<meta property="article:tag" content="Leadership, Management, Strategy" />`
</script>
