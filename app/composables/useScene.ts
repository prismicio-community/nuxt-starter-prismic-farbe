import type { Group } from "three"

const scene = {
	$canister: shallowRef<Group | null>(null),
	$packaging: shallowRef<Group | null>(null),
}

export function useScene(): typeof scene {
	return scene
}
