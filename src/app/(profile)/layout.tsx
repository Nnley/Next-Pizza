import { Container, Header } from '@/components/shared'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next Pizza | Профиль',
}

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='min-h-screen bg-[#f3f3f7]'>
			<Container>
				<Header className='border-gray-200' />
				{children}
			</Container>
		</main>
	)
}
