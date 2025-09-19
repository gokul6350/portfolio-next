/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gokulbarath.is-a.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
}
