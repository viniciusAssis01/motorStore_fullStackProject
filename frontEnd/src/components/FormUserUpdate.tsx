import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input, TextArea } from "../components/Input";
import Button from "../components/Button";

import { api } from "../lib/axios";
import { useModal } from "../contexts/modalContext";
import { useAuth } from "../contexts/authContext";

export interface iUserData {
	name: string;
	email: string;
	cpf: string;
	cellphone: string;
	dateBirth: string;
	description: string;
	password: string;
	confirmPassword: string;
}

const FormUserUpdate = () => {
	const { closeModal } = useModal();
	const { user, token, logOut, setUser } = useAuth();

	const schema = z.object({
		name: z.string().optional(),
		email: z.string().optional(),
		cpf: z.string().length(11, "Campo deve ter 11 caracteres").optional(),
		cellphone: z.string().optional(),
		dateBirth: z.string().optional(),
		description: z.string().optional(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iUserData>({
		resolver: zodResolver(schema),
	});

	const updateUser = async (data: iUserData) => {
		const headers = { Authorization: `Bearer ${token}` };
		await api
			.patch(`/users/${user?.id}/profile`, data, { headers })
			.then((res) => {
				closeModal();
				setUser(res.data);
			})
			.catch((err) => console.log(err));
	};

	const deleteUser = async (id: string) => {
		const headers = { Authorization: `Bearer ${token}` };

		await api
			.delete(`/users/${id}`, { headers })
			.then(() => {
				closeModal();
				logOut();
			})
			.catch((err) => console.log(err));
	};

	return (
		<form
			onSubmit={handleSubmit(updateUser)}
			className="flex flex-col w-full gap-8 p-8 bg-white rounded"
		>
			<div className="flex flex-col w-full gap-8">
				<h3 className="font-medium text-b1 text-grey-1">
					Informações pessoais
				</h3>

				<Input
					id="name"
					label="Nome"
					type="text"
					register={register("name")}
					placeholder="Ex: Samuel Leão"
					defaultValue={user?.name}
					error={errors.name?.message}
				/>

				<Input
					id="email"
					label="Email"
					type="email"
					register={register("email")}
					placeholder="Ex: samuel@kenzie.com.br"
					defaultValue={user?.email}
					error={errors.email?.message}
				/>

				<Input
					id="cpf"
					label="CPF"
					type="text"
					register={register("cpf")}
					placeholder="000.000.000-00"
					defaultValue={user?.cpf}
					error={errors.cpf?.message}
				/>

				<Input
					id="cellphone"
					label="Celular"
					type="text"
					register={register("cellphone")}
					placeholder="(DDD) 90000-0000"
					defaultValue={user?.cellphone}
					error={errors.cellphone?.message}
				/>

				<Input
					id="dateBirth"
					label="Data de nascimento"
					type="text"
					register={register("dateBirth")}
					placeholder="00/00/00"
					defaultValue={user?.dateBirth}
					error={errors.dateBirth?.message}
				/>

				<TextArea
					id="description"
					label="Descrição"
					register={register("description")}
					placeholder="Digitar descrição"
					defaultValue={user?.description}
					error={errors.description?.message}
				/>
			</div>

			<div className="flex gap-2">
				<Button
					onClick={() => closeModal()}
					fullWidth
					type="button"
					variant="grey-6"
				>
					Cancelar
				</Button>

				<Button
					onClick={() => deleteUser(user?.id!)}
					fullWidth
					type="button"
					variant="alert"
				>
					Excluir Perfil
				</Button>

				<Button fullWidth type="submit" variant="brand-1">
					Salvar alterações
				</Button>
			</div>
		</form>
	);
};

export default FormUserUpdate;
