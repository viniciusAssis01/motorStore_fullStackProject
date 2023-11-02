import { useModal } from "../contexts/modalContext";

interface iGalleryProps {
	images: Record<string, string>[];
}

export const Gallery = ({ images }: iGalleryProps) => {
	const { setModal } = useModal();

	const openModal = (image_url: string) => {
		setModal({
			isOpen: true,
			data: {
				title: "Imagem do veículo",
				content: (
					<div className="flex flex-col gap-4 p-6">
						<img src={image_url} alt="" />
					</div>
				),
			},
		});
	};

	return (
		<div className="flex flex-col w-full gap-4">
			<div className="flex w-full gap-1">
				{images.map(
					({ image_url }, i) =>
						i >= 3 && (
							<div
								key={i}
								className="flex-1 w-1/3 aspect-square"
								onClick={() => openModal(image_url)}
							>
								<img className="w-full" src={image_url} alt="" />
							</div>
						)
				)}
			</div>
			<div className="flex w-full gap-1">
				{images.map(
					({ image_url }, i) =>
						i < 3 && (
							<div
								key={i}
								className="flex-1 w-1/3 aspect-square"
								onClick={() => openModal(image_url)}
							>
								<img className="w-full" src={image_url} alt="" />
							</div>
						)
				)}
			</div>
		</div>
	);
};
