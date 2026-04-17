<!-- AUTO-GENERATED: safe to edit, do not delete header -->
# Knowledge Changelog

> Automatically updated by dotai on each git commit (when hook is installed).
> Also updated manually via `dotai knowledge update`.

<!-- Entries are prepended (newest first) -->

## 2026-04-18 — Full site redesign + content updates (agent: claude-sonnet-4-6)

### index.html — Complete redesign
- Replaced dark/neon/glassmorphism design with brand-compliant light theme
- Font: Inter → Nunito (200–800) + JetBrains Mono; removed Font Awesome
- Colors: saturated gradients → brand design tokens (Charcoal, Off-White, Steel Teal)
- Added 8 sections: Hero, Programs, OSS, Audience, Mission/Values, Get Involved, Contact, Footer
- Removed Roadmap section (user request)
- Removed email subscribe form; replaced with contact cards (Email, Facebook, GitHub)
- OSS section: dotai updated to v3.0.0, GitHub link → `github.com/nbslabs/dotai-cli`
- Supported tools trimmed to: Claude Code, Gemini CLI, Antigravity, GitHub Copilot
- ConvoCart + Eshaaz removed; tracely added to in-development projects
- Sponsor card "Get in touch" → `/contact`
- Added IntersectionObserver scroll reveal, mobile hamburger nav, nav scroll shadow

### README.md — Updated
- dotai version: v2.0.0 → v3.0.0
- GitHub link: `/nbslabs` → `/nbslabs/dotai-cli`
- Supported tools list corrected
- ConvoCart + Eshaaz removed; tracely added
