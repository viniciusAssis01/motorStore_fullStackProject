import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { iUser } from "../interfaces/user";
import { iAnnouncements } from "../interfaces/announcements";
import { getUserAcronym } from "../utils/getUserAcronym";
import { useModal } from "../contexts/modalContext";
import { FormCreateAnnouncement } from "../components/FormCreateAnnouncement";
import { colorOptions } from "../utils/randomColors";

const Profile = () => {
	const { setModal } = useModal();
	const { user } = useAuth();

	const [userProfile, setUserProfile] = useState<iUser>();
	const { id } = useParams();

	const fetchData = async () => {
		await api
			.get(`/users/${id}`)
			.then((res) => setUserProfile(res.data))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Header />
			<div className="relative w-full mb-32 top-20">
				<div className="h-40 bg-brand1" />
				<div className="absolute flex flex-col w-11/12 gap-4 transform -translate-x-1/2 p-7 left-1/2 top-10 bg-grey-8">
					{userProfile && (
						<span
							className={`flex items-center justify-center w-24 h-24 text-[36px] text-center rounded-full ${
								colorOptions[userProfile.color]
							} text-grey-7 font-inter`}
						>
							{getUserAcronym(userProfile?.name!)}
						</span>
					)}
					<div className="flex items-center gap-2">
						<span className="text-[20px] font-semibold font-lexend">
							{userProfile?.name}
						</span>
						<span className="text-[14px] font-semibold text-center rounded w-fit h-fit bg-brand4 text-brand1 font-inter p-1">
							{userProfile?.accountType}
						</span>
					</div>
					<p className="text-grey-2 font-inter">{userProfile?.description}</p>
					{id === user?.id && (
						<Button
							type="button"
							onClick={() =>
								setModal({
									isOpen: true,
									data: {
										title: "Criar Anuncio",
										content: <FormCreateAnnouncement fetchData={fetchData} />,
									},
								})
							}
							variant="outline-brand"
						>
							Criar Anuncio
						</Button>
					)}
				</div>
				<ul className="flex flex-wrap justify-center w-11/12 gap-4 mx-auto my-16 mt-64 max-md:overflow-auto max-md:flex-nowrap max-md:justify-start">
					{userProfile?.anouncements.map((car: iAnnouncements) => (
						<Card
							car={car}
							key={car.id}
							userColor={userProfile?.color}
							userName={userProfile?.name}
							idEndPoint={id}
							idUser={user?.id}
							fetchData={fetchData}
						/>
					))}
				</ul>
			</div>

			<Footer />
		</>
	);
};

export default Profile;
