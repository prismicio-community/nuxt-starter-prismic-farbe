<script setup lang="ts">
/* eslint-disable vue/attribute-hyphenation */
import { PCFShadowMap } from "three"
</script>

<template>
	<div>
		<h1 class="text-3xl font-bold underline">
			Hello world!
		</h1>
		<TresCanvas
			class="-z-1"
			window-size
			clear-color="#82DBC5"
			preset="realistic"
			:shadowMap-type="PCFShadowMap"
		>
			<OrbitControls />
			<TresPerspectiveCamera
				:fov="45"
				:position="[0, 20, 0]"
				:look-at="[0, 0, 0]"
			/>

			<TresMesh
				cast-shadow
				receive-shadow
				:position="[0, 3.9 / 2, 0]"
			>
				<TresBoxGeometry :args="[5.6, 3.9, 3.7]" />
				<TresMeshPhongMaterial color="orange" />
			</TresMesh>

			<TresMesh
				cast-shadow
				receive-shadow
				:position="[0, 0, 0]"
				:rotation="[-Math.PI / 2, 0, 0]"
			>
				<TresPlaneGeometry :args="[20, 20, 10, 10]" />
				<TresMeshPhongMaterial color="#f7f7f7" />
			</TresMesh>

			<TresDirectionalLight
				cast-shadow
				:position="[-4, 10, 2]"
				:intensity="1.5"
				:shadow-mapSize-width="512"
				:shadow-mapSize-height="512"
				:shadow-radius="4"
			/>
			<TresAmbientLight :intensity=".2" :position="[2, 2, 2]" />
		</TresCanvas>
	</div>
</template>
