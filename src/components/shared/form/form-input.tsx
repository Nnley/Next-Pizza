import { Input } from '@/components/ui'
import React from 'react'
import { ClearButton } from '../clear-button'
import { ErrorText } from '../error-text'
import { RequiredSymbol } from '../required-symbol'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Input className='border-gray-100 py-6 px-4 text-base' {...props} />

				<ClearButton />
			</div>

			<ErrorText text='Поле не заполнено' className='mt-2' />
		</div>
	)
}
