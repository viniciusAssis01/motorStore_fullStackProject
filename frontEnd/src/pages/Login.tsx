import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "../components/Input";
import Button from "../components/Button";

import { api } from "../lib/axios";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

interface iLoginData {
	email: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();

	const { getUserProfile } = useAuth();

	const schema = z.object({
		email: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
		password: z
			.string({ description: "Campo inválido" })
			.min(1, "Campo obrigatório"),
	});

	const login = async (data: iLoginData) => {
		await api
			.post("/login", data)
			.then((res) => {
				getUserProfile(res.data.token);
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iLoginData>({
		resolver: zodResolver(schema),
	});

	return (
		<>
			<Header />

			<main
				className="flex justify-center items-center mt-20 p-8 bg-grey-8"
				style={{
					height: "calc(100vh - 160px)",
				}}
			>
				<form
					onSubmit={handleSubmit(login)}
					className="flex flex-col w-full h-fit max-w-md gap-8 p-8 bg-white rounded"
				>
					<h1 className="font-medium text-h5">Login</h1>

					<Input
						id="email"
						label="Email"
						type="email"
						register={register("email")}
						placeholder="Digitar email"
						error={errors.email?.message}
					/>

					<Input
						id="password"
						label="Senha"
						type="password"
						register={register("password")}
						placeholder="Digitar senha"
						error={errors.password?.message}
					/>

					<p className="self-end text-grey-2 text-b1">Esqueci minha senha</p>

					<Button type="submit" variant="brand-1" fullWidth>
						Entrar
					</Button>

					<p className="text-center text-b1">Ainda não possui conta?</p>

					<Button
						onClick={() => navigate("/register")}
						type="submit"
						variant="outline-2"
						fullWidth
					>
						Cadastrar
					</Button>
				</form>
			</main>

			<Footer />
		</>
	);
};

export default Login;
