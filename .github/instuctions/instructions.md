# Repository Instruction Template — Agent Guidance

Purpose
- Provide a concise, machine-readable set of instructions for agents and contributors working on this repository.

Scope
- Applies primarily to files under `src/` (components, hooks, utils, tests). Note any rule explicitly as "global" if it should apply to all files.

Extracted preferences and enforced rules (from conversation)
- Use the built-in `Intl.NumberFormat` for numeric formatting (prefer `en-US` grouping unless otherwise specified).
- Format displayed numbers with thousands grouping (space or comma consistent with locale); keep `formatNumber` in `src/utils/formatNumber.ts` as the canonical implementation.
- Enforce a maximum of 10 digits for numeric input; show a small-font hint under the display when the limit is reached.
- Keep presentation matching the app screenshot: hint below the numbers in a smaller font-size for subtlety.
- Tests should prefer role-based queries: use `getByRole('button', { name: '...' })` instead of `getByText` for numeric buttons to avoid ambiguous matches with display text.
- Use React + TypeScript patterns: functional components, hooks for logic (`useCalculator`), and small reusable components like `CalcButton` and `Display`.
- Unit tests use `vitest` + React Testing Library; prefer `userEvent` where realistic interaction is needed.

Concrete instruction draft (to apply)
1. Formatting
   - Implement number formatting via `Intl.NumberFormat('en-US')` inside `src/utils/formatNumber.ts`.
   - Export helper `formatDisplay(value: string)` which preserves user-entered decimals and signs but returns a grouped string for rendering.

2. Input limits and hint
   - Enforce digit limit in `useCalculator` (10 digits) and set hint text to `"Maximum 10 digits"` when the limit is reached.
   - Ensure `CalculatorCard` renders the hint below the display in a smaller font-size (CSS rule `.hint { font-size: 0.75rem; opacity: 0.9; }`).

3. Testing
   - When writing component or hook tests, select interactive buttons with `screen.getByRole('button', { name: /label/ })`.
   - For sequences of clicks, prefer `userEvent.click(element)` from `@testing-library/user-event` for more realistic timing.

4. Code style and structure
   - Keep logic inside hooks (`useCalculator`) and UI in components. Avoid placing business rules in components directly.
   - Follow existing TypeScript types; avoid widening types unnecessarily.

Ambiguities and questions (please answer to finalize)
- Should `en-US` be the default locale for all formatting, or make it configurable per user/system locale?
- For thousands grouping, do you prefer spaces (current look) or standard commas?
- Do these rules apply only to calculator-related files or globally across the repo?

Examples: prompts to use with the agent
- "Refactor `src/utils/formatNumber.ts` to use `Intl.NumberFormat('en-US')` and export `formatDisplay` that preserves decimals." 
- "Update `useCalculator` to enforce 10-digit limit and set hint text when reached; ensure `CalculatorCard` shows the hint beneath the display in small font." 
- "Rewrite tests to use `getByRole('button', { name: ... })` for all button interactions." 

Suggested follow-ups
- Add a short lint rule or code comment in `src/utils/formatNumber.ts` documenting the chosen locale and grouping character.
- Create a `CONTRIBUTING.md` with these testing and formatting rules for human contributors.

Saved file: `instructions.md`
