export type BlogPost = {
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  tocItems: string[];
  content: {
    type: "p" | "h2" | "quote" | "ol";
    text: string;
    items?: string[];
  }[];
  relatedSlugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "from-music-teacher-to-developer",
    tag: "Life",
    date: "February 2, 2026",
    readTime: "6 min read",
    title: "From Music Teacher to Developer: Why I Made the Switch",
    excerpt:
      "I spent years teaching music and bringing people together. Then I picked up coding out of boredom — and everything changed.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
    tocItems: [
      "The Music Years",
      "The Transition",
      "Why Coding Clicked",
      "What I Carried Over",
      "Where I Am Now",
    ],
    content: [
      {
        type: "p",
        text: "For years, my life revolved around music. I was a music teacher — not the kind who just ran through theory books, but the kind who genuinely believed that music could bring people together and change how they see the world. And it did. I watched students find confidence, express themselves, and connect with each other through something we built together.",
      },
      {
        type: "h2",
        text: "The Music Years",
      },
      {
        type: "p",
        text: "Teaching music taught me more than I expected. It taught me patience — real patience, the kind where you watch someone struggle with the same chord for weeks and you find a new way to explain it every single time. It taught me how to break complex ideas into digestible pieces. And it taught me that the best results come when people feel supported enough to fail.",
      },
      {
        type: "p",
        text: "But over time, I felt the pull to do something different. Not because I fell out of love with music, but because I started feeling like I had more to give in a different way.",
      },
      {
        type: "h2",
        text: "The Transition",
      },
      {
        type: "p",
        text: "When I transitioned out of teaching, I didn't have a grand plan. I didn't enrol in a bootcamp or map out a career path. I was honestly just bored — and curious. I started tinkering with HTML and CSS, building little pages that did nothing useful but felt magical. A few lines of code and suddenly something appeared on screen. That was enough to hook me.",
      },
      {
        type: "h2",
        text: "Why Coding Clicked",
      },
      {
        type: "p",
        text: "What surprised me most was how similar coding felt to music. Both are about structure, rhythm, and creativity within constraints. In music, you work within scales and time signatures. In code, you work within syntax and logic. But in both, the real art is in how you put the pieces together.",
      },
      {
        type: "quote",
        text: "The same part of my brain that arranged music started arranging components. The same patience I used teaching a student their first song, I used debugging my first project.",
      },
      {
        type: "p",
        text: "I went from HTML to CSS to JavaScript, then React, then Next.js. Each step felt like learning a new instrument — awkward at first, then gradually more expressive. The learning never stopped, and that was the point. I wasn't just learning to code. I was learning to build.",
      },
      {
        type: "h2",
        text: "What I Carried Over",
      },
      {
        type: "p",
        text: "People ask me if switching careers means starting from zero. It doesn't. Everything I learned as a teacher comes with me every day:",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Breaking down complexity** — Whether it's a music theory concept or a React component, I know how to make it digestible.",
          "**Patience with the process** — Learning anything worthwhile takes time. I don't rush, and I don't panic when things don't click immediately.",
          "**Empathy for the user** — Teaching taught me to think about the person on the other end. Now I think about the user on the other end of every interface I build.",
        ],
      },
      {
        type: "h2",
        text: "Where I Am Now",
      },
      {
        type: "p",
        text: "Today I'm building across multiple projects — from healthtech to productivity apps to gaming. I study not just code, but design, product thinking, marketing, and business. Because I don't just want to be a developer who writes code. I want to be a builder who creates things that matter.",
      },
      {
        type: "p",
        text: "The music teacher in me never really left. I still want to bring people together, help them grow, and create things that make life a little better. I just do it with code now.",
      },
    ],
    relatedSlugs: [
      "what-i-learned-building-my-first-website",
      "why-i-study-more-than-just-code",
    ],
  },
  {
    slug: "what-i-learned-building-my-first-website",
    tag: "Learning",
    date: "January 20, 2026",
    readTime: "5 min read",
    title: "What I Learned Building My First Real Website",
    excerpt:
      "My first project taught me more than any tutorial ever could. Here's what actually stuck.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    tocItems: [
      "The Tutorial Trap",
      "Building Something Real",
      "What Actually Stuck",
      "The Confidence Shift",
    ],
    content: [
      {
        type: "p",
        text: "I spent months watching tutorials. I could follow along with anything — build a to-do app, clone a landing page, set up a Node server. But the moment I closed the tutorial and opened a blank editor, my mind went blank too. Sound familiar?",
      },
      {
        type: "h2",
        text: "The Tutorial Trap",
      },
      {
        type: "p",
        text: "Tutorials give you the illusion of learning. You feel productive because you're typing code and things are appearing on screen. But you're not making decisions — you're following decisions someone else already made. The real learning happens when you have to figure out the decisions yourself.",
      },
      {
        type: "p",
        text: "I didn't realise this until I decided to build my first real project from scratch: a landing page for a meal subscription service called Omnifood. No tutorial to follow. No one telling me what to do next.",
      },
      {
        type: "h2",
        text: "Building Something Real",
      },
      {
        type: "p",
        text: "The moment I started, everything felt different. Where do I put the navigation? How do I structure the sections? What font sizes actually look good? These are questions tutorials answer for you — but in real life, you have to answer them yourself.",
      },
      {
        type: "p",
        text: "I spent hours on things that would have taken minutes in a tutorial. But every hour taught me something a tutorial never could: how to think through problems, how to make design decisions, and how to push through when nothing looks right.",
      },
      {
        type: "quote",
        text: "The gap between following a tutorial and building something real is where all the actual learning lives.",
      },
      {
        type: "h2",
        text: "What Actually Stuck",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Responsive design isn't optional** — I tested on my phone halfway through and realised everything was broken. That taught me mobile-first thinking faster than any article ever could.",
          "**Simplicity is hard** — My first version had too many colours, too many fonts, and too many sections. Stripping it back was harder than adding things in the first place.",
          "**Done is better than perfect** — I could have tweaked spacing and colours forever. At some point, you have to ship it and move on to the next thing.",
        ],
      },
      {
        type: "h2",
        text: "The Confidence Shift",
      },
      {
        type: "p",
        text: "The biggest thing that changed after building my first real project wasn't my skill level — it was my confidence. I went from \"I'm learning to code\" to \"I can build things.\" That shift changes everything. It changes what you attempt, how you talk about yourself, and what you believe is possible.",
      },
      {
        type: "p",
        text: "If you're stuck in tutorial mode, my advice is simple: close the tutorial, open a blank file, and build something. It doesn't have to be good. It has to be yours.",
      },
    ],
    relatedSlugs: [
      "from-music-teacher-to-developer",
      "the-self-taught-developers-toolkit",
    ],
  },
  {
    slug: "why-i-study-more-than-just-code",
    tag: "Development",
    date: "January 8, 2026",
    readTime: "5 min read",
    title: "Why I Study More Than Just Code",
    excerpt:
      "Most devs only learn to code. I think that's a mistake. Here's why I study design, product, business, and marketing too.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80",
    tocItems: [
      "The Code-Only Mindset",
      "What Else Matters",
      "How I Study",
      "The Compound Effect",
    ],
    content: [
      {
        type: "p",
        text: "When most people learn to code, they focus entirely on the technical side. Master React. Learn TypeScript. Understand databases. And those are important — but they're only part of the picture.",
      },
      {
        type: "h2",
        text: "The Code-Only Mindset",
      },
      {
        type: "p",
        text: "If all you know is code, you can build what someone tells you to build. But you can't decide what to build, how it should feel, who it's for, or why it matters. You're a tool operator, not a builder. And I want to be a builder.",
      },
      {
        type: "p",
        text: "I've seen technically brilliant apps that nobody uses because the UX is confusing. I've seen beautiful websites that don't convert because nobody thought about the user journey. Code alone doesn't make a product. Thinking does.",
      },
      {
        type: "h2",
        text: "What Else Matters",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**UI/UX Design** — Understanding why certain layouts work, how colour affects emotion, and what makes an interface intuitive. You don't need to be a designer, but you need to think like one.",
          "**Product Thinking** — Who is this for? What problem does it solve? What's the simplest version that delivers value? These questions save you from building the wrong thing.",
          "**Marketing & Business** — If nobody knows your product exists, it doesn't matter how good it is. Understanding how people find, evaluate, and decide to use something is essential.",
          "**Systems Thinking** — How do the pieces fit together? How does the frontend talk to the backend? How does the infrastructure scale? Seeing the whole system makes you better at every part of it.",
        ],
      },
      {
        type: "h2",
        text: "How I Study",
      },
      {
        type: "p",
        text: "I don't take formal courses in all of these. I read, I observe, and I build. When I visit a website I like, I don't just look at the code — I think about why the layout works, what the copy is doing, and how the user journey is structured. When I use an app, I pay attention to the micro-interactions, the onboarding flow, and the moments of friction.",
      },
      {
        type: "quote",
        text: "The best developers I've come across aren't the ones who know the most languages. They're the ones who understand why things are built the way they are.",
      },
      {
        type: "h2",
        text: "The Compound Effect",
      },
      {
        type: "p",
        text: "Every skill compounds. Understanding design makes your code more intentional. Understanding business makes your features more valuable. Understanding marketing makes your projects more visible. None of these skills exist in isolation — they multiply each other.",
      },
      {
        type: "p",
        text: "I'm not saying you need to master everything. But if you only learn code, you'll always need someone else to tell you what to build and how it should look. And if you want to be a builder — a real one — that's not enough.",
      },
    ],
    relatedSlugs: [
      "from-music-teacher-to-developer",
      "the-self-taught-developers-toolkit",
    ],
  },
  {
    slug: "the-self-taught-developers-toolkit",
    tag: "Learning",
    date: "December 18, 2025",
    readTime: "7 min read",
    title: "The Self-Taught Developer's Toolkit: What Actually Helped Me Learn",
    excerpt:
      "Not every resource is created equal. Here's what actually moved the needle for me as a self-taught dev.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80",
    tocItems: [
      "The Overwhelm",
      "What Worked",
      "What Didn't",
      "My Advice",
    ],
    content: [
      {
        type: "p",
        text: "When you're self-taught, the hardest part isn't the learning — it's knowing what to learn. There are thousands of tutorials, courses, and YouTube channels all telling you different things. It's overwhelming, and most of it is noise.",
      },
      {
        type: "h2",
        text: "The Overwhelm",
      },
      {
        type: "p",
        text: "I went through the classic self-taught spiral: start a course, get distracted by a shinier course, jump to a new framework before finishing the old one, feel like I'm falling behind everyone. It took me a while to realise that the people who actually get good don't learn more — they learn deeper.",
      },
      {
        type: "h2",
        text: "What Worked",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Building real projects** — This is number one, full stop. Tutorials teach you syntax. Projects teach you problem-solving. My Omnifood landing page taught me more than 50 hours of video ever did.",
          "**Reading documentation** — I used to avoid docs because they felt dry. But docs are written by the people who built the tool. Once I started reading React and Next.js docs properly, everything clicked faster.",
          "**Breaking things on purpose** — Some of my best learning came from intentionally breaking something and figuring out why it broke. Understanding errors is understanding how things work.",
          "**Explaining what I learned** — Writing about a concept or explaining it to someone forces you to actually understand it. You can't fake comprehension when you have to put it in your own words.",
        ],
      },
      {
        type: "h2",
        text: "What Didn't",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Watching tutorials passively** — If you're not coding along AND making your own modifications, you're just watching TV.",
          "**Chasing every new framework** — FOMO is real in tech. But depth beats breadth every time. Get good at one thing before jumping to the next.",
          "**Comparing my progress to others** — Everyone's timeline is different. Someone who started before you isn't ahead of you — they're on a different path.",
        ],
      },
      {
        type: "quote",
        text: "The best toolkit isn't a list of resources. It's the habit of building, breaking, and rebuilding until the concepts live in your hands, not just your head.",
      },
      {
        type: "h2",
        text: "My Advice",
      },
      {
        type: "p",
        text: "If you're teaching yourself to code right now, here's what I'd tell you: pick one stack and go deep. Build three real projects before you switch to anything new. Read the docs, not just the tutorials. And write about what you learn — even if nobody reads it. The act of writing is the act of understanding.",
      },
      {
        type: "p",
        text: "You don't need a degree or a bootcamp certificate. You need proof that you can build things. And the only way to get that proof is to build things.",
      },
    ],
    relatedSlugs: [
      "what-i-learned-building-my-first-website",
      "why-i-study-more-than-just-code",
    ],
  },
  {
    slug: "why-every-developer-should-understand-design",
    tag: "Design",
    date: "December 2, 2025",
    readTime: "5 min read",
    title: "Why Every Developer Should Understand Design",
    excerpt:
      "You don't need to be a designer. But understanding design fundamentals will make you a significantly better developer.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    tocItems: [
      "The Developer-Designer Gap",
      "Design Fundamentals That Matter",
      "How to Start Learning",
      "The Payoff",
    ],
    content: [
      {
        type: "p",
        text: "There's a weird divide in tech where developers and designers are treated like separate species. Developers build things. Designers make them look good. But in reality, the best products come from people who can do both — or at least understand both.",
      },
      {
        type: "h2",
        text: "The Developer-Designer Gap",
      },
      {
        type: "p",
        text: "I've seen developers who can build incredibly complex systems but hand you a UI that looks like it was designed in 2005. Not because they lack talent, but because they never learned the basics of visual design. And it holds them back — especially if they're building their own projects.",
      },
      {
        type: "p",
        text: "You don't need to become a Figma expert or learn colour theory from scratch. You need to develop an eye for what looks right and understand why certain design decisions work.",
      },
      {
        type: "h2",
        text: "Design Fundamentals That Matter",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Spacing and alignment** — Consistent spacing is the single biggest difference between amateur and professional-looking UIs. Learn an 8px grid system and stick to it.",
          "**Typography hierarchy** — Use 2-3 font sizes maximum. Make headings clearly distinct from body text. Don't use more than 2 font families.",
          "**Colour restraint** — Pick a primary colour, a neutral palette, and an accent. That's it. The fewer colours you use, the more polished things look.",
          "**Whitespace** — Give elements room to breathe. Cramming things together makes interfaces feel chaotic. Whitespace creates calm and focus.",
        ],
      },
      {
        type: "quote",
        text: "Good design isn't about making things beautiful. It's about making things clear.",
      },
      {
        type: "h2",
        text: "How to Start Learning",
      },
      {
        type: "p",
        text: "Study websites you admire. Don't just look at them — analyse them. Why does this layout work? How much spacing is between elements? What's the font size hierarchy? Screenshot pages you like and annotate what makes them effective.",
      },
      {
        type: "p",
        text: "Rebuild things you find beautiful. Take a landing page you love and try to recreate it pixel by pixel. You'll learn more about design in that exercise than in any course.",
      },
      {
        type: "h2",
        text: "The Payoff",
      },
      {
        type: "p",
        text: "When you understand design, you stop building things that work and start building things that work and feel right. Your portfolio looks better. Your side projects look more credible. And when you collaborate with designers, you speak their language — which makes the whole process smoother.",
      },
      {
        type: "p",
        text: "You don't need to be a designer. But the developers who understand design? They build the products people actually want to use.",
      },
    ],
    relatedSlugs: [
      "why-i-study-more-than-just-code",
      "what-i-learned-building-my-first-website",
    ],
  },
  {
    slug: "building-in-public",
    tag: "Process",
    date: "November 15, 2025",
    readTime: "4 min read",
    title: "Building in Public: Why I Share My Work Before It's Perfect",
    excerpt:
      "Waiting until something is perfect before showing it is a trap. Here's why I share early and often.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    tocItems: [
      "The Perfectionism Trap",
      "Why Share Early",
      "What I've Gained",
      "Start Today",
    ],
    content: [
      {
        type: "p",
        text: "For the longest time, I wouldn't show anyone my work until it was \"done.\" I'd tweak, refactor, redesign, and polish until I felt like it was ready. But here's the thing — it was never ready. Because perfection doesn't exist, and waiting for it is just a fancy way of hiding.",
      },
      {
        type: "h2",
        text: "The Perfectionism Trap",
      },
      {
        type: "p",
        text: "Perfectionism disguises itself as high standards. It tells you that you're just being thorough, just being professional. But really, it's fear. Fear of judgment, fear of criticism, fear that what you've built isn't good enough. And that fear keeps you from shipping, from getting feedback, and from growing.",
      },
      {
        type: "h2",
        text: "Why Share Early",
      },
      {
        type: "p",
        text: "When you share work in progress, three things happen. First, you get feedback you couldn't have gotten alone — fresh eyes catch things you've gone blind to. Second, you build accountability — once people know what you're working on, you're more likely to finish it. Third, you inspire others — people love seeing the messy, honest process behind polished results.",
      },
      {
        type: "quote",
        text: "Nobody remembers the version you shipped. They remember that you shipped.",
      },
      {
        type: "h2",
        text: "What I've Gained",
      },
      {
        type: "p",
        text: "Since I started sharing my projects early — even when the code was rough and the design wasn't finished — I've learned faster, shipped more, and connected with people who are on the same journey. Some of the best conversations I've had started from someone seeing a half-finished project and saying \"hey, I'm building something similar.\"",
      },
      {
        type: "p",
        text: "Building in public doesn't mean broadcasting every commit. It means being open about what you're working on, what you're struggling with, and what you're learning. It's honesty as a practice.",
      },
      {
        type: "h2",
        text: "Start Today",
      },
      {
        type: "p",
        text: "If you're sitting on a project you haven't shared because it's not ready — share it anyway. Put it on GitHub. Post a screenshot. Write a few sentences about what you're building and why. The response will almost always be more supportive than you expect. And the act of sharing will push you to keep going.",
      },
    ],
    relatedSlugs: [
      "the-self-taught-developers-toolkit",
      "from-music-teacher-to-developer",
    ],
  },
  {
    slug: "the-ai-debate-what-both-sides-get-right",
    tag: "Trends",
    date: "November 1, 2025",
    readTime: "7 min read",
    title: "The AI Debate: What Both Sides Are Getting Right",
    excerpt:
      "AI is either going to save the world or destroy it — depending on who you ask. The truth is more nuanced than either side admits.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    tocItems: [
      "The Two Camps",
      "What the Optimists Get Right",
      "What the Skeptics Get Right",
      "Where I Stand",
    ],
    content: [
      {
        type: "p",
        text: "Every week there's a new headline about AI. It's either going to automate every job on the planet or it's a glorified autocomplete that can't be trusted. The discourse is loud, polarised, and honestly — exhausting. But if you step back from the noise, both sides are making valid points that are worth understanding.",
      },
      {
        type: "h2",
        text: "The Two Camps",
      },
      {
        type: "p",
        text: "On one side, you have people who see AI as the most transformative technology since the internet. They point to incredible advancements in code generation, image creation, medical research, and scientific discovery. On the other side, you have people raising real concerns about job displacement, misinformation, data privacy, and the speed at which this technology is being deployed without guardrails.",
      },
      {
        type: "p",
        text: "The problem isn't that one side is right and the other is wrong. The problem is that most people pick a team and stop listening to the other one.",
      },
      {
        type: "h2",
        text: "What the Optimists Get Right",
      },
      {
        type: "p",
        text: "AI is genuinely making certain tasks faster, more accessible, and more powerful. A solo developer can now prototype ideas that would have taken a team of ten a few years ago. Researchers are using AI to accelerate drug discovery and climate modelling. Creators are using it to produce content that was previously impossible without expensive tools and large teams.",
      },
      {
        type: "p",
        text: "The accessibility argument is strong too. AI tools are lowering the barrier to entry for creative work, coding, writing, and more. People who couldn't afford design software or coding bootcamps now have tools that help them learn and create. That democratisation is real and worth celebrating.",
      },
      {
        type: "h2",
        text: "What the Skeptics Get Right",
      },
      {
        type: "p",
        text: "But the concerns aren't unfounded. Entire categories of work are being disrupted faster than people can adapt. The economic impact on freelancers, junior developers, content creators, and artists is real — not theoretical. And the question of who benefits most from AI (hint: it's mostly large companies with massive data and compute resources) is one we should be asking loudly.",
      },
      {
        type: "p",
        text: "There are also legitimate questions about quality, accuracy, and trust. AI-generated content can be confidently wrong. AI-written code can introduce subtle bugs. And the speed at which AI-generated misinformation can spread is a genuine societal concern that can't be hand-waved away.",
      },
      {
        type: "quote",
        text: "The most useful thing you can do in the AI debate is refuse to pick a side and instead try to understand both.",
      },
      {
        type: "h2",
        text: "Where I Stand",
      },
      {
        type: "p",
        text: "I don't think it's useful to be \"pro-AI\" or \"anti-AI.\" I think it's useful to be informed, thoughtful, and adaptable. I use AI tools in my work. I also think about their limitations, their biases, and their impact on the broader industry. Both things can be true at the same time.",
      },
      {
        type: "p",
        text: "The developers, creators, and thinkers who will navigate this era best are the ones who engage with the nuance instead of the noise. Understand the technology. Understand the concerns. And make your own informed decisions about how you use it and what role it plays in your work.",
      },
    ],
    relatedSlugs: [
      "the-modern-developers-landscape",
      "understanding-trends-without-chasing-them",
    ],
  },
  {
    slug: "how-learning-to-code-has-changed",
    tag: "Learning",
    date: "October 20, 2025",
    readTime: "6 min read",
    title: "How Learning to Code Has Changed — And What Hasn't",
    excerpt:
      "The tools and resources are completely different from five years ago. But the core of learning hasn't changed at all.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    tocItems: [
      "Then vs Now",
      "What's Changed",
      "What Hasn't Changed",
      "My Take",
    ],
    content: [
      {
        type: "p",
        text: "If you started learning to code ten years ago, your options were textbooks, Stack Overflow, and maybe a few early YouTube tutorials. Today, you've got interactive platforms, AI pair programmers, thousands of free courses, and communities on every platform imaginable. The landscape is unrecognisable — but is learning actually easier?",
      },
      {
        type: "h2",
        text: "Then vs Now",
      },
      {
        type: "p",
        text: "A decade ago, getting set up with a development environment was a rite of passage. You'd spend hours configuring things before writing your first line of code. Documentation was sparse and often written for people who already understood the concepts. The community existed, but it was harder to find and less welcoming to beginners.",
      },
      {
        type: "p",
        text: "Now, you can open a browser tab and start coding in seconds. Platforms like freeCodeCamp, The Odin Project, and Scrimba have made structured learning free and accessible. YouTube has become the world's biggest coding classroom. And AI tools can explain concepts, debug your code, and generate examples on demand.",
      },
      {
        type: "h2",
        text: "What's Changed",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Access to information** — There's no concept or framework you can't find a tutorial for. The information barrier is essentially gone.",
          "**Speed of feedback** — AI tools give you instant explanations. You don't have to wait for a forum reply or struggle alone for hours.",
          "**Community scale** — Discord servers, Twitter, Reddit communities, and local meetups mean you're never truly learning alone.",
          "**Tool quality** — Modern editors, frameworks, and dev tools are dramatically better. The developer experience has improved massively.",
        ],
      },
      {
        type: "h2",
        text: "What Hasn't Changed",
      },
      {
        type: "p",
        text: "Despite all these improvements, the core challenge of learning to code is exactly the same: you have to sit with discomfort. You have to write code that doesn't work and figure out why. You have to build things from scratch, get stuck, and push through. No tool, no AI, no tutorial can do that part for you.",
      },
      {
        type: "quote",
        text: "The tools have changed. The struggle hasn't. And the struggle is where the learning lives.",
      },
      {
        type: "p",
        text: "In fact, the abundance of resources has created a new problem: analysis paralysis. There's so much available that people spend more time choosing what to learn than actually learning. The paradox of choice is real, and it's slowing people down.",
      },
      {
        type: "h2",
        text: "My Take",
      },
      {
        type: "p",
        text: "Learning to code is more accessible than ever, and that's genuinely wonderful. But accessibility doesn't mean easy. The hard parts — the thinking, the debugging, the persistence — are the same as they've always been. Use the new tools, absolutely. But don't mistake access to information for understanding. Understanding only comes from doing the work.",
      },
    ],
    relatedSlugs: [
      "the-self-taught-developers-toolkit",
      "how-to-learn-anything-faster",
    ],
  },
  {
    slug: "the-modern-developers-landscape",
    tag: "Development",
    date: "October 5, 2025",
    readTime: "6 min read",
    title: "The Modern Developer's Landscape: What's Different Now",
    excerpt:
      "The way we build software has changed dramatically. Here's what the modern development world actually looks like.",
    image:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200&q=80",
    tocItems: [
      "The Old Way",
      "What's Changed",
      "New Expectations",
      "Adapting Without Panicking",
    ],
    content: [
      {
        type: "p",
        text: "If you've been paying attention to the tech world, you've probably noticed that the ground is shifting. The tools we use, the way teams are structured, the expectations placed on developers — all of it is evolving fast. Whether you're just starting out or you've been building for years, understanding the current landscape helps you make better decisions about where to invest your time.",
      },
      {
        type: "h2",
        text: "The Old Way",
      },
      {
        type: "p",
        text: "Traditional software development was linear and specialised. You were a frontend developer or a backend developer. You worked in a team with clearly defined roles. Projects moved through planning, development, testing, and deployment in sequential phases. The tools changed slowly, and mastering a single stack could carry you for years.",
      },
      {
        type: "h2",
        text: "What's Changed",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Full-stack is the default** — Companies increasingly want developers who can work across the entire stack. The lines between frontend and backend have blurred significantly.",
          "**Shipping speed matters** — The expectation to deploy fast, iterate quickly, and ship MVPs has never been higher. Frameworks like Next.js, Remix, and SvelteKit are built around this reality.",
          "**AI is a collaborator** — Whether it's code completion, automated testing, or architecture suggestions, AI tools are becoming part of the daily workflow. Ignoring them puts you at a disadvantage.",
          "**Developer experience is a priority** — Tools are built with developer happiness in mind. TypeScript, Tailwind, Vite, Turbopack — the trend is toward faster, more ergonomic development.",
        ],
      },
      {
        type: "h2",
        text: "New Expectations",
      },
      {
        type: "p",
        text: "Modern developers are expected to understand more than just code. You're expected to think about user experience, performance, accessibility, SEO, and deployment. The developer role has expanded, and the most successful developers are the ones who embrace that expansion rather than resist it.",
      },
      {
        type: "quote",
        text: "Being a developer in 2025 means being a generalist who can go deep when needed. The era of pure specialisation is fading.",
      },
      {
        type: "h2",
        text: "Adapting Without Panicking",
      },
      {
        type: "p",
        text: "It's easy to feel overwhelmed by how fast things change. A new framework drops every month. AI capabilities double every quarter. The temptation is to chase everything or freeze and chase nothing. Neither works.",
      },
      {
        type: "p",
        text: "The better approach is to build a solid foundation — understand JavaScript deeply, learn how the web works, get comfortable with one modern framework — and then stay curious about what's emerging. You don't need to adopt everything. You need to know enough to make informed decisions about what's worth your time.",
      },
    ],
    relatedSlugs: [
      "the-ai-debate-what-both-sides-get-right",
      "why-i-study-more-than-just-code",
    ],
  },
  {
    slug: "free-resources-actually-worth-your-time",
    tag: "Learning",
    date: "September 22, 2025",
    readTime: "8 min read",
    title: "Free Resources That Are Actually Worth Your Time",
    excerpt:
      "There are thousands of free coding resources out there. Most are noise. Here are the ones that actually moved the needle for me.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    tocItems: [
      "The Problem with Free",
      "For Learning Fundamentals",
      "For Going Deeper",
      "For Staying Sharp",
      "How to Use Them",
    ],
    content: [
      {
        type: "p",
        text: "One of the best and worst things about learning to code in 2025 is that almost everything is free. Best, because you don't need money to get started. Worst, because the sheer volume of options makes it nearly impossible to know what's actually good. I've wasted hours on resources that taught me nothing. Here are the ones that didn't waste my time.",
      },
      {
        type: "h2",
        text: "The Problem with Free",
      },
      {
        type: "p",
        text: "Free resources range from world-class to completely useless, and the quality isn't always obvious upfront. Some popular YouTube channels teach outdated patterns. Some viral Twitter threads oversimplify important concepts. And some highly-recommended courses are just too slow or too shallow to be worth the time investment.",
      },
      {
        type: "p",
        text: "The key isn't finding more resources — it's finding fewer, better ones and actually completing them.",
      },
      {
        type: "h2",
        text: "For Learning Fundamentals",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**MDN Web Docs** — The single best reference for HTML, CSS, and JavaScript. It's not flashy, but it's thorough, accurate, and maintained by the people who shape web standards.",
          "**The Odin Project** — A free, full-stack curriculum that teaches you by building real projects. It's opinionated about its learning path, which is actually a strength. Less choice, more progress.",
          "**freeCodeCamp** — Thousands of hours of free content across web development, data science, and more. The certifications give you structure and milestones to work toward.",
          "**JavaScript.info** — The most comprehensive, well-written JavaScript tutorial I've found. It goes deep without being overwhelming.",
        ],
      },
      {
        type: "h2",
        text: "For Going Deeper",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Official documentation** — React docs, Next.js docs, TypeScript handbook. These are written by the teams who build the tools. They're the most accurate and up-to-date source of truth.",
          "**GitHub open source projects** — Reading real codebases taught me how production code actually looks. Find a project you use, read its source, and try to understand how it works.",
          "**Tech blogs and engineering posts** — Companies like Vercel, Linear, and Stripe publish engineering blogs that explain real architectural decisions. These are gold for understanding how professionals think.",
        ],
      },
      {
        type: "h2",
        text: "For Staying Sharp",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Daily.dev** — A browser extension that curates developer news. It's a low-effort way to stay aware of what's happening in the industry.",
          "**Dev.to and Hashnode** — Community-driven platforms where developers share real experiences, tutorials, and insights. The quality varies, but the best posts are genuinely helpful.",
          "**Podcasts** — Syntax, The Changelog, and JS Party are great for learning while commuting or exercising. They keep you in the loop without requiring screen time.",
        ],
      },
      {
        type: "quote",
        text: "The best resource is the one you actually finish. Pick one, commit to it, and build something with what you learn before moving to the next.",
      },
      {
        type: "h2",
        text: "How to Use Them",
      },
      {
        type: "p",
        text: "Don't try to use all of these at once. Pick one primary learning resource, supplement it with documentation when you get stuck, and build projects alongside your learning. The resources are the map — but the projects are the territory. You have to walk the territory to actually learn.",
      },
    ],
    relatedSlugs: [
      "the-self-taught-developers-toolkit",
      "how-learning-to-code-has-changed",
    ],
  },
  {
    slug: "why-side-projects-matter",
    tag: "Process",
    date: "September 8, 2025",
    readTime: "5 min read",
    title: "Why Side Projects Matter More Than Your Resume",
    excerpt:
      "Your resume tells people what you've done. Your side projects show them what you can do. That's a crucial difference.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    tocItems: [
      "The Resume Problem",
      "What Side Projects Prove",
      "They Don't Have to Be Big",
      "Start Building",
    ],
    content: [
      {
        type: "p",
        text: "When I started in tech, I obsessed over making my resume look good. The right keywords, the right format, the right buzzwords. But the more I talked to people who were actually doing interesting work, the more I realised: nobody cares about your resume as much as they care about what you've built.",
      },
      {
        type: "h2",
        text: "The Resume Problem",
      },
      {
        type: "p",
        text: "Resumes are backward-looking. They tell someone where you worked, what your title was, and what technologies you listed. But they don't show how you think, how you solve problems, or what you're capable of building. They're a summary of history, not a demonstration of ability.",
      },
      {
        type: "p",
        text: "For self-taught developers especially, resumes can feel like a losing game. You don't have a computer science degree. You don't have three years at a FAANG company. But you know what you do have? The ability to build things from scratch and ship them to the world.",
      },
      {
        type: "h2",
        text: "What Side Projects Prove",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**You can finish things** — Starting projects is easy. Finishing them is rare. A completed side project shows discipline, persistence, and the ability to ship.",
          "**You can think independently** — Nobody told you what to build or how to build it. You identified a problem, designed a solution, and executed it. That's initiative.",
          "**You care about craft** — Side projects show what you build when nobody's watching. They reveal your standards, your taste, and your attention to detail.",
          "**You're always learning** — Side projects are proof that you don't stop learning when the workday ends. You're curious and driven by more than a paycheck.",
        ],
      },
      {
        type: "quote",
        text: "A portfolio of three well-built side projects will open more doors than a perfectly formatted resume ever could.",
      },
      {
        type: "h2",
        text: "They Don't Have to Be Big",
      },
      {
        type: "p",
        text: "Your side project doesn't need to be the next startup. It can be a personal tool that solves a problem you have. A Chrome extension. A CLI tool. A simple web app that does one thing well. The point isn't scale — it's the act of identifying a need, building a solution, and putting it out there.",
      },
      {
        type: "h2",
        text: "Start Building",
      },
      {
        type: "p",
        text: "If you're spending more time polishing your resume than building things, flip the ratio. Use your resume to link to your projects, not the other way around. Let your work speak for itself. The best way to prove you can do something is to have already done it.",
      },
    ],
    relatedSlugs: [
      "building-in-public",
      "what-i-learned-building-my-first-website",
    ],
  },
  {
    slug: "understanding-trends-without-chasing-them",
    tag: "Trends",
    date: "August 25, 2025",
    readTime: "5 min read",
    title: "Understanding Tech Trends Without Chasing Them",
    excerpt:
      "New frameworks, tools, and paradigms drop every week. Here's how to stay informed without losing focus.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    tocItems: [
      "The Hype Cycle",
      "FOMO Is the Enemy",
      "A Better Approach",
      "What I Do",
    ],
    content: [
      {
        type: "p",
        text: "Every month there's a new framework that's supposed to change everything. A new tool that makes the old one obsolete. A new paradigm that everyone's suddenly talking about. If you try to keep up with all of it, you'll burn out. If you ignore all of it, you'll fall behind. The sweet spot is somewhere in the middle.",
      },
      {
        type: "h2",
        text: "The Hype Cycle",
      },
      {
        type: "p",
        text: "Tech has a predictable pattern: something new launches, early adopters go wild, Twitter declares it the future, then reality sets in. Some tools survive the hype cycle and become genuinely useful. Most fade into obscurity. The problem is that in the moment, it's hard to tell which is which.",
      },
      {
        type: "p",
        text: "I've watched frameworks go from \"the future of web development\" to abandoned GitHub repos in less than two years. And I've also dismissed things as hype that turned out to be genuinely transformative. The lesson? Be curious but patient.",
      },
      {
        type: "h2",
        text: "FOMO Is the Enemy",
      },
      {
        type: "p",
        text: "The fear of missing out drives terrible decisions. You drop what you're learning to chase the new thing. You spread yourself thin across five different tools instead of getting good at one. You feel perpetually behind because the finish line keeps moving.",
      },
      {
        type: "quote",
        text: "The developer who deeply understands one framework will always outperform the developer who superficially knows ten.",
      },
      {
        type: "h2",
        text: "A Better Approach",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Understand the problem it solves** — Before diving into a new tool, ask: what problem does this solve that my current tools don't? If you can't answer that clearly, you probably don't need it yet.",
          "**Wait for the dust to settle** — Let early adopters work through the bugs and breaking changes. If something is still gaining traction after 6-12 months, it's worth a closer look.",
          "**Learn concepts, not just tools** — Frameworks come and go, but the concepts underneath them persist. Understand reactivity, state management, server rendering, and component architecture — and you can pick up any framework quickly.",
          "**Follow thoughtful voices** — Find developers and writers who analyse trends critically, not just hype them. Their perspective will save you from chasing dead ends.",
        ],
      },
      {
        type: "h2",
        text: "What I Do",
      },
      {
        type: "p",
        text: "I keep a mental \"awareness list\" of things that are emerging. I read about them, understand what they do, and note why people are excited. But I don't adopt anything until I have a real reason to. My stack is solid, I know it well, and I'd rather build great things with tools I understand than mediocre things with tools I barely know.",
      },
      {
        type: "p",
        text: "Stay aware. Stay curious. But don't let the hype cycle drive your learning. You're building a career, not collecting badges.",
      },
    ],
    relatedSlugs: [
      "the-ai-debate-what-both-sides-get-right",
      "the-modern-developers-landscape",
    ],
  },
  {
    slug: "credentials-vs-curiosity",
    tag: "Life",
    date: "August 10, 2025",
    readTime: "5 min read",
    title: "Credentials vs. Curiosity: What Actually Matters",
    excerpt:
      "Degrees, bootcamps, certifications — they all have their place. But none of them replace genuine curiosity and the work that comes from it.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    tocItems: [
      "The Credentials Question",
      "What Credentials Give You",
      "What Curiosity Gives You",
      "The Real Answer",
    ],
    content: [
      {
        type: "p",
        text: "One of the most common questions I get asked is whether you need a degree or a bootcamp to get into tech. It's a fair question — especially when job listings ask for \"bachelor's degree in computer science or equivalent.\" But the answer isn't as simple as yes or no.",
      },
      {
        type: "h2",
        text: "The Credentials Question",
      },
      {
        type: "p",
        text: "Let's be honest: credentials open doors. A CS degree signals a certain baseline of knowledge. A bootcamp certificate shows you committed time and money to structured learning. These things matter, especially early in your career, because they give hiring managers a shortcut to assess you.",
      },
      {
        type: "p",
        text: "But credentials have limits. They tell someone you completed a program. They don't tell someone you can build a product, debug a production issue at 2am, or think creatively about a problem nobody's solved before. Those things come from somewhere else.",
      },
      {
        type: "h2",
        text: "What Credentials Give You",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Structure** — A defined curriculum and timeline keeps you on track.",
          "**Community** — Classmates and instructors provide support and accountability.",
          "**Signalling** — They communicate baseline competency to employers quickly.",
          "**Foundational theory** — CS degrees in particular teach data structures, algorithms, and computer science fundamentals that self-taught paths might skip.",
        ],
      },
      {
        type: "h2",
        text: "What Curiosity Gives You",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Depth** — Curious people don't stop at \"it works.\" They ask why it works, what could go wrong, and how it could be better.",
          "**Breadth** — Curiosity leads you to explore adjacent fields — design, product, business — that make you a more complete builder.",
          "**Persistence** — When you're genuinely curious about something, you don't need external motivation. The interest itself carries you through hard days.",
          "**Adaptability** — Technology changes fast. Curious people adapt because they're already used to learning new things for the joy of it.",
        ],
      },
      {
        type: "quote",
        text: "A credential gets you to the interview. Curiosity is what makes you interesting when you get there.",
      },
      {
        type: "h2",
        text: "The Real Answer",
      },
      {
        type: "p",
        text: "The best path depends on your situation, your learning style, and your goals. A degree is valuable if you can afford the time and money. A bootcamp is valuable if you need structured intensity. Self-teaching is valuable if you're disciplined and relentlessly curious. None of these paths is inherently better — they're just different routes to the same destination.",
      },
      {
        type: "p",
        text: "But if I had to bet on one quality that separates the developers who thrive from those who stall, it's curiosity. Not credentials, not job titles, not years of experience. Curiosity — the kind that makes you open a new tab and start learning something just because you wanted to know how it works. That's the real edge.",
      },
    ],
    relatedSlugs: [
      "from-music-teacher-to-developer",
      "the-self-taught-developers-toolkit",
    ],
  },
  {
    slug: "the-builders-mindset",
    tag: "Development",
    date: "July 28, 2025",
    readTime: "6 min read",
    title: "The Builder's Mindset: Code Is Just the Beginning",
    excerpt:
      "Writing code is a skill. Building products is a mindset. Here's the difference and why it matters.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    tocItems: [
      "Coder vs Builder",
      "What Builders Think About",
      "How to Develop the Mindset",
      "Building Is a Practice",
    ],
    content: [
      {
        type: "p",
        text: "There's a difference between someone who writes code and someone who builds things. Both might use the same languages, the same frameworks, the same tools. But the way they think about their work is fundamentally different. And that difference shows up in everything they create.",
      },
      {
        type: "h2",
        text: "Coder vs Builder",
      },
      {
        type: "p",
        text: "A coder asks: \"How do I implement this feature?\" A builder asks: \"Should this feature exist? Who is it for? What problem does it solve? What's the simplest version that delivers value?\" The coder focuses on the how. The builder starts with the why.",
      },
      {
        type: "p",
        text: "This isn't about being better or worse. Coding skill is essential — you can't build what you can't code. But coding skill alone produces technically sound products that nobody wants to use. The builder's mindset bridges the gap between code and value.",
      },
      {
        type: "h2",
        text: "What Builders Think About",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**The user** — Who is using this? What do they need? What frustrates them? Builders are obsessed with understanding the person on the other end of the screen.",
          "**The problem** — What's the core problem being solved? Builders resist the urge to over-engineer and focus on solving the real problem simply.",
          "**The experience** — How does it feel to use this? Is it fast? Is it intuitive? Does it spark any moment of delight? Builders care about the experience, not just the functionality.",
          "**The impact** — Does this actually matter? Will it make someone's day better, their work easier, their life simpler? Builders think about impact, not just output.",
        ],
      },
      {
        type: "quote",
        text: "Anyone can learn to code. The rare skill is learning to think about what's worth building and why.",
      },
      {
        type: "h2",
        text: "How to Develop the Mindset",
      },
      {
        type: "p",
        text: "Start by using the products you admire and asking why they work. Why does this app feel so smooth? Why do I keep coming back to this website? What decision did someone make that created this experience? Then, when you build your own things, bring those same questions to the table.",
      },
      {
        type: "p",
        text: "Study fields outside of code. Read about product design, user psychology, marketing, and business strategy. Every one of these disciplines will make you a better builder because they all contribute to the same goal: creating something people want to use.",
      },
      {
        type: "h2",
        text: "Building Is a Practice",
      },
      {
        type: "p",
        text: "The builder's mindset isn't a switch you flip. It's a practice you develop over time by consistently asking better questions, thinking about the user, and caring about the outcome — not just the code. Every project is a chance to practice. Every decision is a chance to think like a builder instead of just a coder.",
      },
      {
        type: "p",
        text: "I'm not interested in just writing code. I want to build things that matter, that people use, that make a difference — however small. That's the mindset. And it starts with caring about more than just the technology.",
      },
    ],
    relatedSlugs: [
      "why-i-study-more-than-just-code",
      "why-side-projects-matter",
    ],
  },
  {
    slug: "how-to-learn-anything-faster",
    tag: "Learning",
    date: "July 12, 2025",
    readTime: "6 min read",
    title: "How to Learn Anything Faster: A Developer's Guide",
    excerpt:
      "Learning speed isn't about intelligence — it's about strategy. Here's the framework that accelerated my learning.",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80",
    tocItems: [
      "Why Most People Learn Slowly",
      "The Framework",
      "Applied to Coding",
      "The Compound Advantage",
    ],
    content: [
      {
        type: "p",
        text: "When I switched careers and started learning to code, I felt like I was behind everyone. People around me seemed to pick things up faster, understand concepts quicker, and build things more easily. It took me a while to realise that the difference wasn't talent — it was approach. The way you learn matters more than how long you spend learning.",
      },
      {
        type: "h2",
        text: "Why Most People Learn Slowly",
      },
      {
        type: "p",
        text: "Most people learn passively. They watch videos, read articles, and highlight notes — all activities that feel productive but don't create lasting understanding. Passive learning is comfortable because it doesn't challenge you. But comfort is the enemy of growth.",
      },
      {
        type: "p",
        text: "The other mistake is trying to learn too many things at once. Context switching between JavaScript, Python, and Rust in the same week means you never get deep enough in any of them to build real competence. Depth creates understanding. Breadth creates confusion.",
      },
      {
        type: "h2",
        text: "The Framework",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Learn just enough to start building** — Don't try to learn everything before you begin. Learn the minimum you need to attempt a project, then learn more as you get stuck. Need drives learning faster than curiosity alone.",
          "**Build immediately** — After every concept you learn, build something that uses it. Read about CSS Grid? Build a layout. Learn about API calls? Fetch some data and display it. The gap between theory and practice is where understanding forms.",
          "**Teach what you learn** — Explain the concept to someone else, write a blog post, or record a voice note to yourself. If you can't explain it simply, you don't understand it yet. Teaching forces clarity.",
          "**Review and connect** — Periodically go back to earlier concepts and see how they connect to what you've learned since. Knowledge compounds when you build connections between ideas.",
        ],
      },
      {
        type: "h2",
        text: "Applied to Coding",
      },
      {
        type: "p",
        text: "When I learn a new technology, I don't read the entire documentation first. I read enough to understand the core idea, then I start building something with it. When I hit a wall — and I always hit a wall — I go back to the docs with a specific question. That specific question drives focused learning that sticks.",
      },
      {
        type: "quote",
        text: "The fastest learners aren't the smartest. They're the ones who spend the least time between learning a concept and using it.",
      },
      {
        type: "h2",
        text: "The Compound Advantage",
      },
      {
        type: "p",
        text: "Learning faster isn't about cramming more hours in. It's about making each hour count more. Over time, this compounds dramatically. Someone who learns actively for 2 hours will outpace someone who learns passively for 6 hours — every single time. The gap widens with every passing month.",
      },
      {
        type: "p",
        text: "You don't need to be smarter. You need to be more strategic. Learn actively, build constantly, teach generously, and connect everything. That's the framework. It works for coding, and it works for everything else too.",
      },
    ],
    relatedSlugs: [
      "how-learning-to-code-has-changed",
      "the-self-taught-developers-toolkit",
    ],
  },
  {
    slug: "the-tools-that-changed-how-i-build",
    tag: "Development",
    date: "June 28, 2025",
    readTime: "6 min read",
    title: "The Tools That Changed How I Build",
    excerpt:
      "Some tools just click. Here are the ones that fundamentally changed my workflow and why they work for me.",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
    tocItems: [
      "Tools Matter",
      "The Game Changers",
      "What I Look For",
      "Find Your Own",
    ],
    content: [
      {
        type: "p",
        text: "I used to think tools didn't matter much — that a good developer could build great things with anything. And that's partly true. But partly isn't fully. The right tools don't just make you faster — they change how you think about building. They remove friction in places you didn't even know had friction.",
      },
      {
        type: "h2",
        text: "Tools Matter",
      },
      {
        type: "p",
        text: "There's a difference between a tool that works and a tool that fits. Plenty of tools work — they do what they claim to do. But the tools that fit are the ones that match your mental model, reduce your cognitive load, and let you focus on the creative work instead of fighting the tooling.",
      },
      {
        type: "h2",
        text: "The Game Changers",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**VS Code** — It's the obvious one, but for good reason. The extension ecosystem, the integrated terminal, the speed — it's where I live when I'm building. Finding the right extensions and customising it to fit my workflow was a game changer.",
          "**Tailwind CSS** — I resisted Tailwind for months because utility classes looked messy. Then I tried it on a real project and never looked back. The speed of styling directly in your markup, without context-switching to separate CSS files, fundamentally changed how fast I can iterate on designs.",
          "**Next.js** — Moving from vanilla React to Next.js was like upgrading from a bicycle to a car. Routing, SSR, API routes, image optimisation — all built in. It removed so many decisions and let me focus on building features.",
          "**TypeScript** — I avoided it because it felt like extra work. Then I started catching bugs before they happened, getting better autocomplete, and understanding my own code better. The upfront cost pays for itself ten times over.",
          "**Git + GitHub** — Not just for version control, but for building in public, collaborating, and creating a visible track record of your work. Git discipline changed how I think about code changes.",
        ],
      },
      {
        type: "quote",
        text: "The best tools are the ones that disappear. They become so natural to your workflow that you forget they're there — you just build.",
      },
      {
        type: "h2",
        text: "What I Look For",
      },
      {
        type: "p",
        text: "When I evaluate a new tool, I ask three questions. Does it reduce friction? Does it match how I think? And does it have staying power — is this something I can invest time in learning without it disappearing in a year? If the answer to all three is yes, it's worth trying.",
      },
      {
        type: "h2",
        text: "Find Your Own",
      },
      {
        type: "p",
        text: "My tools might not be your tools. What matters is that you invest time in finding and mastering the tools that fit you. Don't just use what everyone else uses — use what makes you most effective. Experiment, try new things, and when something clicks, commit to learning it deeply. Your tools are an extension of how you think. Choose them wisely.",
      },
    ],
    relatedSlugs: [
      "the-modern-developers-landscape",
      "free-resources-actually-worth-your-time",
    ],
  },
  {
    slug: "stop-consuming-start-creating",
    tag: "Process",
    date: "June 10, 2025",
    readTime: "5 min read",
    title: "Stop Consuming, Start Creating: A Letter to New Developers",
    excerpt:
      "You don't need another tutorial. You don't need another course. You need to close the tab and start building.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
    tocItems: [
      "The Consumption Trap",
      "Why We Stay Stuck",
      "The Shift",
      "A Challenge",
    ],
    content: [
      {
        type: "p",
        text: "This post is for the person who has watched 47 YouTube tutorials, bookmarked 23 articles, started 5 different courses, and still doesn't feel ready to build something. I know you're out there because I was you. And I need to tell you something you probably don't want to hear: you're not learning. You're hiding.",
      },
      {
        type: "h2",
        text: "The Consumption Trap",
      },
      {
        type: "p",
        text: "Consuming content feels productive. You're learning new syntax, seeing new patterns, following along with projects. But there's a fundamental difference between watching someone build something and building something yourself. One is entertainment. The other is education.",
      },
      {
        type: "p",
        text: "The consumption trap is seductive because it's comfortable. You never have to face the blank editor. You never have to sit with a bug you can't solve. You never have to confront the gap between what you know and what you can do. But that gap is exactly where growth happens.",
      },
      {
        type: "h2",
        text: "Why We Stay Stuck",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**Fear of failure** — Building something means it might not work. It might look bad. It might break. And that feels risky. But failure in code is temporary — you can always fix it, refactor it, or start over.",
          "**The readiness myth** — You'll never feel ready. There's always one more concept to learn, one more tutorial to watch. Readiness is a feeling that comes after you start, not before.",
          "**Comparison** — You see polished projects online and think you can't possibly build anything that good. But you're comparing your beginning to someone else's middle. That's not fair to you.",
        ],
      },
      {
        type: "quote",
        text: "You will learn more in one weekend of building a broken project than in a month of watching perfect tutorials.",
      },
      {
        type: "h2",
        text: "The Shift",
      },
      {
        type: "p",
        text: "The moment things changed for me was when I decided to build something without a tutorial. No guide, no walkthrough, no hand-holding. Just me, a blank file, and an idea. It was messy. It was frustrating. I Googled constantly. But when it finally worked — even barely — I felt something no tutorial had ever given me: confidence.",
      },
      {
        type: "p",
        text: "That confidence is the most valuable thing you can earn as a new developer. Not knowledge — confidence. The knowledge you can always Google. But the confidence that you can figure things out? That has to be earned through doing.",
      },
      {
        type: "h2",
        text: "A Challenge",
      },
      {
        type: "p",
        text: "Here's my challenge to you: close every tutorial tab. Open a blank project. Think of the simplest thing you could build — a personal page, a calculator, a to-do list. And build it without following a guide. Use documentation when you're stuck. Use Google when you're lost. But don't follow someone else's steps. Take your own.",
      },
      {
        type: "p",
        text: "It won't be perfect. It won't be pretty. But it will be yours. And that's worth more than a hundred tutorials you followed along with but never finished.",
      },
    ],
    relatedSlugs: [
      "what-i-learned-building-my-first-website",
      "building-in-public",
    ],
  },
  {
    slug: "what-nobody-tells-you-about-coding",
    tag: "Life",
    date: "May 20, 2025",
    readTime: "5 min read",
    title: "What Nobody Tells You About Learning to Code",
    excerpt:
      "It's not just hard technically. It's hard emotionally. Here's what I wish someone had told me on day one.",
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&q=80",
    tocItems: [
      "The Emotional Rollercoaster",
      "The Things Nobody Mentions",
      "What Helped Me",
      "You're Not Behind",
    ],
    content: [
      {
        type: "p",
        text: "Every \"learn to code\" guide talks about syntax, frameworks, and projects. Very few talk about the emotional experience of learning to code — the frustration, the self-doubt, the imposter syndrome, and the days where you want to quit entirely. But this is the stuff that actually determines whether you'll make it.",
      },
      {
        type: "h2",
        text: "The Emotional Rollercoaster",
      },
      {
        type: "p",
        text: "Learning to code is a constant cycle of feeling brilliant and feeling stupid. One hour you solve a problem and feel like a genius. The next hour you spend 45 minutes on a typo and question every life decision that led you here. This rollercoaster is completely normal, but nobody prepares you for it.",
      },
      {
        type: "p",
        text: "The worst part is comparing your insides to other people's outsides. You see finished projects on Twitter and think everyone else has it figured out. They don't. Behind every polished portfolio is a graveyard of abandoned projects, frustrating bugs, and moments of serious doubt.",
      },
      {
        type: "h2",
        text: "The Things Nobody Mentions",
      },
      {
        type: "ol",
        text: "",
        items: [
          "**You'll forget things constantly** — Learning isn't linear. You'll learn something on Monday and completely forget it by Thursday. That's normal. Your brain needs repetition and application to retain information.",
          "**Progress is invisible day-to-day** — You won't notice yourself getting better because the improvement is gradual. But look back three months and the difference is massive.",
          "**Everyone Googles everything** — Senior developers with decades of experience Google syntax constantly. It's not cheating — it's how the job works. Your value isn't in memorising syntax. It's in knowing what to build and how to think about problems.",
          "**The lonely days are real** — Self-teaching can be isolating, especially when you're stuck and have nobody to ask. Finding a community — even an online one — makes an enormous difference.",
        ],
      },
      {
        type: "quote",
        text: "The hardest part of learning to code isn't the code. It's believing you can do it long enough to actually do it.",
      },
      {
        type: "h2",
        text: "What Helped Me",
      },
      {
        type: "p",
        text: "Three things kept me going during the hardest days. First, keeping a progress journal where I wrote down what I learned each day — even small things. When I felt stuck, I could look back and see how far I'd come. Second, finding other self-taught developers online who were honest about their struggles. Knowing I wasn't alone made the hard days bearable. Third, building things I actually cared about. Working on projects that mattered to me gave me motivation that \"build a to-do app\" exercises never could.",
      },
      {
        type: "h2",
        text: "You're Not Behind",
      },
      {
        type: "p",
        text: "If you're learning to code right now and feeling behind, frustrated, or overwhelmed — I want you to know that's part of the process, not a sign that something's wrong. Every developer who's ever shipped anything started where you are. The only difference between them and someone who gave up is that they kept going through the hard days.",
      },
      {
        type: "p",
        text: "You're not behind. You're not too old. You're not too late. You're exactly where you need to be. Just keep building.",
      },
    ],
    relatedSlugs: [
      "from-music-teacher-to-developer",
      "stop-consuming-start-creating",
    ],
  },
];

export const categories = [
  "All Posts",
  "Learning",
  "Development",
  "Design",
  "Process",
  "Life",
  "Trends",
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is BlogPost => p !== undefined);
}
