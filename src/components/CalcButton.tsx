interface CalcButtonProps {
  label: string
  ariaLabel?: string
  onClick: () => void
  variant?: 'digit' | 'function' | 'operator' | 'accent'
}

export function CalcButton({
  label,
  ariaLabel,
  onClick,
  variant = 'digit',
}: CalcButtonProps) {
  return (
    <button
      type="button"
      className={`calc-button ${variant}`}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
