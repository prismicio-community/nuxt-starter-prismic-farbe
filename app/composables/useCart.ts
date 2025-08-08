import { useLocalStorage } from "@vueuse/core"

type CartItem = {
	product: StripeProduct
	quantity: number
	name: string
}

type CartItems = Record<string, CartItem>

type UseCartReturnType = {
	items: Readonly<Ref<CartItems>>

	totalPrice: ComputedRef<number>
	totalItems: ComputedRef<number>

	upsertItem: (item: CartItem) => void
	removeItem: (id: string) => void
	clear: () => void
}

const LOCAL_STORAGE_KEY = "farbe-cart"

export function useCart(): UseCartReturnType {
	const items = useLocalStorage<CartItems>(LOCAL_STORAGE_KEY, {})

	const totalPrice = computed(() => Object.values(items.value).reduce((sum, item) => sum + (item.product.price.amount * item.quantity), 0))
	const totalItems = computed(() => Object.values(items.value).reduce((sum, item) => sum + item.quantity, 0))

	function upsertItem(item: CartItem) {
		if (item.quantity <= 0) {
			removeItem(item.product.id)
			return
		}

		items.value[item.product.id] = item
	}

	function removeItem(id: string) {
		delete items.value[id]
	}

	function clear() {
		items.value = {}
	}

	return {
		// State
		items: readonly(items),

		// Computed
		totalPrice,
		totalItems,

		// Actions
		upsertItem,
		removeItem,
		clear,
	}
}
