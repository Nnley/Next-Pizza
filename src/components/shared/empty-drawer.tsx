import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	className?: string
}

export const EmptyDrawer: React.FC<Props> = ({ className }) => (
	<div className={cn('w-full h-full flex flex-col justify-center items-center', className)}>
		<img
			src='https://cdn.dodostatic.net/site-static/dist/assets/5aa5dac99a832c62f3ef..svg'
			alt='Собака с пустой коробкой от пиццы'
		/>
		<h3 className='mt-3 text-3xl text-center'>Корзина пуста</h3>
		<p className='mt-2 text-lg text-center'>Не дайте песику грустить</p>
		<p className='text-base text-center'>Добавьте что-нибудь в корзину</p>
	</div>
)
