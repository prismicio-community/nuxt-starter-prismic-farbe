<script setup lang="ts">
import type { Content } from "@prismicio/client"

defineProps(getSliceComponentProps<Content.PictureSlice>())
</script>

<template>
	<figure
		:data-slice="`${slice.slice_type}-${index}`"
		class="relative z-20"
	>
		<PrismicImage :field="slice.primary.picture" class="w-full" />
		<figcaption class="absolute top-0 bottom-0 left-3/5 backdrop-grayscale-100 text-white">
			<div class="sticky top-0 p-4 inline-block text-shadow-md rich-text">
				<PrismicRichText :field="slice.primary.caption" />
			</div>
		</figcaption>
	</figure>
</template>
