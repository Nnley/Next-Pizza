import { hashSync } from 'bcrypt'
import { _ingredients, categories, products } from './constants'
import { prisma } from './prisma-client'

const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductVariation = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number
	pizzaType?: 1 | 2
	size?: 20 | 30 | 40
}) => {
	return {
		productId,
		price: randomDecimalNumber(190, 600),
		pizzaType,
		size,
	}
}

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Admin',
				email: 'o2J2j@example.com',
				password: hashSync('123', 10),
				role: 'ADMIN',
			},
			{
				fullName: 'User',
				email: 'test@example.com',
				password: hashSync('qwerty', 10),
				verified: new Date(),
				role: 'USER',
			},
		],
	})

	await prisma.category.createMany({
		data: categories,
	})

	await prisma.ingredient.createMany({
		data: _ingredients,
	})

	await prisma.product.createMany({
		data: products,
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Пепперони фреш',
			imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 5),
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Чоризо фреш',
			imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 40),
			},
		},
	})

	await prisma.productVariation.createMany({
		data: [
			generateProductVariation({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductVariation({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductVariation({ productId: pizza1.id, pizzaType: 2, size: 40 }),

			generateProductVariation({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductVariation({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductVariation({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductVariation({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductVariation({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductVariation({ productId: pizza2.id, pizzaType: 2, size: 40 }),

			generateProductVariation({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductVariation({ productId: pizza3.id, pizzaType: 2, size: 30 }),

			generateProductVariation({ productId: 1 }),
			generateProductVariation({ productId: 2 }),
			generateProductVariation({ productId: 3 }),
			generateProductVariation({ productId: 4 }),
			generateProductVariation({ productId: 5 }),
			generateProductVariation({ productId: 6 }),
			generateProductVariation({ productId: 7 }),
			generateProductVariation({ productId: 8 }),
			generateProductVariation({ productId: 9 }),
			generateProductVariation({ productId: 10 }),
			generateProductVariation({ productId: 11 }),
			generateProductVariation({ productId: 12 }),
			generateProductVariation({ productId: 13 }),
			generateProductVariation({ productId: 14 }),
			generateProductVariation({ productId: 15 }),
			generateProductVariation({ productId: 16 }),
			generateProductVariation({ productId: 17 }),
		],
	})

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '11111',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '22222',
			},
		],
	})

	await prisma.cartItem.create({
		data: {
			productVariationId: 1,
			quantity: 1,
			cartId: 1,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	})

	await prisma.promotionCode.create({
		data: {
			code: 'tomhanksbest',
			discountPercentage: 50,
		},
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "categories" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "products" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "ingredients" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "product_variations" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "carts" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "cart_items" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
