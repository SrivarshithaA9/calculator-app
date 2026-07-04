import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App root', () => {
  it('renders the calculator card', () => {
    render(<App />)
    expect(screen.getByLabelText('Calculator')).toBeInTheDocument()
  })
})