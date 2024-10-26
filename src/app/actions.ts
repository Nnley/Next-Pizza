'use server'

import { CheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema'
import { payOrderTemplate } from '@/components/shared/email-templates/pay-order'
import { calculateTotalAmount } from '@/lib/calc-total-amount'
import { createPayment } from '@/lib/create-payment'
import { sendEmail } from '@/lib/send-email'
import { validatePromoCode } from '@/lib/validate-promo-code'
import { OrderStatus, PromotionCode } from '@prisma/client'
import { cookies } from 'next/headers'
import { prisma } from '../../prisma/prisma-client'

const DELIVERY_PRICE = 200
const VAT = 13

export async function checkPromoCode(code: string) {
	const promoCode = await validatePromoCode(code)
	return promoCode
}

export async function createOrder(data: CheckoutFormValues, promoCode?: string) {
	try {
		const cookieStore = cookies()

		const token = cookieStore.get('cartToken')?.value

		if (!token) {
			throw new Error('Нет токена')
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				token,
			},
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productVariation: {
							include: {
								product: true,
							},
						},
					},
				},
			},
		})

		if (!userCart) {
			throw new Error('Корзина не найдена')
		}

		if (userCart?.totalAmount === 0) {
			throw new Error('Корзина пуста')
		}

		const totalProductsAmount = userCart.totalAmount
		let promoCodeData: PromotionCode | undefined

		if (promoCode) {
			const code = await validatePromoCode(promoCode)
			if (code) {
				promoCodeData = code
			}
		}

		const { totalAmount } = calculateTotalAmount(
			totalProductsAmount,
			VAT,
			DELIVERY_PRICE,
			promoCodeData?.discountPercentage
		)

		const order = await prisma.order.create({
			data: {
				token,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
				promotionCodeId: promoCodeData?.id,
			},
		})

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		const paymentData = await createPayment({
			amount: totalAmount,
			description: 'Оплата заказа #' + order.id,
			orderId: order.id,
		})

		if (!paymentData) {
			throw new Error('Не удалось создать платеж')
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		})

		const paymentLink = paymentData.confirmation.confirmation_url

		await sendEmail(
			data.email,
			'NextPizza | Оплатите заказ #' + order.id,
			payOrderTemplate({
				orderId: order.id,
				totalAmount: totalAmount,
				paymentLink: paymentLink,
			})
		)

		return paymentLink
	} catch (e) {
		console.error('[CREATE ORDER] Server error:', e)
	}
}
