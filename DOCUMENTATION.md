# Calculator App Documentation

## Project Overview

This repository contains a React-based calculator application built with TypeScript and Vite. The app provides basic arithmetic operations, a formatted display, input limits, and a clean component-driven UI.

## Key Features

- Basic calculator operations: addition, subtraction, multiplication, division
- Decimal support and sign toggle
- Percent conversion
- Digit limit enforcement with hint messaging
- Formatted display using thousands separators
- Component-based design with reusable buttons and display elements
- Unit tests using Vitest and React Testing Library

## Technical Stack

- React 19
- TypeScript 6
- Vite
- Vitest
- React Testing Library
- ESLint

## Repository Structure

- `src/`
  - `App.tsx` - main app entry component
  - `main.tsx` - React application bootstrap
  - `components/` - reusable UI components
    - `CalcButton.tsx`
    - `CalculatorCard.tsx`
    - `Display.tsx`
  - `hooks/` - custom React hook
    - `useCalculator.ts`
  - `utils/` - helper utilities
    - `evaluate.ts`
    - `formatNumber.ts`
  - `tests/` - test files

## Setup Instructions

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open the local development URL shown in the terminal (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
npm test
```

## Usage Guide

1. Start the app with `npm run dev`.
2. Open the app in your browser.
3. Click calculator buttons to enter digits and perform operations.
4. Use `.` to add a decimal point.
5. Use `±` to toggle the current number sign.
6. Use `%` to convert the current value to a percentage.
7. The display supports a maximum of 10 digits and shows a hint once the limit is reached.

## Notes

- The display uses formatting for better readability and automatically groups digits.
- The calculator logic is encapsulated in `src/hooks/useCalculator.ts`, making it easy to extend or reuse.
- Testing is configured with Vitest and React Testing Library for UI and hook behavior coverage.
