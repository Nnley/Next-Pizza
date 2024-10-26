import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'
import { FormInput } from '../form'
import { PhoneInput } from '../phone-input'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

export const CheckoutPersonalForm = ({ className }: Props) => {
	const { control, setValue } = useFormContext()

	const onClickClear = () => {
		setValue('phone', '')
	}

	return (
		<WhiteBlock title='2. Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5 p-3'>
				<FormInput name='firstName' placeholder='Имя' />
				<FormInput name='lastName' placeholder='Фамилия' />
				<FormInput name='email' placeholder='E-mail' />
				<Controller
					control={control}
					name='phone'
					render={({ field, fieldState }) => (
						<div>
							<PhoneInput
								className='border-gray-100 py-6 px-4 text-base'
								placeholder='Телефон'
								onChange={field.onChange}
								onClickClear={onClickClear}
								value={field.value}
							/>
							{fieldState.error?.message && <ErrorText text={fieldState.error.message} className='mt-2' />}
						</div>
					)}
				/>
			</div>
		</WhiteBlock>
	)
}
