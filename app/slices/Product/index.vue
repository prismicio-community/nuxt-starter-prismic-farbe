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

	const stripeProduct = props.context.stripeProducts?.[prismicProduct.data.stripe_id]

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

	if (!product.value?.stripeProduct) {
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
		as="article"
		class="bounded rich-text min-h-[150vh] flex flex-col justify-center"
	>
		<header :id="product.uid" class="rich-text pt-[25vh]">
			<PrismicRichText :field="product.data?.name" />
			<p v-if="product?.stripeProduct" aria-label="Price">
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
		<form v-if="product?.stripeProduct" class="mt-16 text-sm max-w-[calc(40ch+1rem)] -ml-4 flex items-start" @submit="onSubmit">
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
		<div v-else class="mt-16 text-sm max-w-[40ch] flex items-start">
			Missing `NUXT_STRIPE_KEY` environment variable
		</div>
	</SlideIn>
	<SlideIn
		v-else
		as="article"
		v-bind="getSceneAttributes({ position: 'center' })"
		class="bounded rich-text min-h-[150vh] flex flex-col justify-center"
	>
		<p>Product not found</p>
	</SlideIn>
</template>
