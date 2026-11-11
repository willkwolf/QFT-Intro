---
name: openwiki-architecture
description: "Enforces the OpenWiki and Open Knowledge Format (OKF) architectural contract during system design, technical proposals, and domain modeling. Decouples technical rendering/simulation engines from formal domain logic and primary resources."
---

# OpenWiki Architecture & System Design Contract

A portable agent skill for AI coding agents and orchestrators (Antigravity, Claude Code, OpenAI Codex, OpenHarness). It acts as an architectural companion during **Proposal**, **RFC**, and **System Design** workflows (such as [product-engineering](https://github.com/phuryn/product-engineering) proposals).

---

## 1. When to Use This Skill

Activate this skill when:
- Drafting or reviewing a **technical proposal**, **RFC**, or **system design document**.
- Architecting an interactive tool, scientific simulator, or data-intensive visualizer.
- Modularizing a codebase to prevent domain logic from leaking into UI/rendering pipelines.
- Establishing living, agent-native documentation using the **Open Knowledge Format (OKF)**.

---

## 2. The Tri-Layer Architectural Contract

Whenever a new module, feature, or interactive study sheet is designed, enforce strict separation into three orthogonal layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TRI-LAYER CONTRACT                              │
├────────────────────────────────┬───────────────────────────────────────┤
│ Layer                          │ Responsibilities & Boundaries         │
├────────────────────────────────┼───────────────────────────────────────┤
│ 1. Architecture (Engine)       │ - UI components, Canvas/SVG pipelines │
│    path: architecture/         │ - State sync & requestAnimationFrame  │
│                                │ - Zero domain business logic          │
├────────────────────────────────┼───────────────────────────────────────┤
│ 2. Formal Domain (Core)        │ - Analytical laws, invariants, models │
│    path: domains/              │ - Mathematical proofs & calculations  │
│                                │ - Pure, headless, framework-agnostic  │
├────────────────────────────────┼───────────────────────────────────────┤
│ 3. Primary Resources (Source)  │ - Authoritative literature & papers   │
│    path: resources/            │ - Benchmarks, datasets, citations     │
│                                │ - Ground truth provenance             │
└────────────────────────────────┴───────────────────────────────────────┘
```

### The Cardinal Rule
> **Never embed domain equations or formal business invariants directly inside rendering loops or UI event listeners.**  
> Technical code changes with frameworks (React, Canvas, WebGL); domain laws remain invariant.

---

## 3. Integration with Project Management & Orchestrator Harnesses

### Complementing `product-engineering` Workflows
When using product engineering skills (e.g. `product-engineering` proposal stage):
1. **Proposal Stage:** When drafting the Technical Proposal / Design Doc, include an **Architecture Invariant Section** specifying:
   - What belongs to `domains/` (invariants and core logic).
   - What belongs to `architecture/` (rendering engine, frame budgets, state management).
   - What primary sources in `resources/` substantiate the proposal.
2. **Review Stage:** Validate that UI components do not implement ad-hoc mathematical or domain formulas without an underlying documented domain contract.
3. **Execution Stage:** Code changes must be accompanied by updates to the corresponding `openwiki/domains/` entry.

---

## 4. Harness Installation Guide

### Option A: Google Antigravity / Gemini CLI
Place this folder inside your workspace or user skills directory:
```bash
# Workspace level
mkdir -p .agent/skills
cp -r skills/openwiki-architecture .agent/skills/

# Or global user level
cp -r skills/openwiki-architecture ~/.gemini/antigravity/skills/
```

### Option B: Claude Code
Register in your `.claude/skills/` or reference in `CLAUDE.md`:
```bash
mkdir -p .claude/skills
cp -r skills/openwiki-architecture .claude/skills/
```
In `CLAUDE.md`, append:
```markdown
## Architectural Standard
Follow the OpenWiki contract defined in `skills/openwiki-architecture/SKILL.md` for all system proposals and domain implementations.
```

### Option C: OpenAI Codex / OpenHarness
Add to your repo's `.agents/skills/`:
```bash
mkdir -p .agents/skills
cp -r skills/openwiki-architecture .agents/skills/
```

---

## 5. Decision Checklist for Agents

Before completing an architecture proposal or implementing an interactive sheet, verify:
- [ ] Is the formal domain model documented in `domains/` independently of UI code?
- [ ] Are simulation engines (Canvas/SVG) bounded with frame budgets and cleanup hooks?
- [ ] Are all citations or benchmarks attributed to verifiable sources in `resources/`?
- [ ] Is the global navigation and router entry updated without breaking static exports?
