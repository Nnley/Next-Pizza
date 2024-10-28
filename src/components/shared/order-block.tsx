'use client'

import { getStatusDetails } from '@/lib/get-status-details'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
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
	const contentRef = useRef<HTMLDivElement>(null)
	const [contentHeight, setContentHeight] = React.useState(0)

	const { text, className: statusClassName } = getStatusDetails(status)

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current.scrollHeight)
		}
	}, [children])

	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title && (
				<div className='flex items-center justify-between p-5 px-7 border-b border-gray-100'>
					<Title text={title} size='sm' className='font-bold' />
					<div className='flex items-center gap-8'>
						<span className={cn('p-2 px-5 rounded-3xl', statusClassName)}>{text}</span>
						<Button type='button' className='bg-transparent p-0 hover:bg-transparent' onClick={toggleOpen}>
							<ChevronDown
								size={28}
								color='#9CA3AF'
								className={cn('transition-transform duration-300', {
									'rotate-180': isOpen,
								})}
							/>
						</Button>
					</div>
				</div>
			)}

			<div
				ref={contentRef}
				className={cn('transition-all duration-500 ease-in-out overflow-hidden', contentClassName)}
				style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
			>
				<div className={cn('px-5 pb-4', contentClassName)}>{children}</div>
			</div>
		</div>
	)
}
