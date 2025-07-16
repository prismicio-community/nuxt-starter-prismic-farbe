<script setup lang="ts">
import { SliceSimulator } from "@slicemachine/adapter-nuxt/simulator"
import { components } from "~/slices"

definePageMeta({ layout: "blank" })
</script>

<template>
	<SliceSimulator v-slot="{ slices }" background="transparent">
		<SliceZone :slices="slices" :components="components" />
	</SliceSimulator>
</template>
