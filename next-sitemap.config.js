const fetch = require('node-fetch');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ilalang.drepram.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/create/*', '/edit/*'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  outDir: './public',
  // Default transform function
  transform: async (config, path) => {
    // Exclude API routes and non-page routes
    if (path.includes('/api/') || path.includes('/create/') || path.includes('/edit/')) {
      return null;
    }

    // Default transformation for static pages
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    };
  },
  // Additional paths for dynamic routes
  additionalPaths: async (config) => {
    const paths = [];

    // Fetch dynamic post IDs
    const posts = await fetch('https://ilalang.drepram.com/api/post').then(res => res.json());
    posts.forEach(post => {
      paths.push({
        loc: `/p/${post.id}`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: post.updatedAt || new Date().toISOString(),
      });
    });

    // Fetch dynamic author IDs
    const authors = await fetch('https://ilalang.drepram.com/api/author').then(res => res.json());
    authors.forEach(author => {
      paths.push({
        loc: `/a/${author.id}`,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: author.updatedAt || new Date().toISOString(),
      });
    });

    return paths;
  },
};