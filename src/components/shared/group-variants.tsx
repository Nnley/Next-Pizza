'use client'

import { cn } from '@/lib/utils'
import React from 'react'

type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface Props {
	items: readonly Variant[]
	onClick?: (value: Variant['value']) => void
	value?: Variant['value']
	className?: string
}

export const GroupVariants: React.FC<Props> = ({ items, onClick, value, className }) => {
	return (
		<div className={cn(className, 'flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none overflow-hidden')}>
			{items.map(item => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-300 text-sm',
						{
							'bg-white shadow-[0px_0px_20px_0px_#00000024]': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}
