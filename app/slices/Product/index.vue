<script setup lang="ts">
import type { Content } from "@prismicio/client"

const props = defineProps(getSliceComponentProps<Content.ProductSlice>())

const { isFilled } = usePrismic()

const product = isFilled.contentRelationship(props.slice.primary.product) ? props.slice.primary.product.uid : "800"

const $this = shallowRef<HTMLElement | null>(null)
useGSAP(() => {
	if (!$this.value) {
		return
	}

	slideInChildren($this.value)
})

const quantity = ref(1)
function setQuantity(value: number) {
	quantity.value = Math.max(1, value)
}

function onSubmit(event: Event) {
	event.preventDefault()

	const formData = new FormData(event.target as HTMLFormElement)
	const sku = formData.get("sku")
	const quantity = Number.parseInt(formData.get("quantity") as string) || 1

	console.log({ sku, quantity })

	setQuantity(1)
}
</script>

<template>
	<article
		:id="product"
		ref="$this"
		:data-slice="`${slice.slice_type}-${index}`"
		class="w-2/5 ml-auto py-16 px-4 rich-text min-h-screen flex flex-col justify-center gap-4"
	>
		<header class="flex justify-between max-w-[40ch]">
			<h2 class="heading-2">
				Farbe {{ product }}
			</h2>
			<p class="heading-2" aria-label="Price">
				19€
			</p>
		</header>
		<section class="rich-text">
			<h3 class="sr-only">
				Description
			</h3>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam veniam deserunt sapiente amet repudiandae nesciunt voluptatem explicabo assumenda rem, dolore, eius qui nostrum eaque alias inventore itaque laudantium provident iure.
			</p>
		</section>
		<section class="rich-text">
			<h3 class="sr-only">
				Characteristics
			</h3>
			<dl>
				<div>
					<dt>ISO</dt>
					<dd>100</dd>
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
			class="mt-16 border-2 border-black max-w-[calc(40ch+2rem)] -ml-4 flex items-center"
			@submit="onSubmit"
		>
			<button class="cta flex-1" type="button" @click="setQuantity(quantity - 1)">
				-
			</button>
			<div class="flex-1 text-center" aria-live="polite">
				{{ quantity }}
			</div>
			<button class="cta flex-1" type="button" @click="setQuantity(quantity + 1)">
				+
			</button>
			<input type="hidden" name="sku" :value="product">
			<input type="hidden" name="quantity" :value="quantity">
			<button class="cta inverted" type="submit">
				Add to cart
			</button>
		</form>
	</article>
</template>
