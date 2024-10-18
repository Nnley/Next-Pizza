'use client'

import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard } from './product-card'
import { Title } from './title'

interface Props {
	title: string
	products: any[]
	categoryId: number
	className?: string
	listClassName?: string
}

export const ProductsGroupList: React.FC<React.PropsWithChildren<Props>> = ({
	title,
	products,
	categoryId,
	className,
	listClassName,
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	React.useEffect(() => {
		if (intersection && intersection.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [intersection])

	return (
		<section className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{products.map(item => (
					<ProductCard
						key={item.id}
						id={item.id}
						name={item.name}
						price={item.variations[0].price}
						imageUrl={item.imageUrl}
					/>
				))}
			</div>
		</section>
	)
}
