import { describe, expect, it } from 'vitest'
import { evaluateExpression } from '../utils/evaluate'
import { formatDisplay, formatNumber } from '../utils/formatNumber'

describe('calculator utilities', () => {
  it('evaluates basic arithmetic expressions', () => {
    expect(evaluateExpression('7+3')).toBe(10)
    expect(evaluateExpression('12-4')).toBe(8)
    expect(evaluateExpression('6*7')).toBe(42)
    expect(evaluateExpression('20/4')).toBe(5)
  })

  it('handles unary minus and division by zero', () => {
    expect(evaluateExpression('-5+2')).toBe(-3)
    expect(evaluateExpression('8/0')).toBeNull()
  })

  it('formats numbers for display', () => {
    expect(formatNumber(1234567)).toBe('1 234 567')
    expect(formatNumber(0.3333333333333333)).toBe('0.3333333333333333')
    expect(formatNumber(1000.5)).toBe('1 000.5')
    expect(formatDisplay('1000.5')).toBe('1 000.5')
    expect(formatDisplay('-1000.5')).toBe('-1 000.5')
  })
})
