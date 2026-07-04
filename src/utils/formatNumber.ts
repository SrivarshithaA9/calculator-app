const formatter = new Intl.NumberFormat('en-US', {
  useGrouping: true,
  maximumFractionDigits: 20,
})

function formatWithIntl(value: number): string {
  return formatter.format(value).replace(/,/g, ' ')
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return 'Error'
  return formatWithIntl(value)
}

export function formatDisplay(raw: string): string {
  if (!raw || raw === '-') return raw

  const negative = raw.startsWith('-')
  const cleaned = negative ? raw.slice(1) : raw
  const [integerPart = '0', decimalPart] = cleaned.split('.')
  const normalizedInteger = integerPart.replace(/^0+(?=\d)/, '') || '0'
  const formattedInteger = formatWithIntl(Number(normalizedInteger))

  return `${negative ? '-' : ''}${formattedInteger}${decimalPart !== undefined ? `.${decimalPart}` : ''}`
}
