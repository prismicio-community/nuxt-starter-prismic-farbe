import type { ShallowRef } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useGSAP(
	$this: ShallowRef<HTMLElement | null>,
	callback: ($this: HTMLElement) => void,
	reducedMotionCallback?: ($this: HTMLElement) => void,
): void {
	onMounted(() => {
		nextTick(() => {
			if (!$this.value) {
				return
			}

			gsap.registerPlugin(ScrollTrigger)

			window.matchMedia("(prefers-reduced-motion: reduce").matches
				? reducedMotionCallback?.($this.value)
				: callback($this.value)
		})
	})
}

export function slideInChildren($el: HTMLElement): void {
	gsap.fromTo($el.children, {
		opacity: 0,
		y: 50,
	}, {
		opacity: 1,
		y: 0,
		delay: 0.3,
		duration: 1,
		ease: "power2.out",
		stagger: 0.2,
		scrollTrigger: {
			trigger: $el,
			start: "top bottom-=40%",
		},
	})
}
