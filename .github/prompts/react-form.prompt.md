---
agent: 'agent'
model: GPT-4o
tools: ['search/codebase', 'vscode/askQuestions']
description: 'Generate a new React form component'
---
Your goal is to generate a new React form component based on the templates in the Github repo contoso/react-templates.

Use the #tool:vscode/askQuestions to ask for the form name and fields if not provided.

Requirements for the form:
* Use form design system components: [design-system/Form.md]
* Use `react-hook-form` for form state management:
* Always define TypeScript types for your form data
* Prefer *uncontrolled* components using register
* Use `defaultValues` to prevent unnecessary rerenders
* Use `yup` for validation:
* Create reusable validation schemas in separate files
* Use TypeScript types to ensure type safety
* Customize UX-friendly validation rules
