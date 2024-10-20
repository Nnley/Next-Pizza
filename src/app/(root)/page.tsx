import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared'
import { findPizzas, GetSearchParams } from '@/lib/find-pizzas'
import React, { Suspense } from 'react'

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams)

	return (
		<React.Fragment>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar categories={categories.filter(category => category.products.length > 0)} />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-24'>
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
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
