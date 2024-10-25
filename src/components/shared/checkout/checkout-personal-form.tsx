import { Input } from '@/components/ui'
import { FormInput } from '../form'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

export const CheckoutPersonalForm = ({ className }: Props) => {
	return (
		<WhiteBlock title='2. Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5 p-3'>
				<Input name='firstName' className='border-gray-100 py-6 px-4 text-base' placeholder='Имя' />
				<Input name='lastName' className='border-gray-100 py-6 px-4 text-base' placeholder='Фамилия' />
				<Input name='email' className='border-gray-100 py-6 px-4 text-base' placeholder='E-mail' />
				<FormInput name='phone' placeholder='Телефон' />
			</div>
		</WhiteBlock>
	)
}
