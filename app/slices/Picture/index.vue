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
		class="grid xl:grid-cols-[3fr_2fr]"
	>
		<figure class="contents">
			<PrismicImage
				:field="slice.primary.picture"
				class="z-20 w-full row-span-2"
				loading="lazy"
			/>
			<SlideIn
				as="figcaption"
				class="px-4 pt-4 pb-16 rich-text"
				:class="{
					'xl:self-start': slice.variation === 'default' || slice.variation === 'bottom',
					'xl:order-last xl:self-end': slice.variation === 'top',
				}"
			>
				<PrismicRichText :field="slice.primary.caption" />
			</SlideIn>
		</figure>
		<figure
			v-if="$prismic.isFilled.image(slice.primary.secondary_picture)"
			class="flex flex-col"
			:class="{
				'xl:self-end': slice.variation === 'default' || slice.variation === 'bottom',
				'xl:self-start': slice.variation === 'top',
			}"
		>
			<PrismicImage
				:field="slice.primary.secondary_picture"
				class="z-20 w-full"
				loading="lazy"
			/>
			<SlideIn
				as="figcaption"
				class="px-4 pt-4 pb-16 rich-text"
				:class="{
					'xl:order-first': slice.variation === 'bottom',
				}"
			>
				<PrismicRichText :field="slice.primary.secondary_caption" />
			</SlideIn>
		</figure>
	</section>
</template>
