import { PaymentCallbackData } from '@/@types/yookassa'
import { completedPaymentTemplate } from '@/components/shared/email-templates/completed-payment'
import { sendEmail } from '@/lib/send-email'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
			include: {
				promotionCode: true,
			},
		})

		if (!order) {
			return NextResponse.json({ error: 'Заказ не найден' }, { status: 500 })
		}

		const isCompleted = body.object.status === 'succeeded'

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isCompleted ? OrderStatus.COMPLETED : OrderStatus.CANCELED,
			},
		})

		let discountPercentage: number | undefined

		if (order.promotionCode) {
			discountPercentage = order.promotionCode.discountPercentage
		}

		const items = JSON.parse(order?.items as string) as CartItemDTO[]

		if (isCompleted) {
			await sendEmail(
				order.email,
				'NextPizza | Ваш заказ успешно оплачен',
				completedPaymentTemplate({ orderId: order.id, items, discountPercentage })
			)
		}

		return NextResponse.json({ success: true })
	} catch (e) {
		console.log('[CHECKOUT CALLBACK]', e)

		return NextResponse.json({ error: 'Что-то пошло не так' }, { status: 500 })
	}
}
