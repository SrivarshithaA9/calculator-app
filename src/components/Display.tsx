interface DisplayProps {
  expression?: string
  value: string
  hint?: string
}

export function Display({ expression, value, hint }: DisplayProps) {
  return (
    <div className="display" aria-live="polite">
      {expression ? <div className="display-expression">{expression}</div> : null}
      <div className="display-value">{value}</div>
      {hint ? <div className="display-hint">{hint}</div> : null}
    </div>
  )
}
