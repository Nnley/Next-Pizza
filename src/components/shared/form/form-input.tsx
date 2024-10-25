import { Input } from '@/components/ui'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ClearButton } from '../clear-button'
import { ErrorText } from '../error-text'
import { RequiredSymbol } from '../required-symbol'

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	required?: boolean
	className?: string
}

export const FormInput: React.FC<FormInputProps> = ({ className, name, label, required, ...props }) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()

	const value = watch(name)
	const errorText = errors[name]?.message as string

	const onClickClear = () => {
		setValue(name, '')
	}

	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Input className='border-gray-100 py-6 px-4 text-base' {...register(name)} {...props} />

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}
