const express = require("express");
const xml = require("xml");

const router = express.Router();

const staticUrls = [
  { loc: "/", priority: "1.0" },
  { loc: "/player", priority: "0.9" },
  { loc: "/academy", priority: "0.9" },
  { loc: "/vacancy", priority: "0.8" },
  { loc: "/tournament", priority: "0.8" },
  { loc: "/notifications", priority: "0.7" },
];

// Example: Fetch tournaments from DB (if needed)
const getDynamicUrls = async () => {
  try {
    // Replace with your model (Tournament, Player, etc.)
    // Example: Fetching dynamic tournament pages
    const tournaments = []; // Fetch from DB if needed
    return tournaments.map((t) => ({
      loc: `/tournament/${t.id}`,
      lastmod: new Date(t.updatedAt).toISOString().split("T")[0],
      priority: "0.7",
    }));
  } catch (error) {
    console.error("Error fetching dynamic URLs:", error);
    return [];
  }
};

router.get("/sitemap.xml", async (req, res) => {
  const dynamicUrls = await getDynamicUrls();

  const urlSet = [...staticUrls, ...dynamicUrls].map((url) => ({
    url: [
      { loc: `https://game-on.me${url.loc}` },
      { lastmod: new Date().toISOString().split("T")[0] },
      { changefreq: "weekly" },
      { priority: url.priority },
    ],
  }));

  const sitemap = xml([
    {
      urlset: [
        { _attr: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" } },
        ...urlSet,
      ],
    },
  ]);

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

module.exports = router;
