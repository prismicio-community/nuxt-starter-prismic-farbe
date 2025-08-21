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
			<PrismicImage :field="slice.primary.picture" class="z-20 w-full row-span-2 aspect-[3/4] object-cover" />
			<SlideIn
				as="figcaption"
				class="px-4 pt-4 pb-16 rich-text"
				:class="{
					'self-start': slice.variation === 'default' || slice.variation === 'bottom',
					'order-last self-end': slice.variation === 'top',
				}"
			>
				<PrismicRichText :field="slice.primary.caption" />
			</SlideIn>
		</figure>
		<figure
			v-if="$prismic.isFilled.image(slice.primary.picture)"
			class="flex flex-col"
			:class="{
				'self-end': slice.variation === 'default' || slice.variation === 'bottom',
				'self-start': slice.variation === 'top',
			}"
		>
			<PrismicImage :field="slice.primary.picture" class="z-20 w-full" />
			<SlideIn
				as="figcaption"
				class="px-4 pt-4 pb-16 rich-text"
				:class="{
					'order-first': slice.variation === 'bottom',
				}"
			>
				<PrismicRichText :field="slice.primary.caption" />
			</SlideIn>
		</figure>
	</section>
</template>
