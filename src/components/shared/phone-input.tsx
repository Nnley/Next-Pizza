import IMask from 'imask'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui'
import { ClearButton } from './clear-button'

interface Props {
	onChange?: (value?: string) => void
	onClickClear?: VoidFunction
	value?: string
	placeholder?: string
	className?: string
}

export const PhoneInput: React.FC<Props> = ({ onChange, onClickClear, value, placeholder, className }) => {
	const refInput = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (refInput.current) {
			IMask(refInput.current, {
				mask: '+{7} (000) 000-00-00',
			})
		}
	}, [refInput])

	return (
		<div className='relative'>
			<Input
				ref={refInput}
				className={className}
				placeholder={placeholder}
				value={value}
				onChange={e => onChange?.(e.target.value)}
			/>
			{value && <ClearButton onClick={onClickClear} />}
		</div>
	)
}
