import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../components/Input";
import Button from "../components/Button";

import { api } from "../lib/axios";
import { useModal } from "../contexts/modalContext";
import { useAuth } from "../contexts/authContext";

export interface iAddress {
	id: string;
	zipCode: string;
	state: string;
	city: string;
	street: string;
	number: string;
	complement: string;
}

const FormAddressUpdate = () => {
	const { closeModal } = useModal();
	const { user, token, setUser } = useAuth();

	const schema = z.object({
		zipCode: z.string({ description: "Campo inválido" }).optional(),
		state: z.string({ description: "Campo inválido" }).optional(),
		city: z.string({ description: "Campo inválido" }).optional(),
		street: z.string({ description: "Campo inválido" }).optional(),
		number: z.string({ description: "Campo inválido" }).optional(),
		complement: z.string({ description: "Campo inválido" }).optional(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iAddress>({
		resolver: zodResolver(schema),
	});

	const updateAddress = async (data: iAddress) => {
		const headers = { Authorization: `Bearer ${token}` };
		await api
			.patch(`/users/${user?.id}/address`, data, { headers })
			.then((res) => {
				closeModal();
				setUser((actValue: any) => {
					return { ...actValue, address: { ...res.data } };
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<form
			onSubmit={handleSubmit(updateAddress)}
			className="flex flex-col w-full gap-8 p-8 bg-white rounded"
		>
			<h3 className="font-medium text-b1 text-grey-1">
				Informações de endereço
			</h3>

			<Input
				id="zipCode"
				label="CEP"
				type="text"
				register={register("zipCode")}
				placeholder="00000.000"
				defaultValue={user?.address.zipCode}
				error={errors.zipCode?.message}
			/>

			<div className="flex gap-4">
				<Input
					id="state"
					label="Estado"
					type="text"
					register={register("state")}
					placeholder="Digitar estado"
					defaultValue={user?.address.state}
					error={errors.state?.message}
				/>

				<Input
					id="city"
					label="Cidade"
					type="text"
					register={register("city")}
					placeholder="Digitar cidade"
					defaultValue={user?.address.city}
					error={errors.city?.message}
				/>
			</div>

			<Input
				id="street"
				label="Rua"
				type="text"
				register={register("street")}
				placeholder="Digitar rua"
				defaultValue={user?.address.street}
				error={errors.street?.message}
			/>

			<div className="flex gap-4">
				<Input
					id="number"
					label="Número"
					type="text"
					register={register("number")}
					placeholder="Digitar número"
					defaultValue={user?.address.number}
					error={errors.state?.message}
				/>

				<Input
					id="complement"
					label="Complemento"
					type="text"
					register={register("complement")}
					placeholder="Ex: apart 307"
					defaultValue={user?.address.complement}
					error={errors.complement?.message}
				/>
			</div>

			<div className="flex w-full justify-end">
				<div className="flex gap-2 w-3/4">
					<Button onClick={() => closeModal()} type="button" variant="grey-6">
						Cancelar
					</Button>

					<Button fullWidth type="submit" variant="brand-1">
						Salvar alterações
					</Button>
				</div>
			</div>
		</form>
	);
};

export default FormAddressUpdate;
