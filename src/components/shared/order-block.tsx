'use client'

import { getStatusDetails } from '@/lib/get-status-details'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'
import { Button } from '../ui'
import { Title } from './title'

interface Props {
	status: OrderStatus
	title: string
	className?: string
	contentClassName?: string
}

export const OrderBlock: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	title,
	contentClassName,
	status,
	children,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const { text, className: statusClassName } = getStatusDetails(status)

	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title && (
				<div className='flex items-center justify-between p-5 px-7 border-b border-gray-100'>
					<Title text={title} size='sm' className='font-bold' />
					<div className='flex items-center gap-8'>
						<span className={cn('p-2 px-5 rounded-3xl', statusClassName)}>{text}</span>
						<Button
							type='button'
							className='bg-transparent p-0 hover:bg-transparent'
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? <ChevronUp size={28} color='#9CA3AF' /> : <ChevronDown size={28} color='#9CA3AF' />}
						</Button>
					</div>
				</div>
			)}

			{isOpen && <div className={cn('px-5 pb-4', contentClassName)}>{children}</div>}
		</div>
	)
}
