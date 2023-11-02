import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Header from "../components/Header";
import { Input, TextArea } from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

import { useState } from "react";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/modalContext";

export interface iAddress {
	zipCode: string;
	state: string;
	city: string;
	street: string;
	number: string;
	complement: string;
}

export interface iUserData {
	name: string;
	email: string;
	cpf: string;
	cellphone: string;
	dateBirth: string;
	description: string;
	password: string;
	confirmPassword: string;
	address: iAddress;
}

const Register = () => {
	const { setModal, closeModal } = useModal();

	const navigate = useNavigate();

	const [accountType, setAccountType] = useState<"comprador" | "anunciante">(
		"anunciante"
	);

	const schema = z.object({
		name: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
		email: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
		cpf: z
			.string({ description: "Campo inválido" })
			.length(11, "Campo deve ter 11 caracteres"),
		cellphone: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
		dateBirth: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório")
			.transform((val) => {
				const parts = val.split("/");
				const day = parseInt(parts[0], 10);
				const month = parseInt(parts[1], 10) - 1;
				const years = parseInt(parts[2], 10);

				return new Date(years, month, day);
			}),
		description: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
		password: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
		confirmPassword: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
		address: z.object({
			zipCode: z
				.string({ description: "Campo inválido" })
				.min(1, "Campo obrigatório"),
			state: z
				.string({ description: "Campo inválido" })
				.min(1, "Campo obrigatório"),
			city: z
				.string({ description: "Campo inválido" })
				.min(1, "Campo obrigatório"),
			street: z
				.string({ description: "Campo inválido" })
				.min(1, "Campo obrigatório"),
			number: z
				.string({ description: "Campo inválido" })
				.min(1, "Campo obrigatório"),
			complement: z.string({ description: "Campo inválido" }).optional(),
		}),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<iUserData>({
		resolver: zodResolver(schema),
	});

	const registerUser = async (data: iUserData) => {
		const formatedData = {
			...data,
			accountType,
		};

		await api
			.post("/users", formatedData)
			.then(() => {
				reset();

				setModal({
					isOpen: true,
					data: {
						title: "Sucesso!",
						content: (
							<div className="flex flex-col gap-4 p-6">
								<h3 className="font-medium font-lexend">
									Sua conta foi criada com sucesso!
								</h3>

								<p className="text-grey-2">
									Agora você poderá ver seus negócios crescendo em grande escala
								</p>

								<Button
									onClick={() => {
										navigate("/login");
										closeModal();
									}}
									type="button"
									variant="brand-1"
								>
									Ir para o login
								</Button>
							</div>
						),
					},
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Header />

			<main className="bg-grey-8 py-8 px-4 mt-20 flex justify-center">
				<form
					onSubmit={handleSubmit(registerUser)}
					className="w-full max-w-md flex flex-col gap-8 p-8 bg-white rounded"
				>
					<h1 className="text-h5 font-medium">Cadastro</h1>

					<div className="w-full flex flex-col gap-8">
						<h3 className="font-medium text-b1 text-grey-1">
							Informações pessoais
						</h3>

						<Input
							id="name"
							label="Nome"
							type="text"
							register={register("name")}
							placeholder="Ex: Samuel Leão"
							error={errors.name?.message}
						/>

						<Input
							id="email"
							label="Email"
							type="email"
							register={register("email")}
							placeholder="Ex: samuel@kenzie.com.br"
							error={errors.email?.message}
						/>

						<Input
							id="cpf"
							label="CPF"
							type="text"
							register={register("cpf")}
							placeholder="000.000.000-00"
							error={errors.cpf?.message}
						/>

						<Input
							id="cellphone"
							label="Celular"
							type="text"
							register={register("cellphone")}
							placeholder="(DDD) 90000-0000"
							error={errors.cellphone?.message}
						/>

						<Input
							id="dateBirth"
							label="Data de nascimento"
							type="text"
							register={register("dateBirth")}
							placeholder="00/00/00"
							error={errors.dateBirth?.message}
						/>

						<TextArea
							id="description"
							label="Descrição"
							register={register("description")}
							placeholder="Digitar descrição"
							error={errors.description?.message}
						/>
					</div>

					<div className="w-full flex flex-col gap-4">
						<h3 className="font-medium text-b1 text-grey-1">
							Informações de endereço
						</h3>

						<Input
							id="zipCode"
							label="CEP"
							type="text"
							register={register("address.zipCode")}
							placeholder="00000.000"
							error={errors.address?.zipCode?.message}
						/>

						<div className="flex gap-4">
							<Input
								id="state"
								label="Estado"
								type="text"
								register={register("address.state")}
								placeholder="Digitar estado"
								error={errors.address?.state?.message}
							/>

							<Input
								id="city"
								label="Cidade"
								type="text"
								register={register("address.city")}
								placeholder="Digitar cidade"
								error={errors.address?.city?.message}
							/>
						</div>

						<Input
							id="street"
							label="Rua"
							type="text"
							register={register("address.street")}
							placeholder="Digitar rua"
							error={errors.address?.street?.message}
						/>

						<div className="flex gap-4">
							<Input
								id="number"
								label="Número"
								type="text"
								register={register("address.number")}
								placeholder="Digitar número"
								error={errors.address?.state?.message}
							/>

							<Input
								id="complement"
								label="Complemento"
								type="text"
								register={register("address.complement")}
								placeholder="Ex: apart 307"
								error={errors.address?.complement?.message}
							/>
						</div>

						<div className="w-full">
							<h3 className="font-medium text-b1 text-grey-1">Tipo de conta</h3>

							<div className="w-full flex gap-4">
								<Button
									type="button"
									fullWidth
									onClick={() => setAccountType("comprador")}
									variant={
										accountType === "comprador" ? "brand-1" : "outline-2"
									}
								>
									Comprador
								</Button>

								<Button
									type="button"
									fullWidth
									onClick={() => setAccountType("anunciante")}
									variant={
										accountType === "anunciante" ? "brand-1" : "outline-2"
									}
								>
									Anunciante
								</Button>
							</div>
						</div>

						<Input
							id="password"
							label="Senha"
							type="password"
							register={register("password")}
							placeholder="Digitar senha"
							error={errors.password?.message}
						/>

						<Input
							id="confirmPassword"
							label="Confirmar senha"
							type="password"
							register={register("confirmPassword")}
							placeholder="Digitar senha"
							error={errors.confirmPassword?.message}
						/>
					</div>

					<Button fullWidth type="submit" variant="brand-1">
						Finalizar cadastro
					</Button>
				</form>
			</main>

			<Footer />
		</>
	);
};

export default Register;
