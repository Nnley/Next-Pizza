import { Input, Textarea } from '@/components/ui'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

export const CheckoutAddressForm = ({ className }: Props) => {
	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-5 p-2'>
				<Input name='address' className='border-gray-100 py-6 px-4 text-base' placeholder='Адрес' />
				<Textarea className='border-gray-100 text-base' placeholder='Комментарий к заказу' rows={5} />
			</div>
		</WhiteBlock>
	)
}
