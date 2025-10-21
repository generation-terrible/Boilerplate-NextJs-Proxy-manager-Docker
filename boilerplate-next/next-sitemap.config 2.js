/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.APP_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: "public",
  debug: true,
  exclude: ["/api/*", "/icon.png"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
  },
  transform: async (config, path) => {
    const priority = path === "/" ? 1.0 : 0.5;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
