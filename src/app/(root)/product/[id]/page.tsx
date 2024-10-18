import { Container, GroupVariants, PizzaImage, Title } from '@/shared/components/shared'
import { pizzaSizes } from '@/shared/constants/pizza'
import { notFound } from 'next/navigation'
import { prisma } from '../../../../../prisma/prisma-client'

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
	})

	if (!product) {
		return notFound()
	}

	return (
		<Container className='flex flex-col my-10'>
			<div className='flex flex-1'>
				<PizzaImage imageUrl={product.imageUrl} className='' size={40} />

				<div className='w-[490px] bg-[#f7f7f7] rounded-md p-7'>
					<Title text={product.name} size='md' className='font-extrabold mb-1' />

					<p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur</p>

					<GroupVariants items={pizzaSizes} />
				</div>
			</div>
		</Container>
	)
}
