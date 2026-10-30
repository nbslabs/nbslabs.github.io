**nbslabs**

*Research-Driven Open-Source AI Lab*

**Organization Profile**

Inventing Tools, Publishing Research, Shipping Open Source

nbslabs.dev

github.com/nbslabs

Copyright 2025 nbslabs. Dhaka, Bangladesh

# **1. Organization Overview**

nbslabs is an independent research and engineering lab focused on building open-source tools and conducting applied research at the intersection of artificial intelligence, algorithms, and software systems. Founded by engineers who believe that meaningful innovation comes from building and releasing real artifacts, not from packaging tutorials, nbslabs exists to produce original work that pushes boundaries, then give it away to the world.

The lab operates on a simple thesis: great ideas deserve open implementations. Every tool we build, every experiment we run, and every finding we publish is open-source by default. We are not a course platform. We are a lab that ships code, writes papers, and releases tools that developers and researchers actually use.

| Organization           | nbslabs (NBS Labs)                                                                      |
|:---------------------- |:--------------------------------------------------------------------------------------- |
| **Founded**            | 2025                                                                                    |
| **Type**               | Independent Research and Open-Source Engineering Lab                                    |
| **Headquarters**       | Dhaka, Bangladesh                                                                       |
| **Website**            | https\://nbslabs.dev                                                                    |
| **GitHub**             | https\://github.com/nbslabs                                                             |
| **npm (flagship pkg)** | @nbslabs/dotai                                                                          |
| **Focus Areas**        | AI research and applications, open-source tooling, algorithms, developer infrastructure |
| **Identity**           | Research lab that builds and publishes, not a course seller                             |

# **2. Mission and Vision**

## **Mission**

To advance the state of AI tooling, algorithms, and applied intelligence through open-source engineering and original research, making our work freely available so that developers, researchers, and organizations worldwide can build on top of it.

## **Vision**

A world where a small, focused lab in Bangladesh produces open-source tools and research that compete with and complement the output of the best labs anywhere, proving that impactful innovation is not gated by geography, headcount, or funding.

# **3. Core Values**

| **Research First**                 | We exist to explore, experiment, and discover. Every project begins with a question worth answering, not a course worth selling. Our north star is original contribution to the field.      |
|:---------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Open by Default**                | Every tool, dataset, model, and paper we produce is open-source. Proprietary lock-in is antithetical to our mission. Knowledge compounds when it is shared.                                 |
| **Ship Real Artifacts**            | Research that lives only in notebooks is incomplete. We ship production-grade tools, CLI utilities, libraries, and infrastructure that people depend on. Building is how we validate ideas. |
| **Depth Over Breadth**             | We go deep on problems that matter rather than skimming the surface of trending topics. Rigorous understanding of fundamentals, algorithms, and systems is non-negotiable.                  |
| **Global Impact from Local Roots** | We are proudly based in Bangladesh and aim to demonstrate that world-class research and engineering can originate from anywhere.                                                            |

# **4. Research and Engineering Areas**

nbslabs operates across four interconnected research and engineering tracks. Each track produces open-source tools, technical publications, or both.

## **Applied AI and Intelligent Systems**

Building AI-powered tools and systems that solve real problems across domains. This includes AI agents, agentic workflows, retrieval-augmented generation (RAG) systems, AI-native developer tools, and intelligent automation. We apply large language models, embeddings, and machine learning pipelines to domains where they create genuine leverage, not hype.

## **Algorithms and Data Structures**

Original work on algorithms, data structures, and computational techniques. This ranges from novel approaches to graph problems and search to practical optimizations in parsing, indexing, and code analysis. We publish implementations alongside explanations, making algorithmic research accessible and reproducible.

## **Developer Infrastructure and Tooling**

Production-grade open-source tools for developers, particularly in the AI-augmented development space. Configuration management, code analysis, documentation generation, knowledge graphs, and protocol-level tooling (MCP servers, language servers). These tools are not demos; they are things engineers install and rely on.

## **Core AI Research**

Exploratory work in core AI areas: model behavior, prompt engineering science, agent architectures, evaluation methodologies, and novel applications of transformer-based systems. When we find something interesting, we write it up and release it.

# **5. Open-Source Projects**

Open-source software is the primary output of nbslabs. Every project is publicly available, actively maintained, and designed to be useful beyond the lab.

## **dotai (@nbslabs/dotai)**

The flagship project. dotai is a CLI tool that solves a painful problem in AI-augmented development: every AI coding assistant (Claude Code, GitHub Copilot, Gemini CLI, Cursor, Windsurf, etc.) expects its configuration in a different file at a different path. dotai unifies all those configurations under a single .ai/ directory and manages them via symlinks, so developers write once and all tools stay in sync.

| Package          | @nbslabs/dotai                                                                                |
|:---------------- |:--------------------------------------------------------------------------------------------- |
| **Registry**     | https\://www\.npmjs.com/package/@nbslabs/dotai                                                |
| **Language**     | Node.js / TypeScript                                                                          |
| **Status**       | Active, v2.0.0 roadmap in progress                                                            |
| **Key feature**  | Single .ai/ config directory, symlink-based multi-tool sync                                   |
| **v2.0 roadmap** | dotai knowledge: persistent agent memory layer, MCP stdio server, codebase scanner, git hooks |

## **Additional Projects**

The nbslabs project portfolio extends beyond dotai into several open-source tools and applications:

* **DiffLense** ([difflense](https://github.com/nbslabs/difflense)) - A clean, secure, privacy-focused git diff viewer that processes everything client-side. Upload a diff file or paste raw diff text to explore changes with a structured view. Features side-by-side and unified diff views, file navigation sidebar, syntax highlighting, and responsive design. Live at [difflense.nbslabs.dev](https://difflense.nbslabs.dev). License: GPL-3.0.

* **ielts30** ([ielts30](https://github.com/nbslabs/ielts30)) - A structured, interactive 30-day IELTS study planner with progress tracking, built-in practice timers, score logging, and mistake analysis. Designed for candidates targeting a strong band score with a focused 4-5 hours daily routine. 100% privacy-first, all data stays in the browser. Live at [ielts30.nbslabs.dev](https://ielts30.nbslabs.dev).

* **Dhaka City Ludo** ([dhaka-city-ludo](https://github.com/nbslabs/dhaka-city-ludo)) - A Dhaka City themed digital Ludo board game built as a browser-based application. Live at [dhakaludo.nbslabs.dev](https://dhakaludo.nbslabs.dev).

* **nbslabs.github.io** ([nbslabs.github.io](https://github.com/nbslabs/nbslabs.github.io)) - The official nbslabs organization website source code, serving as the lab's public-facing site at [nbslabs.dev](https://nbslabs.dev).

Each project begins as a research question or a practical need and graduates into a tool when the answer proves useful.

# **6. How We Work**

nbslabs is not structured like a traditional company or educational nonprofit. It operates like a research lab that happens to ship production software.

### **Research, Build, Release, Write**

Every project follows this cycle. We identify a problem or question, research it deeply, build a tool or system that embodies our findings, release it as open source, and publish our learnings. The cycle then repeats as users and contributors surface new questions.

### **Small Team, High Output**

We intentionally stay small. A focused team working on carefully chosen problems produces better work than a large organization spreading itself thin. Every member of nbslabs is both a researcher and an engineer.

### **Community Through Contribution, Not Courses**

We build community by building things together, not by selling access to knowledge. Contributors, collaborators, and users of our tools are our community. Open issues, pull requests, technical discussions, and co-authored research are how relationships form at nbslabs.

### **Workshops as Knowledge Sharing, Not Products**

We occasionally run workshops and publish educational content, but these are byproducts of our research and building, not our core business. When we learn something worth sharing, we share it freely.

# **7. Technology Philosophy**

**AI as a research subject and a building tool, simultaneously.** We study AI systems, and we use AI systems to accelerate our own research and engineering. This dual relationship gives us practical insight that pure research labs and pure product teams often lack.

**Algorithms matter.** In an era of "just prompt the model," we maintain that deep understanding of algorithms, data structures, and computational complexity is what separates engineers who build reliable systems from those who build fragile demos.

**Interoperability is a design principle.** Our tools (like dotai) are built to work across ecosystems, not to create vendor lock-in. We believe the AI tooling landscape is healthiest when tools compose rather than compete.

**Reproducibility is non-negotiable.** Every experiment, benchmark, and claim we publish comes with code, data, and instructions to reproduce it. If it cannot be reproduced, it is not research.

# **8. Strategic Roadmap**

### **Horizon 1 - Foundation (2025)**

* Ship dotai v2.0.0 with the knowledge layer and MCP stdio server.

* Publish first technical reports on AI-native developer tooling patterns.

* Establish the lab's open-source contribution workflow and release cadence.

* Grow the open-source project portfolio with new developer tools and research-driven applications.

### **Horizon 2 - Research Momentum (2026)**

* Publish original research in applied AI, code intelligence, and agent architectures.

* Release 3+ new open-source tools from active research tracks.

* Build a small network of research collaborators (academic and independent).

* Establish nbslabs as a recognized contributor in the AI-native tooling space.

### **Horizon 3 - Lab at Scale (2027+)**

* Sustain a portfolio of 10+ actively maintained open-source projects.

* Publish research that is cited and built upon by the broader community.

* Attract research grants, open-source sponsorships, and industry partnerships.

* Mentor emerging researchers and engineers through collaborative project work, not courses.

* Demonstrate that a lab based in Bangladesh can consistently produce globally relevant research and tools.

# **9. Get Involved**

nbslabs is an open lab. If you are interested in what we are building, there are concrete ways to participate:

| Contribute        | Fork any project on github.com/nbslabs, pick an open issue, and open a pull request. All skill levels welcome.                                               |
|:----------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Collaborate**   | If you are a researcher or engineer working on related problems, reach out. We actively seek co-authors and collaborators for research and tooling projects. |
| **Use Our Tools** | Install our packages, use them in your workflow, file issues, and give feedback. Users who push our tools to their limits are invaluable.                    |
| **Sponsor**       | Help sustain open-source development and independent research through financial sponsorship. Reach out via nbslabs.dev.                                      |

*"Research it. Build it. Open-source it."*
