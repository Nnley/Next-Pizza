import { findOrCreateCart } from '@/lib/find-or-create-cart'
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				token,
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

		return NextResponse.json(userCart)
	} catch (e) {
		console.error(e)
		return NextResponse.json({ message: 'Нет удалось получить корзину' }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const data = (await req.json()) as CreateCartItemValues

		const findCartItems = await prisma.cartItem.findMany({
			where: {
				cartId: userCart.id,
				productVariationId: data.productVariationId,
			},
			include: {
				ingredients: true,
			},
		})

		const findCartItem = findCartItems.find(item => {
			if (item.ingredients.length !== data.ingredients?.length) {
				return false
			}

			return item.ingredients.every(ingredient =>
				data.ingredients?.some(dataIngredient => dataIngredient === ingredient.id)
			)
		})

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productVariationId: data.productVariationId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map(id => ({ id })) },
				},
			})
		}

		const updateUserCart = await updateCartTotalAmount(token)

		const resp = NextResponse.json(updateUserCart)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (e) {
		console.error(e)
		return NextResponse.json({ message: 'Нет удалось создать корзину' }, { status: 500 })
	}
}
