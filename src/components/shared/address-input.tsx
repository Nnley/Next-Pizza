import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void
	placeholder?: string
}

export const AddressInput: React.FC<Props> = ({ onChange, placeholder }) => {
	const [isMounted, setIsMounted] = React.useState(false)
	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<>
			{isMounted && (
				<AddressSuggestions
					token={process.env.NEXT_PUBLIC_DADATA_API as string}
					onChange={data => onChange?.(data?.value)}
					inputProps={{
						placeholder: placeholder,
					}}
					suggestionsClassName='rounded-md border border-input bg-background p-2 mt-2'
				/>
			)}
		</>
	)
}
