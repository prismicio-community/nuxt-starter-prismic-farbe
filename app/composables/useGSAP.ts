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
		nextTick(() => {
			ctx = gsap.context(() => {
				gsap.registerPlugin(ScrollTrigger)
	
				callback(window?.matchMedia("(prefers-reduced-motion: reduce)").matches ?? false)
	
				ScrollTrigger.refresh()
			})
		})
	}

	onMounted(_callback)
	if (watchSource) {
		watch(watchSource, _callback)
	}
	onUnmounted(() => ctx?.revert())
}
