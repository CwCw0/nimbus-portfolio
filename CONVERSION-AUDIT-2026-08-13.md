# Conversion Audit — nimbus-portfolio · 2026-08-13

Impeccable-framework audit, 5 dimensions, every finding adversarially verified (responsive verifier crashed; its 5 findings are evidence-backed but unverified).
Score: **10.5/20 — Acceptable band: significant work needed.** 51 confirmed findings.

| Dimension | Score | Confirmed |
|---|---|---|
| PERFORMANCE | 2/4 | 6 |
| Accessibility | 2/4 | 10 |
| Conversion / Buyer Journey | 2/4 | 12 |
| Anti-patterns + Copy/Trust (impeccable dimension 5 + copy quality) | 2/4 | 18 |
| Responsive / Mobile (390x844 iPhone, 768x1024 tablet) | 2.5/4 | 5 |
| **Total** | **10.5/20** | |

## PERFORMANCE — 2/4

### [P1] Entire page body bails out to client-side rendering — SSR defeated on every route
- **Where:** src/components/ClientShell.tsx:6-8,25 (SmoothScroll = dynamic(..., { ssr: false }) wrapping {children}); src/app/layout.tsx:182-188 (Nav/main/Footer all inside ClientShell)
- **Impact:** Every page — including the conversion-critical deep links /work/88bh and /work/forge — ships as an empty dark shell. Nothing paints until all critical JS (~376KB gz across 25 chunks, including gsap+ScrollTrigger+Lenis which sit inside the very dynamic chunk that gates children rendering) downloads, parses, and client-renders. Measured on Fast3G+4xCPU: TTFB 3ms but FCP 2,000ms, LCP 2,420ms (h1) / 2,824ms (hero image); worse on real 4G with cold cache. The hero image's priority preload is also lost because Next cannot emit <link rel=preload as=image> for a tree that never SSRs. Any JS failure (blocked chunk, extension, flaky network) leaves a permanently black page — borderline P0. This single wrapper voids the framework's main performance feature on a proof site whose whole job is surviving one deep-link click from a skeptical buyer.
- **Fix:** Stop wrapping children in an ssr:false dynamic. Render {children} directly in ClientShell and convert SmoothScroll into a null-rendering effect component (it only instantiates Lenis and wires the ticker — it never needed to own the children): `<><LenisMount /><PageLoader />...{children}</>`. LenisMount can stay dynamic/ssr:false since it renders null. This one structural change restores full SSR/SSG output, re-enables the hero image preload, and moves gsap/Lenis off the first-paint critical path.
- **Verifier:** Fully reproduced. ClientShell.tsx:6-8,25 wraps {children} in dynamic(ssr:false); layout.tsx:182-188 puts Nav/main/Footer inside it. Served /work/88bh HTML contains 4 BAILOUT_TO_CLIENT_SIDE_RENDERING templates, only 749B of body markup, zero <h1>/<main>, and no <link rel=preload as=image> despite pri

### [P1] PageLoader branding intro covers deep-linked case pages for ~2s on every first visit (desktop) with scroll locked
- **Where:** src/components/PageLoader.tsx:24-29 (fires on ANY route when sessionStorage 'nfs-intro-v10' absent), :56 (document.body.style.overflow = 'hidden'); mounted globally in src/components/ClientShell.tsx:22
- **Impact:** The primary buyer per PRODUCT.md arrives on /work/forge or /work/88bh — never the homepage — and on first visit gets a ~2s full-screen NIMBUS branding animation with scrolling disabled before any proof is visible. On slow connections it stacks on top of the CSR wait (finding 1): JS arrives ~2s, then the intro plays another ~1.9s — roughly 4s to readable proof. This is a deliberate delay inserted exactly at the conversion moment.
- **Fix:** Restrict the intro to path === '/' (or remove it entirely); at minimum bail out when location.pathname starts with /work/. The sessionStorage guard already exists — add a route guard next to the isMobile check in the first useEffect.
- **Verifier:** Reproduced. PageLoader.tsx:24-29 has only an isMobile + sessionStorage guard, no route guard; :56 sets body overflow:hidden. Playwright first-visit timeline on /work/88bh at 1440x900: overlay present with scroll locked from t=327ms through t=1904ms, gone by t=2304ms; screenshot at 700ms shows the fu

### [P2] Render-blocking third-party Fontshare stylesheet on the critical path
- **Where:** src/app/layout.tsx:95-98 (<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700&f[]=switzer@400,500&f[]=fragment-mono@400...">)
- **Impact:** First render waits on a cross-origin CSS round trip (DNS+TLS+RTT to api.fontshare.com) before styles resolve; at 150ms RTT that is ~450-600ms of added blocking, plus 3 runtime font fetches (~21KB each) from cdn.fontshare.com. Currently masked by the CSR bailout — it becomes the next FCP bottleneck the moment SSR is restored. Also an availability coupling: if Fontshare is slow, the whole site's first paint is slow.
- **Fix:** Self-host the three Fontshare families via next/font/local exactly as Newsreader already is (layout.tsx:9-14 — self-hosted, preloaded, zero third-party requests). Fontshare's license permits self-hosting; this removes both third-party round trips and the render-blocking external stylesheet.
- **Verifier:** Reproduced. Plain <link rel=stylesheet> to api.fontshare.com is in the served <head> (layout.tsx:95-98); network capture on /work/88bh shows the cross-origin CSS (1.79KB) plus cdn.fontshare.com woff2 fetches. Minor evidence variance: I observed 2 woff2 (~40KB) on this page, not 3 (~63KB) — does not 

### [P2] AmbientWaves canvas + Lenis/GSAP ticker burn ~23% of a CPU core continuously while the page is idle
- **Where:** src/components/AmbientWaves.tsx:117-172 (unconditional requestAnimationFrame loop drawing 18 polylines x 100 segments per frame, full-viewport fixed canvas on every route via ClientShell.tsx:23); src/components/SmoothScroll.tsx:43 (gsap.ticker runs Lenis every frame regardless of scroll activity)
- **Impact:** A buyer reading a long case study at a desk — the exact DESIGN.md scene — pays constant CPU/battery cost for a background effect at 0.03-0.15 alpha. On low-end laptops this competes with scroll/decode work; on battery it means fan noise and drain during a 3-5 minute read. The loop never idles: rAF only pauses on hidden tabs, not when the user stops interacting.
- **Fix:** Half-rate the wave loop (render every 2nd frame — visually indistinguishable for a slow ambient drift), and pause it entirely after ~5s without scroll/pointer events, resuming on interaction. Optionally reduce lineCount on case-study routes where screenshots, not ambience, carry the page.
- **Verifier:** Reproduced with slightly lower magnitude. Unconditional rAF loop at AmbientWaves.tsx:117-172,202 (18 polylines x 100 segments/frame) plus always-on gsap.ticker->lenis.raf at SmoothScroll.tsx:43. CDP Performance.getMetrics over 5 idle seconds on /work/88bh desktop 1440x900: TaskDuration 0.188s/s vs 0

### [P3] Case-study hero image sizes="100vw" overfetches on wide screens
- **Where:** src/app/work/[slug]/CaseStudyContent.tsx:186-189 (fill + sizes="100vw" + priority) vs .container max-width 1640px minus clamp(20px,4vw,56px) padding (src/app/globals.css:117-118,188-192)
- **Impact:** On >=1920px screens the optimizer selects the w=1920 rendition although the rendered box caps at ~1528px — wasted bytes on the LCP image. Low stakes because AVIF output is small (25KB at w=1440), but it is the one image where every KB delays LCP.
- **Fix:** Use sizes="(max-width: 1640px) 100vw, 1528px" on the hero Image (and the legacy-format hero at CaseStudyContent.tsx:659-668).
- **Verifier:** Reproduced. sizes="100vw" + fill + priority at both hero Image sites in CaseStudyContent.tsx (~186-189 and ~658-668); .container caps at 1640px minus 2x clamp(20px,4vw,56px) padding (globals.css:117-118,188-192), so the box renders <=1528px. Measured: 1920px viewport requests w=1920 (36.7KB AVIF) wh

### [P3] Custom cursor performs a synchronous document.elementFromPoint hit test on every mousemove
- **Where:** src/components/ui/Cursor.tsx:31 (const target = document.elementFromPoint(e.clientX, e.clientY) inside the mousemove handler, plus target.closest() at :32)
- **Impact:** Runs at pointer-event frequency (120Hz+ on high-refresh displays); each call forces a hit test and can flush pending layout. No jank surfaced in the 4x-CPU scroll probe on this hardware, but it is continuous unnecessary main-thread work layered on top of the AmbientWaves loop on weaker machines.
- **Fix:** Replace per-move hit testing with delegated pointerover/pointerout listeners that toggle the hovering class when the event target matches the HOVER_SELECTORS — zero work during pure movement.
- **Verifier:** Code reproduced exactly at Cursor.tsx:31-32 (elementFromPoint + closest inside the mousemove handler, desktop only, passive listener). Quantified in the live page: 24.8us per hit-test call, i.e. ~0.3% of a core at 120Hz pointer rate — real continuous work but negligible measured impact, consistent w

**Working well:** Image pipeline is exemplary: every case-study screenshot goes through /_next/image and lands as AVIF at the correct widt · HTML documents are lean (17-23KB across all 9 key routes) with ~1-4ms TTFB from the production server; /images and /_nex · Layout stability is essentially perfect: CLS 0.0003 on both / and /work/88bh — aspect-ratio boxes reserve all image spac · Commit 6503c3d's code-splitting held at the route level: all audited *PageContent components (work, about, contact, serv

## Accessibility — 2/4

### [P0] Contact form fields have no accessible name (all 5 fields)
- **Where:** src/app/contact/ContactPageContent.tsx:237-307 (pattern defined in src/app/globals.css:745-831 .float-field)
- **Impact:** The single conversion action of the site is a form whose Name, Email, Project type, Budget, and Details fields are announced as bare 'edit text' / 'combobox' with no label. A screen-reader buyer cannot complete the form reliably; voice-control users cannot target fields by name. WCAG 1.3.1, 3.3.2, 4.1.2 failures on the conversion-critical path.
- **Fix:** Give each input/select/textarea an id and add htmlFor on its label (the CSS sibling selector `input:focus ~ label` keeps working — the label just needs the for attribute). Also add autocomplete="name" / autocomplete="email" on the first two fields.
- **Verifier:** Reproduced in code (src/app/contact/ContactPageContent.tsx:237-307: no id/aria-label/aria-labelledby on any field; labels lack htmlFor and do not wrap controls) and rendered (Playwright aria snapshot of #contact-form at 1440x900: bare 'textbox' / 'combobox' nodes with '01Name' etc. as detached text)

### [P1] Form errors are never announced and focus is destroyed on submit failure
- **Where:** src/app/contact/ContactPageContent.tsx:44-57 (validation), :311-333 (submit button)
- **Impact:** On any failure (invalid email like 'a@b' which passes native validation but fails the regex, or a Formspree error) the only feedback is the submit button's text changing while the button simultaneously becomes disabled — which drops keyboard focus to <body>. Screen readers hear nothing; the message auto-clears after 4s; the error never says which field failed. WCAG 3.3.1, 4.1.3. Same silence applies to the success state.
- **Fix:** Add a visually-styled `<p role="status" aria-live="polite">` (or role="alert" for errors) near the button that receives the error/success text and persists until the next attempt; keep the button enabled in the error state; set aria-invalid and a specific message on the failing field.
- **Verifier:** Reproduced exactly: filled form with email 'a@b' (passes native type=email, fails the regex at line 45), pressed Enter on submit → {btnText:'Something went wrong. Try again', btnDisabled:true, liveRegions:0, ariaInvalid:0, activeEl:'BODY'}; message auto-cleared after ~4s (setTimeout at lines 47/55/6

### [P1] Skip link does nothing when Lenis smooth scroll is active (default desktop experience)
- **Where:** src/components/SmoothScroll.tsx:47-62 (anchor intercept) + src/app/layout.tsx:175-180 (skip link)
- **Impact:** The 'Skip to content' link exists and is the first tab stop, but pressing Enter on it calls preventDefault and lenis.scrollTo without moving focus — the next Tab returns to the nav brand, so keyboard users must always tab through all 9 nav stops on every page. The bypass-blocks mechanism (WCAG 2.4.1) is present but non-functional for the primary desktop buyer; it only works when prefers-reduced-motion is on or viewport <769px (Lenis disabled).
- **Fix:** In handleAnchorClick, after lenis.scrollTo, call `(el as HTMLElement).focus({ preventScroll: true })` with tabIndex=-1 on the target (or exclude the skip link from the intercept entirely and give #main-content tabindex="-1").
- **Verifier:** Reproduced at 1440x900 on /work: window.__lenis active; Tab → skip link at 16,16; Enter → activeElement remains A.sr-only, scrollY 0; next Tab → nav brand 'Nimbus Forma Studio — Home', then 8 visible nav stops before content. Control run with reducedMotion:'reduce' (Lenis disabled): next Tab after E

### [P1] Keyboard focus lands on invisible 'Start a project' links inside collapsed accordions on /services
- **Where:** src/app/services/ServicesPageContent.tsx:207-208 (link), :110-117 (0fr grid collapse)
- **Impact:** Tabbing from a collapsed service row's header moves focus to the CTA link hidden inside the collapsed panel (clipped by a zero-height overflow-hidden ancestor). Focus visibly disappears for a stop, and pressing Enter navigates from a control the user cannot see. WCAG 2.4.3 (focus order) / 2.4.7 (focus visible).
- **Fix:** When a panel is collapsed, make it unfocusable: add `visibility: hidden` (it transitions cleanly with grid-template-rows) or `inert` on the panel wrapper when !isOpen. Apply the same guard to the homepage services accordion and contact FAQ for consistency.
- **Verifier:** Reproduced at 1440x900: focused collapsed button '02 AI Knowledge Assistant' (aria-expanded=false), pressed Tab → focus on A 'Start a project →', tabIndex 0, offsetHeight 54, clipped by a zero-height overflow-hidden ancestor inside the grid-template-rows:0fr row (ServicesPageContent.tsx:110-117, lin

### [P2] Mobile nav drawer: no Escape, no focus trap, background content reachable behind opaque overlay
- **Where:** src/components/Nav.tsx:186-215 (drawer), :172-180 (burger)
- **Impact:** With the full-screen drawer open at 390x844, Escape does not close it, and after the drawer's 6 links, Tab moves into the page content hidden behind the opaque overlay ('See the work', accordion buttons...) — keyboard/switch users on the secondary Instagram-SME audience get lost in invisible content. WCAG 2.4.3; expected dialog semantics (role, focus containment) absent.
- **Fix:** On open: add a keydown listener for Escape → setMobileOpen(false), move focus to the first drawer link, and mark the page content inert (or trap Tab within the drawer). On close, return focus to the burger. Optionally role="dialog" aria-modal="true".
- **Verifier:** Reproduced at 390x844: after tapping .nav-burger the drawer is a fixed opaque full-viewport layer (rgb(10,10,15), 390x844, z-index 99, no role/aria-modal — Nav.tsx:186-215); Escape → still open (true; no keydown handler anywhere in Nav.tsx); Tab walk from burger: 6 stops inDrawer=true, then 'See the

### [P2] Primary entry pages /work/88bh and /work/forge have no headings below the h1
- **Where:** src/app/work/[slug]/CaseStudyContent.tsx:219-221, 249-251, 351-353 (section labels rendered as <span className="mono">)
- **Impact:** The two deep-linked pages the Upwork buyer actually lands on expose a heading outline of exactly one h1. 'THE STORY', 'THE SYSTEM, ON SCREEN', 'WHAT'S ACTUALLY UNDER IT' are styled spans, so screen-reader users cannot skim the case study by heading — on a long proof page whose whole job is skimmable credibility. WCAG 1.3.1 (info and relationships).
- **Fix:** Render each section label as `<h2 className="mono">` (identical visual output; the .mono class carries all styling). Do the same for the /contact FAQ section head.
- **Verifier:** Reproduced by heading crawl: /work/88bh → ['H1: 88 Badminton House'] only; /work/forge → ['H1: Forge'] only, while 'THE STORY', 'THE SYSTEM, ON SCREEN', 'WHAT'S ACTUALLY UNDER IT' render as span.mono (CaseStudyContent.tsx:219-221, 249-251, 351-353). Contrast /services: h1 + 3 h2 + 3 h3 (finding said

### [P2] Collapsed accordion/FAQ content stays in the accessibility tree, contradicting aria-expanded=false
- **Where:** src/app/contact/ContactPageContent.tsx:462-481 (FAQ panel), same 0fr pattern in ServicesPageContent.tsx:110-117 and components/sections/Services.tsx:134-140
- **Impact:** Collapsed answers are clipped visually but remain fully exposed to screen readers (not display:none/visibility:hidden/aria-hidden), so a SR user reading the /contact page linearly hears every 'collapsed' FAQ answer while the button reports collapsed — state and content disagree, and the page reads far longer than it looks.
- **Fix:** Same fix as the focusable variant: toggle visibility:hidden or inert on the collapsed panel (transitions with the 0fr grid trick are preserved if visibility transition duration matches).
- **Verifier:** Reproduced on /contact at 1440x900 with all FAQs collapsed: last answer <p> has offsetHeight 111 (matches finding exactly), computed visibility 'visible', display 'block', no aria-hidden or display:none ancestor — only clipped by the 0fr grid row's overflow:hidden (ContactPageContent.tsx:462-481; sa

### [P3] Accordion buttons lack aria-controls / panel ids; FAQ '+' glyph is announced
- **Where:** src/app/contact/ContactPageContent.tsx:429-461, src/app/services/ServicesPageContent.tsx:59-107, src/components/sections/Services.tsx:57-131
- **Impact:** aria-expanded is present (good) but without aria-controls SRs can't jump to the panel; the decorative rotating '+' is read as 'plus' after every question.
- **Fix:** Add id to each panel + aria-controls on its button; add aria-hidden="true" to the +/– glyph spans.
- **Verifier:** Reproduced: /contact has 8 buttons with aria-expanded (7 FAQ + nav burger), 0 with aria-controls; no panel ids exist. All 7 '+' glyph spans have aria-hidden=null (ContactPageContent.tsx:447-460; same in ServicesPageContent.tsx:95-106). P3 correct — aria-expanded is present so state is conveyed; this

### [P3] New-tab links give no indication; internal /contact link in footer opens a new tab
- **Where:** src/components/Footer.tsx:110-121 (Elsewhere list), src/app/work/[slug]/CaseStudyContent.tsx:278-286 (proof tiles)
- **Impact:** Footer maps the internal 'Send a project brief' (/contact) through target=_blank with the ↗ marked aria-hidden, so SR users get an unannounced context switch; proof-grid tiles open raw images in new tabs (their aria-label at least says 'open full size').
- **Fix:** Drop target=_blank for the internal /contact link; append visually-hidden '(opens in new tab)' text or include it in aria-labels for genuine external links.
- **Verifier:** Reproduced rendered and in code: ELSEWHERE_LINKS (Footer.tsx:21-24) includes {href:'/contact', label:'Send a project brief'} and the map at Footer.tsx:110-121 applies target=_blank + rel to every entry, so the internal /contact link opens a new tab with the ↗ marked aria-hidden. Proof tiles (CaseStu

### [P3] Native cursor suppressed sitewide on desktop with no opt-out
- **Where:** src/app/globals.css:514-519 (body.cursor-ready * { cursor: none }), src/components/ui/Cursor.tsx:23
- **Impact:** Users ≥900px lose the OS cursor (including any user-enlarged/high-contrast pointer) in favor of a 14px violet triangle; low-vision pointer users can lose track of it. Not a WCAG failure but a real low-vision friction on a proof-reading site.
- **Fix:** Respect prefers-reduced-motion (Cursor.tsx currently checks only width) and/or keep cursor:auto while overlaying the custom pointer, or gate behind a media query like (any-pointer:fine) plus a persistence-free fallback if mousemove stops.
- **Verifier:** Reproduced: at 1440x900, body.cursor-ready set and computed cursor is 'none' on body and links with the custom dot visible (globals.css:514-519 — line numbers verified exact); at 800px width normal cursor. Also verified the 'no guard' claim: with prefers-reduced-motion emulated at 1440px, cursor is 

**Working well:** Global focus indicator is real and verified: `*:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px }` · Token palette passes WCAG AA across the board (computed): --fg #F5F0E6 on #0A0A0F = 17.39:1, --fg-dim #948BBC = 6.28:1 ( · Reduced-motion coverage is genuinely thorough: global CSS kill switch (globals.css:615-624) plus explicit prefers-reduce · Alt text on the case-study proof images — the content that carries the conversion — is specific and information-bearing,

## Conversion / Buyer Journey — 2/4

### [P0] Funnel ends at the wrong next step: zero Upwork routing, every CTA pushes off-platform contact
- **Where:** src/data/caseStudies/forge.ts:70-71, src/data/caseStudies/88bh.ts:74-75, src/components/Footer.tsx:70-74, nav 'Let's talk' → /contact (verified rendered on /work/forge and /work/88bh at 1440x900)
- **Impact:** PRODUCT.md locks the spec: 'CTAs funnel INTO Upwork listings' and 'No contact info / off-platform solicitation on any page linked from Upwork (policy risk).' The primary buyer must transact on Upwork, but the case-study closing CTA ('Start with a build plan' → /contact), the nav CTA, and the footer CTA all route to an off-platform form with a Gmail address one click from the Upwork-linked page. The buyer's actual conversion action — return to the Upwork thread and accept — is never named anywhere, so the page ends without the right step; and funneling Upwork-sourced buyers off-platform is circumvention exposure that can suspend the account and kill the whole deal channel.
- **Fix:** On /work/forge and /work/88bh, make the closing CTA dual-path: primary 'Reply in our Upwork thread' / link to the Upwork profile-catalog listing (policy-safe: linking INTO Upwork), secondary 'Or send a project brief' → /contact for non-Upwork visitors. Remove the visible email from any page one click off an Upwork-linked page.
- **Verifier:** Fully reproduced. grep 'upwork' over src exits with no matches. Rendered /work/forge link inventory: nav 'Let's talk' (Nav.tsx:166), closing CTA 'Start with a build plan' y=4166 (forge.ts:69-70, 88bh.ts:74-75), and footer CTA y=5109 (Footer.tsx:70-75) all route to /contact, which renders heyitsnimbu

### [P1] RM price line on /work/88bh — the USD buyer's entry page quotes ringgit
- **Where:** src/data/caseStudies/88bh.ts:73, rendered at /work/88bh closing section (screenshot 88bh-closing.png, 1440x900)
- **Impact:** 'Projects like this start from RM 20,000.' is the only price on the page Upwork proposals deep-link. PRODUCT.md hard rule: 'USD prices on the site matching the live Upwork catalog exactly; RM quarantined to /malaysia.' A US/EU buyer either misreads RM 20,000 as out of their $2,000-10,000 range or concludes the page isn't speaking to them — at the exact moment the page has finished convincing them.
- **Fix:** Change the priceLine to USD matching the live Upwork catalog ('Projects like this start from $4,000' or whatever the catalog says), or drop the line and let /services carry price anchoring.
- **Verifier:** Reproduced in source (88bh.ts:73) and rendered ('Projects like this start from RM 20,000.' directly above the closing CTA; screenshot 88bh-closing.png). Direct violation of PRODUCT.md:31-32 RM quarantine on a primary deep-link entry page at the decision moment.

### [P1] /malaysia does not exist (404) — the secondary funnel has no destination and RM has no quarantine zone
- **Where:** http://localhost:3009/malaysia → 404; no src/app/malaysia route exists
- **Impact:** PRODUCT.md defines the secondary audience as 'Malaysian SME owner from Instagram (@_bynimbus_), lands on /malaysia for RM pricing' and quarantines all RM there. The page 404s, so the Instagram → site funnel dead-ends, and RM pricing instead leaks onto /services, /contact, and /work/88bh — the exact pages the USD buyer reads.
- **Fix:** Either build /malaysia (RM pricing, FPX/PDPA/WhatsApp copy, the 'Malaysian context' differentiator block) and move every RM figure there, or update PRODUCT.md and route Instagram bio links elsewhere. Until it exists, strip RM from the shared pages.
- **Verifier:** curl http://localhost:3009/malaysia returns 404; no malaysia route under src/app. PRODUCT.md:14 defines it as the secondary audience's landing page. RM leakage confirmed rendered on /services and /contact (services.ts:61,81) and /work/88bh (88bh.ts:73). Dead-ends a spec-defined funnel and causes the

### [P1] 'Next project: Omnifood' — one click from Forge lands the skeptical buyer on a famous course project dressed with decorative stat boxes
- **Where:** src/data/caseStudies/index.ts:17 (ordering), src/data/caseStudies/omnifood.ts:8-12 and 46-51; rendered 'NEXT PROJECT Omnifood' on /work/forge at y=4357
- **Impact:** PRODUCT.md: buyer is 'technical enough to smell invented metrics'; anti-references ban 'invented 98/100 style stats'. Omnifood is the widely recognized Udemy course build; its page claims 'closed the tutorials... No hand-holding, no step-by-step guide' and shows a results grid of non-metrics ('100% Responsive', '0 JS Dependencies', '7 Conversion Sections', '<1s Load Time') — the legacy stat-box layout the 2026-08 spec eliminated. A buyer who recognizes it (or googles it) rereads everything they just believed on the Forge page as potential spin.
- **Fix:** Remove Omnifood from allCaseStudies (or at minimum from the prev/next chain of the two proof pages) so forge/88bh cycle only between each other; if kept anywhere, reframe honestly ('course brief, my implementation') and delete the results grid.
- **Verifier:** Reproduced end to end: index.ts:17 ordering makes getNextProject('forge') return omnifood; 'NEXT PROJECT Omnifood' rendered at y=4357 on /work/forge; /work/omnifood renders the legacy results grid (omnifood.ts:46-51 via CaseStudyContent.tsx:909-933 — '100% Responsive', '0 JS Dependencies', '7 Conver

### [P1] Contradictory price floors and mixed currencies on /services and /contact
- **Where:** src/data/services.ts:15,30,45 ('From $2,000', 'From $1,500' x2) vs services.ts:61 FAQ ('starts at RM 18,000... RM 20,000 and RM 40,000'), both rendered on /services; FAQ also renders on /contact below a USD-only budget select (ContactPageContent.tsx:26-31, 425-485)
- **Impact:** The same page tells the buyer a database-backed dashboard starts at $2,000 while the FAQ two scrolls down says a business system 'starts at RM 18,000' (~$4,300) and 'usually lands RM 20,000-40,000'. On /contact the buyer picks a USD budget in the form, then reads RM answers in the FAQ underneath. A skeptical buyer cannot tell which floor applies to them; mixed currency reads as two different businesses and violates the 'never both in one eyeline' rule.
- **Fix:** Make services/contact FAQ answers USD-only (matching the Upwork catalog), move the RM answer set to /malaysia, and reconcile the $2,000 entry point with the RM 18k system floor by naming scopes explicitly (e.g. 'single-module dashboard from $2,000; full multi-module system from $4,000').
- **Verifier:** Reproduced rendered on both pages: /services shows 'From $2,000' (services.ts:15) and two 'From $1,500' (services.ts:30,45) with the FAQ's 'starts at RM 18,000... between RM 20,000 and RM 40,000' (services.ts:61) and 'RM 800/month' (services.ts:81) on the same page; /contact renders the identical FA

### [P2] Homepage proof cards are ~4 viewports below the fold at both test sizes
- **Where:** / (rendered): 'Read case study' links at y=3702 (88bh) and y=4286 (forge) at 1440x900; y=3436 and y=3972 at 1280x800; fold screenshots home-fold-1440x900.png, home-fold-1280x800.png
- **Impact:** The first viewport is headline-only ('I build the AI-powered system that runs your operation.' + availability ticker). It answers 'what does he build' but shows zero proof; the identity line (DEE — SOLO BUILDER... SSM) and the two case cards sit 1-4 screens down, with the full services section interposed before any proof. The audit question 'are the two proof cards above the fold' fails at both viewports; homepage → case study requires committed scrolling past sell-copy before any evidence.
- **Fix:** Move the two proof cards (or compact versions with screenshot thumbnails and status chips) directly under the hero, above the services section — proof before pitch, matching the site's own 'proof annex' mandate.
- **Verifier:** Measured: 'Read case study' links at y=3702/4286 (1440x900) and y=3436/3972 (1280x800); fold capture shows only nav, availability line, and headline (home-fold-1440x900.png, home-fold-1280x800.png). Services section interposes before any proof. P2 correctly calibrated since PRODUCT.md:12-13 says the

### [P2] Process promises 'one 30-minute call' while the contact page promises 'No call required' twice
- **Where:** src/app/services/ServicesPageContent.tsx (rendered: '48HR TURNAROUND · 1 CALL · NO QUESTIONNAIRE... We do one 30-minute call') vs /contact pitch card and 'How it works' list (ContactPageContent.tsx:140-141, 357) and services.ts:61 FAQ ('No call required')
- **Impact:** The async-friendly promise (a differentiator for a call-averse buyer, and Dee sells async by design) is directly contradicted on the services page the buyer reads between case study and contact. Small, but this buyer is auditing consistency.
- **Fix:** Align on the async framing everywhere: '5 questions by message, one optional 30-minute call if you want it, written build plan in 48 hours.'
- **Verifier:** Reproduced rendered: /services shows 'We do one 30-minute call' and '48HR TURNAROUND · 1 CALL · NO QUESTIONNAIRE' (process.ts:11-13, uppercased by CSS); /contact renders 'No call required' three times (ContactPageContent.tsx:140-141, 357, plus the FAQ). The shared FAQ also makes /services contradict

### [P2] /services header says 'Five things · done properly' above exactly three service blocks; dek promises 'Websites' with no websites block
- **Where:** src/app/services/ServicesPageContent.tsx:51; dek 'Websites, business tools, AI systems, and internal operations' rendered above services from src/data/services.ts (3 entries)
- **Impact:** Stale copy from an earlier five-service version. On a page whose pitch is rigor and 'no vague proposals', a count that doesn't match the page is exactly the sloppiness the skeptical buyer is hunting for. The homepage's own label says 'Three things · done properly', contradicting /services.
- **Fix:** Change to 'Three things · done properly' and rewrite the dek to name only the three offers (dashboards, AI assistants, automation).
- **Verifier:** Reproduced: ServicesPageContent.tsx:51 hardcodes the label, rendered as 'FIVE THINGS · DONE PROPERLY' above the 3 services exported by services.ts; dek at ServicesPageContent.tsx:38 names 'Websites' with no website offer; homepage renders the contradicting 'Three things · done properly' (sections/Se

### [P2] Trust gap: Gmail contact address and no photo of the builder anywhere
- **Where:** src/app/contact/ContactPageContent.tsx:13 (heyitsnimbus@gmail.com); /about avatar renders a letter 'D' placeholder (rendered about text: 'D / Dee / Founder')
- **Impact:** The one conversion job is proving Dee is real. The site carries SSM number, GitHub, coordinates, and a verifiable career history — then presents a hobbyist Gmail next to the form, and the About page's 'builder behind Nimbus' has no face, just an initial. For a buyer about to send $2,000-10,000 to a zero-review freelancer, a branded-domain email and one real photo are among the cheapest remaining trust wins.
- **Fix:** Move mail to a nimbusformastudio.com address; add one real photo (or a workspace shot) to /about. Keep the email off Upwork-linked pages entirely per the P0 fix.
- **Verifier:** Reproduced: heyitsnimbus@gmail.com rendered on /contact (ContactPageContent.tsx:13); /about renders zero <img> elements (verified via DOM query) and a single-letter 'D' avatar div next to 'Dee / Founder, Nimbus Forma Studio' (AboutPageContent.tsx ~160-190).

### [P3] Contact metadata promises 24-hour response; the page itself promises 48-hour build plan
- **Where:** src/app/contact/page.tsx:7 ('Get in touch within 24 hours') vs rendered pitch card and 'How it works' ('build plan within 48 hours')
- **Impact:** The Google/preview snippet sets a 24h expectation the page immediately doubles. Minor expectation mismatch on the conversion page.
- **Fix:** Make the meta description match the on-page 48h build-plan promise.
- **Verifier:** Reproduced: src/app/contact/page.tsx:7 meta description says 'Get in touch within 24 hours' while the rendered page says '48 hours' in the pitch card, 'How it works', and FAQ.

### [P3] Hardcoded scarcity line goes stale in 7 weeks
- **Where:** src/components/sections/Hero.tsx:28 ('Currently accepting 1 new project for Q3 2026')
- **Impact:** Today is 2026-08-13; on Oct 1 the homepage's first trust signal becomes provably stale, and stale scarcity reads as fake scarcity to exactly this buyer.
- **Fix:** Compute the quarter from the date, or strip the quarter ('Currently accepting 1 new project').
- **Verifier:** Reproduced: Hero.tsx:28 hardcodes 'Currently accepting 1 new project for Q3 2026', rendered in the fold capture. Accurate today (2026-08-13) but provably stale from Oct 1. P3 correct for a future-staleness issue.

### [P3] Footer 'Elsewhere' opens internal /contact in a new tab styled as an external link
- **Where:** src/components/Footer.tsx:21-24 and 110-121 (ELSEWHERE_LINKS renders every entry with target=_blank + ↗, including internal '/contact' labeled 'Send a project brief')
- **Impact:** An internal conversion link presented as external and spawning a duplicate tab — mild disorientation at the final CTA moment.
- **Fix:** Render internal hrefs in ELSEWHERE_LINKS as normal Links without target=_blank/↗, or move 'Send a project brief' into the Navigate column.
- **Verifier:** Reproduced: Footer.tsx:21-24 includes internal '/contact' in ELSEWHERE_LINKS; lines 110-121 apply target='_blank' rel='noopener noreferrer' and the ↗ glyph unconditionally. Rendered on /work/forge as 'Send a project brief ↗' → /contact opening a duplicate tab.

**Working well:** Time-to-first-proof on both entry pages is excellent: at 1440x900 the real product screenshot enters the first viewport  · Proof honesty is genuinely differentiated: amber 'IN FINAL LAUNCH PREP' chip, 'Demo data — 88BH is in final launch prep, · The 'What's actually under it' fact lists are concrete and technical (41 API routes, CAS status transitions in transacti · Contact form is minimal and functional: 5 visible fields (name, email, type, budget, details), honeypot hidden, USD-only

## Anti-patterns + Copy/Trust (impeccable dimension 5 + copy quality) — 2/4

### [P1] RM price on the primary Upwork proof page (/work/88bh)
- **Where:** src/data/caseStudies/88bh.ts:73 — rendered at /work/88bh closing section (1440px, above the CTA)
- **Impact:** Directly violates the PRODUCT.md hard rule (USD matching the Upwork catalog; RM quarantined to /malaysia). The archetype buyer is a US/EU client deciding on $2,000–10,000; the last line before the CTA is an unexplained foreign-currency figure (RM 20,000 ≈ $4,300), which both confuses the price anchor and breaks the documented currency quarantine on the page most deep-linked from Upwork.
- **Fix:** Replace priceLine with a USD figure matching the live Upwork catalog (e.g. "Projects like this start from $4,500") or delete the price line entirely and let the Upwork listing carry price.
- **Verifier:** Reproduced: 88bh.ts:73 renders 'Projects like this start from RM 20,000.' immediately above the closing CTA at 1440px. Direct violation of PRODUCT.md hard rule (RM quarantined to /malaysia, which itself 404s) on the page PRODUCT.md names as a primary deep-link entry.

### [P1] Root OG image endpoint is dead AND its content is banned branding
- **Where:** src/app/opengraph-image.tsx:3 (runtime='edge'), :76, :91–95, :106, :124; referenced from src/app/layout.tsx:42,54
- **Impact:** http://localhost:3009/opengraph-image returns an empty reply (curl exit 52, twice) on this production build — the homepage share into Slack/LinkedIn renders with no image, and every listing page's twitter:image falls back to this same dead URL. Worse, the card's baked-in content is 'NIMBUS STUDIO' (explicitly banned name), 'Websites. Branding. Results.' + 'End-to-end web design, development & AI tools' (abandoned positioning), and heyitsnimbus@gmail.com — so fixing only the runtime would publish a brand-rule-violating share card.
- **Fix:** Remove runtime='edge' (or replace with a static 1200×630 PNG in /public), and rewrite the card: 'NIMBUS FORMA STUDIO', system-builder line ('I build the AI-powered system that runs your operation'), no email address.
- **Verifier:** Reproduced twice: curl /opengraph-image → empty reply (exit 52) on this production build; every page's twitter:image and the home og:image point at it. Baked content is 'NIMBUS STUDIO' (explicitly banned name), 'Websites./Branding./Results.', and a Gmail address — fixing runtime alone would ship a b

### [P1] Sitewide metadata still sells the abandoned 'creative studio / websites, branding, SEO' positioning
- **Where:** src/app/layout.tsx:23-24, 38-39, 52-53 (meta/og/twitter descriptions), :123 (Person.name = business name), :135, :142 (JSON-LD); src/app/services/page.tsx:6-13 ('Services — Web Design, Branding & AI Tools in Malaysia'); src/app/about/page.tsx:6-7 ('I build websites, branding, and AI tools')
- **Impact:** What Google, LinkedIn and Slack show for the homepage and every listing page ('creative studio specializing in websites, branding, UI/UX, SEO... for freelancers') contradicts both the rendered pages ('I build the AI-powered system that runs your operation') and PRODUCT.md ('system builder, not website maker'). A buyer doing due diligence sees two different companies depending on whether they read the preview or the page — the exact inconsistency that kills trust at this deal size.
- **Fix:** Rewrite the default description/og/twitter/JSON-LD to the current positioning; align /services and /about titles+descriptions with their rendered content; make Person.name 'Dee' with worksFor Nimbus Forma Studio.
- **Verifier:** Reproduced in rendered heads: home description = 'creative studio specializing in websites, branding, UI/UX, SEO…' vs rendered H1 'I build the AI-powered system that runs your operation.' JSON-LD (Person.name = business name, two 'creative studio' descriptions, Gmail) ships on every route via layout

### [P1] USD and RM prices in one eyeline on /services and /contact
- **Where:** src/data/services.ts:15,30 ('From $2,000', 'From $1,500' in service cards) vs src/data/services.ts:61,81 (FAQ: 'RM 6,000... RM 18,000... between RM 20,000 and RM 40,000', 'RM 800/month') — both rendered on the same /services and /contact pages
- **Impact:** Violates the PRODUCT.md hard rule 'never both in one eyeline'. A US buyer reads 'From $2,000' in the card, scrolls to the FAQ and reads 'starts at RM 18,000' (≈$4,300) — the floors don't reconcile, and price inconsistency is the single fastest trust-killer for a buyer already suspicious of a zero-review freelancer. The intended fix (/malaysia RM lane) doesn't exist, so RM leaked into the global pages.
- **Fix:** Convert the FAQ pricing answer on /services and /contact to USD matching the Upwork catalog; move all RM numbers to a real /malaysia page (see P2 below).
- **Verifier:** Reproduced: /services renders 'From $2,000.' (first accordion open by default) and the RM 6,000/18,000/20–40k FAQ on the same page; /contact renders a USD budget dropdown (Under $5,000 / $5,000–$15,000 / $15,000+) plus the same RM FAQ. Floors don't reconcile; hard-rule violation. The FAQ's 'Malaysia

### [P1] Voice rule broken in global chrome: 'we' in nav on every page + banned 'Let's build it together' CTA
- **Where:** src/components/Nav.tsx:13 ('Products we're building' — renders in the nav dropdown on all 9 audited pages); src/app/changelog/ChangelogPageContent.tsx:47-48 ('every product we ship'); src/app/vault/VaultPageContent.tsx:380 ('Let's build it together.')
- **Impact:** PRODUCT.md: first person singular, 'never a we'. The nav violation ships on every page including /work/88bh and /work/forge, so the first hover a buyer makes contradicts the 'solo builder' claim the whole site rests on. 'Let's build it together.' is the literal banned phrase class from the audit's slop list, rendered as the /vault closing CTA.
- **Fix:** Nav sub → 'Products I'm building'; changelog → 'every product I ship'; vault CTA → something specific ('Tell me what you'd use it for.') or reuse the standard 'Tell me what you need. I'll tell you how I'd build it.'
- **Verifier:** Stronger than filed: screenshot shows 'PRODUCTS WE'RE BUILDING' is ALWAYS visible in the desktop header (not hover-only) on every page including /work/88bh and /work/forge — persistent chrome contradicting the 'never a we' voice rule the solo-builder claim rests on. 'every product we ship' (changelo

### [P2] /malaysia — the documented RM funnel page — returns 404
- **Where:** http://localhost:3009/malaysia → 404 (verified); no internal hrefs reference it (grep of src returned zero), PRODUCT.md line 14 names it as the secondary-audience landing
- **Impact:** The Instagram/SME lane (PRODUCT.md secondary audience) has no destination: any bio link or DM pointing at /malaysia 404s, and its absence is why RM pricing currently squats on /services and /contact. The two P1 currency findings can't be fully fixed without this page existing.
- **Fix:** Ship a minimal /malaysia page owning all RM pricing (FAQ answer, RM bands, maintenance), then strip RM from every other route; add it to sitemap.ts.

### [P2] Forge hero caption contradicts itself about anonymized vs real figures
- **Where:** src/data/caseStudies/forge.ts:23 — rendered as the hero screenshot caption on /work/forge
- **Impact:** 'Client names and figures are anonymized for privacy; the interface and every number here are real, live output.' — figures cannot be simultaneously anonymized and real. PRODUCT.md defines the reader as 'technical enough to smell invented metrics'; this sentence is exactly the kind they smell. Also a grammar slip ('every number here are real').
- **Fix:** Use the correct formulation already present at forge.ts:29: 'Client names are anonymized for privacy — the interface, the numbers, and the workflow are real, live output.' (decide whether the numbers are real or masked, and say only that).
- **Verifier:** Reproduced rendered: 'Client names and figures are anonymized… every number here are real, live output' — figures can't be both anonymized and real, and forge.ts:29 proves the correct formulation exists one section down. One correction: the grammar sub-claim is wrong ('the interface and every number

### [P2] Case-study OG images: false declared dimensions and wrong aspect ratio for share crops
- **Where:** src/app/work/[slug]/page.tsx (og:image:width/height 1200×630) vs public/images/88bh/dashboard-low-stock.jpg (2000×1307) and public/images/forge/dashboard.jpg (2000×1222); also page.tsx:24 description suffix
- **Impact:** The two pages actually shared into Slack/LinkedIn declare 1.91:1 but serve 1.53:1/1.64:1 dashboards — LinkedIn crops top and bottom, cutting the KPI row and nav chrome that make the screenshot legible as proof. Minor: og:description reads '...how the shop runs. — A case study by Nimbus Forma Studio.' (period followed by em-dash clause).
- **Fix:** Export dedicated 1200×630 crops of both dashboards (crop, don't squash) as og-88bh.jpg / og-forge.jpg and point metadata at them; drop the ' — A case study by...' suffix (og:site_name already carries the brand).
- **Verifier:** Reproduced: sips shows 2000×1307 (1.53:1) and 2000×1222 (1.64:1) actual vs 1200×630 (1.91:1) declared in both rendered heads; both images resolve 200. '. — A case study by…' suffix confirmed in rendered og/twitter descriptions.

### [P2] Listing pages have no og:image and stale twitter fallbacks
- **Where:** src/app/work/page.tsx, services/page.tsx, about/page.tsx, contact/page.tsx, vault/page.tsx, changelog/page.tsx — each defines openGraph without images, which replaces the root images array
- **Impact:** Shares of /work, /services, /about, /contact, /vault, /changelog render with no og:image at all, and their twitter:card falls back to the root's stale title ('Nimbus Forma Studio' / 'Websites, branding, UI/UX, SEO...') plus the dead /opengraph-image URL — a broken, off-positioning preview on six pages.
- **Fix:** After fixing the root OG card (P1), add images: [...] to each page's openGraph or rely on a working file-based opengraph-image; add per-page twitter metadata mirroring og.
- **Verifier:** Reproduced on all six pages (/work, /services, /about, /contact, /vault, /changelog): zero og:image meta (page-level openGraph without images drops the root array), twitter:title falls back to root 'Nimbus Forma Studio', twitter:image points at the dead /opengraph-image endpoint.

### [P2] Services page label says 'FIVE THINGS' above exactly three services
- **Where:** src/app/services/ServicesPageContent.tsx:51 ('Five things · done properly') — rendered /services section 01
- **Impact:** The site's entire credibility strategy is 'numbers, not adjectives — every figure file-verified'. Its own services page can't count to three. Home says 'THREE THINGS · DONE PROPERLY' for the same list, proving the services page label is stale from a five-service era.
- **Fix:** Change to 'Three things · done properly' to match the home section and the actual list.
- **Verifier:** Reproduced: rendered /services shows 'FIVE THINGS · DONE PROPERLY' (ServicesPageContent.tsx:51) followed by services 01–03 only; rendered home shows 'THREE THINGS · DONE PROPERLY' for the same list.

### [P2] Vault mixes real proof with vaporware and superlative copy
- **Where:** src/data/vault.ts (Sumi/Calcifer/Invoker 'COMING SOON' tiers, Invoker: 'The ultimate developer productivity tool'); src/app/vault/VaultPageContent.tsx:296 ('Get Notified' → /contact project-brief form); rendered /vault shows empty placeholder tiles for SYP, Sumi, Calcifer, Invoker, Forge
- **Impact:** Two shipped products (Kōji, Pulse — both links live, verified 200) sit beside four concept cards with empty image slots and a marketing superlative ('the ultimate...'), the exact 'adjectives where numbers should be' tell. For the technical buyer this dilutes the credibility of the real products; 'Get Notified' landing on a sales form with a budget dropdown is a bait-and-switch micro-moment.
- **Fix:** Cut or collapse the three 'coming soon' concepts into a single one-line 'in research' list without cards; delete 'The ultimate developer productivity tool'; make Get Notified either a real waitlist capture or drop the button.
- **Verifier:** Reproduced: Sumi section screenshot shows an empty dark placeholder tile with a COMING SOON chip and a 'Get Notified' button that hardcodes href='/contact' (VaultPageContent.tsx:296) — landing on the sales form with a budget dropdown. 'The ultimate developer productivity tool' rendered (vault.ts:143

### [P2] Changelog claims 'updated with every release' but is ~11 weeks stale
- **Where:** src/app/changelog/ChangelogPageContent.tsx:47-48 ('Updated with every release') vs src/data/changelog.ts:26 (latest entry May 25, 2026; today is Aug 13, 2026); only Forge + Koji covered of the 7 vault products
- **Impact:** A dev log is a liveness proof; a stale one is counter-proof. The subtitle over-promises ('every product we ship', 'every release') while the newest entry is nearly three months old — a diligence-minded buyer reads this as either abandonment or embellishment.
- **Fix:** Either backfill the June–August releases (88BH audit closure, portfolio v6 are real events) or soften the subtitle to 'Selected releases from Forge and Kōji' until the update habit is real.
- **Verifier:** Reproduced: rendered subtitle 'across every product we ship. Updated with every release.' over 4 entries, newest MAY 25, 2026 — 80 days before today (Aug 13); only Forge and Kōji covered; sitemap.ts declares changelog changeFrequency 'weekly'.

### [P2] No route back to Upwork anywhere; Gmail address exposed instead
- **Where:** grep -rni 'upwork' src → zero hits sitewide; heyitsnimbus@gmail.com rendered on /contact (ContactPageContent) and embedded in JSON-LD on every page incl. /work/88bh and /work/forge (src/app/layout.tsx:125,144)
- **Impact:** PRODUCT.md says CTAs funnel INTO Upwork listings and bans contact info on Upwork-linked pages (policy risk). The actual funnel pages do the opposite: no Upwork path exists, and a personal Gmail is published — both an Upwork-policy exposure and a trust downgrade (a $10k buyer expects hello@nimbusformastudio.com on a registered business with an SSM number in the footer).
- **Fix:** Decide the funnel per PRODUCT.md: add the Upwork catalog link as the case-study closing CTA (or a 'continue on Upwork' variant), move the email to a branded domain, and strip email from the JSON-LD on case-study routes.
- **Verifier:** Reproduced: grep of src → zero upwork references; crawl of all 9 pages → zero upwork.com links; heyitsnimbus@gmail.com rendered on /contact and embedded in JSON-LD on every route including both case studies (layout.tsx:125,144). Violates both halves of the PRODUCT.md funnel/contact hard rule. Kept a

### [P3] Em-dash-riddled case-study copy
- **Where:** /work/88bh and /work/forge body copy — src/data/caseStudies/88bh.ts:32,39,45,51,57,62-68 and forge.ts throughout
- **Impact:** 16-17 em dashes per case-study page; 5 of 7 'What's actually under it' bullets on 88bh use the identical 'claim — restatement' cadence. This is the flagged AI-drafting tell, shown to the one audience most primed to spot it.
- **Fix:** One editing pass per page: keep at most one em dash per paragraph; convert bullet tails to plain second sentences or cut them (the claims are strong enough without the echo).
- **Verifier:** Reproduced with a small count correction: measured in <main> only — 16 em dashes on /work/88bh, 15 on /work/forge (finding said 16/17). 6 of 7 'under it' bullets on 88bh use the 'claim — restatement' cadence. Magnitude and pattern confirmed.

### [P3] Mid-word ellipsis truncation on /work cards
- **Where:** src/app/work/WorkPageContent.tsx:207 — project.tagline.slice(0,140) + '...'
- **Impact:** Card summaries the buyer scans first end mid-word: 'taught me more than any tutoria...', 'calm, actionabl...'. Reads as broken rather than truncated on a page selling attention to detail.
- **Fix:** Truncate at the last word boundary before 140 chars (or write 140-char taglines and drop truncation).
- **Verifier:** Reproduced: WorkPageContent.tsx:206-208 slice(0,140)+'...' — rendered cards end 'tutoria...', 'actionabl...', 'ev...' (3 of 5 cards mid-word).

### [P3] Status label drift between Vault and case studies, and About vs 88BH
- **Where:** src/data/vault.ts Forge entry ('IN DEVELOPMENT · INTERNAL TOOL') vs src/data/caseStudies/forge.ts:6 ('INTERNAL — ACTIVE DAILY'); src/app/about/AboutPageContent.tsx timeline 2026 ('First client signed and in build') vs 88bh 'build is done and audited'
- **Impact:** Same product, two different statuses one click apart; About says the client build is still in progress while the case study says it's done. Small, but this dimension's whole job is consistency under diligence.
- **Fix:** Single source status labels from the caseStudies data; update the About timeline line to 'first client build done and audited, in launch prep'.
- **Verifier:** Reproduced: /vault Forge chips 'IN DEVELOPMENT' + 'INTERNAL TOOL' (vault.ts:152) vs /work/forge 'INTERNAL — ACTIVE DAILY' (forge.ts:6); /about timeline 'First client signed and in build' (AboutPageContent.tsx:42) vs 88bh closing 'The build is done and audited.'

### [P3] Hardcoded 'Q3 2026' availability line will silently go stale in 7 weeks
- **Where:** src/components/sections/Hero.tsx:28 ('Currently accepting 1 new project for Q3 2026')
- **Impact:** Accurate today (Aug 13); on Oct 1 the homepage's first line becomes provably stale — the worst kind of decay for a trust-proof site with no update owner.
- **Fix:** Derive the quarter from the build date, or drop the quarter: 'Currently accepting 1 new project.'
- **Verifier:** Reproduced: Hero.tsx:28 hardcodes the string; rendered as the homepage hero eyebrow 'CURRENTLY ACCEPTING 1 NEW PROJECT FOR Q3 2026'. Accurate today, provably stale Oct 1 with no update mechanism.

### [P3] SYP 'View on GitHub' links to the profile, not the repo
- **Where:** src/data/vault.ts:107 — href: 'https://github.com/CwCw0'
- **Impact:** A technical buyer clicking 'View on GitHub' expecting the open-source party game lands on a bare profile and has to hunt; small broken promise on a proof page.
- **Fix:** Point at the actual SYP repository URL.
- **Verifier:** Reproduced: vault.ts:107 href='https://github.com/CwCw0' under label 'View on GitHub' — resolves (200) to the bare profile, not a repository; no repo URL anywhere in the crawl's link set.

**Working well:** Case-study body copy on /work/88bh and /work/forge is genuinely first-person, number-backed (41 API routes, 60 tools, 27 · Zero dead internal links across all nine audited pages: every nav/footer link, all six /work/* case pages, all four /cha · The rendered visual system honors the DESIGN.md ban list on the funnel pages: no gradient text, no glassmorphism, no sid · Case-study pages ship page-specific titles, descriptions, og:type=article and real-screenshot og:images that resolve (20

## Responsive / Mobile (390x844 iPhone, 768x1024 tablet) — 2.5/4

### [P1] Fixed nav never gains its background at <=768px — wordmark collides with content text on every scrolled screen of every page
- **Where:** src/components/Nav.tsx:55-60 (root cause: src/app/globals.css:1634-1639 with globals.css:165-167)
- **Impact:** On the primary deep-linked conversion pages (/work/88bh, /work/forge) a mobile buyer reads 6,000+px of long-form proof with the NIMBUS wordmark + 'FORMA STUDIO' permanently overlapping the prose in the top ~90px — text renders on top of text at every scroll position (verified on /, /work/88bh, /work/forge, /services, /about, /contact at 390px AND 768px). For a portfolio whose entire pitch is 'I sweat the details', a visibly broken header on the exact pages Upwork buyers land on directly undermines the conversion job. Desktop (>=800px) is unaffected.
- **Fix:** Fix the scroll-container regression, not the symptom: in the @media (max-width: 768px) block, remove overflow-x:hidden from html/body (or remove height:100% from body) so the document scrolls normally on mobile — overflow-x clipping can live on a wrapper div. Alternatively make Nav.tsx listen to the real scroller (document.body 'scroll' event / IntersectionObserver on a top sentinel). An IO sentinel is the most robust: it works regardless of which element scrolls. Note the fix must go in Nav.tsx — Header.tsx (which has the same scrolled logic at Header.tsx:102) is unmounted dead code; layout.tsx:183 mounts Nav.

### [P2] Blog reading-progress bar is permanently stuck at 0 on mobile/tablet (same dead window.scrollY root cause)
- **Where:** src/app/blog/[slug]/BlogPostContent.tsx:39
- **Impact:** On any blog post at <=768px the fixed top reading-progress bar never moves — a visible dead feature on pages the nav links to ('Blog' is a top-level drawer item). Minor conversion impact but reads as a bug to a technical buyer. ScrollToTop.tsx:11 has the same dead listener but is not mounted anywhere, so no user impact.
- **Fix:** Same fix as the P1 (restore document-level scrolling at <=768px); if the nav fix is done via sentinel instead, this component also needs porting to the real scroll source.

### [P2] Sub-44px touch targets: footer nav links (18px tall), Privacy link (52x13), and the case-study 'All projects' back link (101x24)
- **Where:** src/components/Footer.tsx (.footer-col-link, rendered 31-74px wide x 18px tall at 35px vertical pitch) and src/app/work/[slug]/CaseStudyContent.tsx ('All projects' back link)
- **Impact:** All pass WCAG 2.5.8 AA via the spacing exception (35px pitch > 24px offset), so no AA violation — but 18px-tall links in a 9-item vertical stack invite mis-taps with a thumb, and 'All projects' (101x24 at top of /work/88bh and /work/forge) is the primary escape hatch on the deep-linked entry pages. 'View all projects' on the home page is similarly 129x24.
- **Fix:** Add padding-block to .footer-col-link so the hit area reaches ~32-44px while keeping the visual 35px pitch (padding + negative margin), and give the case-study back link and 'View all projects' link min-height 44px via padding. The site already does this correctly for .btn (globals.css min-height:44px at <=768px) — extend the same treatment to bare text links.

### [P3] 9px 'FORMA STUDIO' brand sub-line and pervasive 11px mono labels at 390px sit below the comfortable mobile reading floor
- **Where:** src/components/Nav.tsx:116 (.nav-brand-sub, computed 9px) and the --f-mono 11px label token used across all pages (meta rows, footer legal, section labels)
- **Impact:** Legibility strain, not failure: the 11px mono is a deliberate design-system token (DESIGN.md) and its fg-dim color measures ~6.2:1 contrast on ink-0, passing AA. But 9px uppercase letterspaced text ('FORMA STUDIO' under the logo, visible on every mobile screen) is below any comfortable floor at 390px physical size, and the case-study hero meta rows ('NEXT.JS 16 · PRISMA 7 · SUPABASE POSTGRES...') carry real proof content at 11px.
- **Fix:** Bump .nav-brand-sub to at least 10-11px on mobile, and consider 12px for the mono meta rows at <=480px only — the tokens can stay desktop-side. Footer legal line (11px '© 2026 Nimbus Forma Studio · SSM...') is fine to leave.

### [P3] /contact info strip keeps 3 columns at 390px, wrapping 'Kuala Lumpur,' onto 3 cramped lines
- **Where:** src/app/contact/ContactPageContent.tsx — EMAIL / BASED / GITHUB row (screenshot C-s600.png, top of form section)
- **Impact:** Purely cosmetic: 'BASED / Kuala / Lumpur, / MY' stacks a word per line beside the email column, reading as an accidental layout rather than an intentional one on the page where the secondary-audience conversion (contact form send) happens.
- **Fix:** Stack the three info cells vertically (or 2+1) below ~480px, matching how the rest of the page collapses to single column.

**Working well:** Zero horizontal overflow on every audited page at both 390x844 and 768x1024 — scrollingElement.scrollWidth == innerWidth · Case-study proof grids collapse to a clean single column at 390px (348px tiles with mono captions intact, ~120px rhythm) · Hero survives 390px: 'I build the AI-powered system that runs your operation.' wraps cleanly with no orphan characters ( · Mobile drawer is genuinely well-built: burger, close, and theme buttons exactly 44x44; drawer links 350x96 with index nu