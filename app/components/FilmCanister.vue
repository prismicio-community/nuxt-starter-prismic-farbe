<script lang="ts" setup>
defineProps<{
	model: "100" | "200" | "400" | "800"
}>()
</script>

<template>
  <Suspense>
    <GltfModel
      model="/canister/canister.gltf"
      :texture="{
        map: `/textures/${model}-color.jpg`,
        metalnessMap: `/textures/${model}-metallic.jpg`,
      }"
      v-bind="$attrs"
    />
  </Suspense>
</template>
