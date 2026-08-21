export type SiteImageTier = "critical" | "secondary";

export type SiteImageAsset = {
  id: string;
  src: string;
  tier: SiteImageTier;
};

export const SITE_IMAGE_ASSETS: readonly SiteImageAsset[] = [
  { id: "bt-logo", src: "/manus-storage/bt-logo_026b8bce.png", tier: "critical" },
  { id: "hero-water-plant", src: "/manus-storage/hero-water-plant_c037dda2.webp", tier: "critical" },
  { id: "service-pumping", src: "/manus-storage/service-pumping_2b8eec90.webp", tier: "secondary" },
  { id: "service-sewage", src: "/manus-storage/service-sewage_6c756091.webp", tier: "secondary" },
  { id: "service-maintenance", src: "/manus-storage/service-maintenance_2e0d97c5.webp", tier: "secondary" },
  { id: "project-reservoir", src: "/manus-storage/proj-elevated-reservoir_85f4da03.webp", tier: "secondary" },
  { id: "project-pump", src: "/manus-storage/proj-pump-station_ff05e924.webp", tier: "secondary" },
  { id: "project-stp", src: "/manus-storage/proj-stp-plant_2684fa05.webp", tier: "secondary" },
  { id: "project-pipeline", src: "/manus-storage/proj-pipeline-work_d46aeb31.webp", tier: "secondary" },
  { id: "why-pump-room", src: "/manus-storage/pump-maintenance-workshop_f4afac72.jpeg", tier: "secondary" },
  { id: "why-network", src: "/manus-storage/water-infrastructure-aerial_0c1429f5.jpg", tier: "secondary" },
  { id: "why-treatment", src: "/manus-storage/wastewater-treatment-aerial_10c73ccd.jpg", tier: "secondary" },
  { id: "office-map", src: "/manus-storage/static-map-office_9f497833.png", tier: "secondary" },
  { id: "team-arun", src: "/manus-storage/team-sample-arun-mehta_cba1713f.webp", tier: "secondary" },
  { id: "team-neha", src: "/manus-storage/team-sample-neha-sen_ddf1221c.webp", tier: "secondary" },
  { id: "team-rohan", src: "/manus-storage/team-sample-rohan-iyer_7ada1601.webp", tier: "secondary" },
] as const;

export function getSiteImageSources(tier?: SiteImageTier): string[] {
  const matchingAssets = tier
    ? SITE_IMAGE_ASSETS.filter((asset) => asset.tier === tier)
    : SITE_IMAGE_ASSETS;

  return Array.from(new Set(matchingAssets.map((asset) => asset.src)));
}
