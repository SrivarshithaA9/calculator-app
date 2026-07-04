import { describe, expect, it } from 'vitest'
import { formatDisplay, formatNumber } from './formatNumber'

describe('formatNumber utility', () => {
  it('formats integer groupings with spaces', () => {
    expect(formatNumber(1234567)).toBe('1 234 567')
    expect(formatNumber(0)).toBe('0')
  })

  it('formats decimal values with dot separator', () => {
    expect(formatNumber(1000.5)).toBe('1 000.5')
    expect(formatNumber(-1000.75)).toBe('-1 000.75')
  })

  it('returns Error for non-finite values', () => {
    expect(formatNumber(NaN)).toBe('Error')
    expect(formatNumber(Infinity)).toBe('Error')
  })
})

describe('formatDisplay utility', () => {
  it('preserves 0 and negative prefixes', () => {
    expect(formatDisplay('0')).toBe('0')
    expect(formatDisplay('-0')).toBe('-0')
    expect(formatDisplay('-1234.56')).toBe('-1 234.56')
  })

  it('formats raw decimal strings with grouping', () => {
    expect(formatDisplay('1000.5')).toBe('1 000.5')
    expect(formatDisplay('1234567.890')).toBe('1 234 567.890')
  })

  it('returns raw values for empty or minus-only input', () => {
    expect(formatDisplay('')).toBe('')
    expect(formatDisplay('-')).toBe('-')
  })
})