import { useCalculator } from '../hooks/useCalculator'
import { CalcButton } from './CalcButton'
import { Display } from './Display'

export function CalculatorCard() {
	const { displayValue, expressionValue, hint, dispatch } = useCalculator()

	return (
		<section className="calculator-card" aria-label="Calculator">
			<Display expression={expressionValue} value={displayValue} hint={hint} />

			<div className="button-grid">
				<CalcButton label="AC" variant="function" onClick={() => dispatch({ type: 'clear' })} />
				<CalcButton label="⌫" ariaLabel="backspace" variant="function" onClick={() => dispatch({ type: 'backspace' })} />
				<CalcButton label="%" variant="function" onClick={() => dispatch({ type: 'percent' })} />
				<CalcButton label="÷" variant="operator" onClick={() => dispatch({ type: 'operator', value: '/' })} />

				<CalcButton label="7" variant="digit" onClick={() => dispatch({ type: 'digit', value: '7' })} />
				<CalcButton label="8" variant="digit" onClick={() => dispatch({ type: 'digit', value: '8' })} />
				<CalcButton label="9" variant="digit" onClick={() => dispatch({ type: 'digit', value: '9' })} />
				<CalcButton label="×" variant="operator" onClick={() => dispatch({ type: 'operator', value: '*' })} />

				<CalcButton label="4" variant="digit" onClick={() => dispatch({ type: 'digit', value: '4' })} />
				<CalcButton label="5" variant="digit" onClick={() => dispatch({ type: 'digit', value: '5' })} />
				<CalcButton label="6" variant="digit" onClick={() => dispatch({ type: 'digit', value: '6' })} />
				<CalcButton label="-" variant="operator" onClick={() => dispatch({ type: 'operator', value: '-' })} />

				<CalcButton label="1" variant="digit" onClick={() => dispatch({ type: 'digit', value: '1' })} />
				<CalcButton label="2" variant="digit" onClick={() => dispatch({ type: 'digit', value: '2' })} />
				<CalcButton label="3" variant="digit" onClick={() => dispatch({ type: 'digit', value: '3' })} />
				<CalcButton label="+" variant="operator" onClick={() => dispatch({ type: 'operator', value: '+' })} />

				<CalcButton label="±" variant="function" onClick={() => dispatch({ type: 'toggleSign' })} />
				<CalcButton label="0" ariaLabel="zero" variant="digit" onClick={() => dispatch({ type: 'digit', value: '0' })} />
				<CalcButton label="." variant="digit" onClick={() => dispatch({ type: 'dot' })} />
				<CalcButton label="=" variant="accent" onClick={() => dispatch({ type: 'equals' })} />
			</div>
		</section>
	)
}

export default CalculatorCard

