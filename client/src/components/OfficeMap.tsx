/*
 * Hydrogrid Editorial — Office map (Bidhannagar Sector 3, Kolkata).
 * Uses a coordinate-based Google Maps embed and matching interactive links.
 */
import { ExternalLink, MapPin } from "lucide-react";

const OFFICE = {
  name: "BT Projects Private Limited",
  address: "FE-159, FE Block, Sector 3, Bidhannagar, Kolkata 700106",
  lat: 22.581447,
  lng: 88.418101,
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${OFFICE.lat},${OFFICE.lng}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE.lat},${OFFICE.lng}`;
const EMBED_URL = `https://www.google.com/maps?q=${OFFICE.lat},${OFFICE.lng}&z=16&output=embed`;

export function OfficeMap() {
  return (
    <div className="office-map">
      <div className="group relative overflow-hidden border border-navy/12 bg-navy/5">
        <iframe
          title={`Interactive map centred on ${OFFICE.name}`}
          src={EMBED_URL}
          loading="lazy"
          className="office-map-image block w-full aspect-[16/10] border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-white/95 text-navy text-[11px] font-mono uppercase tracking-[0.12em] px-3 py-1.5 shadow-sm">
          <MapPin className="h-3 w-3" strokeWidth={2} />
          Sector 3, Bidhannagar
        </span>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-navy text-white text-[11px] font-mono uppercase tracking-[0.12em] px-3 py-1.5 opacity-100 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Open BT Projects office location on Google Maps"
        >
          <ExternalLink className="h-3 w-3" strokeWidth={2} />
          Open in Maps
        </a>
      </div>
      <div className="office-map-meta mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-navy/50">
          {OFFICE.name} — {OFFICE.address}
        </p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy border border-navy/25 px-4 py-2 nav-link"
        >
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          Get directions
        </a>
      </div>
    </div>
  );
}
