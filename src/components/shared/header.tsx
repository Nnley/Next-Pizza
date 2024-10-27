'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { CartButton } from './cart-button'
import { Container } from './container'
import { AuthModal } from './modals/auth-modal/auth-modal'
import { ProfileButton } from './profile-button'
import { SearchInput } from './search-input'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false)

	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		if (searchParams.has('paid')) {
			setTimeout(() => {
				toast.success('Заказ успешно оплачен! Информация отправлена на почту.')
				router.push('/')
			}, 500)
		}
	}, [])

	return (
		<header className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' alt='Logo' height={35} width={35} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				<div className='flex items-center gap-3'>
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
