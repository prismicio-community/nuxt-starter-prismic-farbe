type GetSceneAttributesReturnType = {
	"data-scene-position"?: "top" | "center"
	"data-scene-model"?: string
	"data-scene-rotate"?: boolean
}

export function getSceneAttributes(params?: {
	position?: "top" | "center"
	model?: string
	rotate?: boolean
}): GetSceneAttributesReturnType {
	return {
		"data-scene-position": params?.position,
		"data-scene-model": params?.model,
		"data-scene-rotate": params?.rotate,
	}
}
