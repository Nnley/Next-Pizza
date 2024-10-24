import { PromotionCode } from '@prisma/client'
import { prisma } from '../../prisma/prisma-client'

export const validatePromoCode = async (code: string): Promise<PromotionCode | null> => {
	const promoCode = await prisma.promotionCode.findFirst({
		where: {
			code,
		},
	})

	return promoCode
}
