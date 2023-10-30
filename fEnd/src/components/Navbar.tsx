import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { getUserAcronym } from "../utils/getUserAcronym";
import { colorOptions } from "../utils/randomColors";

interface iNavbarProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isOpen, setIsOpen }: iNavbarProps) => {
	const { token, user } = useAuth();

	return (
		<>
			<nav className="max-md:absolute md:cursor-pointer max-md:left-0 max-md:py-5 max-md:z-40 max-md:top-18 flex flex-col border-b-2 border-grey-4 gap-10 bg-grey-10 md:items-center w-full md:flex-row md:border-l-2 md:h-20 md:px-3 md:min-w-[280px]">
				{token ? (
					<div
						className="flex items-center gap-2 pl-2 w-[280px]"
						onClick={() => setIsOpen(!isOpen)}
					>
						{user && (
							<div
								className={`flex items-center ${
									colorOptions[user.color]
								} rounded-full p-3 h-11`}
							>
								<p className="font-bold w-max text-grey-10">
									{getUserAcronym(user.name)}
								</p>
							</div>
						)}
						<p>{user?.name}</p>
					</div>
				) : (
					<>
						<Link
							to={"/login"}
							className="font-semibold text-grey-2 max-md:w-[90%] my-0 mx-auto md:w-fit"
						>
							Fazer login
						</Link>
						<Link
							to={"/register"}
							className="font-medium h-12 border border-grey-4 pt-3 rounded text-grey-0 text-center max-md:w-[90%] my-0 mx-auto md:w-[50%]"
						>
							Cadastrar
						</Link>
					</>
				)}
			</nav>
		</>
	);
};

export default Navbar;
