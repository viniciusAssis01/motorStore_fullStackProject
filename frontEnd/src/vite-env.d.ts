/// <reference types="vite/client" />

declare module "*.png" {
	const pngPath: string;
	export default pngPath;
}

declare module "*.jpg" {
	const jpgPath: string;
	export default jpgPath;
}
declare module "*.jpeg" {
	const jpegPath: string;
	export default jpegPath;
}
declare module "*.svg" {
	const svgPath: string;
	export default svgPath;
}
