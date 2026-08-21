# BT Projects — Feature Update Todo

## Phase 1: Full-stack upgrade + enquiry email delivery
- [x] Upgrade project to web-db-user (backend, DB, auth)
- [x] Add enquiries database table
- [x] Add backend endpoint to submit enquiries
- [x] Add notification system so enquiries email btprojects.official@btprojects.co.in
- [x] Wire Contact form to POST to backend; store + notify + show confirmation

## Phase 2: Completed Projects section + contact details
- [x] Generate 4 placeholder project images (water infrastructure style)
- [x] Build Projects section with sample project cards (marked placeholder)
- [x] Update SiteHeader / SiteFooter with phone, email, address
- [x] Update Contact section with real details + link tel: and mailto:
- [x] Update App.tsx routes if needed (single page, likely fine)

## Phase 3: Test & checkpoint
- [x] TypeScript check passes
- [x] Verify form submission end-to-end (curl test + DB verify, vitest 6/6)
- [x] Screenshot desktop + mobile
- [x] Save checkpoint

## Phase 4: Deliver
- [x] Send final report with checkpoint attachment
## Phase 5: Map, WhatsApp button, animations
- [x] Add interactive map to Contact section showing Kolkata office (Bidhannagar, Sector 3) — static map image (clickable) + directions link, JS API proxy unavailable
- [x] Add floating WhatsApp chat button linking to +913335850822 (FAB with pulse + in-section button)
- [x] Smoother page animations (600ms eased fade-up, stagger utility, earlier reveals, reduced-motion respected)
- [x] Verify map renders and WhatsApp button works on desktop + mobile (screenshots OK)
- [x] Save checkpoint and deliver (wa.me + maps links verified, screenshots desktop/mobile OK)
## Phase 6: Watery fluid animations
- [x] Redefine global easings to liquid/flowing curves (--fluid, --fluid-wave vars, 900ms reveals)
- [x] Add wave-like motion (ripple rings on FAB, flowing shimmer bars, wave drift keyframes available)
- [x] Make scroll reveals rise like buoyant float (900ms fluid-wave easing)
- [x] Add ripple/fluid hover effects to buttons (.fluid-btn sweep), cards (.fluid-card lift+shimmer), links, images (scale 1.04)
- [x] Animate hero/nav with flowing underlines (2px rounded, 500ms) and bobbing FAB
- [x] Verify desktop + mobile full-page screenshots clean; reduced-motion respected
- [x] Checkpoint saved (6eb28ad7) and delivered
## Phase 7: Water-themed loading screen
- [x] Create Preloader component: navy screen, animated droplet (fall + impact ripple), BT branding
- [x] Wire preloader into App.tsx; hide after brief display / page load, respects reduced-motion
- [x] Verify visually (live load shows droplet + ripples + wordmark + fill bar) and save checkpoint
## Phase 8: Fix droplet animation alignment
- [x] Align droplet so its bottom tip lands exactly on the ripple/surface plane (scene 120px, surface at 92px, ripple rings at impact point, added visible surface hairline)
- [x] Verify visually in browser — drop strikes surface precisely, rings expand from impact point
- [x] Checkpoint saved (3ab6a180) and delivered
## Phase 9: Logo-center wave transition preloader
- [x] Remove surface line; show large BT logo centered on navy preloader screen (glow, wordmark, fill line)
- [x] Add wave wash animation (3-layer SVG rise) that carries logo to header top-left slot, then overlay fades and site reveals
- [x] Verify visually in browser (centered logo stage + clean post-transition render, 3 reloads)
- [x] Checkpoint saved (f88b93b3) and delivered
## Phase 10: Preloader timing fix + header logo ripple
- [x] Ensure site reveals only after the logo-fly animation completes (animationend listener + 2600ms safety, overlay unmounts after fade)
- [x] Add subtle water-ripple hover effect to the header logo (two staggered expanding rings)
- [x] Verify in browser: sequence completes before reveal, no preloader residue, ripple CSS registered
- [x] Checkpoint saved (39425ab2) and delivered
## Phase 11: Droplet-first sequence + faster smoother travel
- [x] Prepend droplet fall + splash stage before the centered-logo/wave sequence (drop stage, splashRing ellipses)
- [x] Speed up logo travel (logoFly 950ms md variant with fluid-wave ease)
- [x] Keep fly completion gating and fade-out intact (animationend + safety)
- [x] Fix blank drop stage (logo image preload, CSS selector fix, centered scene)
- [x] Verify visually in browser (V15-V18 fresh loads: drop visible mid-fall, sequence completes)
- [x] Make the droplet unmistakably visible and capture direct fresh-load evidence of the drop and completed reveal (development-only hold mode inspected; production sequence also verified)
- [x] Checkpoint saved (9a1660a9)
- [x] Send the user-facing delivery with the Phase 11 checkpoint attachment (superseded by the final Phase 12 delivery)

## Phase 12: Seamless logo handoff
- [x] Replace the separate preloader/header logo handoff with a continuous shared-logo motion path into the measured header target
- [x] Synchronize header-logo visibility and page reveal only after the travelling logo lands
- [x] Verify the full transition at desktop and mobile sizes on fresh loads (exact geometry and handoff state checked at 1280×720 and 375×812)
- [x] Save checkpoint and deliver (final shared-logo transition checkpoint: 4f96c7f0)

## Phase 13: User-provided canvas water-droplet animation
- [x] Adapt the supplied liquid canvas droplet algorithm for the preloader drop stage (liquid contour, water gradient, glow, and highlights verified at desktop and mobile sizes)
- [x] Preserve the seamless droplet-to-logo-to-header loading sequence and reduced-motion behavior
- [x] Verify the canvas animation and full preloader transition at desktop and mobile sizes (canvas present during drop; preloader cleared and header logo visible after the complete sequence at 1280×720 and 375×812)
- [x] Run type and unit checks, save checkpoint, and deliver (canvas-droplet checkpoint: fbe35610)

## Phase 14: Droplet alignment and continuous logo flight
- [x] Reduce the canvas water droplet’s visible size without weakening its liquid detail
- [x] Align the droplet impact and splash centre exactly with the centered logo’s emergence point (full X/Y geometry matches at 640×360 desktop and 187.5×406 mobile; held impact frame checked)
- [x] Remove the visible pause between the centered-logo shrink and its measured flight to the header
- [x] Verify the refined sequence at desktop and mobile sizes, run checks, save checkpoint, and deliver (droplet/splash/logo centres match at both breakpoints; checkpoint: 9352af05)

## Phase 15: Restore centre-origin logo emergence
- [x] Restore the logo’s emergence point to the exact visual centre of the viewport (visible mark measured at 640×360 desktop and 187.5×406 mobile)
- [x] Realign the droplet impact, splash, and shared-logo flight to the restored centred logo origin (all origins match at both breakpoints)
- [x] Verify the centred origin and full transition at desktop and mobile sizes, run checks, save checkpoint, and deliver (centres match at both breakpoints; checkpoint: 91df1946)

## Phase 16: Supplied water-drop logo reveal
- [x] Inspect the supplied HTML animation and identify the visual stages that can replace the current preloader reveal (falling glossy drop, water-plane impact, irregular ripple field, splash particles, refracted logo emergence, reflection, and sheen)
- [x] Adapt the chosen reveal stages for the React preloader while retaining the centred droplet origin and measured header-logo handoff (full-screen falling-drop, ripple, splash, and refracted-glow canvas scene verified at 1280×720 and 375×812)
- [x] Verify the replacement animation at desktop and mobile sizes, run checks, save checkpoint, and deliver (cinematic canvas opens cleanly, header logo stays hidden until handoff, and preloader clears with header logo visible at both breakpoints; checkpoint: be44167e)

## Phase 17: Continuous splash-to-logo handoff
- [x] Reduce the delay between the cinematic splash impact and the centred logo emergence (logo now appears while the water-plane impact remains visible)
- [x] Extend ripple, splash-particle, and refracted-glow decay so water effects dissolve smoothly (canvas effects persist through a controlled fade rather than cutting off)
- [x] Verify the refined handoff and fading water effects at desktop and mobile sizes, run checks, save checkpoint, and deliver (logo and water effects overlap, then dissolve progressively; responsive completion checks and checkpoint: 750fd80b)

## Phase 18: Immediate ripple-to-logo reveal
- [x] Advance the logo’s first visible frame into the ripple-impact timing window (visible in 394 ms desktop and 382 ms mobile from cinematic activation)
- [x] Preserve the smooth water-effect fade and the existing measured flight to the header (responsive completion checks retain the canvas fade, overlay removal, and live header-logo handoff)
- [x] Verify the no-lag reveal at desktop and mobile sizes, run checks, save checkpoint, and deliver (logo appears within the first ripple at both breakpoints; fade and measured header flight complete; checkpoint: 3af20a3a)

## Phase 19: Wavy loading line
- [x] Replace the straight preloader loading dash with a subtle water-themed wavy line
- [x] Verify the wavy line at desktop and mobile sizes, run checks, save checkpoint, and deliver (settled desktop/mobile frames show the animated flowing wave beneath the wordmark; checkpoint: 75ee138d)

## Phase 20: Faster aligned wave-line treatment
- [x] Speed up the wordmark’s preloader entrance and settling timing (0.38-second entrance)
- [x] Increase the animated wave line’s glow while retaining a clean water-inspired look
- [x] Align the wave line precisely beneath the wordmark at desktop and mobile sizes (measured centre offset: less than 0.01 pixel at both breakpoints)
- [x] Verify the faster aligned treatment, run checks, save checkpoint, and deliver (0.38-second copy entrance, brighter cyan wave, and less than 0.01-pixel centre offset at desktop and mobile; checkpoint: d7a563f3)

## Phase 21: Motion-inspired water button ripple
- [x] Review the supplied Motion.dev Material Design ripple example and select an implementation compatible with existing buttons (adapted its clipping-container and pointer-origin expansion pattern for existing fluid buttons)
- [x] Add water-themed click-ripple feedback to the website’s primary button interactions (hero call-to-action verified with a clipped pointer-origin ripple and keyboard-centre fallback)
- [x] Verify responsive button feedback and reduced-motion behavior, run checks, save checkpoint, and deliver (pointer-origin and keyboard-centre ripple feedback verified at desktop and mobile sizes; reduced-motion disables ripple insertion; type and unit checks pass; checkpoint: affa0841)

## Phase 22: Completed Projects scroll pinning
- [x] Review the supplied Motion.dev scroll-pinning pattern and map it to the four project cards (four-step vertical scroll container, sticky viewport panel, horizontally progressing cards, and progress indicator adapted from https://motion.dev/examples/js-scroll-pinning)
- [x] Implement a staged pinned progression for the four Completed Projects cards on larger screens
- [x] Preserve a natural stacked-project fallback for mobile and reduced-motion visitors (pin stage hidden; four-card stack remains visible at 375 pixels and with reduced motion)
- [x] Keep the desktop pinned panel centred in the full browser viewport and confirm the active project card is fully contained throughout the four-card progression
- [x] Capture deterministic desktop containment evidence for Project 01–04 pinned states (all four cards are centred and fully contained in the 1054-pixel viewport within the centred panel)
- [x] Verify desktop and mobile behavior, run checks, save checkpoint, and deliver (desktop four-stage containment validated; 375-pixel and reduced-motion stack fallback validated; TypeScript passes; 11 Vitest tests pass)

## Phase 23: Motion-inspired Services parallax
- [x] Review the supplied Motion.dev parallax reference and map it to the Services section (reference uses local scroll progress with differently moving layered targets; applied to Service index, copy, and image tracks)
- [x] Add a water-themed layered parallax treatment to the Services section without changing its core content or navigation (Motion scroll targets move the index, copy, and image at independently mapped 12/18/32-pixel tracks; a 420-pixel live scroll confirmed distinct index/copy/image transforms; the inspected desktop reading layout remains clear)
- [x] Preserve clear reading order and provide responsive and reduced-motion fallbacks (parallax only activates from 768 pixels with no reduced-motion preference; small screens retain the original stacked semantic layout and reduced motion uses static layers)
- [x] Verify the visual behavior, run the full regression suite, save a checkpoint, and deliver (desktop parallax transforms and reading layout inspected; responsive static fallback confirmed; TypeScript passes; 13 Vitest tests pass)
- [x] Save a new checkpoint containing the Services parallax implementation (43c24250)
- [x] Deliver the Phase 23 Services parallax update with the new checkpoint attachment (43c24250)

## Phase 24: Clearly perceptible Services parallax correction
- [x] Diagnose why the current Services layer movement is not perceptible in ordinary scrolling (the original 12/18/32-pixel ranges produced only roughly 6/10/17-pixel movement over a 420-pixel scroll, which reads as nearly static; live inspection also found the parent fade-up reveal can leave a row at opacity zero while its child transforms update; scripted scrolling did not advance the preview scroll state, so visible deltas must be checked with a real browser scroll)
- [x] Increase the visual separation between service image, content, and index tracks without harming readability (real browser-scroll inspection showed the active row progressing independently across index 66 pixels, copy -96 pixels, and image 142 pixels while retaining its readable grid)
- [x] Add an explicitly visible background/water-depth parallax cue to each desktop service row (a clipped ripple-and-depth layer traverses 190 pixels within each image frame, with opacity peaking at the row’s reading position)
- [x] Visually verify the strengthened Services parallax at multiple desktop scroll positions and confirm copy, bullets, and imagery remain readable while the larger offsets are active (two inspected desktop frames show the Water & Sewage and Pumping rows: dark-blue headings, body copy, all four bullets, images, and curved water-depth overlay remain legible; the larger layer offsets create visible separation without overlap)
- [x] Preserve static mobile and reduced-motion fallbacks (the desktop motion gate remains at 768 pixels and above, and useReducedMotion continues to render all layer transforms and depth-overlay opacity statically)
- [x] Verify substantial transform deltas at multiple scroll positions and run checks (real browser scroll confirmed distinct 66/-96/142/-190-pixel layer tracks; TypeScript passes; all 13 Vitest tests pass)
- [x] Save a checkpoint containing the clearly visible Services parallax correction (2c771261)
- [x] Deliver the corrected Services interaction with the new checkpoint attachment (2c771261)

## Phase 25: Why BT Projects lightbox and content expansion
- [x] Review the supplied Motion.dev lightbox reference and map its interaction to Why BT Projects (shared-layout thumbnail-to-overlay transition, full-screen backdrop, and explicit close behavior adapted with the installed React Motion package)
- [x] Source relevant water-infrastructure imagery for a visual Why BT Projects gallery (three illustrative water-infrastructure images were staged externally and uploaded to managed project storage; source notes retained in `docs/why-lightbox-sources.md`)
- [x] Expand Why BT Projects with concrete operating-principle content and image captions (four operating-principle cards are retained and a three-image visual reference gallery adds contextual captions for pump care, system view, and process discipline)
- [x] Build an accessible Motion-inspired lightbox with keyboard close, navigation, and clear controls (live inspection shows the full-screen overlay with the selected image, numbered context, caption, close action, and previous/next controls)
- [x] Confirm the lightbox opens from a native thumbnail activation and preserve focus and keyboard behavior (native thumbnail activation mounted the overlay; ArrowRight advanced from image 1/3 to 2/3; Escape returned to the visible gallery)
- [x] Ensure the Why BT Projects cards and gallery do not remain hidden when the section is reached through site navigation (removed the conflicting inherited fade-up state; direct Why navigation now shows the four cards and gallery)
- [x] Re-read the final Why BT Projects source files to verify all operating-principle cards, gallery captions, and image metadata (`Sections2.tsx` confirms four Why cards plus three gallery items with managed asset URLs, descriptive alt text, captions, and labelled controls; `whyGallery.test.ts` covers forward, backward, wraparound, and empty-gallery navigation)
- [x] Clear current diagnostics by confirming the latest browser console is free of runtime errors, then re-verify anchor navigation visibility (the newest diagnostics show only the expected Motion positioning warning and Vite connection messages—no current runtime errors; the Why cards and gallery remain visible following direct anchor navigation)
- [x] Verify desktop/mobile gallery behavior and motion fallbacks, and run checks (desktop overlay, native activation, ArrowRight, and Escape were tested; the 375-pixel full-page capture retains a one-column, legible gallery; TypeScript passes and all 17 Vitest tests pass)
- [x] Save a new checkpoint containing the Why BT Projects gallery and lightbox enhancement (6af101ef)
- [x] Deliver the enhanced Why BT Projects section with the new checkpoint attachment (6af101ef)

## Phase 26: Prioritized Why gallery image loading
- [x] Inspect the current gallery image loading attributes and loading behavior (the three gallery images had no explicit preload, eager priority, decode, or readiness state, allowing below-the-fold browser scheduling to make them appear late)
- [x] Preload and asynchronously decode the three Why gallery images before the visitor reaches the section (at scroll position zero, all three managed image preload hints are present, all three image elements are complete, and all three gallery tiles have entered the decoded ready state)
- [x] Keep image dimensions stable and display a refined loading state until an image is ready (the fixed-height image frames retain their layout while a navy shimmer placeholder is visible, then fade to the decoded asset)
- [x] Verify initial-load readiness, mobile behavior, lightbox compatibility, and regressions (top-of-page readiness check found 3/3 decoded assets before scroll; subsequent live scroll into Why BT Projects showed all three full image cards already rendered without a loading pop-in; the ready image opened directly in the existing lightbox; mobile continues to use the same stable fixed-height single-column tiles; TypeScript passes and all 17 Vitest tests pass)
- [x] Save a checkpoint containing the gallery image-loading improvement (1360c661)
- [x] Deliver the image-loading improvement with the new checkpoint attachment (1360c661)

## Phase 28: Site-wide prioritized image loading
- [x] Inventory every hero, service, project, gallery, map, and logo image used in the public site (12 managed assets: shared BT logo, hero image, three services images, four completed-project images, three Why gallery images, and the office map; only the three Why images currently have head preload hints)
- [x] Prioritize initial-screen assets while preloading and decoding below-the-fold imagery during the intro sequence (logo and hero now receive head preload hints; the app-wide manifest starts requests and async decode for every remaining managed image behind the opening sequence)
- [x] Add stable visual loading treatment to remaining image groups where it is needed (service and project frames already reserve a 4:3 visual area; the office map now reserves a 16:10 frame to prevent layout shift)
- [x] Verify all image groups are decoded before their sections are reached, check mobile behavior, and run regressions (at scroll position zero, the shared loader reported ready and all 17 rendered managed images were complete with no pending assets; direct arrival at Completed Projects showed the project image immediately; the 375-pixel full-page layout remains stable; TypeScript passes and all 19 Vitest tests pass)
- [x] Save a checkpoint containing the site-wide image-loading enhancement (0d61140c)
- [x] Deliver the site-wide image-loading enhancement with the new checkpoint attachment (0d61140c)

## Phase 29: Technical SEO and social-sharing foundation
- [x] Audit the current title, description, social tags, canonical URL, public files, and site routing (the homepage has a baseline title and description but no social tags, canonical link, JSON-LD, robots.txt, sitemap.xml, manifest, or crawler directives; the public route surface is the homepage only)
- [x] Define accurate BT Projects metadata, local-business organization schema, and social preview content without fabricating customer claims (canonical public URL: `https://btprojects.co.in/`; title and description reflect only water supply, sewage management, and O&M; Organization JSON-LD will use the verified company name, email, telephone, Kolkata address, official logo, and existing water-infrastructure hero image)
- [x] Add robots.txt, sitemap.xml, canonical and crawler directives, Open Graph, X card metadata, JSON-LD, and favicon-friendly document settings
- [x] Validate the rendered head, public discovery files, JSON-LD, responsive preview image behavior, and regressions (live top-of-page check confirms the canonical URL, index/follow robots directive, Open Graph title, X summary large-image card, Organization and WebSite JSON-LD, robots.txt, sitemap.xml, and manifest are all present and consistent; the managed social artwork loads locally at 1920×1080, while its absolute production-domain reference is intentionally only resolvable after publication; TypeScript and all 22 Vitest tests pass; the production build succeeds)
- [x] Save a checkpoint containing the SEO foundation (63393f67)
- [x] Deliver the SEO foundation with the new checkpoint attachment (63393f67)

## Phase 30: Motion-inspired site-wide transition refinement
- [x] Review Motion JavaScript examples and identify public-site areas that currently lack purposeful transitions (selected in-view reveal and stagger patterns for Overview, Operations, Why, Contact, and footer content; card hover lift for operational cards; the already-rich preloader, Services parallax, project pinning, button ripple, and gallery lightbox are excluded)
- [x] Add restrained staggered section entrances for Overview, Operations, Contact, and footer content (shared Motion reveal settings now give static section headings and grouped content an in-view opacity/vertical entrance with short stagger intervals)
- [x] Add polished hover and focus transitions to static content cards and contact/map interactions (operational cards now lift subtly on hover; the office map and contact surfaces use spring-like visual feedback without changing navigation or form behavior)
- [x] Preserve responsive behavior and ensure all new motion is suppressed or simplified for reduced-motion preferences (the shared Motion helper returns static initial/visible states and zero-duration transitions when reduced motion is requested)
- [x] Verify live transitions and run regressions (the post-intro desktop homepage renders normally; live Operations inspection shows the heading and four-card group remain clear after their animated entrance; the Why BT Projects heading, four principle cards, and gallery intro reach a fully opaque, readable settled state after their stagger; Contact details, map, and form remain clear on arrival, while the footer enters as a readable grouped navy content block; TypeScript passes and all 25 Vitest tests pass, including reduced-motion and stagger timing helper coverage)
- [x] Save a checkpoint containing the Motion transition refinement (c40549c8)
- [x] Deliver the Motion transition refinement with the new checkpoint attachment
- [x] Resolve the non-fatal Motion scroll-target positioning warning and re-run the transition regression suite before checkpointing (the Services scroll target now has a relative positioning context; a fresh page load has no browser-console output; TypeScript passes and all 25 Vitest tests pass)

## Phase 31: Overview bobble hover
- [x] Review the Motion bobble-hover interaction and adapt it for the four Overview feature cards (the reference springs x, y, rotation, and scale back to rest using pointer velocity; the implementation keeps the same fast-sweep-to-stronger-bobble behavior with a water-tuned spring)
- [x] Add a reduced-motion-aware spring bobble hover response for Overview feature cards (a shared pointer-velocity tracker feeds bounded x/y/rotation/squash-stretch spring impulses; mouse leave settles gracefully; touch and reduced-motion visitors retain static cards)
- [x] Add deterministic bobble transform tests and run the regression suite (TypeScript passes; 10 Vitest files and 28 tests pass, including three new bounded pointer-velocity impulse tests)
- [x] Verify desktop hover behavior and responsive/reduced-motion fallbacks (all four cards render as intended at desktop; the mobile full-page check retains a clear static one-column card stack)
- [x] Save and deliver the Overview bobble-hover enhancement (d9886e1e)

## Phase 32: Enquiry feedback and compact mobile experience
- [x] Audit the existing enquiry submission state and identify the highest-impact sources of excess mobile scroll depth (the enquiry form only used a transient toast; the natural project stack, three-up gallery, full-height service imagery, late-positioned contact form, map, and large mobile section rhythm were the primary vertical contributors)
- [x] Add a compact, accessible enquiry-success confirmation with a reduced-motion fallback (a focused inline status panel replaces the form after a successful mutation, confirms next steps, exposes a send-another-enquiry control, and uses no entrance/exit motion when reduced motion is preferred)
- [x] Rework the mobile information hierarchy and spacing so key sections remain readable with materially less vertical scrolling (mobile Projects and gallery are labelled horizontal snap rails; service/project/map images use compact landscape crops; section rhythm and cards are tightened; the enquiry form now appears before contact details and map)
- [x] Preserve accessible navigation, touch targets, form behavior, image stability, and desktop composition (mobile menu exposes expanded/controlled navigation semantics; real required/autocomplete fields remain intact; rails retain all cards and semantic list labels; desktop composition remains unchanged)
- [x] Add or update deterministic tests and run TypeScript plus the regression suite (new enquiry-feedback state utility has three Vitest cases; TypeScript passes and all 31 Vitest tests across 11 files pass; production build succeeds)
- [x] Verify the enquiry success flow and compact mobile layout in the live preview (375-pixel full-page validation shows the compact project/gallery rails, reordered contact form, and stable mobile composition; desktop hero composition remains unchanged; current diagnostics show no runtime errors)
- [x] Save and deliver the mobile-experience refinement (589df419)

## Phase 33: Correct oversized mobile visual scale
- [x] Audit the current phone layout to identify oversized typography, padding, media frames, and section rhythm (the prior mobile layout was structurally compact but still carried desktop-scale heading, card, image, and spacing proportions, producing unnecessarily tall modules)
- [x] Reduce mobile-only display scale while preserving legibility, touch targets, and the desktop composition (mobile headings, hero, section spacing, card padding, media crops, project rail width, gallery tiles, form controls, and footer rhythm are intentionally denser; Overview and Why cards now use efficient two-column phone grids while touch targets remain usable)
- [x] Verify the revised phone layout at standard mobile dimensions and run TypeScript plus regression tests (390×844 full-page inspection confirms the shorter, visibly denser reading path; 1280×720 desktop composition remains unchanged; TypeScript and all 31 Vitest tests pass)
- [x] Save and deliver the mobile scale correction (a604387b)

## Phase 34: Denser mobile information layout
- [x] Audit the remaining high-height phone modules and identify content that can be condensed without being removed (the vertically repeated Services rows remained the main contributor; the hero metric strip, card modules, map, contact form, and footer still had recoverable vertical space)
- [x] Introduce a denser mobile presentation for long-form content, service records, project records, and the footer (Services is now a labelled horizontal snap rail preserving every service record and its points; hero metrics use one concise four-column line; long copy is constrained within swipeable service records; gallery, map, contact form, operations, and footer spacing are further tightened)
- [x] Verify the resulting phone page is materially shorter while controls and core copy remain usable (390×844 full-page inspection shows the service section has collapsed from three long vertical modules to one compact swipeable module; all visible text and primary controls remain legible; TypeScript and all 31 Vitest tests pass)
- [x] Run TypeScript and regression tests, then save and deliver the compact mobile refinement (TypeScript and all 31 Vitest tests pass; checkpoint ecb280aa)

## Phase 35: Full first-viewport hero boundary
- [x] Inspect desktop and phone hero viewport boundaries to confirm where the following section appears (the prior content-height hero could end before the viewport boundary, allowing Overview to peek into the initial visual frame)
- [x] Extend the responsive hero treatment so the landing view remains a complete title page (the Hero and inner content now have 100vh/100svh minimum heights; the metric strip is pushed naturally to the title-page base)
- [x] Verify desktop and mobile first-view composition, run checks, and save the refinement (390×844 and 1280×720 inspections show only the complete navy hero through the viewport boundary—no Overview edge; TypeScript and all 31 Vitest tests pass)
- [x] Deliver the refined hero boundary (92b1ce19)

## Phase 36: Enriched enquiry form and multi-state submit control
- [x] Review the supplied Motion multi-state badge interaction and current enquiry schema, validation, and notifications (the reference transitions compact icon-and-label badge states; the existing contract only stored name, email, and freeform detail)
- [x] Add purposeful project-qualification questions and dropdowns to the enquiry form and preserve their data end-to-end (phone, organisation, service need, project stage, and site/project location now flow through validated tRPC input, a safe default-backed non-destructive database migration, database persistence, and owner notification)
- [x] Implement an accessible, reduced-motion-aware multi-state submit control for idle, submitting, success, and error feedback (the bounded badge-like submit control transitions icon and label between Send, spinner, check, and alert states; it has aria-busy and polite live status; a timed success handoff becomes immediate when reduced motion is enabled)
- [x] Add or update deterministic tests for validation and submit-state behavior (enquiry feedback utility covers idle, sending, success, and error; router coverage includes qualified payload persistence, optional fields, validation, notification resilience, and list behavior)
- [x] Verify the expanded form and all submit states on desktop and mobile (desktop inspection confirms clear two-column field grouping; 390×844 full-page inspection confirms a touch-friendly single-column form; safe client-side validation changes the button to “Try sending again” without dispatching an external enquiry; TypeScript, production build, and all 33 Vitest tests pass)
- [x] Save and deliver the enriched enquiry refinement (ad6fd10c)

## Phase 37: Precise office map coordinates
- [x] Inspect the existing map image and directions destination configuration (the previous static preview and action links were centred on an approximate coordinate pair)
- [x] Update the Contact map and directions destination to 22.581447, 88.418101 (the Contact panel now uses an interactive coordinate-based Google Maps embed; both Open in Maps and Get directions links use the exact supplied pair)
- [x] Verify the coordinate-based destination and responsive presentation (the interactive map visibly loads in the live Contact section with an office marker; live DOM inspection confirms both outbound map links encode 22.581447,88.418101; TypeScript and all 33 Vitest tests pass)
- [x] Save and deliver the precise map-coordinate update (042012ad)

## Phase 38: Remove Services image ripple circles
- [x] Inspect the Services image markup and associated decorative overlay styles (the effect was a separate animated depth layer using a repeating radial-gradient overlay above each image)
- [x] Remove the ripple-circle treatment from all Services images without affecting the images or responsive layout (the overlay element, its scroll transforms, and its stylesheet block are removed; the three image frames and existing parallax crop motion remain)
- [x] Verify the refined Services section and run checks (live DOM validation finds three Services images and zero ripple-overlay elements; TypeScript and all 33 Vitest tests pass)
- [x] Save and deliver the Services imagery refinement (97fc1615)

## Phase 39: Hero iOS pointer interaction
- [x] Review the supplied Motion iOS pointer reference and the existing hero CTA markup (the reference combines a compact custom pointer cue with restrained magnetic pull; the hero has exactly two primary CTA anchors)
- [x] Add the iOS-inspired pointer effect to only the two hero CTA buttons, with touch and reduced-motion fallbacks (a custom magnetic-anchor component adds a dark circular cue, bounded pointer pull, and spring-like settle to Explore services and Talk to our engineers only; the behavior is inactive on coarse pointers and reduced-motion environments)
- [x] Add deterministic interaction coverage and verify the hero on desktop and mobile (three pure geometry tests cover centring, clamping, and cue placement; live desktop inspection confirms two scoped cues, a visible local pointer cue, and an active bounded CTA transform; mobile keeps native touch controls static; TypeScript and all 36 Vitest tests pass)
- [x] Save and deliver the hero iOS-pointer refinement (370f918c)

## Phase 40: Top navigation iOS pointer scope
- [x] Inspect the header navigation markup and remove the interaction from the two hero CTAs (the prior interaction was isolated to the two hero CTA component calls; the header contains the seven intended primary navigation targets)
- [x] Apply the iOS-style pointer interaction only to Overview, Services, Operations, Projects, Why BT, Contact, and Enquire in the desktop top bar (all seven desktop top-bar anchors now use the magnetic-pointer wrapper; hero CTA wrappers and their unused imports are removed)
- [x] Verify desktop navigation interaction and mobile/reduced-motion fallbacks (live DOM inspection reports seven navigation targets, seven local cues, and zero hero pointer targets; hovering Overview shows the pointer cue and bounded pull; 390×844 inspection retains the standard compact hamburger navigation; TypeScript and all 36 Vitest tests pass)
- [x] Save and deliver the corrected top-navigation pointer scope (10c19716)

## Phase 41: Navigation custom-pointer cursor suppression
- [x] Inspect the current desktop navigation pointer cursor rules (the prior desktop media query hid the native cursor for every top-navigation target before the custom cue had appeared)
- [x] Hide the native cursor only while a custom iOS pointer cue is active on desktop top-navigation items (the pointer wrapper now receives an explicit active class; the fine-pointer, no-reduced-motion CSS rule applies `cursor: none` to the wrapper and descendants only while that class is present)
- [x] Verify the custom cue remains visible and mobile/reduced-motion controls remain unchanged (live pointer-over activation confirms the active class, visible cue opacity, and computed `cursor: none` on wrapper and label; existing media constraints retain native mobile and reduced-motion behavior; TypeScript and all 36 Vitest tests pass)
- [x] Save and deliver the navigation cursor refinement (42d6ce2d)

## Phase 42: Meet the Team card stack
- [x] Review the supplied Motion card-stack reference and confirm placement between the Why gallery and Contact section (the reference keeps a legible active card above a partially visible stack; Home now inserts Meet the Team exactly after Why and before Contact)
- [x] Create an editable, role-led Meet the Team section without fabricating team identities or credentials (the three cards describe Technical coordination, Reliable routines, and Client partnership workstreams rather than unsupported employee names, photos, titles, or biographies)
- [x] Add an accessible, reduced-motion-aware card-stack interaction with desktop and mobile fallbacks (previous/next controls, keyboard arrow navigation, drag/swipe direction detection, live status, and reduced-motion static transitions are supported; mobile presents the current card with compact stacked depth)
- [x] Add deterministic interaction tests and verify placement, responsive behavior, and visual balance (three pure navigation/drag-direction tests pass; desktop inspection confirms requested placement, visible controls, and a successful 1/3 → 2/3 transition; 390×844 full-page inspection confirms a readable compact Team card before Contact; TypeScript and all 39 Vitest tests pass)
- [x] Save and deliver the Meet the Team addition (8d887be2)

## Phase 43: Active navigation and sample team profiles
- [x] Inspect header navigation anchors, section boundaries, and existing team-card data model
- [x] Prepare generic, clearly marked sample profile portraits for layout evaluation
- [x] Add active-section highlighting for desktop and mobile navigation without disrupting current pointer behavior
- [x] Update the team cards with sample names and placeholder portraits, clearly distinguishable from production staff content
- [x] Add deterministic selection tests for active-section state
- [x] Verify desktop/mobile visual and interaction states (desktop Team anchor shows the active Team link and three clearly marked sample-profile cards; compact 390px full-page inspection confirms the profile card remains legible before Contact; TypeScript, production build, and all 42 Vitest tests pass)
- [x] Save and deliver the navigation and team-profile enhancement (checkpoint 8932c921)
