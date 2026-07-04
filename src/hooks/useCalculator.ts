import { useMemo, useState } from 'react'
import { evaluateExpression } from '../utils/evaluate'
import { formatNumber, formatDisplay } from '../utils/formatNumber'

export type CalculatorAction =
  | { type: 'digit'; value: string }
  | { type: 'dot' }
  | { type: 'operator'; value: string }
  | { type: 'equals' }
  | { type: 'clear' }
  | { type: 'backspace' }
  | { type: 'toggleSign' }
  | { type: 'percent' }
  | { type: 'clearHint' }

interface CalculatorState {
  display: string
  expression: string
  operator?: string
  overwrite: boolean
  error?: string
  hint?: string
}

const initialState: CalculatorState = {
  display: '0',
  expression: '',
  overwrite: false,
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState)

  const displayValue = useMemo(() => {
    if (state.error) return state.error

    // Preserve user input formatting while showing grouped thousands
    return formatDisplay(state.display)
  }, [state.display, state.error])

  const expressionValue = useMemo(() => {
    if (state.error) return ''
    if (!state.expression) return ''
    if (state.operator) return `${state.expression}${state.operator}`
    return state.expression
  }, [state.expression, state.operator, state.error])

  const hintValue = useMemo(() => state.hint ?? '', [state.hint])

  const dispatch = (action: CalculatorAction) => {
    setState((current) => {
      if (action.type === 'clear') {
        return initialState
      }

      if (action.type === 'clearHint') {
        return { ...current, hint: undefined }
      }

      if (action.type === 'digit') {
        if (current.error) {
          return { ...initialState, display: action.value }
        }

        // If we're overwriting (just pressed an operator), allow the new digit
        if (current.overwrite) {
          return { ...current, display: action.value, overwrite: false, hint: undefined }
        }

        // If display is zero, start fresh
        if (current.display === '0') {
          return { ...current, display: action.value, overwrite: false, hint: undefined }
        }

        const digitCount = (current.display.match(/\d/g) || []).length
        // If already at or above limit, show hint and don't add more digits
        if (digitCount >= 10) {
          return { ...current, hint: 'Maximum 10 digits' }
        }

        // If this digit brings us to exactly 10, append and show hint
        if (digitCount === 9) {
          return { ...current, display:`${current.display}${action.value}`, hint: 'Maximum 10 digits' }
        }

        return { ...current, display: `${current.display}${action.value}`, hint: undefined }
      }

      if (action.type === 'dot') {
        if (current.error) return initialState
        if (current.overwrite) {
          return { ...current, display: '0.', overwrite: false }
        }
        if (current.display.includes('.')) return current
        return { ...current, display: `${current.display}.` }
      }

      if (action.type === 'operator') {
        if (current.error) return current

        if (current.operator && !current.overwrite) {
          const result = evaluateExpression(`${current.expression}${current.operator}${current.display}`)
          if (result === null || !Number.isFinite(result)) {
            return { ...current, display: 'Error', error: 'Error', overwrite: true }
          }

          return {
            ...current,
            display: String(result),
            expression: String(result),
            operator: action.value,
            overwrite: true,
            hint: undefined,
          }
        }

        return {
          ...current,
          expression: current.display,
          operator: action.value,
          overwrite: true,
          hint: undefined,
        }
      }

      if (action.type === 'equals') {
        if (current.error || !current.operator || current.expression === '') return current

        const result = evaluateExpression(`${current.expression}${current.operator}${current.display}`)
        if (result === null || !Number.isFinite(result)) {
          return { ...current, display: 'Error', error: 'Error', overwrite: true }
        }

        return {
          ...current,
          display: String(result),
          expression: `${current.expression}${current.operator}${current.display}`,
          operator: undefined,
          overwrite: true,
          error: undefined,
        }
      }

      if (action.type === 'backspace') {
        if (current.error) return initialState
        if (current.overwrite) return current
        if (current.display.length <= 1) {
          return { ...current, display: '0', hint: undefined }
        }
        return { ...current, display: current.display.slice(0, -1), hint: undefined }
      }

      if (action.type === 'toggleSign') {
        if (current.error) return initialState
        const nextValue = Number(current.display) * -1
        return { ...current, display: String(nextValue) }
      }

      if (action.type === 'percent') {
        if (current.error) return initialState
        const currentValue = Number(current.display)
        return { ...current, display: String(currentValue / 100), hint: undefined }
      }

      return current
    })
  }

  return {
    displayValue,
    expressionValue,
    hint: hintValue,
    dispatch,
  }
}
