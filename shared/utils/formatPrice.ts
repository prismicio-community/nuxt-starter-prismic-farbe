export function formatPrice(amount: number): string {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "EUR",
	}).format(amount / 100)
}
