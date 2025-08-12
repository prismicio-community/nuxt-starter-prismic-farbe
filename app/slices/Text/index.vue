<script setup lang="ts">
import type { Content } from "@prismicio/client"

defineProps(getSliceComponentProps<Content.TextSlice>())
</script>

<template>
	<AppSection
		:scene="{
			position: 'center',
			model: $prismic.isFilled.contentRelationship(slice.primary.product) ? slice.primary.product.uid : undefined,
		}"
		class="w-2/5 ml-auto py-16 px-4 rich-text flex flex-col justify-center"
		:class="{
			'min-h-[40vh]': slice.variation !== 'fullscreen',
			'min-h-screen opacity-0': slice.variation === 'fullscreen',
		}"
	>
		<PrismicRichText :field="slice.primary.title" />
		<PrismicRichText :field="slice.primary.text" />
		<div v-if="slice.primary.ctas.length" class="mt-16 flex -ml-4">
			<PrismicLink
				v-for="link in slice.primary.ctas"
				:key="link.key"
				:field="link"
				class="cta"
				:class="link.variant?.toLowerCase()"
			/>
		</div>
	</AppSection>
</template>
