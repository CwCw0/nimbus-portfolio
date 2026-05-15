# V6 Website — Fix List (from Dee's review, May 14 2026)

## Critical Fixes

1. **Koji button has weird letterings** — check VaultPreview and vault pages for character encoding issues on Kōji
2. **Screenshots and photos don't exist** — all project cards/vault products use placeholder divs, need real screenshots
3. **Website breaking, slow, stuttering** — performance issues, likely the ambient waves canvas + multiple scroll listeners + cursor rAF loop
4. **Pricing remove from website** — remove all pricing from Services section, services page, and any FAQ mentioning specific prices. Don't scare clients. Move pricing conversation to the quote/call.
5. **Nimbus hover animation displaced** — the slash hover on the nav NIMBUS wordmark is misaligned
6. **Dropdown boxes UI and brand design fix** — service accordion and FAQ dropdowns need design polish
7. **Footer logo cropped and animation not fixed** — the giant SVG NIMBUS wordmark is cropped/clipped, slash draw animation broken
8. **Cursor fix** — cursor behavior issues (likely the transform changes from audit fix need tuning)
9. **Navbar logo hover needs fix** — slash hover CSS broken or displaced

## UX Improvements

10. **Better readability** — text sizing, contrast, line-height adjustments needed across sections
11. **Remove "1 slot available"** — change availability messaging to something less limiting
12. **More breathing space** — sections feel cramped, need more generous padding/margins
13. **No theme toggle** — need a light/dark theme toggle in the nav or a settings control
14. **Worldwide mention more prominent** — "Available worldwide" / "Remote — worldwide" needs to be more visible
15. **Less intimidating blog layout** — blog index and post pages need friendlier, more approachable design
16. **Better highlights for products, services, blogs main cards** — key content cards need stronger visual treatment
17. **All products not present in vault** — need ALL Nimbus products in the vault, not just Koji/Voidframe/Pulse
18. **Better vault layout** — take inspiration from the previous version's vault/products page design
19. **Scrolling animation stops** — scroll-triggered animations freezing or not continuing

## Content & Framing

20. **Not just websites — systems, internal systems, bundled** — the site frames Nimbus as "website builder" but it should communicate: websites + business tools + AI + internal systems as bundled solutions
21. **Better framing in documents** — update all templates to frame pricing as "investment in a system" not "cost of a website"
22. **Pricing removed from site** — NO prices on the website. Pricing happens in quotes and calls only. The FAQ answer about pricing should say "Every project is scoped individually. Book a call and I'll give you an exact quote within 48 hours."

## Technical

23. **Some button hovers move weird (book a call)** — Magnetic component strength too high or applying to wrong elements
24. **Work page design lab links to old pages** — design lab templates link to old V5 routes, need to verify all links work
25. **Design lab needs: same info or better/shorter, showcase, link, screenshots, price to buy, coming soon badges**
26. **Forms — are they built and working?** — verify Formspree integration on homepage contact and /contact page
27. **Update all documents and templates to new design system** — DONE (27 templates in Documents v2)
