import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { validatePromoCode } from '@/lib/validate-promo-code'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ message: 'Нет активной корзины' }, { status: 400 })
		}

		const { promoCode } = await req.json()

		const discount = await validatePromoCode(promoCode)

		if (!discount) {
			return NextResponse.json({ message: 'Неверный промокод' }, { status: 400 })
		}

		const userCart = await findOrCreateCart(token)

		const discountedTotal = userCart.totalAmount * (1 - discount.discountPercentage / 100)
		const cart = await prisma.cart.update({
			where: { id: userCart.id },
			data: {
				totalAmount: discountedTotal,
				promotionCode: {
					connect: { id: discount.id },
				},
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productVariation: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		})

		return NextResponse.json({ ...cart, totalAmount: discountedTotal })
	} catch (e) {
		console.error(e)
		return NextResponse.json({ message: 'Ошибка при применении промокода' }, { status: 500 })
	}
}
