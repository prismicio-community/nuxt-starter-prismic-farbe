<script lang="ts" setup>
/* eslint-disable vue/attribute-hyphenation */
import { gsap } from "gsap"
import type { Group } from "three"

const { totalItems } = useCart()
const route = useRoute()

const activeModel = ref<string>("800")
const $canister = shallowRef<Group | null>(null)
const $canisterInternal = shallowRef<Group | null>(null)
const $packaging = shallowRef<Group | null>(null)

useLoop().onBeforeRender(({ elapsed }) => {
	if ($canisterInternal.value) {
		$canisterInternal.value.rotation.y = Math.PI / 4 - Math.sin(elapsed * 0.25) * Math.PI / 2
	}
})

useGSAP((isReducedMotion) => {
	if (!$canister.value || !$packaging.value) {
		return
	}

	const $canisterPosition = $canister.value.position
	const $packagingPosition = $packaging.value.position

	const $canisterRotation = $canister.value.rotation
	const $packagingRotation = $packaging.value.rotation

	function animateScroll() {
		const $sections = document.querySelectorAll<HTMLElement>("[data-scene-position]")

		$sections.forEach(($section) => {
			const model = $section.dataset.sceneModel
			const position = $section.dataset.scenePosition
			const shouldRotate = !isReducedMotion && Boolean($section.dataset.sceneRotate)

			function onUpdate(this: gsap.TweenVars) {
				if (this.progress() > 0.2 && this.progress() < 0.7 && model) {
					activeModel.value = model
				}
			}

			function onRefresh(self: ScrollTrigger) {
				if (self.isActive && model) {
					activeModel.value = model
				}
			}

			if (position === "center" || position === "top") {
				gsap.to([$canisterPosition, $packagingPosition], {
					y: position === "center" ? 0 : 16,
					stagger: 0.05,
					ease: "power2.inOut",
					repeatRefresh: true,
					onUpdate: shouldRotate ? undefined : onUpdate,
					scrollTrigger: {
						trigger: $section,
						start: position === "center" ? "top+=40% bottom" : "top-=20% bottom",
						end: "bottom bottom",
						scrub: true,
						invalidateOnRefresh: true,
						onRefresh: shouldRotate ? undefined : onRefresh,
					},
				})
			}

			if (shouldRotate) {
				gsap.to([$canisterRotation, $packagingRotation], {
					y: `+=${Math.PI * 2}`,
					stagger: 0.05,
					ease: "linear",
					repeatRefresh: true,
					onUpdate,
					scrollTrigger: {
						trigger: $section,
						start: "top center",
						end: "bottom center",
						scrub: 0.6,
						invalidateOnRefresh: true,
						onRefresh,
					},
				})
			}
		})
	}

	// Intro animation
	if (!isReducedMotion && window.scrollY < 20) {
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

	// Spin on add to cart
	if (!isReducedMotion) {
		watch(totalItems, (next, prev) => {
			if (next <= prev) {
				return
			}

			gsap.to([$canisterRotation, $packagingRotation], {
				y: `+=${Math.PI * 2}`,
				stagger: 0.05,
				duration: 0.8,
				ease: "power2.inOut",
			})
		})
	}
}, () => route.path)
</script>

<template>
	<TAbsoluteGroup :x="0.33" :distance="20">
		<TresGroup :position="[1.5, 2.5, 0]">
			<Levioso>
				<TresGroup ref="$canister">
					<TresGroup ref="$canisterInternal">
						<TFilmCanister
							:model="activeModel"
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
						:model="activeModel"
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
