<script setup lang="ts">
import type { Content } from "@prismicio/client"

import DescriptionDetails from "./DescriptionDetails.vue"
import DescriptionList from "./DescriptionList.vue"
import DescriptionTerm from "./DescriptionTerm.vue"
import Div from "./Div.vue"
import PassThrough from "./PassThrough.vue"

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
	<SlideIn
		v-if="product"
		v-bind="getSceneAttributes({ position: 'center', model: product.uid, rotate: true })"
		:id="product.uid"
		as="article"
		class="ml-auto w-2/5 py-16 px-4 rich-text min-h-screen flex flex-col justify-center"
	>
		<header class="rich-text">
			<PrismicRichText :field="product.data?.name" />
			<p aria-label="Price">
				{{ formatPrice(product.stripeProduct.price.amount) }} / roll
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
			<PrismicTable
				:field="product.data?.characteristics"
				:components="{
					table: DescriptionList,
					tbody: PassThrough,
					tr: Div,
					th: DescriptionTerm,
					td: DescriptionDetails,
				}"
			/>
		</section>
		<form
			action="/api/cart"
			method="POST"
			class="mt-16 text-sm max-w-[calc(40ch+1rem)] -ml-4 flex items-start"
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
			<div class="flex-1">
				<button class="w-full cta primary" type="submit">
					Add to cart
				</button>
				<ClientOnly>
					<p
						class="text-center"
						:class="{
							invisible: !items[product.stripeProduct.id]?.quantity,
						}"
					>
						<NuxtLink to="/#cart" class="cta muted">
							{{ items[product.stripeProduct.id]?.quantity }} in cart
						</NuxtLink>
					</p>
				</ClientOnly>
			</div>
		</form>
	</SlideIn>
	<SlideIn
		v-else
		as="article"
		v-bind="getSceneAttributes({ position: 'center' })"
		class="ml-auto w-2/5 py-16 px-4 rich-text min-h-screen flex flex-col justify-center"
	>
		<p>Product not found</p>
	</SlideIn>
</template>
