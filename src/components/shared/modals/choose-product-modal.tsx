'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { Dialog } from '@/components/ui'
import { DialogContent, DialogDescription } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { ChooseProductForm } from '../choose-product-form'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	const firstItem = product.variations[0]
	const isPizzaForm = Boolean(product.variations[0].pizzaType)
	const { addCartItem, loading } = useCartStore(state => state)

	const onAddProduct = async () => {
		try {
			await addCartItem({
				productItemId: firstItem.id,
			})
			toast.success('Продукт добавлен в корзину')
			router.back()
		} catch (error) {
			console.log(error)
			toast.error('Не удалось добавить продукт в корзину')
		}
	}

	const onAddPizza = async (productItemId: number, ingredients: number[]) => {
		try {
			await addCartItem({
				productItemId: productItemId,
				ingredients: ingredients,
			})
			toast.success('Пицца добавлена в корзину')
			router.back()
		} catch (error) {
			console.log(error)
			toast.error('Не удалось добавить пиццу в корзину')
		}
	}

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}>
				<VisuallyHidden>
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
				</VisuallyHidden>

				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						variations={product.variations}
						onSubmit={onAddPizza}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onAddProduct}
						price={firstItem.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
