'use server'

import { validatePromoCode } from '@/lib/validate-promo-code'

export async function checkPromoCode(code: string) {
	const promoCode = await validatePromoCode(code)
	return promoCode
}
