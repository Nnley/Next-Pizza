'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/store/cart'
import React from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'

interface Props {
	product: ProductWithRelations
	onSubmit?: VoidFunction
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
	const { addCartItem, loading } = useCartStore(state => state)

	const firstItem = product.variations[0]
	const isPizzaForm = Boolean(product.variations[0].pizzaType)

	const onSubmit = async (productVariationId?: number, ingredients?: number[]) => {
		try {
			const variationId = productVariationId ?? firstItem.id

			await addCartItem({
				productVariationId: variationId,
				ingredients,
			})

			toast.success(`${product.name} добавлена в корзину`)

			_onSubmit?.()
		} catch (error) {
			console.log(error)
			toast.error(`Не удалось добавить ${product.name} в корзину`)
		}
	}

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				variations={product.variations}
				onSubmit={onSubmit}
				loading={loading}
			/>
		)
	} else {
		return (
			<ChooseProductForm
				imageUrl={product.imageUrl}
				name={product.name}
				onSubmit={onSubmit}
				price={firstItem.price}
				loading={loading}
			/>
		)
	}
}
