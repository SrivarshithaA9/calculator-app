import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalculatorCard } from './CalculatorCard'

describe('CalculatorCard component', () => {
  it('renders display and buttons', () => {
    render(<CalculatorCard />)

    expect(screen.getByLabelText('Calculator')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AC' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '=' })).toBeInTheDocument()
  })

  it('performs a calculation when buttons are clicked', () => {
    render(<CalculatorCard />)

    fireEvent.click(screen.getByRole('button', { name: '7' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '3' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByText('10')).toBeInTheDocument()
  })
})