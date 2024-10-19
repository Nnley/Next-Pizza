import { create } from 'zustand'
import { CartStateItem, getCartDetails } from '../lib/get-cart-details'
import { Api } from '../services/api-client'

export interface CartState {
	loading: boolean
	error: boolean
	totalAmount: number
	items: CartStateItem[]

	fetchCartItems: () => Promise<void>
	updateItemQuantity: (id: number, quantity: number) => Promise<void>
	addCartItem: (values: any) => Promise<void>
	removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.getCart()
			set(getCartDetails(data))
		} catch (e) {
			console.error(e)
			set({ loading: false })
		} finally {
			set({ loading: false })
		}
	},

	removeCartItem: async (id: number) => {},
	updateItemQuantity: async (id: number, quantity: number) => {},
	addCartItem: async (values: any) => {},
}))
