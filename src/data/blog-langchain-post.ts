import type { BlogPost } from "./blog";

export const langchainPost: BlogPost[] = [
  {
    slug: "where-langchain-fits-in-my-stack",
    tag: "Development",
    date: "Jun 2, 2026",
    readTime: "11 min read",
    title: "Where LangChain and LangGraph Fit in My Stack.",
    excerpt:
      "I used LangChain, swapped to the Claude SDK, and now I'm reconsidering. Here's an honest architectural decision process from someone who builds AI systems for clients — not tutorials.",
    image: "/opengraph-image",
    pinned: true,
    tocItems: [
      "The Honest Starting Point",
      "What LangChain Actually Is Now",
      "What LangGraph Solves That Direct APIs Don't",
      "Why I Swapped to Claude SDK",
      "Where I Was Wrong",
      "The Architecture Decision Framework",
      "Where LangGraph Fits in My Projects",
      "Forge: The Case for Graph-Based Agents",
      "Client Work: The Case for Simplicity",
      "Theories Are Theories Until You Ship",
      "What I'm Building Next",
    ],
    content: [
      {
        type: "p",
        text: "I'm going to be honest about something most developers won't admit: I used LangChain for a client chatbot project, hit friction, swapped to the Claude SDK for more direct control, and moved on. That was months ago. The framework has changed significantly since then, and so has my understanding of when you actually need an orchestration layer versus when you're adding complexity for no reason.",
      },
      {
        type: "p",
        text: "This isn't a comparison article that benchmarks response times and declares a winner. This is how I actually think through architectural decisions for AI systems — as someone who builds these for real clients with real money, not for blog post demos.",
      },
      {
        type: "h2",
        text: "The Honest Starting Point",
      },
      {
        type: "p",
        text: "When I first integrated LangChain into a client project — a customer service chatbot for a Malaysian business — the abstraction layer felt heavy for what I needed. I was making simple tool-calling requests: query a product database, check stock levels, answer FAQs. LangChain added a layer between me and the model that made debugging harder and didn't give me anything I couldn't do with a direct API call. So I swapped to the Claude SDK, got more control, shipped the feature, and moved on.",
      },
      {
        type: "p",
        text: "That was the right decision for that project at that time. A single-agent chatbot answering customer questions doesn't need graph-based state management. It needs a system prompt, some tools, and clean error handling. The Claude SDK does that elegantly with minimal abstraction.",
      },
      {
        type: "p",
        text: "But here's what I've learned since: the projects I'm building now are getting more complex. And the problems I'm running into — state management across multi-step workflows, durable execution for long-running processes, human-in-the-loop approval gates — are exactly what LangGraph was designed to solve.",
      },
      {
        type: "h2",
        text: "What LangChain Actually Is Now",
      },
      {
        type: "p",
        text: "LangChain in 2026 is not the same tool I used months ago. The ecosystem has split into distinct layers, each solving a different problem. LangChain is the agent framework — abstractions and integrations for models, tools, and agent loops. LangGraph is the orchestration runtime — durable execution, streaming, human-in-the-loop, and persistence. LangSmith is the observability platform — tracing, evaluation, and debugging for production agents. Understanding this separation matters because my original frustration was with using the framework layer when I only needed the API layer. The orchestration layer — LangGraph — is the part I hadn't properly evaluated.",
      },
      {
        type: "h2",
        text: "What LangGraph Solves That Direct APIs Don't",
      },
      {
        type: "p",
        text: "When you call the Claude API directly, you get a request-response cycle. You send a message, the model responds, maybe it calls a tool, you handle the tool result, loop back. For a chatbot, this is fine. For a system that needs to make decisions across multiple steps, with branching logic, persistence between failures, and human checkpoints — the request-response model falls apart.",
      },
      {
        type: "p",
        text: "LangGraph models these workflows as directed graphs. Each node is a step — a model call, a tool execution, a human approval gate, a conditional branch. Edges define the flow between steps. State persists across the entire graph execution, which means if a process fails at step 7 of 12, it can resume from step 7 instead of restarting from scratch. That's not a nice-to-have for production systems. It's a requirement.",
      },
      {
        type: "p",
        text: "The specific capabilities that matter for the systems I build: checkpointing — save the state of an agent at any point and resume later. Human-in-the-loop — pause execution, surface the current state to a human for review, then continue based on their decision. Long-term memory — agents that remember context across sessions, not just within a single conversation. These are the patterns I've been implementing manually with custom code. LangGraph makes them first-class primitives.",
      },
      {
        type: "h2",
        text: "Why I Swapped to Claude SDK",
      },
      {
        type: "p",
        text: "I want to be clear about why the direct SDK was the right call for that project, because the reasoning still holds for a category of applications. The client needed a customer-facing chatbot that answers questions about products, checks stock, and escalates complex queries to a human. That's a single agent with a system prompt, four tools, and basic conversation history. The entire implementation was about 200 lines of code with the Claude SDK.",
      },
      {
        type: "p",
        text: "Adding LangChain to this would have meant: learning the framework's abstractions for something I could write directly, adding a dependency that increases bundle size and maintenance surface, and introducing a layer of indirection between me and the model that makes debugging less transparent. For this use case, the Claude SDK was faster to implement, easier to debug, and produced the same result.",
      },
      {
        type: "p",
        text: "The Claude SDK's tool-use-first approach is excellent for single-agent architectures. You define tools, the model decides when to use them, you handle the results. Clean, minimal, production-ready. If your agent doesn't need to decide what to do next based on results from a previous step in a multi-step workflow — you probably don't need a framework.",
      },
      {
        type: "h2",
        text: "Where I Was Wrong",
      },
      {
        type: "p",
        text: "My mistake was extrapolating from one use case. 'LangChain added unnecessary complexity to my chatbot' became 'LangChain adds unnecessary complexity.' Those are very different statements. The first is an observation about a specific project. The second is a generalization that doesn't hold for the systems I'm building now.",
      },
      {
        type: "p",
        text: "Forge — my business operating system — has an AI chat layer that queries business data and takes actions. Right now it's a simple tool-calling loop with the Gemini API. But the features I want to add are fundamentally multi-step: generate a quote, review the line items with me, adjust based on my feedback, then generate the final document. That's not a single request-response. That's a workflow with state, branching, and human-in-the-loop approval. That's exactly what LangGraph is for.",
      },
      {
        type: "h2",
        text: "The Architecture Decision Framework",
      },
      {
        type: "p",
        text: "Here's how I actually decide what to use for AI features in my projects. Not theory — the decision tree I apply when scoping real work for real clients.",
      },
      {
        type: "ol",
        text: "",
        items: [
          "Single agent, simple tools, conversation only → Direct SDK (Claude, Gemini, OpenAI). No framework needed. The API is the framework.",
          "Single agent, complex tool chains, needs memory across sessions → Direct SDK with a custom persistence layer. A database table for conversation history and a retrieval function. Still simpler than a framework.",
          "Multi-step workflow with branching logic → LangGraph. The moment your agent needs to make decisions that change the execution path — 'if the customer approves, generate the invoice; if they request changes, loop back to editing' — you need graph-based orchestration. Building this manually means writing a state machine from scratch. LangGraph is a state machine purpose-built for AI workflows.",
          "Multi-agent system with coordination → LangGraph. Multiple agents collaborating — a research agent feeding results to an analysis agent feeding results to a reporting agent — need shared state, handoff protocols, and execution coordination. This is where frameworks earn their complexity.",
          "Regulated industry with audit requirements → LangGraph. Healthcare, finance, legal — any domain where you need an audit trail of every agent decision, the ability to inspect intermediate states, and human approval gates before actions execute. Checkpointing and human-in-the-loop aren't optional here. They're compliance requirements.",
        ],
      },
      {
        type: "p",
        text: "Most of my client work falls into categories 1 and 2. Most of my product work is heading toward categories 3 and 4. That's why my perspective on LangGraph is shifting — the problems I'm solving are getting more complex.",
      },
      {
        type: "h2",
        text: "Where LangGraph Fits in My Projects",
      },
      {
        type: "p",
        text: "I think about this concretely, project by project, not as a blanket adoption decision.",
      },
      {
        type: "h2",
        text: "Forge: The Case for Graph-Based Agents",
      },
      {
        type: "p",
        text: "Forge currently uses the Gemini API via Vercel AI SDK for its chat layer. Simple tool calling — query clients, query projects, generate documents. It works. But the roadmap for Forge includes features that push beyond what direct API calls handle cleanly.",
      },
      {
        type: "p",
        text: "Document generation workflow: the user says 'generate a quote for this client.' The agent pulls client data, generates line items based on the project scope, presents a draft for review, accepts edits, finalises the document, and logs the event. That's 6 steps with a human review gate in the middle. If the user edits a line item, the workflow branches back. If they approve, it continues forward. If they abandon, the state needs to be saved so they can resume later. This is a directed graph with state persistence and human-in-the-loop. LangGraph.",
      },
      {
        type: "p",
        text: "Semantic search across business data: I've set up pgvector in Supabase for document embeddings. The next step is an agent that can search across all business documents semantically, synthesise findings, and present them with citations. A research agent feeding into a synthesis agent. Multi-agent coordination. LangGraph.",
      },
      {
        type: "h2",
        text: "Client Work: The Case for Simplicity",
      },
      {
        type: "p",
        text: "For 88 Badminton House — the e-commerce platform I'm building — there's no LangGraph. The AI features are straightforward: a potential WhatsApp chatbot that answers product questions and checks stock. Single agent, few tools, stateless conversations. The Claude SDK or direct API is the right choice. Adding LangGraph would be over-engineering for a badminton shop that needs a stock checker, not a multi-agent research system.",
      },
      {
        type: "p",
        text: "This is the discipline that matters more than framework choice: matching the tool to the problem. The worst AI architecture isn't the one that uses the wrong framework. It's the one that uses a framework to look sophisticated when a 200-line script would have shipped faster and worked better.",
      },
      {
        type: "h2",
        text: "Theories Are Theories Until You Ship",
      },
      {
        type: "p",
        text: "I've spent hours reading about agent architectures, multi-agent patterns, and orchestration frameworks. Research papers about ReAct agents, chain-of-thought reasoning, tree-of-thought planning. Most of it is fascinating and almost none of it matters until you sit with a real user who needs a real problem solved by Friday.",
      },
      {
        type: "p",
        text: "The theory says multi-agent systems with specialised roles produce better outputs. The reality is that my client doesn't care about agent architecture. They care about whether the chatbot answers the question correctly and whether the stock count is accurate. If a single agent with good tools solves that, the theory about multi-agent superiority is irrelevant for this deployment.",
      },
      {
        type: "p",
        text: "My workflow reflects this pragmatism. I start every AI feature with the simplest possible architecture — direct API call with tools. I only add complexity when I hit a problem the simple approach can't solve. Needed branching logic? Add LangGraph. Needed persistence across sessions? Add a state store. Needed human approval? Add a checkpoint. Each layer of complexity is earned by a real requirement, not anticipated from a theoretical framework.",
      },
      {
        type: "p",
        text: "This is the same principle I apply to everything I build. I designed a 12-table database schema for an e-commerce platform not because a tutorial said to, but because the business had customers, orders, products, variants, stringing jobs, and racket profiles that needed to relate to each other. Every table earned its existence by serving a real data relationship.",
      },
      {
        type: "h2",
        text: "What I'm Building Next",
      },
      {
        type: "p",
        text: "I'm integrating LangGraph into Forge's document generation pipeline as a concrete test. Not because I want to use a new framework — because the workflow genuinely requires stateful, multi-step execution with human-in-the-loop approval. The implementation will let me evaluate LangGraph against the criteria that actually matter: does it make the workflow more reliable, more debuggable, and easier to extend?",
      },
      {
        type: "p",
        text: "I'll also be exploring LangSmith for observability. Right now, debugging my AI features means reading console logs and tracing tool calls manually. For a solo developer building a business tool, that's manageable. For production systems serving multiple clients, I need structured traces, latency tracking, and evaluation pipelines. That's what LangSmith provides.",
      },
      {
        type: "p",
        text: "The honest conclusion: I dismissed LangChain too early based on a use case that didn't need it. The framework has evolved, my projects have grown more complex, and the problems I'm solving now are moving into territory where orchestration frameworks earn their weight. The key is knowing when you've crossed that line — and not crossing it prematurely because a blog post told you multi-agent is the future.",
      },
      {
        type: "quote",
        text: "The best architecture isn't the most sophisticated one. It's the simplest one that solves the actual problem. Add complexity when the problem demands it, not when the framework offers it.",
      },
    ],
    relatedSlugs: [
      "why-i-build-everything-on-supabase",
      "the-difference-between-vibe-coding-and-building",
    ],
  },
];
