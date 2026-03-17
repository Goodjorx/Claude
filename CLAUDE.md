# CLAUDE.md — AI Assistant Reference Guide

This file provides essential context for AI assistants (Claude Code and others) working in this repository. Read it fully before making any changes.

---

## Project Overview

**Project:** Claude × CenteIA Education Integration
**Repository:** `Goodjorx/Claude`
**Purpose:** Build an AI-powered layer on top of the [CenteIA Education](https://centeia.com/en/home/) platform using Anthropic's Claude API. CenteIA is a Spanish-language edtech company that has trained 400,000+ professionals in AI and emerging technologies.

### What This Project Does

This project integrates Claude AI capabilities into CenteIA's learning ecosystem to:
- Provide AI-powered tutoring and Q&A for students enrolled in CenteIA courses
- Automate personalized learning feedback and explanations
- Support CenteIA PRO and CriptoIA PRO course participants with on-demand AI assistance
- Build educational tools powered by the Anthropic Claude API for Spanish-speaking learners

---

## Repository Structure

> **Note:** This repository is in early initialization. The structure below reflects the planned architecture. Update this section as files are added.

```
Claude/
├── CLAUDE.md               # This file — AI assistant context
├── README.md               # Public-facing project description
├── .env.example            # Environment variable template (never commit .env)
├── .gitignore              # Git ignore rules
│
├── src/                    # Main source code
│   ├── api/                # Claude API integration layer
│   ├── agents/             # Custom AI agents and workflows
│   ├── prompts/            # System prompts and prompt templates
│   └── utils/              # Shared utility functions
│
├── tests/                  # Test suites
│   ├── unit/
│   └── integration/
│
├── docs/                   # Developer documentation
└── scripts/                # Dev/deployment helper scripts
```

---

## Tech Stack & Key Dependencies

This project uses the **Anthropic Claude API**. When building features, default to:

| Component | Choice |
|-----------|--------|
| AI Model | `claude-sonnet-4-6` (default), `claude-opus-4-6` for complex reasoning |
| SDK | `@anthropic-ai/sdk` (Node.js) or `anthropic` (Python) |
| Language | TBD — follow whatever language is established in `src/` |

**Model IDs (current as of 2026):**
- `claude-opus-4-6` — Most capable, use for complex tasks
- `claude-sonnet-4-6` — Balanced performance/cost (default)
- `claude-haiku-4-5-20251001` — Fastest, use for high-throughput simple tasks

---

## Development Workflow

### Branching Strategy

- **`main`** — Stable, production-ready code only
- **`claude/<feature>-<id>`** — Feature branches for AI-assisted development (e.g. `claude/add-tutor-agent-xYz12`)
- Never push directly to `main`; always open a PR

### Git Practices

```bash
# Create a feature branch
git checkout -b claude/<feature-name>-<short-id>

# Push with upstream tracking
git push -u origin claude/<feature-name>-<short-id>
```

> **Critical:** Branch names pushed by Claude Code must start with `claude/` and end with the session ID suffix, or push will fail with HTTP 403.

### Commit Message Convention

Use clear, descriptive commit messages in **imperative present tense**:

```
Add Claude API client initialization
Fix prompt template for Spanish language responses
Update tutor agent to handle multi-turn conversations
```

Do **not** use: "Added...", "Fixed...", "Updated..." (past tense)

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

```env
# Anthropic
ANTHROPIC_API_KEY=your_key_here

# CenteIA platform integration
CENTEIA_API_URL=https://education.centeia.com/api
CENTEIA_API_KEY=your_centeia_key_here

# App config
NODE_ENV=development
LOG_LEVEL=info
```

---

## Claude API Usage Conventions

### Always use structured tool use for external actions

```typescript
// Good — use tools for side effects
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools: [...],
  messages: [...]
});

// Bad — never parse free-text for structured actions
```

### System Prompt Guidelines

- Write system prompts in English (internal), but instruct the model to respond in **Spanish** for student-facing features, as CenteIA's learner base is primarily Spanish-speaking
- Keep system prompts in versioned files under `src/prompts/`
- Include context about CenteIA's course curriculum when building course-specific agents

### Token Budget Awareness

- Use `claude-haiku-4-5-20251001` for classification, tagging, or high-volume simple tasks
- Use `claude-sonnet-4-6` for tutoring, explanation, and interactive dialogue
- Use `claude-opus-4-6` only for complex multi-step reasoning or content generation

---

## Testing

> Update this section once test infrastructure is established.

```bash
# Run all tests
npm test   # or: pytest / cargo test — match the project's language

# Run a specific test file
npm test -- tests/unit/api.test.ts
```

- Write tests for all API integration points
- Mock the Anthropic client in unit tests — never call the real API in CI
- Integration tests may use the real API but should be gated behind a flag (e.g. `RUN_INTEGRATION=true`)

---

## Key Conventions for AI Assistants

1. **Read before editing.** Always read a file before modifying it.
2. **Minimal changes.** Only change what is needed. Don't refactor, add docstrings, or clean up unrelated code.
3. **No `.env` commits.** Never commit secrets or API keys.
4. **Spanish UX.** Student-facing prompts and UI copy should be in Spanish. Internal code, comments, and variable names are in English.
5. **Prefer editing over creating.** Modify existing files rather than creating new ones when possible.
6. **No over-engineering.** Don't add abstractions, helpers, or utilities for one-off use. Three similar lines > a premature abstraction.
7. **Secure code only.** Validate all user input. Never expose API keys to client-side code. Sanitize before rendering.
8. **Push to the right branch.** Always push to the designated `claude/` branch. Confirm before pushing to `main`.

---

## About CenteIA Education

[CenteIA Education](https://centeia.com/en/home/) is a Spanish-language AI education platform:

- **Founded by:** Armand Pujadó (robotics engineer & international AI consultant)
- **Scale:** 400,000+ professionals trained worldwide
- **Products:** CenteIA PRO (AI mastery), CriptoIA PRO (decentralized finance)
- **Approach:** 100% online, practical, results-driven, live expert events
- **Partner:** PUE Academy (IT Skills Platform for certifications)
- **Reviews:** [Trustpilot](https://www.trustpilot.com/review/centeia.com)

When building features, keep this audience in mind: Spanish-speaking professionals learning AI and emerging tech, ranging from beginners to advanced practitioners.

---

## Useful Links

- [CenteIA Education](https://education.centeia.com/)
- [CenteIA PRO](https://educationai.centeia.com/login)
- [CenteIA IT Skills Platform (PUE)](https://centeia.pue.es/)
- [Anthropic Claude API Docs](https://docs.anthropic.com/)
- [Anthropic SDK (Python)](https://github.com/anthropic-ai/anthropic-sdk-python)
- [Anthropic SDK (Node.js)](https://github.com/anthropic-ai/anthropic-sdk-node)
- [Building with the Claude API (course)](https://anthropic.skilljar.com/claude-with-the-anthropic-api)

---

*Last updated: 2026-03-17 — Update this file whenever project structure or conventions change significantly.*
