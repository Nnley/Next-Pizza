import { FormInput } from '../form'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

export const CheckoutPersonalForm = ({ className }: Props) => {
	return (
		<WhiteBlock title='2. Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5 p-3'>
				<FormInput name='firstName' placeholder='Имя' />
				<FormInput name='lastName' placeholder='Фамилия' />
				<FormInput name='email' placeholder='E-mail' />
				<FormInput name='phone' placeholder='Телефон' />
			</div>
		</WhiteBlock>
	)
}
