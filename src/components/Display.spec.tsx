import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Display } from './Display'

describe('Display component', () => {
  it('renders expression and value', () => {
    render(<Display expression="12+" value="34" hint="hint" />)

    expect(screen.getByText('12+')).toBeInTheDocument()
    expect(screen.getByText('34')).toBeInTheDocument()
  })

  it('renders only value when expression is absent', () => {
    render(<Display value="0" />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})