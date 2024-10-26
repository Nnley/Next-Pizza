export const calculateTotalAmount = (
	totalProductsAmount: number,
	VAT: number,
	DELIVERY_PRICE: number,
	discountPercentage?: number | undefined
) => {
	const totalProductAmountWithDiscount = discountPercentage
		? totalProductsAmount * (1 - discountPercentage / 100)
		: totalProductsAmount

	const totalVATAmount = totalProductAmountWithDiscount * (VAT / 100)

	const totalAmount = totalProductAmountWithDiscount + (totalVATAmount + DELIVERY_PRICE)

	return {
		totalProductAmountWithDiscount,
		totalVATAmount,
		totalAmount,
	}
}
