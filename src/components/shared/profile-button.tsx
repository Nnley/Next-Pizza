import { CircleUser, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui'

interface Props {
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({ onClickSignIn, className }) => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return null
	}

	return (
		<div className={className}>
			{session ? (
				<Link href='/profile'>
					<Button variant='outline' className='flex items-center gap-2'>
						<CircleUser size={18} />
						Профиль
					</Button>
				</Link>
			) : (
				<Button variant='outline' className='flex items-center gap-1'>
					<User onClick={onClickSignIn} size={16} />
					Войти
				</Button>
			)}
		</div>
	)
}
