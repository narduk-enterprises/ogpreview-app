/**
 * Server middleware for handling redirects
 * Consolidates duplicate content and maintains SEO
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Redirect old og-image-size-guide to consolidated guides/og-image-sizes
  if (url.pathname === '/og-image-size-guide') {
    return sendRedirect(event, '/guides/og-image-sizes', 301)
  }
})
