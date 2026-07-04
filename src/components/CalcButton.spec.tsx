import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalcButton } from './CalcButton'

describe('CalcButton component', () => {
  it('renders label and calls onClick', async () => {
    const handleClick = vi.fn()
    render(<CalcButton label="7" onClick={handleClick} />)

    const button = screen.getByRole('button', { name: '7' })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('uses ariaLabel when provided', () => {
    const handleClick = vi.fn()
    render(<CalcButton label="AC" ariaLabel="clear" onClick={handleClick} />)
    expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument()
  })
})