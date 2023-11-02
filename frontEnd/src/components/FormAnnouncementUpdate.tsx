import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useModal } from "../contexts/modalContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../lib/axios";
import Button from "./Button";
import { Input, Select, TextArea } from "./Input";
import { iAnnouncements as A } from "../interfaces/announcements";

interface iAnnouncements {
	id: string;
	brand: string;
	model: string;
	color: string;
	coverImage: string;
	description: string;
	fipeTablePrice: string;
	fuel: string;
	images: Record<string, string>[];
	mileage: string;
	price: string;
	year: string;
	user: {
		id: string;
		name: string;
		description: string;
		color: string;
		cellphone: string;
	};
}

interface iPropsUpdateAnouncement {
	fetchData: () => void;
	car: A;
}

interface iImages {
	image_url?: string;
}

export const FormUpdateAnnouncement = ({
	fetchData,
	car,
}: iPropsUpdateAnouncement) => {
	const { closeModal } = useModal();
	const { token } = useAuth();

	const { year, price, mileage, ...rest } = car;

	const fuels = ["gasolina", "etanol", "flex", "eletrico", "híbrido"];

	const [inputImage, setInputImage] = useState<iImages[]>([
		{ image_url: "" },
		{ image_url: "" },
	]);
	const [images, setImages] = useState<Record<string, string>[]>([]);

	const addInputImage = () => {
		if (inputImage.length < 6) {
			setInputImage([...inputImage, { image_url: "" }]);
			setImages([...images, { image_url: "" }]);
		}
	};

	const handleValue = (val: string | undefined) => {
		if (val) {
			return +val;
		}

		return val;
	};

	const schema = z.object({
		brand: z.string().max(45).optional(),
		model: z.string().max(120).optional(),
		year: z.string().optional().transform(handleValue),
		fuel: z.string().optional(),
		mileage: z.string().optional().transform(handleValue),
		color: z.string().max(45).optional(),
		fipeTablePrice: z.string().optional(),
		price: z.string().optional().transform(handleValue),
		description: z.string().optional(),
		coverImage: z.string().optional(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iAnnouncements>({
		defaultValues: {
			...rest,
			year: year.toString(),
			mileage: mileage.toString(),
			price: price.toString(),
		},
		resolver: zodResolver(schema),
	});

	const updatedAnnouncement = async (data: iAnnouncements) => {
		const filteredImages = images.filter((image) => image);
		const formatedData = {
			...data,
			images: filteredImages,
		};

		const headers = { Authorization: `Bearer ${token}` };
		await api
			.put(`/announcements/${car.id}`, formatedData, { headers })
			.then(() => {
				fetchData();
				closeModal();
			})
			.catch((err) => console.log(err));
	};

	const deleteAnnouncement = async () => {
		const headers = { Authorization: `Bearer ${token}` };
		await api
			.delete(`/announcements/${car.id}`, { headers })
			.then(() => {
				fetchData();
				closeModal();
			})
			.catch((err) => console.log(err));
	};

	return (
		<form onSubmit={handleSubmit(updatedAnnouncement)}>
			<div className="flex flex-col gap-4 px-5 mt-4">
				<h3 className="font-medium text-b1 text-grey-1">
					Infrmações do Veículo
				</h3>
				<Input
					id="brand"
					label="Marca"
					type="text"
					register={register("brand")}
					placeholder="Chevrolet"
					error={errors.brand?.message}
				/>
				<Input
					id="model"
					label="Modelo"
					type="text"
					register={register("model")}
					placeholder="camaro ss 6.2 v8 16v"
					error={errors.model?.message}
				/>
				<div className="flex flex-wrap justify-between gap-4">
					<Input
						id="year"
						label="Ano"
						type="number"
						register={register("year")}
						placeholder="2018"
						error={errors.year?.message}
					/>
					<Select
						id="fuel"
						label="Combustível"
						type="text"
						array={fuels}
						register={register("fuel")}
						placeholder="Gasolina/Etanol"
						error={errors.brand?.message}
					/>
					<Input
						id="mileage"
						label="Quilometragem"
						type="number"
						register={register("mileage")}
						placeholder="30.000"
						error={errors.mileage?.message}
					/>
					<Input
						id="color"
						label="Cor"
						type="text"
						register={register("color")}
						placeholder="Branco"
						error={errors.color?.message}
					/>
					<Input
						id="fipeTablePrice"
						label="Preço tabela FIPE"
						type="text"
						register={register("fipeTablePrice")}
						placeholder="R$ 48.000,00"
						error={errors.fipeTablePrice?.message}
					/>
					<Input
						id="price"
						label="Preço"
						type="number"
						register={register("price")}
						placeholder="R$ 50.000,00"
						error={errors.price?.message}
					/>
				</div>
				<TextArea
					id="description"
					label="Descrição"
					type="text"
					register={register("description")}
					placeholder="Descrição do carro"
					error={errors.description?.message}
				/>
				<Input
					id="coverImage"
					label="Imagem de capa"
					type="text"
					register={register("coverImage")}
					placeholder="https://image.com"
					error={errors.coverImage?.message}
				/>
				{inputImage.map((input, i) => {
					return (
						<input
							className="w-full p-2 border-2 rounded outline-none text-b0 border-grey-6 focus:border-brand2"
							key={i}
							defaultValue={car?.images[i]?.image_url || ""}
							id={`image ${input}`}
							type="text"
							placeholder={"https://image.com"}
							onChange={(e) => {
								const newImages = [...images];
								newImages[i] = { image_url: e.target.value };
								setImages(newImages);
							}}
						/>
					);
				})}
				<Button onClick={() => addInputImage()} type="button" variant="brand-1">
					Adicionar mais imagens
				</Button>
			</div>
			<div className="flex justify-end w-full gap-3 pr-6 my-6">
				<Button
					type="button"
					variant="grey-6"
					onClick={() => deleteAnnouncement()}
				>
					Excluir Anuncio
				</Button>
				<Button type="submit" variant="brand-1">
					Salvar Alterações
				</Button>
			</div>
		</form>
	);
};
