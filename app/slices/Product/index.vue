<script setup lang="ts">
import type { Content } from "@prismicio/client"

const props = defineProps(getSliceComponentProps<
	Content.ProductSlice,
	{ stripeProducts: Record<string, StripeProduct> }
>())

const prismic = usePrismic()

const product = computed(() => {
	const prismicProduct = props.slice.primary.product

	if (!prismic.isFilled.contentRelationship(prismicProduct) || !prismicProduct.data?.stripe_id) {
		return undefined
	}

	const stripeProduct = props.context.stripeProducts[prismicProduct.data.stripe_id]

	if (!stripeProduct) {
		return undefined
	}

	return {
		...prismicProduct,
		stripeProduct,
	}
})

const $this = shallowRef<HTMLElement | null>(null)
useGSAP(() => {
	if (!$this.value) {
		return
	}

	slideInChildren($this.value)
})

const { items, upsertItem } = useCart()

const quantity = ref(1)
function setQuantity(value: number) {
	quantity.value = Math.max(1, value)
}

function onSubmit(event: Event) {
	event.preventDefault()

	if (!product.value) {
		return
	}

	const maybeCartQuantity = items.value[product.value.stripeProduct.id]?.quantity ?? 0

	upsertItem({
		product: product.value.stripeProduct,
		quantity: maybeCartQuantity + quantity.value,
		name: prismic.asText(product.value.data?.name) ?? "",
	})

	setQuantity(1)
}
</script>

<template>
	<article
		v-if="product"
		:id="product.uid"
		ref="$this"
		:data-slice="`${slice.slice_type}-${index}`"
		class="w-2/5 ml-auto py-16 px-4 rich-text min-h-screen flex flex-col justify-center"
	>
		<header class="rich-text">
			<PrismicRichText :field="product.data?.name" />
			<p aria-label="Price">
				{{ product.stripeProduct.price.amount / 100 }}€ / roll
			</p>
		</header>
		<section class="rich-text">
			<h3 class="sr-only">
				Description
			</h3>
			<PrismicRichText :field="product.data?.description" />
		</section>
		<section class="rich-text">
			<h3 class="sr-only">
				Characteristics
			</h3>
			<dl>
				<div>
					<dt>ISO</dt>
					<dd>{{ product.uid }}</dd>
				</div>
				<div>
					<dt>Exposures</dt>
					<dd>36</dd>
				</div>
				<div>
					<dt>White balance</dt>
					<dd>5600K</dd>
				</div>
				<div>
					<dt>Stops tolerance</dt>
					<dd>+3 -1</dd>
				</div>
				<div>
					<dt>Development process</dt>
					<dd>C-41</dd>
				</div>
			</dl>
		</section>
		<form
				action="/api/cart"
				method="POST"
				class="mt-16 text-sm max-w-[calc(40ch+1rem)] -ml-4 flex"
				@submit="onSubmit"
			>
				<div class="flex-1 flex items-center">
					<button class="cta" type="button" @click="setQuantity(quantity - 1)">
						-
					</button>
					<div class="flex-1 text-center" aria-live="polite">
						{{ quantity }}
					</div>
					<button class="cta" type="button" @click="setQuantity(quantity + 1)">
						+
					</button>
				</div>
				<button class="flex-1 cta primary" type="submit">
				Add to cart
			</button>
		</form>
	</article>
	<article v-else>
		Product not found
	</article>
</template>
