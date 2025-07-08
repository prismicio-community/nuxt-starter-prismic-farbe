<template>
	<TresCanvas
		class="-z-1"
		window-size
		preset="realistic"
	>
		<OrbitControls />
		<TresPerspectiveCamera
			:fov="45"
			:position="[0, 0, 20]"
			:look-at="[0, 0, 0]"
		/>
		<slot />
	</TresCanvas>
</template>
