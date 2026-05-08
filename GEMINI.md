# Project Instructions (AI Assistant Guidance)

This file contains critical context for any AI assistant working on this repository to ensure consistency across sessions and different AI tools.

## 🚀 Repository Purpose

- **Goal:** A React + MUI Admin Dashboard project intended to showcase progressive development history for career demonstration.
- **Repository:** https://github.com/wyc666-dev/react-mui-admin-demo1

## 🌿 Git & Branching Strategy

- **Development Branch (WIP):** ALWAYS use `wip-initial-infrastructure` for ongoing, unfinished work.
- **Commit Style:** Use Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`).
- **Instruction:** Do NOT create generic branches like `wip` or `dev`. If the user asks to save progress to the "WIP branch" or "unfinished branch", target `wip-initial-infrastructure`.

## 🛠 Tech Stack Notes

- **Mocking:** Uses MSW (Mock Service Worker). Handlers are in `src/mock/handlers.ts`.
- **API:** Base axios instance in `src/api/http.ts`.
