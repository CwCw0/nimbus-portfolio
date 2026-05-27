import type { BlogPost } from "./blog";

export const claudeSeriesPosts: BlogPost[] = [
  /* ═══════════════════════════════════════════════════════════════════
     POST 1: FORGE — BUILDING A BUSINESS OS
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "i-built-a-business-os-before-my-first-client",
    tag: "Development",
    date: "May 27, 2026",
    readTime: "12 min read",
    title: "I Built a Business OS Before I Took My First Client.",
    excerpt:
      "Most freelancers cobble together 8 SaaS tools and pray they talk to each other. I built Forge — a system that runs my entire operation — before I signed a single contract.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    tocItems: [
      "The Problem with Duct Tape",
      "Designing the Architecture First",
      "The Document Engine",
      "The AI Layer",
      "What Claude Code Actually Did",
      "What I Had to Do Myself",
      "Why This Matters",
    ],
    content: [
      {
        type: "p",
        text: "When I registered Nimbus Forma Studio in April 2026, I had zero clients and zero revenue. What I did have was a fully functioning business operating system that tracked clients, generated documents, managed projects, and had an AI assistant that could answer questions about my own business data.",
      },
      {
        type: "p",
        text: "Everyone told me to just use Notion. Or Trello plus Google Sheets plus Calendly plus Wave plus five other tools that sort of integrate if you pay for the right plan and squint hard enough. I'm a developer. I knew exactly what I needed. So I built it.",
      },
      {
        type: "h2",
        text: "The Problem with Duct Tape",
      },
      {
        type: "p",
        text: "The typical freelancer tech stack looks like this: Notion for project management, Google Sheets for finances, Calendly for booking, Wave for invoicing, WhatsApp for client communication, a folder of Word documents for quotes and contracts. Six tools. None of them talk to each other. You're the integration layer — copying data between tabs, reformatting the same information five times, and praying you didn't miss an update somewhere.",
      },
      {
        type: "p",
        text: "I've worked in agencies. I've seen this stack fail at scale. A client's payment status changes in one place but not another. A project milestone gets hit but nobody updates the tracker. An invoice goes out with last month's numbers because someone copy-pasted from the wrong sheet. These aren't edge cases. This is every Tuesday.",
      },
      {
        type: "p",
        text: "I wanted one system. One source of truth. One place where a client moves from lead to active to completed, and everything downstream — documents, invoices, project status — updates automatically.",
      },
      {
        type: "h2",
        text: "Designing the Architecture First",
      },
      {
        type: "p",
        text: "Before I wrote a single line of code, I spent three days on architecture. Not because I enjoy architecture diagrams — because I've shipped enough projects to know that the most expensive bugs live in bad architecture, not bad code.",
      },
      {
        type: "p",
        text: "I mapped every data flow. Client comes in as a lead. Lead converts to active project. Active project has line items, milestones, payment schedules. Each milestone triggers a status update. Each payment triggers a financial record. A completed project moves to the archive but stays queryable. I drew this on paper first. No code. No AI. Just thinking about how a business actually runs.",
      },
      {
        type: "p",
        text: "Then I chose the stack. Next.js because it's what I know deeply and what I ship client projects on — dogfooding my own tools. Supabase for the database because PostgreSQL is battle-tested, row-level security means I can enforce data access at the database layer, and the real-time subscriptions let me build a dashboard that updates live. React Flow for the visual workspace because I wanted to see project dependencies as a graph, not a list.",
      },
      {
        type: "p",
        text: "The architecture decision I'm most proud of: the document engine. Instead of generating PDFs programmatically — which always look terrible — I designed 27 HTML templates with a placeholder token system. Every template uses {{CLIENT_NAME}}, {{PROJECT_TOTAL}}, {{LINE_ITEMS}} tokens that get replaced at generation time. The output is a styled HTML document that I export to PDF through the browser's print engine. The documents look designed because they are designed — they're HTML and CSS, the same tools I use to build websites.",
      },
      {
        type: "h2",
        text: "The Document Engine",
      },
      {
        type: "p",
        text: "27 templates covering the entire client lifecycle. Pre-sale: capability deck, proposal, quote. Onboarding: welcome email, scope document, timeline. During the project: progress report, change request, milestone approval. Delivery: handoff checklist, documentation guide, training notes. Post-project: feedback form, testimonial request, maintenance proposal. Each one follows the Nimbus V6 design system — same fonts, same colors, same spacing. When a client receives a document from me, it looks like it came from a studio with a design team. It came from one developer with a system.",
      },
      {
        type: "p",
        text: "The key insight: I don't decide what to send when. The system decides. A project hits the 'design approved' milestone? The scope confirmation document generates. A payment comes in? The receipt generates and the project tracker updates the financial summary. I'm not managing documents. I'm managing a business, and the documents happen as a side effect.",
      },
      {
        type: "h2",
        text: "The AI Layer",
      },
      {
        type: "p",
        text: "Forge has an AI chat panel powered by Google's Gemini API on the free tier. But it's not a generic chatbot. It has context about my actual business data — active clients, project statuses, revenue figures, upcoming deadlines. I can ask it 'which projects are behind schedule?' or 'what's my outstanding receivables total?' and it queries my data and responds with real numbers.",
      },
      {
        type: "p",
        text: "The implementation is straightforward: I inject a system prompt with serialised business context from the database, then let Gemini handle the natural language interface. The free tier gives me 15 requests per minute and a million tokens per day. For a solo business owner checking in on their data a few times a day, that's unlimited for practical purposes.",
      },
      {
        type: "p",
        text: "The cost of running AI in my business OS: zero ringgit per month. The value: I can get a business health check in 10 seconds instead of opening three tabs and doing mental arithmetic.",
      },
      {
        type: "h2",
        text: "What Claude Code Actually Did",
      },
      {
        type: "p",
        text: "Here's where I want to be precise, because the narrative around AI-assisted development is usually either 'AI wrote everything' or 'AI is useless.' Neither is true.",
      },
      {
        type: "p",
        text: "Claude Code built the implementation. The 27 HTML templates — I designed the first three, established the design system tokens, defined the placeholder convention. Then Claude generated the remaining 24 following the patterns I'd set. Each one needed review. About half needed tweaks to spacing or content flow. But the generation-to-review workflow was dramatically faster than writing each template from scratch.",
      },
      {
        type: "p",
        text: "The webhook notification system — I described the architecture: when a status changes in the database, fire a POST to a local endpoint that triggers a UI update via server-sent events. Claude implemented the entire pipeline. The webhook handler, the event emitter, the client-side listener, the reconnection logic. I reviewed the code, tested the edge cases, caught one race condition where rapid status changes could fire duplicate events. Fixed that. Shipped it.",
      },
      {
        type: "p",
        text: "The Supabase schema with row-level security policies — I defined which roles can access which data. Claude translated those rules into PostgreSQL RLS policies. This is exactly the kind of work where AI excels: translating a clear specification into correct syntax. The specification was mine. The syntax was Claude's.",
      },
      {
        type: "h2",
        text: "What I Had to Do Myself",
      },
      {
        type: "p",
        text: "Architecture. Every decision about what data lives where, what connects to what, what triggers what — that was me. Claude doesn't know how my business runs. It doesn't know that a Malaysian freelancer needs 50/25/25 payment milestones or that SSM registration numbers follow a specific format. It doesn't know that my clients communicate primarily through WhatsApp and expect responses within hours. These domain decisions shaped the entire system.",
      },
      {
        type: "p",
        text: "Prioritisation. Forge could have a hundred features. I built the ones that matter for a solo operation in its first year. Client pipeline. Document generation. Project tracking. Financial overview. That's it. No team management module. No resource allocation. No Gantt charts. A product manager makes these scoping decisions by understanding the user — and in this case, the user is me. Claude can build anything you ask it to. Knowing what not to ask it to build is the actual skill.",
      },
      {
        type: "p",
        text: "Quality assurance. Every component Claude generated, I tested. Not just 'does it render' — does it handle the edge case where a client has no projects yet? Does the financial summary show the right numbers when a payment is partially refunded? Does the document template break when the project has 15 line items instead of 5? These aren't things you can delegate. They require understanding the business logic at a level that only comes from having designed it.",
      },
      {
        type: "h2",
        text: "Why This Matters",
      },
      {
        type: "p",
        text: "I built Forge before taking my first client because I believe you should use what you sell. When I tell a client 'I'll build you a custom system that replaces your spreadsheets,' I'm not theorising. I'm describing my daily experience. Every feature in Forge has been tested by daily use. Every workflow has been refined by actual business operations.",
      },
      {
        type: "p",
        text: "And when I build their system, the architecture decisions come from the same thinking. What data flows where. What triggers what. What the user actually needs versus what sounds impressive in a proposal. That thinking isn't something I learned from a tutorial. It's something I learned by building a system I depend on every single day.",
      },
      {
        type: "quote",
        text: "The tool doesn't make you a builder. Being a builder makes the tool useful.",
      },
    ],
    relatedSlugs: [
      "shipping-ecommerce-as-solo-developer",
      "the-difference-between-vibe-coding-and-building",
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     POST 2: 88BH — SHIPPING E-COMMERCE SOLO
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "shipping-ecommerce-as-solo-developer",
    tag: "Development",
    date: "Jun 3, 2026",
    readTime: "14 min read",
    title: "Shipping a Full E-Commerce System as a Solo Developer.",
    excerpt:
      "A real client. Real money. Real deadlines. How one developer ships what normally takes a team — not by letting AI do everything, but by knowing what to delegate and what to own.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    tocItems: [
      "The Brief",
      "The Scope Nobody Warns You About",
      "Payment Integration in Malaysia",
      "The Admin Dashboard Nobody Sees",
      "The Stringing Service Problem",
      "Security Is Not Optional",
      "Where AI Accelerated and Where I Stepped In",
      "What Shipping Looks Like",
    ],
    content: [
      {
        type: "p",
        text: "88 Badminton House is a premium sports retailer in KL. They needed an online store. What they actually needed was a system — product catalog, checkout, payment processing, admin dashboard, customer management, order tracking, and a walk-in stringing service tool that tracks client racket preferences. One developer. Full stack. Production.",
      },
      {
        type: "p",
        text: "This isn't a tutorial project. There's a deposit in my bank account. There's a client checking in every week. There's a launch date. The constraints are real, and real constraints produce better software than infinite timelines ever do.",
      },
      {
        type: "h2",
        text: "The Brief",
      },
      {
        type: "p",
        text: "The client's existing business runs on WhatsApp messages and a physical store. Customers ask about product availability via WhatsApp. The owner checks stock manually. Orders are tracked in a notebook. Stringing jobs — restringing badminton rackets with specific string types and tensions — are managed by memory and sticky notes.",
      },
      {
        type: "p",
        text: "The website isn't the product. The system behind it is. The website is the interface that customers see. Behind it: real-time inventory that updates when orders come in, an admin panel where the owner manages everything from one screen, and a stringing service tracker that remembers every client's racket preferences so they don't have to repeat themselves every visit.",
      },
      {
        type: "h2",
        text: "The Scope Nobody Warns You About",
      },
      {
        type: "p",
        text: "When a client says 'I need an online store,' they're imagining the storefront. Products on a page, a cart, a checkout button. That's maybe 30% of the actual work.",
      },
      {
        type: "p",
        text: "The other 70%: authentication system for admin access. Role-based permissions. Order state machine (pending → paid → ready → shipped → completed, with branches for cancellation and refunds). Email notifications at each state transition. Webhook handlers for payment confirmations. Rate limiting on public endpoints. CSRF protection. Input validation and sanitisation on every form. Admin dashboard with filtering, search, and pagination. Customer CRM with order history and lifetime value tracking. And the database schema that connects all of it — 12 tables with proper foreign keys, indexes, and constraints.",
      },
      {
        type: "p",
        text: "If you quote only for the storefront, you'll eat the other 70% at your own expense. I know because I've seen agencies do exactly that. I scoped every line item before sending the quote. Fixed price. Fixed scope. No surprises for either side.",
      },
      {
        type: "h2",
        text: "Payment Integration in Malaysia",
      },
      {
        type: "p",
        text: "This is where being a Malaysian developer building for Malaysian businesses matters. You can't just plug in Stripe. Stripe doesn't support Malaysian ringgit for domestic transactions the way local payment gateways do. Malaysian customers expect FPX (direct bank transfer), Touch 'n Go, GrabPay, ShopeePay, Boost. These are the payment methods people actually use here.",
      },
      {
        type: "p",
        text: "I chose Revenue Monster — a Malaysian payment gateway that supports all of these methods through a single API. The integration wasn't trivial. OAuth2 authentication with RSA-signed requests. Webhook verification using HMAC-SHA256 signatures. Token refresh management with in-memory caching. Sandbox vs production environment switching.",
      },
      {
        type: "p",
        text: "There are no tutorials for this. Revenue Monster's documentation is decent but sparse. No Stack Overflow threads. No YouTube walkthroughs. No 'Revenue Monster + Next.js' starter template. I read the API docs, examined the authentication flow, built the integration from the specification. Claude Code helped implement the OAuth2 token management and webhook signature verification — but I had to understand the flow first and validate that the implementation matched the spec. The API docs were my source of truth, not Claude's training data.",
      },
      {
        type: "h2",
        text: "The Admin Dashboard Nobody Sees",
      },
      {
        type: "p",
        text: "Customers see a beautiful storefront. The owner sees a dashboard that runs their business. Orders with status badges, filterable by state. Click into an order: customer details, line items, payment status, shipping information, stringing requests, timeline of every state change. Customer list with search, tags, order count, lifetime spend. Product management with variants, pricing, stock levels, images.",
      },
      {
        type: "p",
        text: "The admin authentication is custom — not NextAuth, not Supabase Auth. JWT tokens with bcrypt-hashed passwords, HTTP-only cookies with SameSite=Strict, 8-hour expiry, rate-limited login (5 attempts per 15 minutes), and constant-time password comparison to prevent timing attacks. I built this because I wanted full control over the auth flow and because the admin panel handles sensitive business data — customer PII, financial records, inventory. Off-the-shelf auth is fine for most cases. For an admin panel that manages real money, I want to understand every line.",
      },
      {
        type: "h2",
        text: "The Stringing Service Problem",
      },
      {
        type: "p",
        text: "This is my favourite part of the build because it's the part no template handles. 88 Badminton House offers racket stringing as a walk-in service. A customer brings in their racket, chooses a string type, specifies tension (main and cross, separately), and picks it up later. Some customers come back monthly. They always want the same string at the same tension for the same racket.",
      },
      {
        type: "p",
        text: "I built a stringing client database. Each client has saved racket profiles — racket model, preferred string, preferred tensions, pre-stretch percentage. When they walk in, the owner pulls up their profile and creates a job with one click. Their preferences are pre-filled. The job enters a queue with status tracking (pending → strung → collected), priority levels (normal, urgent, rush), and links back to the customer profile.",
      },
      {
        type: "p",
        text: "This feature wasn't in the original brief. It came from understanding the business. I asked the client: 'What's the most repetitive part of your day?' The answer was remembering stringing preferences and manually tracking jobs on paper. So I built the solution. This is the difference between a developer who codes to spec and a developer who understands the business they're building for.",
      },
      {
        type: "h2",
        text: "Security Is Not Optional",
      },
      {
        type: "p",
        text: "This system handles customer names, emails, phone numbers, shipping addresses, and payment references. Under Malaysia's Personal Data Protection Act (PDPA), I have legal obligations to protect this data. Security isn't a feature I add if there's time. It's the foundation I build on.",
      },
      {
        type: "p",
        text: "Content Security Policy headers that restrict which scripts, styles, and connections the browser allows. HTTP Strict Transport Security forcing HTTPS. X-Frame-Options denying iframe embedding. Rate limiting on every public-facing endpoint — checkout, contact form, newsletter signup, admin login. CSRF protection validating Origin and Referer headers. Input validation with strict schemas before any data touches the database. Audit logging on admin actions.",
      },
      {
        type: "p",
        text: "I also built a PDPA-compliant privacy policy that documents exactly what data is collected, why, how it's stored, who it's shared with, and how customers can exercise their rights. Not a template copied from the internet — a policy written specifically for this site's actual data flows, reviewed against the 2024 PDPA amendments.",
      },
      {
        type: "h2",
        text: "Where AI Accelerated and Where I Stepped In",
      },
      {
        type: "p",
        text: "Claude Code accelerated the implementation dramatically. The admin dashboard — 15+ pages of CRUD interfaces, filters, search, status badges — would have taken weeks to build manually. With Claude, I described the data model and the UI patterns I wanted, reviewed the output, and iterated. Most of it was right on the first pass. The parts that weren't were always business logic edge cases: what happens when an order is partially refunded, how the stock count updates when a cancelled order is restored, what the stringing job status should be if the linked order is cancelled.",
      },
      {
        type: "p",
        text: "These edge cases are where I stepped in. Not because Claude can't handle conditional logic — it can. But because the correct behavior in these scenarios is a business decision, not a technical one. Should a cancelled order restore stock automatically? The client said yes. Should a stringing job be cancelled if the linked order is cancelled? The client said no — the racket is already in the shop. These decisions require understanding the business, not understanding code.",
      },
      {
        type: "p",
        text: "The Revenue Monster integration is where I did the most manual work. Claude had general knowledge of OAuth2 flows and webhook verification, but the specific implementation details — RSA signature generation, the exact header format Revenue Monster expects, the sandbox vs production URL switching — required reading the actual documentation and testing against the actual API. AI is trained on public knowledge. Niche Malaysian payment gateway integration details aren't well-represented in any training dataset.",
      },
      {
        type: "h2",
        text: "What Shipping Looks Like",
      },
      {
        type: "p",
        text: "Shipping isn't deploying to Vercel and sending a link. Shipping is the client logging into their admin panel for the first time and understanding what they're looking at. It's the documentation that explains every feature. It's the 30-day support window where I fix anything that breaks in real-world usage. It's the handoff where the client owns the code, owns the data, and can hire any developer to maintain it if they want to.",
      },
      {
        type: "p",
        text: "One developer built this. Not a team. Not an agency. One person who understands the technology, understands the business, and has a tool that makes the execution faster without replacing the thinking. That's the model. That's what I'm proving is possible.",
      },
      {
        type: "quote",
        text: "A solo developer with the right tools and the right process can ship what used to require a team. The tools changed. The thinking didn't.",
      },
    ],
    relatedSlugs: [
      "i-built-a-business-os-before-my-first-client",
      "security-isnt-a-feature-its-the-baseline",
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     POST 3: 14 REPOS — DEVELOPER HYGIENE
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "14-repos-741-leaked-files",
    tag: "Development",
    date: "Jun 10, 2026",
    readTime: "10 min read",
    title: "14 Repositories, 741 Leaked Files, and Why Developer Hygiene Matters.",
    excerpt:
      "I was building fast. Shipping fast. Then I checked what was actually public on GitHub and found my entire internal process exposed across 14 repositories.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
    tocItems: [
      "Building Fast, Forgetting Fundamentals",
      "The Audit",
      "What I Found",
      "Working with Multiple Roles",
      "The Cleanup",
      "The Gold Standard",
      "The Principle",
    ],
    content: [
      {
        type: "p",
        text: "I had 14 git repositories across personal projects, client work, and products. All on GitHub. All public or pushed to remote. And across those 14 repos, I found internal process documents, skill configurations, planning artifacts, and tool settings that had no business being visible to anyone but me.",
      },
      {
        type: "p",
        text: "Not secrets. Not API keys. But something arguably worse for a professional operation: my entire internal workflow, exposed. The tools I use, the methodology I follow, the planning documents I write before building. My workshop was on display. Only the products should be.",
      },
      {
        type: "h2",
        text: "Building Fast, Forgetting Fundamentals",
      },
      {
        type: "p",
        text: "When you're a solo developer shipping across multiple projects simultaneously, the pressure is to build. Get the feature done. Push the commit. Move to the next thing. Git hygiene falls to the bottom of the priority list because it doesn't ship features. Nobody notices a clean .gitignore. Everyone notices a broken checkout flow.",
      },
      {
        type: "p",
        text: "I was using Claude Code across every project. I had skill configurations for different roles — I'd step into a product manager mindset to write PRDs, an architect mindset to design systems, a QA mindset to review my own work. These configurations, along with planning documents, architecture decisions, and internal notes, were all sitting in directories that git was happily tracking and pushing to GitHub.",
      },
      {
        type: "h2",
        text: "The Audit",
      },
      {
        type: "p",
        text: "I didn't discover this through a security alert or a client complaint. I discovered it through my own checklist. Part of my process is a periodic review of what's public vs what should be private. I ran a scan across every repository: what's tracked in git that shouldn't be? What's visible on GitHub that's meant to be local?",
      },
      {
        type: "p",
        text: "The command is simple: git ls-files --cached piped through a grep for known internal directories and filenames. Run it across every repo. Count the results. The number I got back: 740+ tracked files across the worst offender alone, and scattered internal documents across 8 other repositories.",
      },
      {
        type: "h2",
        text: "What I Found",
      },
      {
        type: "p",
        text: "One repository had 741 files of internal tooling tracked and pushed to GitHub. Skill configurations, planning artifacts, agent role definitions, customisation files. Another had internal product documents (design briefs, product specs) committed alongside the source code. Two client-facing repositories had my project management documents tracked — files that contain internal notes about scope, pricing strategy, and client communication.",
      },
      {
        type: "p",
        text: "None of this is catastrophic. But all of it is unprofessional. A client browsing the repository of the system I built for them shouldn't find my internal planning notes. A potential employer reviewing my GitHub shouldn't see my skill configurations and process documents. The code is the deliverable. The process behind it is mine.",
      },
      {
        type: "h2",
        text: "Working with Multiple Roles",
      },
      {
        type: "p",
        text: "Part of how I work as a solo developer is wearing multiple hats deliberately. Not just switching between coding and designing — actually stepping into distinct roles with distinct thinking modes.",
      },
      {
        type: "p",
        text: "When I'm scoping a project, I think like a product manager. I write the requirements document. I define what's in scope, what's out, what the success criteria are. Then I challenge my own document — is this actually what the client needs, or what I think would be fun to build? I debate with myself. I justify decisions. I cut features that don't serve the core goal.",
      },
      {
        type: "p",
        text: "When I'm designing the system, I think like an architect. What are the data flows? Where are the boundaries? What happens at scale? What's the failure mode? I use Claude Code as a sounding board here — I present my architecture and ask it to challenge my assumptions. Sometimes it finds things I missed. Sometimes I disagree and explain why my approach is better for this specific context. It's a back-and-forth, not a one-way instruction.",
      },
      {
        type: "p",
        text: "When I'm reviewing code, I think like QA. Not just 'does it work' but 'what happens when the input is unexpected, the network is slow, the user does something I didn't anticipate.' I run through edge cases systematically. I check security implications. I verify that error states are handled gracefully, not just logged and ignored.",
      },
      {
        type: "p",
        text: "I also use Claude's design capabilities to think through visual problems — layout decisions, component hierarchy, information architecture. It's another thinking partner in a different domain. The combination of code-level assistance and design-level thinking means I'm not just building faster, I'm making better decisions across more dimensions than a single perspective allows.",
      },
      {
        type: "p",
        text: "All of these roles generate artifacts. Documents, configurations, decision logs, review notes. These artifacts are invaluable for my process. They're also completely irrelevant to anyone cloning my repository. They needed to be gitignored from day one. They weren't.",
      },
      {
        type: "h2",
        text: "The Cleanup",
      },
      {
        type: "p",
        text: "I used Claude Code to execute the cleanup because the task was well-defined and repetitive: for each of 14 repositories, check what's tracked that shouldn't be, untrack it with git rm --cached, update the .gitignore, commit, push. The audit and execution took one session. 741 files purged from the worst repository alone. Internal documents removed from 5 others. Gitignore rules applied to all 14.",
      },
      {
        type: "p",
        text: "I also set up a global gitignore at ~/.config/git/ignore for OS and IDE files — .DS_Store, Thumbs.db, .vscode settings, .idea directories. Following GitHub's official recommendation: machine-specific junk belongs in the global config, not repeated in every project.",
      },
      {
        type: "h2",
        text: "The Gold Standard",
      },
      {
        type: "p",
        text: "Every repository now has the same internal tooling block in its .gitignore. The comment says 'Internal tooling' — not 'AI tooling' or 'Claude settings.' The language is neutral because the principle is universal: your process is yours. Your deliverable is the client's. The gitignore is the boundary between workshop and showroom.",
      },
      {
        type: "p",
        text: "I also built a sanitisation checklist that runs before every push: verify gitignore entries exist, verify nothing internal is tracked (git ls-files --cached piped through known patterns), verify no process references in code comments, verify git history is clean. It takes 30 seconds and prevents the kind of slow leak that accumulates over months.",
      },
      {
        type: "h2",
        text: "The Principle",
      },
      {
        type: "p",
        text: "If you're a developer using AI tools — any AI tools — your .gitignore is a professional boundary. The code you push should be indistinguishable from code written without AI assistance. Not because there's anything wrong with using AI. But because the client paid for a solution, not a behind-the-scenes documentary of how it was built.",
      },
      {
        type: "p",
        text: "Build fast. Ship often. But check what's public. Your process is your competitive advantage. Don't give it away for free in a git commit.",
      },
      {
        type: "quote",
        text: "The code is the deliverable. The process behind it is yours. The gitignore is the boundary.",
      },
    ],
    relatedSlugs: [
      "security-isnt-a-feature-its-the-baseline",
      "shipping-ecommerce-as-solo-developer",
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     POST 4: SECURITY AS BASELINE
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "security-isnt-a-feature-its-the-baseline",
    tag: "Development",
    date: "Jun 17, 2026",
    readTime: "11 min read",
    title: "Security Isn't a Feature. It's the Baseline.",
    excerpt:
      "Every week I see another vibe-coded app with no rate limiting, no CSP headers, and env files committed to GitHub. Security isn't Phase 2. It's line one.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80",
    tocItems: [
      "The Vibe Coding Problem",
      "What I Ship by Default",
      "Content Security Policy — The Most Ignored Header",
      "Rate Limiting — Your First Line of Defence",
      "Authentication Done Right",
      "Compliance Is Not Optional",
      "The Checklist",
    ],
    content: [
      {
        type: "p",
        text: "Every week I read about another app that got compromised because the developer skipped security fundamentals. Not sophisticated zero-day exploits. Basic stuff. API keys committed to GitHub. No rate limiting on login endpoints. SQL injection through unsanitised form inputs. Environment variables exposed in client-side bundles.",
      },
      {
        type: "p",
        text: "The common thread: developers who treated security as something to add later. Phase 2. Post-launch. When there's time. There's never time. So it never gets added. And then someone finds the .env file in the public repo.",
      },
      {
        type: "h2",
        text: "The Vibe Coding Problem",
      },
      {
        type: "p",
        text: "The rise of AI-assisted development has made it incredibly easy to build things fast. It's also made it incredibly easy to build things that are fast and insecure. When you're prompting an AI to 'build me a login system,' the output will probably work. It will probably not have rate limiting, constant-time password comparison, secure cookie flags, or CSRF protection. Because you didn't ask for those things. And the AI optimised for what you asked for: a login system that works.",
      },
      {
        type: "p",
        text: "This is the fundamental problem with vibe coding. The output matches the input. If your input is vague on security, the output will be vague on security. The developer's job isn't to write the code — it's to know what the code should do, including the parts that aren't exciting, aren't visible, and aren't fun to implement.",
      },
      {
        type: "h2",
        text: "What I Ship by Default",
      },
      {
        type: "p",
        text: "Every project I deploy — client work, personal products, everything — ships with the same security baseline. This isn't a checklist I consult sometimes. It's the starting configuration. The default. The floor below which nothing ships.",
      },
      {
        type: "ol",
        text: "",
        items: [
          "Content Security Policy headers — restricting which scripts, styles, fonts, images, and connections the browser allows. If a malicious script somehow gets injected into the page, CSP prevents it from executing or phoning home.",
          "HTTP Strict Transport Security (HSTS) — forcing HTTPS with a max-age of 2 years, including subdomains, with preload. Once a browser sees this header, it will never attempt an HTTP connection to your domain again.",
          "X-Content-Type-Options: nosniff — preventing the browser from MIME-type sniffing, which can turn an innocent-looking file into an executable script.",
          "X-Frame-Options: DENY — preventing your site from being embedded in an iframe, which blocks clickjacking attacks entirely.",
          "Referrer-Policy: strict-origin-when-cross-origin — controlling what URL information is sent when navigating away from your site.",
          "Permissions-Policy — explicitly disabling browser APIs you don't use: camera, microphone, geolocation. If your site doesn't need the camera, say so. Don't leave it as an available attack surface.",
        ],
      },
      {
        type: "h2",
        text: "Content Security Policy — The Most Ignored Header",
      },
      {
        type: "p",
        text: "CSP is the single most effective defence against cross-site scripting (XSS) and it's the header I see missing most often. A proper CSP tells the browser exactly which sources are trusted for scripts, styles, fonts, images, and network connections. Everything else gets blocked.",
      },
      {
        type: "p",
        text: "For the 88 Badminton House project, the CSP allows scripts only from the site itself and specific trusted sources. Styles from the site and the font provider. Images from the site, Supabase storage, and Unsplash (for default product images). Connections to the payment gateway, email service, and real-time database. Frame sources: none. Object sources: none. Everything else: denied by default.",
      },
      {
        type: "p",
        text: "Writing a CSP that works without breaking your site takes effort. You need to know every external resource your application loads. Every font CDN. Every analytics script. Every payment gateway callback URL. Most developers skip it because it's tedious and because a misconfigured CSP breaks visible functionality. But a missing CSP means any XSS vulnerability becomes a full compromise. The tedium is worth it.",
      },
      {
        type: "h2",
        text: "Rate Limiting — Your First Line of Defence",
      },
      {
        type: "p",
        text: "Every public-facing endpoint that accepts user input gets rate limited. Login: 5 attempts per 15 minutes per IP. Contact form: 5 submissions per hour. Newsletter signup: 3 per hour. Checkout: 10 per hour. These limits are generous enough that legitimate users never hit them and restrictive enough that automated attacks are throttled before they cause damage.",
      },
      {
        type: "p",
        text: "The implementation uses in-memory rate limiting — simple, effective, zero external dependencies. For a solo developer's client projects running on Vercel's serverless infrastructure, this is pragmatic. For a high-traffic application running across multiple instances, you'd want Redis-backed rate limiting. I know when to use which. That decision-making is what separates a developer from someone who copies a tutorial.",
      },
      {
        type: "h2",
        text: "Authentication Done Right",
      },
      {
        type: "p",
        text: "The 88BH admin authentication is custom-built. Not because off-the-shelf auth is bad — NextAuth and Supabase Auth are both excellent. But because this admin panel manages customer PII, financial records, and inventory data. I wanted full control and full understanding of every line in the auth flow.",
      },
      {
        type: "p",
        text: "Passwords hashed with bcrypt at 12 salt rounds. JWT tokens signed with HS256, carrying user ID, email, role, and a unique token ID for revocation. HTTP-only cookies — JavaScript cannot read them, which makes them immune to XSS theft. SameSite=Strict — the cookie is never sent on cross-site requests, blocking CSRF. Secure flag in production — the cookie only transmits over HTTPS. 8-hour expiry — long enough for a work session, short enough to limit damage if compromised.",
      },
      {
        type: "p",
        text: "One detail most developers miss: constant-time password comparison. If a user submits an email that doesn't exist, the normal flow would return immediately — 'user not found.' But the timing difference between 'user not found' (instant) and 'wrong password' (bcrypt comparison takes ~100ms) leaks information about which emails are registered. So I always run a bcrypt comparison, even on non-existent users, using a dummy hash. The response time is identical regardless of whether the email exists. This prevents timing-based user enumeration.",
      },
      {
        type: "h2",
        text: "Compliance Is Not Optional",
      },
      {
        type: "p",
        text: "Malaysia's Personal Data Protection Act (PDPA) isn't a suggestion. It's law. The 2024 amendments introduced mandatory breach notification, penalties up to RM 1 million, and enhanced requirements for data processing disclosure. If your website collects a name and an email address — which every contact form does — you have obligations.",
      },
      {
        type: "p",
        text: "For both my portfolio site and the 88BH client project, I built PDPA-compliant privacy policies. Not templates downloaded from the internet — policies written specifically for each site's actual data collection. I audited every form, every analytics service, every third-party integration, every cookie and localStorage entry. Then I documented what data is collected, why, how it's stored, who it's shared with, how long it's retained, and how users can exercise their rights. The PDPA requires a 21-day response window for data access requests. The policy states this explicitly.",
      },
      {
        type: "p",
        text: "I used Claude Code to help research the PDPA requirements — fetching the actual legislation text and the 2024 amendment details from official Malaysian government sources. But the decision about what to include, how to frame the third-party disclosures, and how to structure the data retention policy came from understanding the specific context of each site. The same tool, applied with domain knowledge, produces compliance. Applied without it, it produces a generic template that may not cover your actual obligations.",
      },
      {
        type: "h2",
        text: "The Checklist",
      },
      {
        type: "p",
        text: "Every project ships with this verified: CSP headers configured and tested. HSTS enabled with preload. Rate limiting on all public endpoints. Authentication with secure cookie flags and constant-time comparison. Input validation with strict schemas. CSRF protection on state-changing operations. Environment variables for all secrets — never hardcoded, never committed. Privacy policy matching actual data collection. Gitignore preventing internal tooling from leaking.",
      },
      {
        type: "p",
        text: "This isn't impressive. This is the minimum. The fact that it would be impressive at most agencies and for most freelancers tells you everything about the state of web security in 2026.",
      },
      {
        type: "quote",
        text: "Security is not something you add to finished software. It's something you build finished software on top of.",
      },
    ],
    relatedSlugs: [
      "shipping-ecommerce-as-solo-developer",
      "14-repos-741-leaked-files",
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     POST 5: VIBE CODING VS BUILDING
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "the-difference-between-vibe-coding-and-building",
    tag: "Process",
    date: "Jun 24, 2026",
    readTime: "13 min read",
    title: "The Difference Between Vibe Coding and Building.",
    excerpt:
      "Vibe coding is asking AI to build something and hoping it works. Building is knowing what you want, understanding why, and using AI to get there faster. The gap between them is everything.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80",
    tocItems: [
      "What Vibe Coding Looks Like",
      "What Building Looks Like",
      "The Pipeline",
      "Being Every Role",
      "Fighting Your Own Decisions",
      "Where AI Fits in This Process",
      "The Output Is Different",
    ],
    content: [
      {
        type: "p",
        text: "There's a term floating around developer circles: vibe coding. It means using AI to generate code based on loose descriptions, accepting the output, and moving on. 'Build me a dashboard.' 'Add a login page.' 'Make it look modern.' The AI generates something. It compiles. It kind of works. Ship it.",
      },
      {
        type: "p",
        text: "I use AI every day. Claude Code is my primary development tool. And what I do is not vibe coding. The distinction matters — not as gatekeeping, but because the output quality is fundamentally different, and the difference comes from what happens before the first line of code is written.",
      },
      {
        type: "h2",
        text: "What Vibe Coding Looks Like",
      },
      {
        type: "p",
        text: "Open a chat. Type: 'Build me an e-commerce site with a product catalog, shopping cart, and checkout.' Get back 500 lines of code. It renders. Products show up. Cart works. Checkout has fields. Deploy it. Done?",
      },
      {
        type: "p",
        text: "Done if you don't care about: what happens when two people buy the last item simultaneously. How the stock count updates on cancellation. Whether the checkout form validates Malaysian phone number formats. What the admin sees when they need to issue a partial refund. How the payment webhook handles duplicate notifications. What Content Security Policy headers you need. Whether the login endpoint is rate-limited. How customer data is stored, who can access it, and whether you're compliant with local data protection law.",
      },
      {
        type: "p",
        text: "Vibe coding produces demos. Building produces systems.",
      },
      {
        type: "h2",
        text: "What Building Looks Like",
      },
      {
        type: "p",
        text: "Before I write code — before I prompt any AI — I do the work that determines whether the code will be worth writing.",
      },
      {
        type: "p",
        text: "I start as a product manager. What problem are we solving? Who is the user? What does success look like? What are the constraints — budget, timeline, technical limitations? What's in scope and, critically, what's out of scope? I write this down. A proper requirements document with user stories, acceptance criteria, and explicit boundaries. Not because I enjoy documentation — because I've shipped enough projects to know that the most expensive changes happen when you're building the wrong thing.",
      },
      {
        type: "p",
        text: "Then I shift to architect. Given these requirements, what's the system design? What are the data models? What are the API boundaries? Where does state live? What are the failure modes? What happens at 10x the expected load? I draw this on paper. I think about it in the shower. I argue with myself about whether PostgreSQL or SQLite is the right choice for this specific project with this specific deployment target.",
      },
      {
        type: "p",
        text: "Then UX. How does the user move through this system? What do they see first? Where do they get stuck? What's the minimal path from landing on the page to completing their goal? How does it work on a phone in bright sunlight with one thumb? I think through every screen, every interaction, every error state.",
      },
      {
        type: "p",
        text: "Only then do I build. And when I build, I have a spec. I have data models. I have user flows. I have acceptance criteria. The AI gets context, not vibes.",
      },
      {
        type: "h2",
        text: "The Pipeline",
      },
      {
        type: "p",
        text: "My development pipeline has distinct phases, each with different thinking and different outputs:",
      },
      {
        type: "ol",
        text: "",
        items: [
          "Discovery — understand the problem, the user, the constraints. Output: requirements document with scope boundaries.",
          "Architecture — design the system, data models, API contracts, security model. Output: architecture decision records.",
          "Design — user flows, component hierarchy, responsive breakpoints, accessibility requirements. Output: design specification.",
          "Implementation — write the code, build the features, integrate the services. This is where AI accelerates dramatically.",
          "Review — test edge cases, verify security, validate against requirements, check performance. Output: a list of things to fix.",
          "Ship — deploy, monitor, document, hand off. Output: a working system with documentation.",
        ],
      },
      {
        type: "p",
        text: "AI is most powerful in phase 4. It's useful in phases 2 and 3 as a thinking partner. It's nearly useless in phase 1 because discovery requires understanding a specific business, a specific user, a specific context — not generating generic requirements. The entire pipeline matters. Skipping to phase 4 is vibe coding.",
      },
      {
        type: "h2",
        text: "Being Every Role",
      },
      {
        type: "p",
        text: "As a solo developer, I don't have a product manager, an architect, a designer, and a QA engineer. I am all of them. But I don't try to be all of them simultaneously. I context-switch deliberately.",
      },
      {
        type: "p",
        text: "When I'm wearing the PM hat, I'm thinking about user value and scope. When I'm wearing the architect hat, I'm thinking about data flow and system boundaries. When I'm reviewing, I'm actively trying to break what I just built. These are different modes of thinking, and conflating them produces mediocre output across all dimensions.",
      },
      {
        type: "p",
        text: "I use Claude Code as a counterpart in each role. As a PM, I present my requirements and ask Claude to challenge the scope — are there features I'm including that don't serve the core goal? As an architect, I present my design and ask Claude to find weaknesses — what happens when this service is unavailable? As QA, I ask Claude to enumerate edge cases I might have missed. It's not always right. Sometimes I disagree and explain why. Sometimes it convinces me. The back-and-forth is the value, not the initial output.",
      },
      {
        type: "h2",
        text: "Fighting Your Own Decisions",
      },
      {
        type: "p",
        text: "The hardest part of being a solo developer isn't writing code. It's challenging your own decisions when there's nobody else in the room to push back.",
      },
      {
        type: "p",
        text: "I've learned to argue with myself explicitly. I write a scope document. Then I read it as if I'm the client and ask: 'Is this what I actually need, or is this what the developer wants to build?' I design an architecture. Then I read it as if I'm a junior developer who has to maintain it: 'Would I understand this in six months?' I price a project. Then I check it against the value delivered: 'Would I pay this?'",
      },
      {
        type: "p",
        text: "Using Claude as a sounding board makes this more rigorous. I can present my architecture and ask for a critique. I can present my pricing rationale and ask where the weaknesses are. I can present my scope and ask what I'm missing. The AI doesn't have personal stakes. It doesn't care about my ego. It just responds to what I give it. That dispassionate perspective is genuinely useful — not as a replacement for judgment, but as a mirror that reflects your thinking back at you without the emotional bias.",
      },
      {
        type: "h2",
        text: "Where AI Fits in This Process",
      },
      {
        type: "p",
        text: "Claude Code with a PRD, architecture document, and design specification produces production-quality code. Claude Code with 'build me an app' produces a demo. The input determines the output. This is the most important thing I've learned about AI-assisted development.",
      },
      {
        type: "p",
        text: "When I hand Claude a task, it has context. It knows the data models because I defined them. It knows the API contracts because I designed them. It knows the security requirements because I specified them. It knows the coding patterns because the existing codebase demonstrates them. AI doesn't replace the thinking. It executes the thinking at speed.",
      },
      {
        type: "p",
        text: "When I review Claude's output, I'm not debugging AI code. I'm reviewing a colleague's pull request. Does it match the spec? Does it handle the edge cases? Does it follow the patterns established in the codebase? Does it introduce security vulnerabilities? Sometimes it does, and I catch it because I understand the system at a level that comes from having designed it. That understanding is the thing that can't be automated.",
      },
      {
        type: "h2",
        text: "The Output Is Different",
      },
      {
        type: "p",
        text: "Vibe-coded projects have a tell. They work on the happy path. They break on edge cases. They have inconsistent patterns across files. They lack security headers. They don't handle error states gracefully. They feel like they were assembled, not designed.",
      },
      {
        type: "p",
        text: "Built projects feel coherent. The data model is consistent. The error handling follows a pattern. The security is layered. The UI handles loading, empty, error, and success states. The code reads like it was written by someone who understood the whole system, because it was — by a developer who designed the whole system and used AI to help implement it.",
      },
      {
        type: "p",
        text: "The tool is the same. The process is different. The output is different. That's the gap, and it's everything.",
      },
      {
        type: "quote",
        text: "AI doesn't replace the thinking. It executes the thinking at speed. Skip the thinking, and speed just means you build the wrong thing faster.",
      },
    ],
    relatedSlugs: [
      "i-built-a-business-os-before-my-first-client",
      "what-anthropic-got-right-with-claude-code",
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════
     POST 6: WHAT ANTHROPIC GOT RIGHT
     ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "what-anthropic-got-right-with-claude-code",
    tag: "Development",
    date: "Jul 1, 2026",
    readTime: "12 min read",
    title: "What Anthropic Got Right with Claude Code.",
    excerpt:
      "An honest review from a developer who built an entire business on it. What works, what I've learned, where it struggles, and why the MCP ecosystem changes everything.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    tocItems: [
      "The Context",
      "What Works Brilliantly",
      "The MCP Ecosystem",
      "What I've Learned About Getting the Best Output",
      "Where It Struggles",
      "What Changed in My Workflow",
      "The Distinction That Matters",
    ],
    content: [
      {
        type: "p",
        text: "I've built a registered business on Claude Code. Not one project — the entire operation. Client work, internal tools, products, documents, compliance, operations. This isn't a review from someone who tried it for a week. It's a perspective from someone who depends on it daily for their livelihood.",
      },
      {
        type: "p",
        text: "I'll be specific about what works, what doesn't, and what I've learned about getting the most out of it. Anthropic doesn't need a love letter. They need honest signal from power users.",
      },
      {
        type: "h2",
        text: "The Context",
      },
      {
        type: "p",
        text: "Nimbus Forma Studio: a solo web development and systems business based in KL, Malaysia. SSM registered. Paying clients. Shipped products. 14+ repositories across client work, internal tools, and products. Every project built with Claude Code as the primary development tool alongside my own expertise.",
      },
      {
        type: "p",
        text: "My stack: Next.js, TypeScript, Tailwind CSS, Supabase, GSAP, Prisma, Vercel. I work in VS Code. Claude Code runs as my pair programmer throughout every session. I also use multiple Claude skills for different thinking modes — product management, architecture review, design thinking — and the MCP ecosystem for external tool integration.",
      },
      {
        type: "h2",
        text: "What Works Brilliantly",
      },
      {
        type: "p",
        text: "Multi-file context awareness. Claude Code understands project structure. When I ask it to add a feature, it reads the existing codebase, identifies the patterns, and generates code that matches. Not just syntactically — architecturally. If my project uses a specific data fetching pattern, Claude follows it. If my components follow a specific naming convention, Claude continues it. This is the difference between AI that generates code and AI that contributes to a codebase.",
      },
      {
        type: "p",
        text: "Iterative refinement. The conversation model means I can say 'that's close but the error handling should use the pattern from the checkout flow' and Claude adjusts. It remembers context within the session. It builds on previous work. This conversational development is fundamentally different from prompt-and-pray. It's closer to pair programming than autocomplete.",
      },
      {
        type: "p",
        text: "Breadth of technical knowledge. In one session, I moved between TypeScript, CSS, SQL (Prisma schema), HTML templates, git operations, shell scripts, and Malaysian legal research (PDPA compliance). Claude handled all of them competently. Not every AI tool can context-switch between writing a PostgreSQL RLS policy and drafting a privacy policy in the same conversation.",
      },
      {
        type: "p",
        text: "The skills system. Claude Code supports specialized skill sets that change how it approaches problems. I use skills for different roles — when I'm thinking like a PM, I activate that context and Claude responds as a PM counterpart. When I'm debugging, it shifts to a diagnostic mindset. This isn't just prompt engineering — it's persistent role context that carries through an entire session and makes the back-and-forth more productive.",
      },
      {
        type: "h2",
        text: "The MCP Ecosystem",
      },
      {
        type: "p",
        text: "The Model Context Protocol is what makes Claude Code extensible beyond its training data. MCP servers let Claude connect to external tools and services. I use them daily.",
      },
      {
        type: "p",
        text: "Context7 for documentation lookups — when I need the latest Next.js API or Supabase function signatures, Claude queries the actual current documentation instead of relying on training data that might be months old. This alone eliminates an entire class of bugs where AI generates code using deprecated APIs.",
      },
      {
        type: "p",
        text: "Web search and web fetch for research — when I needed to understand PDPA compliance requirements, Claude searched official Malaysian government sources, fetched the actual legislation text, and synthesised the relevant requirements. The output cited real sources with real URLs. I verified every claim against the source material, but the research acceleration was significant.",
      },
      {
        type: "p",
        text: "The MCP architecture is what makes Claude Code a platform rather than just a tool. Each server adds a capability without bloating the core model. I can add new MCPs as my workflow evolves without waiting for Anthropic to build every integration natively. This is good design — extensibility through a protocol rather than a monolith.",
      },
      {
        type: "h2",
        text: "What I've Learned About Getting the Best Output",
      },
      {
        type: "p",
        text: "System-level context beats file-level prompts. When Claude has my project's architecture document, data models, and design specifications loaded as context, the code it generates is dramatically better. Not incrementally — dramatically. The same prompt produces a generic React component without context and a component that matches my design system, uses my data hooks, and follows my error handling patterns with context. This is the single biggest lesson I've learned.",
      },
      {
        type: "p",
        text: "Specific constraints produce better output than open-ended requests. 'Build a contact form' produces generic code. 'Build a contact form with name, email, project type (dropdown), budget (dropdown), and message fields. Validate email with regex. Rate limit to 5 submissions per hour. Post to this Formspree endpoint. Show success/error states. Match the existing form patterns in the codebase.' produces exactly what I need on the first pass.",
      },
      {
        type: "p",
        text: "Reviewing AI output like a PR, not like magic, is essential. When Claude generates 200 lines of code, I don't accept it. I read it like I'm reviewing a pull request from a colleague. Does it handle null cases? Does it clean up event listeners? Does it follow the project's error handling pattern? Are there any security implications? This review catches issues that a casual glance misses. The quality of AI-assisted development is directly proportional to the quality of the review.",
      },
      {
        type: "h2",
        text: "Where It Struggles",
      },
      {
        type: "p",
        text: "Novel integrations with sparse documentation. When I integrated Revenue Monster — a Malaysian payment gateway — Claude's help was limited to general OAuth2 patterns. The specific implementation details (RSA signature format, webhook verification, sandbox URL structure) required reading Revenue Monster's actual docs and testing against their API. AI trained on public internet data is only as good as what's publicly documented, and niche regional services are underrepresented.",
      },
      {
        type: "p",
        text: "Business logic decisions. Claude will implement any business logic you describe. But it can't tell you what the right logic is. Should a cancelled order automatically restore stock? That depends on the client's inventory workflow. Should a stringing job be cancelled when its linked order is cancelled? That depends on whether the racket is physically in the shop. These decisions require domain knowledge that doesn't exist in training data — it exists in conversations with the client.",
      },
      {
        type: "p",
        text: "Long sessions with accumulated context. As a session grows long, Claude's ability to maintain consistency across earlier and later changes degrades. Patterns established early in the conversation sometimes get contradicted later. My workaround is to keep architecture decisions in explicit documents that Claude can re-read, rather than relying on conversational memory for structural consistency.",
      },
      {
        type: "h2",
        text: "What Changed in My Workflow",
      },
      {
        type: "p",
        text: "Before Claude Code, I spent roughly 30% of my time on architecture and design, 60% on implementation, and 10% on review and documentation. Now it's closer to 40% architecture and design, 30% implementation (much of it AI-accelerated), and 30% review and documentation. The implementation phase compressed. The thinking phases expanded to fill the freed time — which means the thinking is better, not just faster.",
      },
      {
        type: "p",
        text: "I also write more documentation than I used to. Not because I enjoy it — because Claude Code is significantly better when it has documentation to work from. Writing a clear architecture document before implementation isn't just good practice anymore. It's a direct input to better AI output. The incentives aligned: good process produces good AI output produces good software. The developers who resisted documentation now have a selfish reason to write it.",
      },
      {
        type: "p",
        text: "My debugging approach changed too. I used to spend time staring at code trying to spot the bug. Now I describe the symptom to Claude with the relevant code context, and it often identifies the issue faster than I would have. Not always — sometimes the bug is in my mental model of the system, not in the code. But for mechanical bugs (off-by-one errors, missing null checks, incorrect async handling), AI-assisted debugging is genuinely faster.",
      },
      {
        type: "h2",
        text: "The Distinction That Matters",
      },
      {
        type: "p",
        text: "I didn't build my business on Claude Code. I built my business with Claude Code. The preposition matters.",
      },
      {
        type: "p",
        text: "'On' implies dependence. Remove the tool, the business collapses. That's not true. I'm a developer with years of production experience. I can build everything in my portfolio without AI assistance. It would take longer. The quality wouldn't be higher — because I'm already the quality gate. The throughput would drop significantly.",
      },
      {
        type: "p",
        text: "'With' implies partnership. The tool amplifies capability. It handles the mechanical work so I can focus on the thinking work. It's fast where speed matters (implementation) and I'm careful where care matters (architecture, security, business logic). The combination produces output that neither could achieve alone — not because the AI thinks better than me, but because it types faster while I think.",
      },
      {
        type: "p",
        text: "That's what Anthropic got right. Claude Code isn't trying to replace developers. It's trying to be the best tool a developer has ever used. And for this developer, building a business from scratch in Malaysia with no team and no funding — it is.",
      },
      {
        type: "quote",
        text: "I didn't build my business on Claude Code. I built my business with Claude Code. The preposition matters.",
      },
    ],
    relatedSlugs: [
      "the-difference-between-vibe-coding-and-building",
      "i-built-a-business-os-before-my-first-client",
    ],
  },
];
