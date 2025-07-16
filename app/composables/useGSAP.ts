import type { Group } from "three"
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

			ScrollTrigger.sort()
			ScrollTrigger.refresh()
			// console.log(ScrollTrigger.getAll())
		})
	})
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

export function positionCenter($this: HTMLElement, $els: ShallowRef<Group | null>[]): void {
	gsap.to($els.map((el) => el.value?.position).filter(Boolean), {
		y: 0,
		stagger: 0.05,
		ease: "power2.inOut",
		repeatRefresh: true,
		scrollTrigger: {
			trigger: $this,
			start: "top bottom",
			end: "bottom bottom+=20%",
			scrub: true,
			invalidateOnRefresh: true,
			// markers: true,
			id: "positionCenter",
		},
	})
}

export function positionTop($this: HTMLElement, $els: ShallowRef<Group | null>[]): void {
	gsap.to($els.map((el) => el.value?.position).filter(Boolean), {
		y: 16,
		stagger: 0.05,
		ease: "power2.inOut",
		repeatRefresh: true,
		scrollTrigger: {
			trigger: $this,
			start: "top bottom",
			end: "bottom bottom+=20%",
			scrub: true,
			invalidateOnRefresh: true,
			// markers: true,
			id: "positionTop",
		},
	})
}
