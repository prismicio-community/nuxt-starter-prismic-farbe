<script setup lang="ts">
const $this = shallowRef<HTMLElement | null>(null)

useGSAP($this, ($this) => {
	slideInChildren($this)
})
</script>

<template>
	<section ref="$this" class="w-2/5 ml-auto py-16 px-4 space-y-4">
		<h2 class="heading-2">
			Shots from the<br>
			Farbe community
		</h2>
		<p class="paragraph">
			From around the world, photographs use Farbe to capture unique slice of life.
		</p>
		<div class="flex -ml-4">
			<a href="https://www.instagram.com/farbe.film" class="cta">Join the Farbe community -></a>
		</div>
	</section>
</template>
