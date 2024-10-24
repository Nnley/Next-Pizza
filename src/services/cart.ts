import { ApiRoutes } from './constants'
import { CartDTO, CreateCartItemValues } from './dto/cart.dto'
import { axiosInstance } from './instance'

export const getCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART)

	return data
}

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.patch<CartDTO>(`${ApiRoutes.CART}/${itemId}`, { quantity })

	return data
}

export const deleteItem = async (itemId: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.delete<CartDTO>(`${ApiRoutes.CART}/${itemId}`)

	return data
}

export const addItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
	const { data } = await axiosInstance.post<CartDTO>(ApiRoutes.CART, values)

	return data
}

export const applyPromoCode = async (promoCode: string): Promise<CartDTO & { totalAmount: number }> => {
	const { data } = await axiosInstance.post<CartDTO>(`${ApiRoutes.CART}/apply-promo`, { promoCode })

	return data
}
