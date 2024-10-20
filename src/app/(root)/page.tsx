import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared'
import React from 'react'
import { prisma } from '../../../prisma/prisma-client'

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					variations: true,
					ingredients: true,
				},
			},
		},
	})

	return (
		<React.Fragment>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar categories={categories.filter(category => category.products.length > 0)} />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-24'>
					<div className='w-[250px]'>
						<Filters />
					</div>

					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								category =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											products={category.products}
											categoryId={category.id}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</React.Fragment>
	)
}
