import type { WatchSource } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useGSAP(
	callback: (isReducedMotion: boolean) => void,
	watchSource?: WatchSource,
): void {
	let ctx: gsap.Context | undefined

	function _callback() {
		ctx?.revert()
		ctx = gsap.context(() => {
			gsap.registerPlugin(ScrollTrigger)

			callback(window?.matchMedia("(prefers-reduced-motion: reduce)").matches ?? false)

			ScrollTrigger.refresh()
		})
	}

	onMounted(_callback)
	if (watchSource) {
		watch(watchSource, _callback)
	}
	onUnmounted(() => ctx?.revert())
}

export function slideInChildren($this: HTMLElement): void {
	gsap.from($this.children, {
		opacity: 0,
		y: 50,
		delay: 0.3,
		duration: 1,
		ease: "power2.out",
		stagger: 0.2,
		scrollTrigger: {
			trigger: $this,
			start: "top bottom-=40%",
		},
	})
}
