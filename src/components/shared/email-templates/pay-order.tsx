import React from 'react'

interface Props {
	orderId: number
	totalAmount: number
	paymentLink: string
}

export const payOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentLink }: Props) => {
	return (
		<div>
			<h1>Заказ #{orderId}</h1>

			<p>
				Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Перейдите <a href={paymentLink}>по этой ссылке</a> для оплаты
				заказа
			</p>
		</div>
	)
}
