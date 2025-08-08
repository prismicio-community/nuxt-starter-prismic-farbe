<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.CartSlice>());

const { items, removeItem } = useCart()

const $this = shallowRef<HTMLElement | null>(null)
useGSAP(() => {
	if (!$this.value) {
		return
	}

	slideInChildren($this.value)
})
</script>

<template>
  <form
		id="cart"
		ref="$this"
		:data-slice="`${slice.slice_type}-${index}`"
		class="w-2/5 ml-auto pt-32 pb-16 px-4 rich-text min-h-screen flex flex-col"
		method="POST"
		action="/api/checkout"
	>
		<PrismicRichText :field="slice.primary.title" />
		<ClientOnly>
			<PrismicRichText v-if="Object.keys(items).length" :field="slice.primary.text" />
			<PrismicRichText v-else :field="slice.primary.empty_text" />
			<ul class="mt-16 max-w-[40ch]">
				<li v-for="item in items" :key="item.product.id" class="flex items-center">
					<span class="flex-1">
						{{ item.name }}
					</span>
					{{ item.quantity }}
					<button
						type="button"
						class="cta -mr-4"
						title="Remove from cart"
						@click="removeItem(item.product.id)"
					>
						&times;
					</button>
					<input type="hidden" :name="item.product.price.id" :value="item.quantity">
				</li>
			</ul>
			<button type="submit" class="mt-16 cta primary max-w-[40ch] w-full">
				Checkout
			</button>
		</ClientOnly>
	</form>
</template>
