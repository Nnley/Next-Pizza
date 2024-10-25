import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { AddressInput } from '../address-input'
import { ErrorText } from '../error-text'
import { FormTextarea } from '../form'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }: Props) => {
	const { control } = useFormContext()

	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-4 p-2'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<AddressInput placeholder='Адрес доставки' onChange={field.onChange} />
							{fieldState.error?.message && <ErrorText text={fieldState.error.message} className='-mt-1' />}
						</>
					)}
				/>
				<FormTextarea name='comment' placeholder='Комментарий к заказу' rows={5} />
			</div>
		</WhiteBlock>
	)
}
