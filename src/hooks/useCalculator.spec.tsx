import { describe, expect, it } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { useCalculator } from './useCalculator'

const HookTest = () => {
  const { displayValue, expressionValue, hint, dispatch } = useCalculator()

  return (
    <div>
      <div data-testid="expression">{expressionValue}</div>
      <div data-testid="display">{displayValue}</div>
      <div data-testid="hint">{hint}</div>
      <button onClick={() => dispatch({ type: 'digit', value: '1' })}>1</button>
      <button onClick={() => dispatch({ type: 'digit', value: '2' })}>2</button>
      <button onClick={() => dispatch({ type: 'digit', value: '3' })}>3</button>
      <button onClick={() => dispatch({ type: 'operator', value: '+' })}>+</button>
      <button onClick={() => dispatch({ type: 'equals' })}>=</button>
      <button onClick={() => dispatch({ type: 'clear' })}>C</button>
      <button onClick={() => dispatch({ type: 'backspace' })}>B</button>
      <button onClick={() => dispatch({ type: 'dot' })}>.</button>
      <button onClick={() => dispatch({ type: 'toggleSign' })}>±</button>
      <button onClick={() => dispatch({ type: 'percent' })}>%</button>
    </div>
  )
}

describe('useCalculator hook', () => {
  it('builds numbers, applies operators, and clears state', () => {
    render(<HookTest />)

    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '3' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display').textContent).toBe('15')
    expect(screen.getByTestId('expression').textContent).toBe('12+3')

    fireEvent.click(screen.getByText('C'))
    expect(screen.getByTestId('display').textContent).toBe('0')
    expect(screen.getByTestId('hint').textContent).toBe('')
  })

  it('shows the maximum digits hint after 10 digits', () => {
    render(<HookTest />)

    const oneButton = screen.getByRole('button', { name: '1' })
    for (let i = 0; i < 10; i += 1) {
      fireEvent.click(oneButton)
    }

    expect(screen.getByTestId('display').textContent).toBe('1 111 111 111')
    expect(screen.getByTestId('hint').textContent).toBe('Maximum 10 digits')

    fireEvent.click(oneButton)
    expect(screen.getByTestId('display').textContent).toBe('1 111 111 111')
  })

  it('toggles sign and handles percent conversion', () => {
    render(<HookTest />)

    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '±' }))
    expect(screen.getByTestId('display').textContent).toBe('-1')

    fireEvent.click(screen.getByRole('button', { name: '%' }))
    expect(screen.getByTestId('display').textContent).toBe('-0.01')
  })
})