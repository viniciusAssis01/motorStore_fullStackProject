const Footer = () => {
	return (
		<div className="bottom-0 flex items-center justify-between w-full h-20 px-8 bg-grey-0 max-sm:flex-col max-sm:h-40 max-sm:py-2">
			<div className="flex gap-2 mb-1">
				<h2 className="text-3xl font-bold text-grey-6">Motors</h2>
				<span className="self-end font-bold text-grey-6">shop</span>
			</div>
			<p className="text-sm text-center text-grey-6">
				© 2022 - Todos os direitos reservados.
			</p>
			<button
				onClick={() => window.scroll(0, 0)}
				className="w-8 h-8 pt-1 text-center rounded text-grey-6 bg-grey-2"
			>
				^
			</button>
		</div>
	);
};

export default Footer;
