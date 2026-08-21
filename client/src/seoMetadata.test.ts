import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const publicDirectory = path.join(projectRoot, "client", "public");
const indexHtml = fs.readFileSync(path.join(projectRoot, "client", "index.html"), "utf8");

function getSchema() {
  const match = indexHtml.match(
    /<script id="bt-projects-organization-schema" type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
  );

  if (!match?.[1]) {
    throw new Error("BT Projects Organization JSON-LD was not found in index.html");
  }

  return JSON.parse(match[1]);
}

describe("BT Projects technical SEO foundation", () => {
  it("includes canonical, crawler, and social-sharing metadata in the static document head", () => {
    expect(indexHtml).toContain('<link rel="canonical" href="https://btprojects.co.in/" />');
    expect(indexHtml).toContain('name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"');
    expect(indexHtml).toContain('property="og:site_name" content="BT Projects Private Limited"');
    expect(indexHtml).toContain('name="twitter:card" content="summary_large_image"');
    expect(indexHtml).toContain('<link rel="manifest" href="/site.webmanifest" />');
  });

  it("publishes accurate Organization and WebSite JSON-LD", () => {
    const schema = getSchema();
    const organization = schema["@graph"].find((entry: { "@type": string }) => entry["@type"] === "Organization");
    const website = schema["@graph"].find((entry: { "@type": string }) => entry["@type"] === "WebSite");

    expect(organization).toMatchObject({
      name: "BT Projects Private Limited",
      url: "https://btprojects.co.in/",
      email: "btprojects.official@btprojects.co.in",
      telephone: "+91-33-3585-0822",
      address: {
        addressLocality: "Bidhannagar",
        addressCountry: "IN",
      },
    });
    expect(website).toMatchObject({
      name: "BT Projects Private Limited",
      inLanguage: "en-IN",
    });
  });

  it("publishes crawl discovery files that agree on the canonical homepage", () => {
    const robots = fs.readFileSync(path.join(publicDirectory, "robots.txt"), "utf8");
    const sitemap = fs.readFileSync(path.join(publicDirectory, "sitemap.xml"), "utf8");
    const manifest = JSON.parse(fs.readFileSync(path.join(publicDirectory, "site.webmanifest"), "utf8"));

    expect(robots).toContain("Sitemap: https://btprojects.co.in/sitemap.xml");
    expect(sitemap).toContain("<loc>https://btprojects.co.in/</loc>");
    expect(manifest).toMatchObject({
      name: "BT Projects Private Limited",
      start_url: "/",
      theme_color: "#0A1F44",
    });
  });
});
