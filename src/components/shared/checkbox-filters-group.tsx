'use client'

import React, { useState } from 'react'
import { Input, Skeleton } from '../ui'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'

type Item = FilterCheckboxProps

interface Props {
	title: string
	items: Item[]
	defaultItems?: Item[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	onClickCheckbox?: (id: string) => void
	selectedValues?: Set<string>
	className?: string
	name?: string
}

export const CheckBoxFiltersGroup: React.FC<React.PropsWithChildren<Props>> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	loading,
	searchInputPlaceholder = 'Поиск...',
	className,
	onClickCheckbox,
	selectedValues,
	name,
}) => {
	const [showAll, setShowAll] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => <Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />)}
			</div>
		)
	}

	const filteredItems = items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
	const sortedItems =
		showAll || filteredItems.length <= limit
			? filteredItems
			: filteredItems.sort((a, b) => {
					const aChecked = selectedValues?.has(a.value) ? 1 : 0
					const bChecked = selectedValues?.has(b.value) ? 1 : 0
					return bChecked - aChecked
			  })

	const list = showAll ? filteredItems : sortedItems.slice(0, limit)

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selectedValues?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={name}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	)
}
