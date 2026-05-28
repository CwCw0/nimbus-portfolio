import type { BlogPost } from "./blog";

export const platformSeriesPosts: BlogPost[] = [
  /* ═══════════════════════════════════════════════════════════════════
     POST: WHY I BUILD EVERYTHING ON SUPABASE
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "why-i-build-everything-on-supabase",
    tag: "Development",
    date: "May 10, 2026",
    readTime: "13 min read",
    title: "Why I Build Everything on Supabase.",
    excerpt:
      "PostgreSQL, row-level security, real-time subscriptions, auth, storage — one platform. Here's what a solo developer shipping production systems actually needs from a backend, and why Supabase delivers.",
    image: "/opengraph-image",
    pinned: true,
    tocItems: [
      "The Problem Supabase Solves",
      "PostgreSQL Is the Foundation",
      "Row-Level Security Changed How I Think About Data",
      "Real-Time Without the Infrastructure",
      "Auth That Doesn't Fight You",
      "The Free Tier Is Genuinely Production-Ready",
      "Where I've Hit the Edges",
      "From a Product Manager's Lens",
      "From a Developer's Lens",
      "From a User's Lens",
      "What I'd Build Next With It",
    ],
    content: [
      {
        type: "p",
        text: "I've shipped a business operating system, a full e-commerce platform with payment processing, a productivity app, a healthtech dashboard, and six commercial web templates. Every single one of them that needs a backend runs on Supabase. Not because I'm lazy. Because after evaluating Firebase, PlanetScale, Neon, and rolling my own with raw PostgreSQL on AWS, Supabase is the one that lets me ship production systems fastest without compromising on the things that matter: security, performance, and data ownership.",
      },
      {
        type: "p",
        text: "This isn't a sponsored post. Supabase doesn't know I exist. This is a solo developer in Malaysia explaining why one platform replaced an entire backend infrastructure stack.",
      },
      {
        type: "h2",
        text: "The Problem Supabase Solves",
      },
      {
        type: "p",
        text: "As a solo developer running a studio, I don't have a DevOps engineer. I don't have a DBA. I don't have a backend team. I have me, my code, and a deployment target. Every hour I spend configuring infrastructure is an hour I'm not shipping features for clients.",
      },
      {
        type: "p",
        text: "Before Supabase, building a backend for a client project meant: spin up a PostgreSQL instance on AWS RDS or Digital Ocean. Set up connection pooling. Configure authentication — roll my own JWT system or integrate Auth0. Set up file storage on S3. Build a real-time layer with Socket.io or Pusher. Write database migrations manually. Manage environment variables across staging and production. That's two days of infrastructure work before I write a single line of business logic.",
      },
      {
        type: "p",
        text: "Supabase gives me all of that — database, auth, storage, real-time, edge functions — behind one API, one dashboard, one connection string. I configure it in an afternoon and spend the rest of the week building the actual product. For a solo operation, this is the difference between shipping in two weeks and shipping in six.",
      },
      {
        type: "h2",
        text: "PostgreSQL Is the Foundation",
      },
      {
        type: "p",
        text: "This is the decision that matters most and the one most developers gloss over when comparing backend services. Supabase is PostgreSQL. Not a proprietary query language. Not a document store pretending to be relational. Not a key-value database with a SQL-like syntax bolted on. It's actual PostgreSQL — the most battle-tested relational database in the world, running since 1996.",
      },
      {
        type: "p",
        text: "Why does this matter? Because business data is relational. A customer has orders. An order has line items. A line item references a product with variants and stock levels. A stringing job links to a customer profile with saved racket preferences. These relationships are the business logic. In PostgreSQL, I model them with foreign keys, indexes, constraints, and joins. The database enforces data integrity. Not my application code. Not a middleware layer. The database itself.",
      },
      {
        type: "p",
        text: "When I built the 88 Badminton House e-commerce platform, the Prisma schema has 12 tables with foreign keys, unique constraints, cascade deletes, and default values. The database guarantees that an order can't exist without a customer. That a newsletter subscriber's email is unique. That a stringing job always has a valid client reference. These aren't application-level checks that might be bypassed — they're database-level constraints that cannot be violated. That's PostgreSQL. That's why it matters.",
      },
      {
        type: "h2",
        text: "Row-Level Security Changed How I Think About Data",
      },
      {
        type: "p",
        text: "Row-Level Security is Supabase's most powerful feature and the one most developers skip because it feels complex. RLS lets you define access policies directly on database tables — who can read, write, update, or delete each row, based on the authenticated user's identity.",
      },
      {
        type: "p",
        text: "Here's why this is transformative for a product manager's thinking: without RLS, every API endpoint needs to check 'does this user have permission to see this data?' That's application-level security. If you forget a check on one endpoint, data leaks. If an intern writes a new endpoint and doesn't know about the permission model, data leaks. The surface area for mistakes grows with every endpoint you add.",
      },
      {
        type: "p",
        text: "With RLS, the policy lives on the table itself. It doesn't matter how you query the data — through the API, through a direct connection, through a serverless function, through the dashboard. The policy applies. Always. If the policy says 'clinic A can only see clinic A's patients,' then no amount of creative querying will show clinic B's data. The security model is in the database, not spread across fifty API routes.",
      },
      {
        type: "p",
        text: "In Forge, my business OS, I use RLS to ensure that client data is isolated. Even though it's a single-tenant app right now, the RLS policies are in place so that if I ever offer it to other businesses, the multi-tenancy is already enforced at the data layer. That's thinking ahead without over-engineering — the policies take minutes to write and cost nothing in performance.",
      },
      {
        type: "h2",
        text: "Real-Time Without the Infrastructure",
      },
      {
        type: "p",
        text: "Forge has a live dashboard that updates when client statuses change, when payments come in, when project milestones are hit. I didn't build a WebSocket server. I didn't configure Redis pub/sub. I didn't set up a message queue. I subscribed to a Supabase table and the UI updates when the data changes. Five lines of code.",
      },
      {
        type: "p",
        text: "The real-time system uses PostgreSQL's built-in LISTEN/NOTIFY mechanism, which means it's not a bolt-on service — it's the database itself broadcasting changes. For a solo developer, this eliminates an entire infrastructure layer. No Socket.io server to maintain. No Pusher subscription to pay for. No connection management to debug when clients disconnect and reconnect. It just works, backed by the same database that stores the data.",
      },
      {
        type: "h2",
        text: "Auth That Doesn't Fight You",
      },
      {
        type: "p",
        text: "I have a nuanced opinion on Supabase Auth. For products where I need standard authentication — email/password, OAuth, magic links — Supabase Auth is excellent. It integrates directly with RLS policies, so the authenticated user's ID flows naturally into row-level access rules. No JWT parsing middleware. No custom session management. The auth and the authorization are one system.",
      },
      {
        type: "p",
        text: "For the 88 Badminton House admin panel, I chose custom auth instead — JWT with bcrypt, HTTP-only cookies, custom rate limiting. Not because Supabase Auth is bad, but because this admin panel handles payment data, customer PII, and inventory management. I wanted full control over every aspect of the auth flow: constant-time password comparison, specific cookie flags, custom token payloads with role information, and a revocation mechanism I understood completely. For client-facing products with standard auth flows, Supabase Auth saves days of work. For security-critical admin panels, I prefer to own the implementation.",
      },
      {
        type: "h2",
        text: "The Free Tier Is Genuinely Production-Ready",
      },
      {
        type: "p",
        text: "This matters for solo developers and small studios more than anyone will admit. The free tier gives you: 500MB of database storage, 1GB of file storage, 50MB of edge function invocations, unlimited API requests, and real-time subscriptions. Forge runs on the free tier. My portfolio site's backend features run on the free tier. Early-stage client projects start on the free tier.",
      },
      {
        type: "p",
        text: "This isn't a trial. It's a tier that runs indefinitely. For a solo operation building products that start small and grow, being able to ship to production without a hosting bill until the product has actual traction is the difference between launching and not launching. I've seen developers build products that cost $50 a month in infrastructure before they have a single user. That's backwards. Ship free, pay when you scale.",
      },
      {
        type: "h2",
        text: "Where I've Hit the Edges",
      },
      {
        type: "p",
        text: "Being honest matters more than being promotional, so here's where Supabase has friction.",
      },
      {
        type: "p",
        text: "Edge functions are limited compared to Vercel's serverless functions or AWS Lambda. The cold start times are noticeable. The execution environment is Deno-based, which means some npm packages don't work without modification. For simple webhooks and background jobs, they're fine. For complex server-side logic, I still reach for Next.js API routes on Vercel.",
      },
      {
        type: "p",
        text: "The local development experience has improved dramatically but still has rough edges. Running supabase start spins up Docker containers for the full stack — database, auth, storage, studio. It works, but it's heavy. On my machine it takes 30-40 seconds to start. Hot-reloading database migrations requires restarting the local instance. For rapid iteration on schema changes, I sometimes bypass the local stack and work directly against a staging project.",
      },
      {
        type: "p",
        text: "Complex migrations with data transformations are harder than they should be. The migration system is straightforward for schema changes but doesn't have a built-in mechanism for data migrations — transforming existing data as part of a schema change. I end up writing separate SQL scripts and running them manually. Not a dealbreaker, but an area where Prisma's migration system feels more mature.",
      },
      {
        type: "h2",
        text: "From a Product Manager's Lens",
      },
      {
        type: "p",
        text: "When I'm wearing my PM hat and scoping a new project, Supabase reduces my technical risk estimate significantly. I can promise a client real-time features, user authentication, file uploads, and a relational database — and I know exactly how long each will take to implement because I've done it before on the same platform. There are no integration surprises. No 'the auth provider doesn't work with the database layer' gotchas. The scoping is predictable, which means the quotes are accurate, which means the project stays profitable.",
      },
      {
        type: "p",
        text: "The data ownership angle matters for client trust too. When I tell a client 'you own your data, it's in PostgreSQL, and you can export it or migrate it to any PostgreSQL host at any time,' that's a genuine promise. There's no proprietary data format. No vendor lock-in on the data layer. If Supabase disappeared tomorrow, I could point the connection string at any PostgreSQL instance and the application would work. Try saying that about Firebase.",
      },
      {
        type: "h2",
        text: "From a Developer's Lens",
      },
      {
        type: "p",
        text: "The developer experience is where Supabase has invested the most, and it shows. The auto-generated TypeScript types from the database schema eliminate an entire class of runtime errors. The client library is clean and intuitive — queries read like English: supabase.from('orders').select('*, customer(name, email)').eq('status', 'paid'). That's a join, a filter, and a relation traversal in one readable line.",
      },
      {
        type: "p",
        text: "The SQL editor in the dashboard is genuinely useful for debugging and exploration. I can run complex queries, see execution plans, and test RLS policies without leaving the browser. For a solo developer who is also the DBA, this immediate feedback loop is invaluable. I don't need pgAdmin or DataGrip for 90% of my database work.",
      },
      {
        type: "p",
        text: "The documentation is exceptional. Clear examples, practical guides, framework-specific quickstarts. When I use Claude Code with context7 MCP to look up Supabase docs, it pulls current, accurate information because the docs are well-structured and comprehensive. Good documentation makes AI-assisted development better — another compounding advantage.",
      },
      {
        type: "h2",
        text: "From a User's Lens",
      },
      {
        type: "p",
        text: "My clients never see Supabase. They see a fast application with real-time updates, secure authentication, and reliable data. They don't care about the database. They care about whether the stock count updates immediately when an order comes in. Whether their admin panel is fast. Whether their customer data is secure. Supabase delivers all of this behind the scenes.",
      },
      {
        type: "p",
        text: "The performance characteristics are solid for the scale I operate at. Query response times are consistently under 100ms for the dashboards and admin panels I build. Real-time updates arrive within seconds. Auth token refresh is seamless — users never experience a session timeout that breaks their workflow. These are the things that make software feel professional, and they come from the platform, not from me writing performance-optimising code.",
      },
      {
        type: "h2",
        text: "What I'd Build Next With It",
      },
      {
        type: "p",
        text: "Supabase recently launched AI and vector capabilities — pgvector integration, embedding storage, semantic search. My next move is integrating this into Forge: storing document embeddings so the AI chat can search across all business documents semantically, not just by keyword. The pieces are all in the same platform. Database, auth, real-time, AI — one connection string, one bill, one mental model.",
      },
      {
        type: "p",
        text: "For anyone building production applications as a solo developer or small team, Supabase isn't just convenient. It's a competitive advantage. The same person who designs the schema writes the application code writes the RLS policies configures the auth reviews the real-time subscriptions. No coordination overhead. No integration debugging. No infrastructure management. Just building.",
      },
      {
        type: "quote",
        text: "The best infrastructure is the kind you forget about. Supabase lets me think about the product, not the platform.",
      },
    ],
    relatedSlugs: [
      "nextjs-in-production-6-templates-and-a-client-project",
      "security-isnt-a-feature-its-the-baseline",
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     POST: NEXT.JS IN PRODUCTION
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "nextjs-in-production-6-templates-and-a-client-project",
    tag: "Development",
    date: "May 16, 2026",
    readTime: "14 min read",
    title: "Next.js in Production: What 6 Templates and a Client Project Taught Me.",
    excerpt:
      "32 routes, 6 design systems, one e-commerce platform, and a portfolio site — all Next.js, all deployed on Vercel. Here's what I've learned about building production applications with this framework.",
    image: "/opengraph-image",
    pinned: true,
    tocItems: [
      "The Scale of What I've Shipped",
      "Why Next.js and Not Something Else",
      "App Router in Production — The Real Story",
      "Turbopack Changed My Development Speed",
      "Server Components vs Client Components",
      "The Metadata API Is Quietly Excellent",
      "Deploying on Vercel — The Full Picture",
      "Performance in the Real World",
      "Security Headers and CSP",
      "Where Next.js Has Friction",
      "From a Product Manager's Lens",
      "From a Developer's Lens",
      "What I'd Change",
    ],
    content: [
      {
        type: "p",
        text: "I've shipped more Next.js applications in the last year than most agencies ship in three. Six complete web design templates with 32 routes — each with its own design system, animation architecture, and responsive behavior. A full e-commerce platform with payment processing, admin dashboard, and CRM. A portfolio site with a blog system, dev log, product showcase, and SEO infrastructure. All Next.js. All deployed on Vercel. All in production serving real users.",
      },
      {
        type: "p",
        text: "This isn't a review based on a to-do app tutorial. It's a production report from someone who depends on this framework for their livelihood.",
      },
      {
        type: "h2",
        text: "The Scale of What I've Shipped",
      },
      {
        type: "p",
        text: "Let me be specific because scale matters. Studio Noir: dark creative portfolio with horizontal scroll, custom cursor, side navigation — 4 pages. Elevate: corporate SaaS with 3D tilt cards, gradient blobs — 5 pages. Pop Store: neo-brutalist e-commerce with spring physics — 4 pages. Vitalis: healthcare with pill navigation, rounded elements — 4 pages. Roast: coffee shop with parallax and editorial layout — 5 pages. Mono: ultra-minimal portfolio, one font — 4 pages. Each template has its own animation system built on GSAP, its own color palette, its own responsive breakpoints, its own component library.",
      },
      {
        type: "p",
        text: "Then the 88 Badminton House e-commerce platform: product catalog, cart, checkout, payment integration, admin dashboard with 15+ pages, customer CRM, order management, stringing service tracker. Then my portfolio site: 80+ components, dynamic blog with TOC and reading progress, vault showcase with waitlist forms, changelog system, privacy policy, SEO with structured data and OpenGraph images generated per page.",
      },
      {
        type: "p",
        text: "This is what I mean by 'in production.' Not one project. A body of work that exercises every part of the framework.",
      },
      {
        type: "h2",
        text: "Why Next.js and Not Something Else",
      },
      {
        type: "p",
        text: "I evaluated the alternatives seriously. Remix — excellent DX, but the ecosystem is smaller and the deployment story was less mature when I started. Astro — brilliant for content sites, but I need client-side interactivity for dashboards and animation-heavy pages. SvelteKit — genuinely tempting, but the React ecosystem's breadth (GSAP React hooks, component libraries, hiring pool) won out. Nuxt — I've built production Vue.js applications, but React/Next.js is where my clients' future developers will be most comfortable.",
      },
      {
        type: "p",
        text: "The decision isn't about what's technically best in isolation. It's about what gives the best outcome for the full lifecycle of a project: development speed, deployment reliability, ecosystem support, and long-term maintainability by someone who isn't me. Next.js wins on that composite score.",
      },
      {
        type: "h2",
        text: "App Router in Production — The Real Story",
      },
      {
        type: "p",
        text: "The App Router is simultaneously the best and most frustrating part of modern Next.js. The file-system routing is intuitive — a page.tsx in a folder is a route. Layouts compose naturally. Loading and error states have first-class support. The mental model is clean.",
      },
      {
        type: "p",
        text: "The frustration comes from the Server Component / Client Component boundary. In theory, it's elegant: server components render on the server, ship zero JavaScript, and are fast. Client components hydrate on the client and handle interactivity. In practice, the error messages when you accidentally use a hook in a server component or pass a non-serializable prop across the boundary are cryptic. After 30+ routes, I've internalized the rules. But every new developer who touches one of my codebases trips on this within the first hour.",
      },
      {
        type: "p",
        text: "The params pattern changed in Next.js 16 — params became a Promise that needs to be awaited in page components. I discovered this the hard way when my changelog detail pages were 404ing in production. The build succeeded locally but the runtime behavior changed. This kind of breaking change in a minor version is my biggest frustration with the framework's evolution. The fix took two minutes. Finding the cause took an hour.",
      },
      {
        type: "h2",
        text: "Turbopack Changed My Development Speed",
      },
      {
        type: "p",
        text: "Turbopack replaced Webpack as the dev server bundler and the difference is not incremental — it's transformational. My portfolio site with 80+ components starts the dev server in under 2 seconds. Hot module replacement is nearly instant. Switching between pages in the browser feels like navigating a local application, not waiting for a bundler.",
      },
      {
        type: "p",
        text: "For the template development workflow — where I'm constantly tweaking animations, adjusting spacing, testing responsive breakpoints — Turbopack's speed means I see changes as fast as I can save the file. The feedback loop between intention and result is as tight as it can get. This directly translates to build quality because I iterate more, try more variations, and catch visual issues faster.",
      },
      {
        type: "h2",
        text: "Server Components vs Client Components",
      },
      {
        type: "p",
        text: "After shipping 32 routes with mixed server and client components, here's my practical rule: server by default, client when you need interactivity. My blog pages are server components — they fetch data, render HTML, ship zero JavaScript for the content. The reading progress bar is a client component because it needs scroll position. The table of contents highlighting is a client component because it needs intersection observer. The blog text itself? Pure server component. Fast, lightweight, SEO-friendly.",
      },
      {
        type: "p",
        text: "For the design templates, almost everything is a client component because GSAP animations require client-side JavaScript. This is fine — these are showcase pages where animation IS the product. The key insight is knowing which components genuinely need the client and which are server components wearing a 'use client' directive unnecessarily. Every unnecessary 'use client' is JavaScript your user downloads but doesn't need.",
      },
      {
        type: "h2",
        text: "The Metadata API Is Quietly Excellent",
      },
      {
        type: "p",
        text: "Next.js's metadata API is the most underappreciated feature for production applications. Each page exports a generateMetadata function that produces title, description, OpenGraph tags, canonical URLs, and structured data. It's type-safe, composable with the layout hierarchy, and handles edge cases like dynamic routes gracefully.",
      },
      {
        type: "p",
        text: "I generate unique OpenGraph images per blog post using opengraph-image.tsx — a React component that renders to a 1200x630 PNG at build time. Each blog post gets a branded card with its title, category, and read time. When someone shares a link on LinkedIn, the preview card shows the post title on my branded dark background, not a generic fallback. This cost me one file and zero external services.",
      },
      {
        type: "p",
        text: "The SEO infrastructure I've built on the metadata API includes: per-page canonical URLs, OpenGraph tags with article type for blog posts, Twitter cards, JSON-LD structured data (Person, WebSite, ProfessionalService schemas), geo-targeting for Malaysia, and hreflang tags. All of this is defined in TypeScript, type-checked at build time, and composed through the layout hierarchy. Every page automatically inherits the site-level metadata and can override what it needs.",
      },
      {
        type: "h2",
        text: "Deploying on Vercel — The Full Picture",
      },
      {
        type: "p",
        text: "I deploy everything on Vercel because the integration with Next.js is seamless — which makes sense given they make both. Git push triggers a build. Preview deployments for branches. Production deployments for main. Rollback with one click. This workflow is so reliable that I don't think about deployment anymore. It's a solved problem.",
      },
      {
        type: "p",
        text: "The edge network means my site loads fast in Malaysia, in the US, in Europe. The first-byte time is consistently under 200ms globally. For a Malaysian business serving worldwide clients, this matters — a visitor from San Francisco gets the same performance as someone in KL. I didn't configure CDN rules or edge caching. Vercel handles it.",
      },
      {
        type: "p",
        text: "Where Vercel earns its keep beyond hosting: the analytics are useful (Core Web Vitals, page-level performance), the domain management is trivial, and the environment variable system is clean. Where it frustrates: the free tier limits are opaque — you hit them without warning, and the upgrade to Pro is a jump from $0 to $20/month. For client projects, I always budget for Pro from the start.",
      },
      {
        type: "h2",
        text: "Performance in the Real World",
      },
      {
        type: "p",
        text: "My portfolio site scores 90+ on Lighthouse for performance, accessibility, best practices, and SEO. Not because I spent weeks optimising — because Next.js makes the defaults good. Image optimisation with next/image. Automatic code splitting per route. Font optimisation with next/font. Static generation for pages that don't need dynamic data. These are framework-level decisions that benefit every page without per-page effort.",
      },
      {
        type: "p",
        text: "The 88BH e-commerce site is heavier — product images, client-side cart state, dynamic pricing — and still scores 80+ on mobile Lighthouse. The techniques that matter: lazy loading below-the-fold images, prefetching critical routes, keeping the main thread clear of heavy computation. Next.js provides the tools. Using them correctly is still the developer's job.",
      },
      {
        type: "h2",
        text: "Security Headers and CSP",
      },
      {
        type: "p",
        text: "Next.js's next.config.ts supports custom headers per route, and I use this extensively. Every project ships with: Content Security Policy (restricting script, style, font, image, and connection sources), HSTS with preload, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, and a Permissions-Policy that explicitly disables unused browser APIs.",
      },
      {
        type: "p",
        text: "Writing a correct CSP for a Next.js application is non-trivial because of the framework's own requirements. Next.js injects inline scripts for hydration data, which means you need 'unsafe-inline' in your script-src or a nonce-based approach. Tailwind generates styles at build time, but third-party fonts require style-src exceptions. GSAP animations don't need special CSP rules because they manipulate the DOM, not inject scripts. These are details I've learned by debugging CSP violations in production across multiple projects.",
      },
      {
        type: "h2",
        text: "Where Next.js Has Friction",
      },
      {
        type: "p",
        text: "The build output is opaque. When something fails in production that worked in development, debugging the compiled output is painful. Source maps help, but the server component / client component split means errors can originate in places that don't map cleanly to your source code.",
      },
      {
        type: "p",
        text: "Breaking changes between versions are more frequent than I'd like for a framework this widely used. The params Promise change in Next.js 16 broke my changelog pages. The metadata API changed between 14 and 15. The App Router itself was a complete paradigm shift from the Pages Router. Each change is justified, but the migration cost accumulates for someone maintaining 8+ Next.js projects simultaneously.",
      },
      {
        type: "p",
        text: "The bundle size for animation-heavy pages is a genuine concern. GSAP, SplitType, and Lenis add significant JavaScript that runs on the client. For the design templates — where animation is the product — this is acceptable. For content-heavy pages like blog posts, I'm careful to keep animations lightweight and load GSAP only on pages that use it. Next.js's per-route code splitting helps, but the developer has to be intentional about it.",
      },
      {
        type: "h2",
        text: "From a Product Manager's Lens",
      },
      {
        type: "p",
        text: "Next.js is the framework I recommend to clients because of what happens after I leave. The React ecosystem has the largest developer talent pool. TypeScript provides guardrails for whoever maintains the code next. The file-system routing is self-documenting — a new developer can understand the application structure by looking at the folder tree. The deployment is automated through Git. These are product decisions, not technology decisions.",
      },
      {
        type: "p",
        text: "When I scope a project, I can estimate accurately because I know exactly how long each Next.js feature takes to implement. A new route with server-side data: 30 minutes. An API route with validation and error handling: an hour. A dynamic OG image: 45 minutes. Authentication with middleware protection: half a day. This predictability is what makes fixed-price projects profitable.",
      },
      {
        type: "h2",
        text: "From a Developer's Lens",
      },
      {
        type: "p",
        text: "The DX is the best in the React ecosystem. Turbopack's speed, TypeScript-first APIs, the metadata system, the image component, the font optimisation — every major pain point of building React applications has been addressed at the framework level. I spend my time on business logic and design, not on build configuration and performance hacks.",
      },
      {
        type: "p",
        text: "The integration with Claude Code is excellent because Next.js projects have predictable structure. Claude understands the App Router conventions, the metadata API, the server/client component split. When I ask Claude to add a new route, it creates the right files in the right places following the right patterns. Predictable framework conventions make AI-assisted development dramatically more effective.",
      },
      {
        type: "h2",
        text: "What I'd Change",
      },
      {
        type: "p",
        text: "Stable APIs between major versions. The pace of change is impressive from an innovation standpoint and exhausting from a maintenance standpoint. I want to upgrade my projects to get security patches without rewriting how params work.",
      },
      {
        type: "p",
        text: "Better error messages at the server/client boundary. The current errors assume you understand the rendering model deeply. New developers don't, and the error messages don't teach them. A message that says 'you're using useState in a server component — add use client to this file or move the interactive part to a child component' would save thousands of hours across the community.",
      },
      {
        type: "p",
        text: "Despite the friction, I keep choosing Next.js because the alternative is worse. The framework handles the hard problems — routing, rendering, optimisation, deployment — so I can focus on the problems that actually matter: building systems that run businesses.",
      },
      {
        type: "quote",
        text: "The best framework is the one that gets out of your way. Next.js isn't perfect, but it disappears more often than any alternative I've tried.",
      },
    ],
    relatedSlugs: [
      "why-i-build-everything-on-supabase",
      "the-difference-between-vibe-coding-and-building",
    ],
  },
];
