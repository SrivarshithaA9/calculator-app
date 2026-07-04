import { describe, expect, it } from 'vitest'
import { evaluateExpression } from './evaluate'

describe('evaluateExpression utility', () => {
  it('evaluates basic arithmetic correctly', () => {
    expect(evaluateExpression('7+3')).toBe(10)
    expect(evaluateExpression('12-4')).toBe(8)
    expect(evaluateExpression('6*7')).toBe(42)
    expect(evaluateExpression('20/4')).toBe(5)
  })

  it('handles operator precedence and parentheses', () => {
    expect(evaluateExpression('2+3*4')).toBe(14)
    expect(evaluateExpression('(2+3)*4')).toBe(20)
    expect(evaluateExpression('10-2*3')).toBe(4)
  })

  it('supports unary minus and invalid expressions', () => {
    expect(evaluateExpression('-5+2')).toBe(-3)
    expect(evaluateExpression('8/0')).toBeNull()
    expect(evaluateExpression('invalid')).toBeNull()
  })
})