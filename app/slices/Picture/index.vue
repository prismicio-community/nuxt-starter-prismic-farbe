<script setup lang="ts">
import type { Content } from "@prismicio/client"

defineProps(getSliceComponentProps<Content.PictureSlice>())
</script>

<template>
	<section
		v-bind="getSceneAttributes({
			position: 'top',
			model: $prismic.isFilled.contentRelationship(slice.primary.product) ? slice.primary.product.uid : undefined,
		})"
		class="grid grid-cols-[3fr_2fr]"
	>
		<figure class="contents">
			<PrismicImage :field="slice.primary.picture" class="z-20 w-full row-span-2" />
			<SlideIn
				as="figcaption"
				class="px-4 pt-4 pb-16 rich-text"
				:class="{
					'order-last self-end': slice.variation === 'reversed',
				}"
			>
				<PrismicRichText :field="slice.primary.caption" />
			</SlideIn>
		</figure>
		<figure
			v-if="$prismic.isFilled.image(slice.primary.picture)"
			class="flex flex-col"
			:class="{
				'self-end': slice.variation === 'default',
			}"
		>
			<PrismicImage :field="slice.primary.picture" class="z-20 w-full" />
			<SlideIn as="figcaption" class="px-4 pt-4 pb-16 rich-text">
				<PrismicRichText :field="slice.primary.caption" />
			</SlideIn>
		</figure>
	</section>
</template>
