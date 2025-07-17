<script setup lang="ts">
import type { Content } from "@prismicio/client"

const props = defineProps(getSliceComponentProps<Content.ProductSlice>())

const $this = shallowRef<HTMLElement | null>(null)

const models = ["100", "200", "400", "800"] as const
const product = models[props.index % models.length]!

useGSAP(() => {
	if (!$this.value) {
		return
	}

	slideInChildren($this.value)
})
</script>

<template>
	<section
		:id="product"
		ref="$this"
		:data-slice="`${slice.slice_type}-${index}`"
		class="w-2/5 ml-auto py-16 px-4 rich-text min-h-screen flex flex-col justify-center"
	>
		<h2>
			Farbe {{ product }}
		</h2>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam veniam deserunt sapiente amet repudiandae nesciunt voluptatem explicabo assumenda rem, dolore, eius qui nostrum eaque alias inventore itaque laudantium provident iure.
		</p>
	</section>
</template>
