import { OrderStatus } from '@prisma/client'

export const getStatusDetails = (status: OrderStatus) => {
	switch (status) {
		case OrderStatus.COMPLETED:
			return {
				text: 'Оплачено',
				className: 'bg-green-100 text-green-600',
			}
		case OrderStatus.PENDING:
			return {
				text: 'В ожидании',
				className: 'bg-yellow-100 text-yellow-600',
			}
		case OrderStatus.CANCELED:
			return {
				text: 'Отклонено',
				className: 'bg-red-100 text-red-600',
			}
		default:
			return {
				text: '',
				className: '',
			}
	}
}
