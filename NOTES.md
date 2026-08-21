# Project Notes (for context continuity)

## User/company facts
- Company: BT Projects Private Limited — engineering & infrastructure, water supply, water & sewage management, O&M of related systems.
- Logo uploaded: /home/ubuntu/webdev-static-assets/bt-logo.png → storage path `/manus-storage/bt-logo_026b8bce.png` (64x64 blue circle BT monogram + red/black lightning bolt).
- Real contact details (user provided):
  - Email: btprojects.official@btprojects.co.in
  - Phone: +033 3585 0822
  - Address: FE-159, FE Block, Sector 3, Bidhannagar, Kolkata, West Bengal 700106
- Enquiries should be delivered to btprojects.official@btprojects.co.in (implemented via notifyOwner; user configures email address in Settings → Notifications / secret VITE_APP title etc.)

## Theme: "Hydrogrid Editorial"
- Navy oklch(0.28 0.09 262) (#0A1F44-ish), white, bolt red accent oklch(0.5 0.19 25) (#C8102E), water-paper bg oklch(0.972 0.006 250).
- Fonts: Archivo (display/body), IBM Plex Mono (labels). Classes: .section-label, .blueprint-grid, .blueprint-grid-light, .fade-up, .draw-line, .nav-link.
- Custom colors: --navy, --navy-deep, --navy-light, --water-paper, --bolt.

## Asset URLs (use exactly as-is)
- Logo: /manus-storage/bt-logo_026b8bce.png
- Hero: /manus-storage/hero-water-plant_c037dda2.png
- Pump: /manus-storage/service-pumping_2b8eec90.png
- Sewage: /manus-storage/service-sewage_6c756091.png
- Maintenance: /manus-storage/service-maintenance_2e0d97c5.png
- Badge (unused so far): /manus-storage/bt-badge_d6f232b3.png
- New project placeholder images: /manus-storage/proj-water-supply_<new>.png etc. (see generation output below)

## Current update (todo.md)
Phase 1 DONE: full-stack upgrade (web-db-user), enquiries table created (id,name,email,message,createdAt), insertEnquiry/listEnquiries in server/db.ts, enquiries.submit + enquiries.list in server/routers.ts (uses notifyOwner), vitest passing (server/enquiries.test.ts 5 tests).
Phase 2: generate 4 project placeholder images, Projects section (05 numbering shift → make Projects "04" and Why "05", Contact "06" or keep numbering contiguous), add real contact details in SiteHeader/SiteFooter/Contact.
Files: client/src/components/SiteHeader.tsx, SiteFooter.tsx, Sections.tsx (Hero/Overview/Services), Sections2.tsx (Operations/Why/Contact), pages/Home.tsx.
Footer "Sheet No. 01" motif; section-label format: index (red/bolt) + text with ::before hairline.
## Update 3 (map + WhatsApp + animations) — status
- WhatsApp number constant: client/src/components/WhatsAppButton.tsx exports WHATSAPP_NUMBER="913335850822", WHATSAPP_URL, user confirmed phone +033 3585 0822 (landline — flagged to user).
- OfficeMap.tsx created: MapView at lat 22.5733, lng 88.4137 (Sector 3 Bidhannagar per search), navy circular AdvancedMarker, "Get directions" link to google.com/maps/dir.
- Contact section (Sections2.tsx): added "Chat on WhatsApp" green button + OfficeMap under contact info column, grid changed to lg:grid-cols-[1fr_1.2fr].
- Home.tsx: WhatsAppButton rendered inside main.
- index.css: fade-up now 600ms with transition-delay via --delay; added .whatsapp-fab entrance + pulse animation, .stagger utility; reduced-motion handled.
- useInView.ts: earlier reveal (threshold 0.08, rootMargin -5%), respects prefers-reduced-motion.
- ts check & vitest pass. Screenshot desktop/mobile OK; WhatsApp FAB visible on mobile hero; map column on contact section but map tiles not clearly visible in full-page shots (may be hidden by fade-up until scrolled — check contact viewport shot).
- Next: verify map tiles render at /#contact desktop, then checkpoint + deliver.
- WhatsApp FAB also visible in hero viewport on desktop shot (bottom-right).
## Update 4 (watery animations) — status
All CSS motion reworked to fluid watery feel in client/src/index.css: :root vars --fluid (0.37,0,0.15,1) and --fluid-wave (0.28,0.11,0.32,1). fade-up now 900ms liquid rise; stagger utility gaps 110ms; nav-link underline 2px rounded flowing 500ms; new .fluid-card (lift + flowing gradient shimmer bar on hover), .fluid-btn (highlight sweep 650ms + lift), ripple ::before/::after rings on .whatsapp-fab, bobbing .whatsapp-fab-inner 4s buoy loop; button:active scales 0.96 over 300ms; all loops gated behind prefers-reduced-motion with full reduced-motion reset. Applied fluid classes: Sections.tsx hero CTAs + overview mini-cards (stagger); Sections2.tsx Why cards (.fluid-card relative), WhatsApp button, submit button, inputs 300ms; Projects.tsx image hover scale 1.04 over 700ms with fluid-wave easing, stagger 110ms; WhatsAppButton.tsx icon wrapped in whatsapp-fab-inner. ts check & vitest 6/6 pass; desktop + mobile full-page screenshots verified clean. Remaining: mark todo items, checkpoint, deliver.
## Update 5 (water preloader) — status
Created client/src/components/Preloader.tsx: navy fixed z-100 screen, droplet SVG (stretch/squash dropFall 1.4s), 3 impactRipple rings staggered 0.35/0.55/0.75s, brand wordmark "BT Projects" + tagline, waterFill shimmer bar. Keyframes appended to client/src/index.css. Wired into client/src/App.tsx. Reduced-motion skips entirely; auto-hides after min 850ms display (fade 500ms) once document load fires. Verified via browser: preloader renders correctly on initial load (navy screen + droplet + wordmark + fill line seen), page loads fine after fade. ts check + vitest 6/6 pass. Remaining: mark todo, checkpoint, deliver with manus-webdev attachment.
## Update 6 (droplet alignment fix) — status
Fixed: scene now 120px tall with water surface line at 92px (thin hairline); 48px droplet rests at top:44px so its bottom tip touches the surface exactly; ripple rings centered at top:91px on the impact point; drop keyframe anchors all positions to this one plane. Verified visually in browser — drop lands precisely on the surface line with rings expanding from the impact point, wordmark/fill bar below, well composed. ts check OK. Remaining: mark todo items, checkpoint, deliver manus-webdev:// attachment.
## Update 6b — final verification
Ripple rings re-centered at top:88px so ring vertical center (88+4=92) sits exactly on the 92px surface line. Verified visually in browser (screenshot /home/ubuntu/screenshots/3000-iceey40il5br4s3_2026-08-10_13-13-51_2214.webp): droplet rests with bottom tip touching the surface hairline, ripple rings expand from the impact point on the surface line, wordmark and fill bar below — well composed. Ready for checkpoint and delivery.
## Update 7 — Preloader v2 (logo-center wave transition) — verified
Implemented and verified in live browser loads (three reloads):
1. Stage "show" (~950ms): big BT logo centered (h-24 md:h-32) with glow, "BT PROJECTS / Private Limited" wordmark, flowing fill line. Screenshot 3000-iceey40il5br4s3_2026-08-10_13-20-56_9444.webp confirms centered cluster rendering.
2. Stage "wave" (~950ms): three-layer SVG wave sheet rises from bottom to cover screen (fluid-wave ease, staggered path reveals).
3. Stage "fly" (1350ms): flying logo img fixed-position animates from center (6rem/8rem on md) to header slot (left 1.25rem, top 0.75rem, 2.5/2.75rem), overlay fades to opacity-0 with pointer-events-none. Header z-50, preloader z-[100] so flying logo rides above header.
4. Stage "done": component unmounts (returns null); site header logo takes over.
Reduced-motion skips straight to done.
Note: during fly stage the header logo and flying logo briefly coexist (acceptable, flying logo covers the header slot position exactly; header logo at top:12px left:16px matches fly endpoint). Verified: after transition the normal site renders cleanly (screenshot 3000-iceey40il5br4s3_2026-08-10_13-21-22_8213.webp).
Type check + vitest OK. Next: mark todos, checkpoint, deliver manus-webdev:// attachment.
## Preloader v2 follow-up fixes (final)
- Gated wave-rise and logoFly animations behind stage-keyed classes (.preloader-wave-active, .preloader-logo-fly-active) so animations start at the correct stage, not on first render.
- Added .preloader-logo-cluster-hide (600ms clusterDissolve) at fly stage so the centered cluster dissolves while the flyer travels; flyer now always mounted but opacity-0 until fly stage.
- Reduced-motion block updated for the new active classes.
- Browser evidence: 3000-iceey40il5br4s3_2026-08-10_13-24-06_9022.webp (centered logo stage captured on fresh load), 13-20-56 screenshot earlier (centered cluster OK). Post-transition renders clean on desktop + mobile (13:24:06 screenshot shows header logo in slot, full page intact).
- Type check + vitest pass.
- Note: the staged mid-transition frames (wave + fly) could not be individually frozen by screenshots (they play out in ~2s), but staged gating confirmed by DOM polling: overlay appears at load then unmounts; stages fire in order per timers.
## Phase 10 verification (timing fix + header ripple)
Preloader.tsx now waits for the CSS logoFly `animationend` event before setting flyEnded (with a 2600ms safety fallback), and the overlay unmounts only after both the flight ends and its 500ms fade-out completes — replacing the earlier fixed 1350ms timer that could end the sequence early. SiteHeader logo is now wrapped in a group anchor with two paused ripple rings (headerRipple keyframe, 1.4s fluid-wave, staggered 0.35s) that expand and fade on hover; reduced-motion gates both additions. pnpm check + vitest pass. Fresh navigation shows the site only after the sequence completes (screenshot 13-29-54, header logo intact top-left), and post-load DOM polling shows no preloader elements remaining. Mid-sequence frames (wave + flight) are short-lived and cannot be frozen by screenshots, but stage order is enforced by the animationend listener.
## Phase 10 gap closure
Fixed fade-out: Preloader keeps overlay mounted until flyEnded + 520ms (fadeEnded state), so the 500ms opacity transition plays before unmount. Verified hover ripple: dispatching mouseenter on a.group shows both header-logo ripple spans running `headerRipple` at 1.4s with 0s/0.35s delays, expanding to scale ~1.5-1.7 with fading opacity — matches the drop-on-water intent. Fresh load still shows the full preloader start state. pnpm check + tests pass.
## Phase 11 (droplet-first preloader v3) — working notes
Implementation: Preloader.tsx stage order drop(0)→show(1100)→wave(2600)→fly(3400); droplet scene renders only in drop stage with dropletFall (800ms: falls top:-20px to top:212px, squash on impact) + two splashRing ellipses (640/740ms delays). Flight sped up to 950ms logoFly/logoFlyMd (md variant applied). cluster shows only after drop stage (hidden while stage==="drop"). CSS edits in index.css under @media (prefers-reduced-motion: no-preference) block ~line 484-700.
ISSUE OBSERVED: fresh-load screenshots at ~13:37 (v=11, v=12) show a fully empty navy screen in the preloader window instead of the droplet — likely because screenshot captured during the drop stage and the droplet image hasn't loaded yet, OR the drop-scene height:0 / scene top positioning makes the droplet invisible. Need to check: (1) logo image preload — the droplet img src loads on demand; image load race means blank during first ~400ms. FIX: preload LOGO_URL via new Image() at module load, and/or increase droplet visibility window. (2) scene uses style height 220px — fine, but droplet top animates from -20 to 212px within 220px inner div; should be visible from 0%→70% of 800ms = 560ms. Verify after preload fix.
Post-load DOM polling (t>=11.6s) shows all preloader elements unmounted — sequence completes cleanly.
## Phase 11 follow-up (v=15 load) — current diagnosis
The v=15 screenshot captured mid-drop stage shows the droplet IS animating now: a stretched white pill shape (squash/scale transform) is visible at ~y=150 in the upper-center of the navy screen with a faint surface hairline beneath it. So the droplet animation works — the earlier "blank navy" screenshots were the pre-image-load moment (now fixed via Image preload) OR captured just during the 0-10% opacity ramp.
Remaining concerns: (1) During the 70-82% transition the stretched droplet looks like a pill, acceptable. (2) The drop scene is horizontally centered but the scene div is top:0, so the scene (220px) sits at top of viewport; acceptable since surface line at 220px from top = upper third. Consider centering scene vertically instead? User liked old version's centered composition — but old v2 screenshot showed cluster centered. Keep as-is unless user complains; the droplet+surface reads as "water at top" which is odd. BETTER: center the scene vertically (add top-1/2 -translate-y-1/2 to preloader-drop-scene) so drop falls onto a surface at screen center.
Timing after preload fix: drop 0→1100ms, show 1100→2600, wave 2600→3400, fly 3400→(3400+950=4350)+500 fade.
Files: client/src/components/Preloader.tsx (stages drop|show|wave|fly|done, preload via new Image(), animationend gating, flyEnded→fadeEnded 520ms); client/src/index.css preloader block ~line 484 (dropletFall, splashRing, logoSettle/Breathe, waveRise/Reveal/Drift, logoFly 950ms, logoFlyMd, clusterDissolve, headerRipple).
## Phase 11 second diagnosis (t~4.5s sample): hasDrop=false, hasCluster=true
Findings: (a) The preloader now works — at t=4.5s the big centered logo cluster is mounted; the drop stage was missed in polls because it only lasts ~1s at the very start. (b) V15/V16/V18 screenshots all captured the compressed droplet at ~y=425-440px (centered scene) mid-fall — droplet IS visible. (c) The droplet is currently a stretched logo mark (looks like a pill, slightly odd but acceptable during 800ms fall). Sequence completes and site reveals. Consider this verified. Remaining: checkpoint.

## Phase 11 final direct verification
- Fresh load `?v=20` captured the preloader droplet clearly at screen centre against the opaque navy blueprint backdrop (clean screenshot: 2026-08-13 09:51:26).
- A subsequent live view of the same load showed the completed hero and header cleanly, confirming the loading overlay releases only after its sequence completes.
- The falling element is now a custom blue water droplet rather than the company-logo image. Timeline: 1.25s drop/splash, 1.2s brand moment, 0.7s wave rise, 0.95s logo travel, then a 0.52s overlay fade.

## Phase 11 deterministic visual proof
- Added `?preloaderPreview=drop` solely for development (`import.meta.env.DEV` guard). It holds the initial stage and freezes a clear blue water droplet above two concentric impact ripples; it cannot affect the published site.
- Direct browser capture `?preloaderPreview=drop&frame=final` at 2026-08-13 09:54:21 visibly shows the centered glossy blue droplet and ripple rings on the opaque navy blueprint screen.
- Normal fresh load `?v=20` still completes to the live hero/header. Type check and all 6 Vitest tests passed after this verification tooling was added.

## Phase 11 enlarged frame refinement
- Enlarged the actual animated droplet to 38×49px and its splash ring reach to 154px so the opening motion reads clearly at a glance.
- Inspected deterministic capture `?preloaderPreview=drop&frame=large` at 2026-08-13 09:56:06: the glossy blue droplet is centered and visibly poised above two expanding elliptical water-ripple rings.
- The hold mode remains development-only; the normal timeline and production behavior are unaffected. Type check and all 6 tests passed after the scale refinement.

## Phase 11 normal-load completion confirmation
- A fresh normal load `?v=21` first showed the opening ripple stage, and a follow-up live browser view at 09:56:46 showed the fully revealed BT Projects hero with the standard top-left logo, navigation, and WhatsApp control intact.
- This confirms the refined droplet-first sequence completes and hands off to the homepage correctly after the faster logo travel.
