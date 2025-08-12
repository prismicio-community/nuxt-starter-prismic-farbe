<script setup lang="ts">
import type { Content } from "@prismicio/client"

defineProps(getSliceComponentProps<Content.CartSlice>())

const { items, removeItem, totalPrice } = useCart()
</script>

<template>
	<AppSection
		is="form"
		id="cart"
		:scene="{
			position: 'center',
			model: $prismic.isFilled.contentRelationship(slice.primary.product) ? slice.primary.product.uid : undefined,
		}"
		class="w-2/5 ml-auto pt-32 pb-16 px-4 rich-text min-h-screen flex flex-col"
		method="POST"
		action="/api/checkout"
	>
		<PrismicRichText :field="slice.primary.title" />
		<ClientOnly>
			<template v-if="Object.keys(items).length">
				<PrismicRichText :field="slice.primary.text" />
				<ul class="mt-16 max-w-[40ch]">
					<li v-for="item in items" :key="item.product.id" class="flex items-center">
						<span class="flex-1">
							{{ item.name }}
						</span>
						<span :aria-label="`Quantity of ${item.name}`" class="flex-1 text-right">
							{{ item.quantity }}
						</span>
						<span :aria-label="`Price for ${item.quantity} ${item.name}`" class="flex-1 text-right">
							{{ formatPrice(item.product.price.amount * item.quantity) }}
						</span>
						<button
							type="button"
							class="cta w-12.5 -mr-4"
							title="Remove from cart"
							@click="removeItem(item.product.id)"
						>
							&times;
						</button>
						<input type="hidden" :name="item.product.price.id" :value="item.quantity">
					</li>
				</ul>
				<hr class="max-w-[40ch]">
				<p aria-label="Total price" class="text-right pr-8.5">
					{{ formatPrice(totalPrice) }}
				</p>
				<button type="submit" class="mt-16 cta primary max-w-[40ch] w-full">
					Checkout
				</button>
			</template>
			<PrismicRichText v-else :field="slice.primary.empty_text" />
		</ClientOnly>
	</AppSection>
</template>
