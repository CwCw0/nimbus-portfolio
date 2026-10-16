import type { BlogPost } from "./blog";

/**
 * October 2026 commentary series — builder's reads on the AI economy,
 * written for people running businesses, not people reading press releases.
 * Every claim links to its source. Volatile prices dated to mid-October 2026.
 */
export const commentaryPosts: BlogPost[] = [
  {
    slug: "grab-published-its-ai-playbook-for-free",
    tag: "Learning",
    date: "Oct 16, 2026",
    readTime: "8 min read",
    title: "Grab Published Its AI Playbook. For Free. Here Are the Links.",
    excerpt:
      "13 AI products launched this year, several live in Malaysia — and an engineering blog that documents exactly how they build. A guided tour of the posts worth your time, and what a small business can copy from each.",
    image: "/opengraph-image",
    tocItems: [
      "What Grab Shipped This Year",
      "The Engineering Blog Is the Real Gift",
      "The Reading List, Annotated",
      "Copy the Pattern, Not the Scale",
      "The Sarawak Footnote",
    ],
    content: [
      {
        type: "p",
        text: "In April, Grab unveiled [13 AI-powered products](https://www.grab.com/my/press/others/grab-unveils-13-ai-powered-experiences-at-grabx-2026-as-southeast-asias-intelligent-everyday-guide/) built on what it calls the Grab Intelligence Layer — trained on insight from more than 20 billion rides and orders. Several are [already live in Malaysia](https://soyacincau.com/2026/04/08/grabx-2026-grab-rolls-out-13-new-ai-powered-features-for-rides-food-and-travel/): the driver AI assistant, Group Ride, GrabMaps for consumers, with more rolling out through the year.",
      },
      {
        type: "p",
        text: "That's the consumer story. The builder story is better: Grab's engineering team documents how they build this stuff, publicly, for free, at a level of honesty most companies reserve for internal wikis. If you run or build for a business in this region, their blog is the closest thing to borrowing the homework of a company operating in your exact market conditions.",
      },
      { type: "h2", text: "What Grab Shipped This Year" },
      {
        type: "p",
        text: "Beyond the consumer features: a partnership with OpenAI to teach [practical AI skills to 30,000 drivers and merchants](https://openai.com/index/grab-openai-ai-skills-southeast-asia/) across the region — Malaysia's turn comes in 2027 — and, this month, a [framework agreement with SoftBank and PETROS](https://group.softbank/en/news/press/20261008) to explore AI and digital infrastructure in Sarawak. One clarification worth making because it gets misreported: Grab's AI Centre of Excellence is in Singapore, not Malaysia — though they do run an R&D centre in KL.",
      },
      { type: "h2", text: "The Engineering Blog Is the Real Gift" },
      {
        type: "p",
        text: "Big tech engineering blogs are usually recruitment ads. Grab's reads like working notes — including one post whose URL still carries a typo, which tells you nobody's polishing these for PR. Below are the ones I'd actually assign as reading, each with the thing a smaller business can steal.",
      },
      { type: "h2", text: "The Reading List, Annotated" },
      {
        type: "ol",
        text: "",
        items: [
          "[Grab AI Gateway](https://engineering.grab.com/grab-ai-gateway) — one door for every AI call in the company: one set of keys, one cost ledger, one place for rate limits, 300+ internal use cases behind it. The SME version is a fifty-line proxy. If your business uses AI in more than one place, build the small version of this first.",
          "[How Grab builds and runs AI agents at scale](https://engineering.grab.com/how-grab-builds-and-runs-ai-agents-at-scale) — the architecture of agents that actually do work, with the guardrails spelled out.",
          "[Grab Bench](https://engineering.grab.com/grab-bench-evaluating-ai) — my pick for the most transferable idea of the year: before trusting AI with your work, test it on your real tasks, not demos. Any shop can build a ten-item bench from its own invoices, messages, and reports, and score models against it before betting a workflow on one.",
          "[Jarvis Pro: route first, answer later](https://engineering.grab.com/jarvis-pro-route-firsr-answer-later) — send each request to the cheapest model that can handle it, escalate only when needed. This is exactly how you keep an AI feature from eating its own margin. (Yes, the typo in the URL is Grab's.)",
          "[Automated merchant review summaries](https://engineering.grab.com/automated-merchant-review-summary-system-with-integrated-feedback) — reads a flood of customer reviews, produces summaries a busy owner will actually read. A directly sellable feature for any business drowning in Google reviews; they published how it works end to end.",
          "[How AI is transforming analytics at Grab](https://engineering.grab.com/how-ai-is-transforming-analytics) — natural-language questions over business data, and the honest friction they hit.",
          "[Price sensitivity profiling using LLMs](https://engineering.grab.com/price-sensitivity-profiling-using-llm) — fresh this month: using models to understand which customers respond to which pricing. Read it for the method, not to copy the use case.",
          "[GrabMart data for disease outbreak detection](https://engineering.grab.com/grabmart-data-for-faster-disease-outbreak-detection) — the most unexpected one: grocery baskets as an early-warning signal. A reminder that the data you already collect probably answers questions you haven't asked it.",
        ],
      },
      { type: "h2", text: "Copy the Pattern, Not the Scale" },
      {
        type: "p",
        text: "You don't have 20 billion orders. Doesn't matter. The patterns are scale-free: one gateway for AI calls. A bench of your own real tasks before trusting a model. Route to the cheapest capable model. Summarise what nobody has time to read. Every one of those works at five staff the same way it works at five thousand — the fifty-line version just costs a weekend instead of a platform team.",
      },
      { type: "h2", text: "The Sarawak Footnote" },
      {
        type: "p",
        text: "The SoftBank-Grab-PETROS agreement is exploratory — framework agreements are intentions, not data centres. But the direction is hard to miss: serious AI infrastructure conversations are happening about Malaysia, not just near it. The companies that will benefit first are the ones whose operations are already systematised enough to plug in. That part — being ready — is a choice available at any size.",
      },
    ],
    relatedSlugs: [
      "nvidia-96-billion-quarter-your-api-bill",
      "razer-is-an-ai-company-now",
    ],
  },
  {
    slug: "razer-is-an-ai-company-now",
    tag: "Trends",
    date: "Oct 14, 2026",
    readTime: "6 min read",
    title: "Razer Says It's an AI Company Now. The Interesting Part Is How.",
    excerpt:
      "The gaming brand with Southeast Asian roots pivoted to AI at CES — with shipping products, not a press release. One of them contains a pattern every small business should steal.",
    image: "/opengraph-image",
    tocItems: [
      "The Pivot, in Products",
      "The Pattern Worth Stealing",
      "A Desk Companion With an Agenda",
      "The Southeast Asia Thread",
      "What a Shop Owner Should Take From This",
    ],
    content: [
      {
        type: "p",
        text: "At CES in January, Razer — the green-snake gaming brand co-founded by Singaporean Min-Liang Tan — announced it was becoming [an AI company](https://www.digitimes.com/news/a20260107PD247/2026-accelerator-ces-2026-gaming-hardware-razer.html), complete with its first edge AI accelerator built on Tenstorrent silicon. This month the CEO told [Fortune](https://fortune.com/2026/10/14/razer-ceo-ai-everyone-gamer/) that AI will make \"everyone a gamer\" and push gaming toward a trillion-dollar industry.",
      },
      {
        type: "p",
        text: "CEO proclamations are cheap. What caught my attention is that the pivot came with shipping products — and one of them demonstrates a pattern I keep telling clients about.",
      },
      { type: "h2", text: "The Pivot, in Products" },
      {
        type: "p",
        text: "At [GDC in March](https://www.razer.com/newsroom/company-news/razer-at-gdc-2026), Razer showed an AI ecosystem for game development: an agentic desk companion called AVA, automated QA tooling, and a haptics-plus-audio immersion runtime they claim integrates in days rather than months. Agree or not with the vision, this is a hardware brand rebuilding itself around software that does labour.",
      },
      { type: "h2", text: "The Pattern Worth Stealing" },
      {
        type: "p",
        text: "The product that matters most to non-gamers is the QA Companion: zero-integration, vision-based testing. It watches the game's screen — no SDK, no code changes, no replatforming — and files bugs with reproduction steps. The AI adapts to the software instead of demanding the software adapt to it.",
      },
      {
        type: "p",
        text: "That's the pattern. Most small businesses I meet think adopting AI means migrating to new platforms — new POS, new CRM, new everything. The better systems go the other way: AI that reads what your staff already see. Documents, dashboards, WhatsApp threads, the screen itself. Razer just proved the zero-integration approach works well enough to sell to game studios, which are pickier about their pipelines than any mamak is about its order book.",
      },
      { type: "h2", text: "A Desk Companion With an Agenda" },
      {
        type: "p",
        text: "AVA evolved from an esports coach into a general agentic companion — an animated assistant that watches your screen, learns your patterns, and translates intent into multi-step workflows across apps. Hardware ships later this year. I'm sceptical of animated avatars and bullish on the underlying idea: agents that operate your existing software, rather than replacing it, are where the next few years of practical AI live.",
      },
      { type: "h2", text: "The Southeast Asia Thread" },
      {
        type: "p",
        text: "One detail for the local record: Razer's payments arm, Razer Merchant Services, grew out of Malaysia — it began life as MOLPay, which [MOL Global acquired into its group in 2011](https://www.sec.gov/Archives/edgar/data/0001604929/000119312514267730/d676326df1.pdf) before Razer bought it outright in 2018. A Southeast Asian company with Malaysian plumbing just declared itself an AI company. The region isn't watching this wave from the shore.",
      },
      { type: "h2", text: "What a Shop Owner Should Take From This" },
      {
        type: "p",
        text: "You don't announce an AI transformation. You pick one workflow that eats real hours — QA for Razer, maybe invoice-chasing or review-replying for you — and you ship one tool that removes it. Then the next one. The press release, if you ever bother with one, writes itself afterwards.",
      },
    ],
    relatedSlugs: [
      "grab-published-its-ai-playbook-for-free",
      "voice-ai-cheap-enough-for-your-front-desk",
    ],
  },
  {
    slug: "nvidia-96-billion-quarter-your-api-bill",
    tag: "Trends",
    date: "Oct 11, 2026",
    readTime: "6 min read",
    title: "NVIDIA's $96B Quarter Is a Message About Your AI Bill.",
    excerpt:
      "Revenue up 106%, margins at 75%, clouds sold out, a trillion dollars of orders. The read for everyone downstream: compute stays expensive — so design systems that spend it like it's expensive.",
    image: "/opengraph-image",
    tocItems: [
      "The Quarter in Four Numbers",
      "Sold Out Means Something",
      "The Desktop AI Box Went the Wrong Way",
      "Design API-Light",
      "You Are the Margin",
    ],
    content: [
      {
        type: "p",
        text: "NVIDIA [reported](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027) US$96.2 billion in quarterly revenue in late August — up 106 percent year on year — and guided the next quarter to $108 billion. At GTC in March, Jensen Huang told the room they're looking at [around a trillion dollars in orders](https://www.cnbc.com/2026/03/16/nvidia-gtc-2026-ceo-jensen-huang-keynote-blackwell-vera-rubin.html) for their next two chip generations through 2027.",
      },
      {
        type: "p",
        text: "I don't own NVIDIA stock and this isn't investment commentary. I care about one downstream question: what does this do to the price of the AI calls inside the systems I build?",
      },
      { type: "h2", text: "The Quarter in Four Numbers" },
      {
        type: "p",
        text: "Revenue $96.2 billion. Data centre segment $89 billion of it. Gross margin 75 percent. Next-quarter guidance $108 billion. The margin is the number to sit with — three-quarters of every dollar spent on this hardware is profit for the vendor, and every layer above it has to earn that cost back from somewhere. That somewhere eventually includes your API bill.",
      },
      { type: "h2", text: "Sold Out Means Something" },
      {
        type: "p",
        text: "On the earnings call, management described cloud GPU capacity as sold out, with even previous-generation chips fully utilised. The next platform, Rubin, ramps in the second half of 2026 — and the demand pipe is already longer than the supply pipe. Translation for the rest of us: serious compute stays scarce and priced for hyperscalers for the foreseeable future. Cheap, abundant inference is not around the corner.",
      },
      { type: "h2", text: "The Desktop AI Box Went the Wrong Way" },
      {
        type: "p",
        text: "The counter-argument used to be: fine, run models locally. NVIDIA sells a desktop AI machine for exactly that — and it's moving in the wrong direction. The DGX Spark launched at $3,999; a [new 64GB model now costs $4,999](https://cryptobriefing.com/nvidia-dgx-spark-64gb-launch/) with half the memory of the original, and the 128GB unit lists at $6,950. Blame the memory squeeze I wrote about separately. For a Malaysian SME, that's RM 20,000-plus of depreciating hardware versus pay-per-use APIs. It's not a contest.",
      },
      { type: "h2", text: "Design API-Light" },
      {
        type: "p",
        text: "So the architecture answer isn't \"avoid AI\" — it's spend AI calls like they cost money, because they do and they'll keep doing so. In practice, in the systems I ship: cache aggressively so the same question never costs twice. Route routine steps to small, cheap models and reserve the frontier model for the few calls where its judgement earns the premium. Precompute what you can. Let deterministic code do everything deterministic code can do — it runs for free.",
      },
      { type: "h2", text: "You Are the Margin" },
      {
        type: "p",
        text: "Seventy-five percent gross margin means every unnecessary AI call in your workflow is a small donation to the most profitable hardware company on earth. A well-designed system is just the discipline of not donating. That discipline is most of what you're paying for when someone builds you one.",
      },
    ],
    relatedSlugs: [
      "ram-prices-doubled-what-it-means",
      "grab-published-its-ai-playbook-for-free",
    ],
  },
  {
    slug: "voice-ai-cheap-enough-for-your-front-desk",
    tag: "Trends",
    date: "Oct 9, 2026",
    readTime: "7 min read",
    title: "Voice AI Just Got Cheap Enough for Your Front Desk.",
    excerpt:
      "ElevenLabs shipped v4 two weeks ago: 90+ languages, voice cloning from 10 seconds of audio, and agents a small business can actually afford. Here's the real math — and the one risk nobody mentions.",
    image: "/opengraph-image",
    tocItems: [
      "What Actually Shipped",
      "The Full Cost Stack, Honestly",
      "The Southeast Asia Unlock",
      "The Dark Side of 10-Second Cloning",
      "Where I'd Actually Use It",
    ],
    content: [
      {
        type: "p",
        text: "On September 28, ElevenLabs released [Eleven v4](https://elevenlabs.io/blog/eleven-v4) — their new flagship voice model — alongside a faster v4 Turbo. More expression control, support for 90+ languages, and voice cloning from ten seconds of audio. Two weeks later they [launched in Singapore](https://elevenlabs.io/blog), planting the flag three hundred kilometres from where I'm sitting.",
      },
      {
        type: "p",
        text: "I build systems for businesses that still run their front desk on a phone and a notepad. So I don't read voice AI announcements the way a tech blog does. I read them asking one question: can a clinic in Petaling Jaya afford this yet, and should they?",
      },
      { type: "h2", text: "What Actually Shipped" },
      {
        type: "p",
        text: "The headline numbers from the official announcement: v4 Turbo answers with roughly 150 milliseconds to first speech, which is fast enough that a caller doesn't notice they're talking to software. Voice cloning needs ten seconds of sample audio. And [TechCrunch's coverage](https://techcrunch.com/2026/09/28/elevenlabs-new-v4-speech-model-supports-more-expression-control-and-90-languages/) confirms the 90+ language support — which matters here more than almost anywhere, and I'll get to why.",
      },
      {
        type: "p",
        text: "October kept rolling: an agent-building assistant called Architect, government-grade security certification, and a steady drip of agent platform features — call queueing, workflow outcome tracking, ticket merging. This is a company building a phone department, not a toy.",
      },
      { type: "h2", text: "The Full Cost Stack, Honestly" },
      {
        type: "p",
        text: "The [official pricing page](https://elevenlabs.io/pricing) reads like SaaS pricing always does: free tier to play with, $6 starter, $22 creator, $99 pro, up to $990 for business with per-minute rates quoted as low as five US cents. Roughly a thousand credits buys a minute of speech.",
      },
      {
        type: "p",
        text: "Here's what the pricing page undersells: text-to-speech is one line of a three-line bill. A working phone agent also pays for the language model doing the thinking and the telephony carrying the call. Third-party breakdowns put agent platform fees at [around eight US cents per minute](https://www.cloudzero.com/blog/elevenlabs-pricing/) before those extra lines — I haven't verified that number against an official page, so treat it as indicative. The honest summary: a voice agent for a small business is now a hundred-dollars-a-month-class decision, not an enterprise project. That's new. It wasn't true a year ago.",
      },
      { type: "h2", text: "The Southeast Asia Unlock" },
      {
        type: "p",
        text: "Ninety-plus languages is an abstract spec sheet line in California. In Malaysia it's the whole product. A front desk here answers in Bahasa, English, and Mandarin — sometimes in the same call, sometimes in the same sentence. One agent that handles that mix is the difference between a demo and a tool.",
      },
      {
        type: "p",
        text: "My caveat, from someone who will have to stand behind the invoice: verify the Malay quality yourself on the free tier before you promise it to anyone. Vendor language counts and real Manglish are different sports. I'd run twenty test calls before a single customer hears it.",
      },
      { type: "h2", text: "The Dark Side of 10-Second Cloning" },
      {
        type: "p",
        text: "Ten seconds of audio is less than your last voice note. If your voice can be cloned from a WhatsApp message, then \"the boss called and asked me to transfer the deposit\" stops being proof of anything. This isn't theoretical — it's the obvious next move for scammers, and small businesses with informal payment approval are the softest target.",
      },
      {
        type: "p",
        text: "The fix costs nothing: a standing rule that unusual payment requests get verified by calling back on a known number. If I build you a system this year, that policy ships with it. The AI can talk — your process decides.",
      },
      { type: "h2", text: "Where I'd Actually Use It" },
      {
        type: "p",
        text: "After-hours booking for clinics and salons. Missed-call capture for shops where the owner is the only phone-answerer. Order status lines for businesses drowning in \"where's my parcel\" calls. Boring, high-volume, low-stakes conversations — the exact work nobody enjoys and everybody pays a salary for.",
      },
      {
        type: "p",
        text: "What I wouldn't do: put it in front of anything involving money or medical advice, or deploy it without a one-tap path to a human. The technology got cheap. Judgement is still the expensive part.",
      },
    ],
    relatedSlugs: [
      "ram-prices-doubled-what-it-means",
      "grab-published-its-ai-playbook-for-free",
    ],
  },
  {
    slug: "ram-prices-doubled-what-it-means",
    tag: "Trends",
    date: "Oct 4, 2026",
    readTime: "6 min read",
    title: "RAM Prices Doubled. Your Next System Should Rent, Not Buy.",
    excerpt:
      "PC memory is forecast to double in a quarter — a record. AI data centres ate the supply. Here's what that does to hardware budgets, self-hosting dreams, and why web-based systems just became an easier sell.",
    image: "/opengraph-image",
    tocItems: [
      "The Numbers, Sourced",
      "Why This Happened",
      "The Self-Hosting Math Just Flipped",
      "If You're Quoting Hardware, Read This",
      "The Quiet Winner",
    ],
    content: [
      {
        type: "p",
        text: "If you've priced a laptop or a stick of RAM recently and felt your eyebrows leave your face, it's not you. Memory is in a historic squeeze, and it's reshaping decisions well beyond gaming rigs — including how I architect systems for clients.",
      },
      { type: "h2", text: "The Numbers, Sourced" },
      {
        type: "p",
        text: "[TrendForce's official forecast](https://www.trendforce.com/presscenter/news/20260202-12911.html) has conventional DRAM contract prices up 90 to 95 percent quarter-on-quarter in early 2026, with PC memory expected to at least double — a record single-quarter surge. Street price trackers show mainstream 32GB DDR5 kits around [US$409 to $429 as of October](https://tech-insider.org/ddr5-ram-prices-2026/), up from an all-time low near $72. Gartner's mid-year view, [reported by TechTimes](https://www.techtimes.com/articles/317872/20260605/ram-prices-2026-buy-now-wait-gartner-forecasts-130-memory-cost-surge.htm), projects a combined memory-and-storage surge of about 130 percent by year end, lifting average PC prices roughly 17 percent.",
      },
      {
        type: "p",
        text: "And it's already hitting finished products: NVIDIA's desktop AI box, the DGX Spark, launched at $3,999 and now lists its 128GB version at $6,950 — the company [explicitly cited memory supply](https://news.ainauten.com/markdown/nvidia-dgx-spark-kostet-jetzt-4699-dollar-speicher-wird-knapp) for the hike. I found no credible analyst forecasting relief before 2027.",
      },
      { type: "h2", text: "Why This Happened" },
      {
        type: "p",
        text: "AI data centres. High-bandwidth memory for AI accelerators consumes several times the wafer capacity of ordinary DDR5, and the big three memory makers shifted their fabs toward it because that's where the margin lives. Your laptop and an AI training cluster are now bidding on the same silicon, and the cluster has a bigger wallet.",
      },
      { type: "h2", text: "The Self-Hosting Math Just Flipped" },
      {
        type: "p",
        text: "For two years the pitch went: buy a beefy server, run open-source models locally, escape API fees. That pitch quietly assumed cheap RAM — local inference eats memory for breakfast. At 2026 prices, the hardware payback period stretched from \"about a year\" to \"longer than the hardware's useful life\" for most small workloads.",
      },
      {
        type: "p",
        text: "So my standing advice to SMEs inverts: rent the spike, don't buy it. Cloud APIs and managed hosting let someone else own the depreciating memory. Revisit ownership when the supply cycle turns — this industry is cyclical, and today's shortage funds tomorrow's glut.",
      },
      { type: "h2", text: "If You're Quoting Hardware, Read This" },
      {
        type: "p",
        text: "Any quote with a hardware line item needs two things right now: a short validity window — seven to fourteen days, not thirty — and a pass-through clause for component price changes. A ringgit-denominated quote on US-dollar-priced memory is a currency bet stacked on a commodity bet. I learned to write quotes that don't gamble on either.",
      },
      { type: "h2", text: "The Quiet Winner" },
      {
        type: "p",
        text: "Here's the second-order effect nobody's writing about: when new machines cost 17 percent more, software that extends the life of existing machines gets 17 percent more attractive. Web-based systems with light clients — the kind that run fine on the five-year-old laptop at the counter — just became an easier sell than any native software that demands new hardware.",
      },
      {
        type: "p",
        text: "I'd be lying if I said I minded. That's exactly the kind of system I build. But I'd give the same advice if I didn't: in a hardware squeeze, buy software.",
      },
    ],
    relatedSlugs: [
      "nvidia-96-billion-quarter-your-api-bill",
      "voice-ai-cheap-enough-for-your-front-desk",
    ],
  },
];
