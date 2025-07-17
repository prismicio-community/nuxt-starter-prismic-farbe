<script lang="ts" setup>
/* eslint-disable vue/attribute-hyphenation */
import type { Content } from "@prismicio/client"

import type { Group } from "three"
import { gsap } from "gsap"

const props = defineProps<{
	slices: Content.PageDocumentDataSlicesSlice[]
}>()

const model = ref<"100" | "800" | "200" | "400">("800")

const $canister = shallowRef<Group | null>(null)
const $canisterInternal = shallowRef<Group | null>(null)
const $packaging = shallowRef<Group | null>(null)

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
	if ($canisterInternal.value) {
		$canisterInternal.value.rotation.y = Math.PI / 4 - Math.sin(elapsed * 0.25) * Math.PI / 2
	}
})

useGSAP(() => {
	if (!$canister.value || !$packaging.value) {
		return
	}

	const $canisterPosition = $canister.value.position
	const $packagingPosition = $packaging.value.position

	const $canisterRotation = $canister.value.rotation
	const $packagingRotation = $packaging.value.rotation

	function animateScroll() {
		props.slices.forEach((slice, index) => {
			const selector = `[data-slice="${slice.slice_type}-${index}"]`
			switch (slice.slice_type) {
				case "text":
					gsap.to([$canisterPosition, $packagingPosition], {
						y: 0,
						stagger: 0.05,
						ease: "power2.inOut",
						repeatRefresh: true,
						scrollTrigger: {
							trigger: selector,
							start: "top+=40% bottom",
							end: "bottom bottom",
							scrub: true,
							invalidateOnRefresh: true,
							id: `center-${index}`,
							// markers: {
							// 	indent: index * 175,
							// },
						},
					})
					break

				case "product":
					// eslint-disable-next-line no-case-declarations
					const scrollTrigger = {
						trigger: selector,
						start: "top+=40% bottom",
						end: "bottom bottom",
						scrub: true,
						invalidateOnRefresh: true,
						id: `center-${index}`,
						// markers: {
						// 	indent: index * 175,
						// },
					}

					gsap.to([$canisterPosition, $packagingPosition], {
						y: 0,
						stagger: 0.05,
						ease: "power2.inOut",
						repeatRefresh: true,
						scrollTrigger: {
							trigger: selector,
							start: "top+=40% bottom",
							end: "bottom bottom",
							scrub: true,
							invalidateOnRefresh: true,
						},
					})
					gsap.to([$canisterRotation, $packagingRotation], {
						y: Math.PI * 2,
						stagger: 0.05,
						ease: "power2.inOut",
						repeatRefresh: true,
						onUpdate() {
							if (this.progress() > .4 && this.progress() < .6) {
								const models = ["100", "200", "400", "800"] as const
								const value = models[index % models.length]!
								if (value !== model.value) {
									model.value = value
								}
							}
						},
						scrollTrigger: {
							trigger: selector,
							invalidateOnRefresh: true,
							start: "top+=10% center",
							end: "bottom-=10% center",
							toggleActions: "play reset play reset",
							onRefresh(self) {
								if (self.isActive) {
									const models = ["100", "200", "400", "800"] as const
									const value = models[index % models.length]!
									if (value !== model.value) {
										model.value = value
									}
								}
							}
						},
					})
					break

				case "picture":
					gsap.to([$canisterPosition, $packagingPosition], {
						y: 16,
						stagger: 0.05,
						ease: "power2.inOut",
						repeatRefresh: true,
						scrollTrigger: {
							trigger: selector,
							start: "top-=20% bottom",
							end: "bottom bottom",
							scrub: true,
							invalidateOnRefresh: true,
						},
					})
					break
			}
		})
	}

	const firstSlice = props.slices[0]

	if (firstSlice?.slice_type === "text" && window.scrollY < 20) {
		gsap.fromTo([$canisterPosition, $packagingPosition], {
			y: -12,
		}, {
			y: 0,
			delay: 0.3,
			duration: 1,
			stagger: 0.2,
			ease: "power2.out",
			onComplete: animateScroll,
		})
	} else {
		animateScroll()
	}
}, () => props.slices)
</script>

<template>
	<TAbsoluteGroup :x="0.33" :distance="20">
		<TresGroup :position="[1.5, 2.5, 0]">
			<Levioso>
				<TresGroup ref="$canister">
					<TresGroup ref="$canisterInternal">
						<TFilmCanister
							:model="model"
							:rotation="[0, 0, Math.PI / 8]"
						/>
					</TresGroup>
				</TresGroup>
			</Levioso>
		</TresGroup>
		<TresGroup :position="[-1.5, -2.5, 0]">
			<Levioso>
				<TresGroup ref="$packaging">
					<TFilmPackaging
						:model="model"
						:rotation="[-Math.PI / 2, 0, Math.PI / 3]"
					/>
				</TresGroup>
			</Levioso>
		</TresGroup>
	</TAbsoluteGroup>

	<TresMesh
		receive-shadow
		:position="[0, 0, -4]"
		:rotation="[0, 0, 0]"
	>
		<TresPlaneGeometry :args="[400, 400, 10, 10]" />
		<TresMeshStandardMaterial
			color="#ffffff"
			:roughness="0.5"
			:metalness="0.5"
		/>
	</TresMesh>

	<TresDirectionalLight
		cast-shadow
		:position="[-8, 6, 20]"
		:intensity=".5"
		:shadow-mapSize-width="512"
		:shadow-mapSize-height="512"
		:shadow-camera-left="-16"
		:shadow-camera-right="16"
		:shadow-camera-top="16"
		:shadow-camera-bottom="-16"
		:color="0xFFFFFF"
	/>

	<SoftShadows :size="50" :samples="10" />

	<Suspense>
		<Environment
			files="/textures/lobby.hdr"
			:environment-intensity="0.25"
		/>
	</Suspense>
</template>
