export function evaluateExpression(expression: string): number | null {
  const sanitized = expression.replace(/\s+/g, '')
  if (!sanitized) return null

  const tokens = sanitized.match(/\d+(?:\.\d+)?|[+\-*/()%]/g)
  if (!tokens || tokens.length === 0) return null

  let index = 0

  const peek = () => tokens[index]
  const advance = () => tokens[index++]

  const parseExpression = () => {
    let value = parseTerm()

    while (peek() === '+' || peek() === '-') {
      const operator = advance()
      const right = parseTerm()
      value = operator === '+' ? value + right : value - right
    }

    return value
  }

  const parseTerm = () => {
    let value = parseFactor()

    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const operator = advance()
      const right = parseFactor()

      if (operator === '*') value *= right
      else if (operator === '/') {
        if (right === 0) throw new Error('Division by zero')
        value /= right
      } else {
        value = (value * right) / 100
      }
    }

    return value
  }

  const parseFactor = () => {
    const token = peek()

    if (token === '+') {
      advance()
      return parseFactor()
    }

    if (token === '-') {
      advance()
      return -parseFactor()
    }

    if (token === '(') {
      advance()
      const value = parseExpression()
      if (peek() !== ')') throw new Error('Invalid expression')
      advance()
      return value
    }

    if (token && /^\d+(?:\.\d+)?$/.test(token)) {
      return Number(advance())
    }

    throw new Error('Invalid expression')
  }

  try {
    const result = parseExpression()
    return Number.isFinite(result) ? result : null
  } catch {
    return null
  }
}
