import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../contexts/authContext";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import { iAnnouncements } from "../interfaces/announcements";
import Button from "../components/Button";
import { getUserAcronym } from "../utils/getUserAcronym";
import { colorOptions } from "../utils/randomColors";
import { Comment } from "../components/Comment";
import { Gallery } from "../components/Gallery";

export interface iComments {
	id: string;
	comment: string;
	user: Record<string, string>;
	createdAt: string;
}

const Product = () => {
	const navigate = useNavigate();

	const { user, token } = useAuth();

	const { id } = useParams();

	const [announcementData, setAnnouncementData] = useState<iAnnouncements>();
	const [commentsData, setCommentsData] = useState<iComments[] | undefined>();

	const [comment, setComment] = useState("");

	const getAnnouncementData = async () => {
		await api
			.get(`/announcements/${id}`)
			.then((res) => setAnnouncementData(res.data))
			.catch((err) => console.log(err));
	};

	const getCommentsData = async () => {
		await api
			.get(`/comments/${id}`)
			.then((res) => setCommentsData(res.data))
			.catch((err) => console.log(err));
	};

	const sendComment = async () => {
		const headers = { Authorization: `Bearer ${token}` };
		await api
			.post(`/comments/${announcementData!.id}`, { comment }, { headers })
			.then(() => {
				getCommentsData();
				setComment("");

				const textarea = document.querySelector("textarea");
				textarea!.value = "";
			})
			.catch((err) => console.log(err));
	};

	const suggestions = (suggestion: string) => {
		const textarea = document.querySelector("textarea");

		textarea!.value = suggestion;
		setComment(suggestion);
	};

	useEffect(() => {
		getAnnouncementData();
		getCommentsData();
	}, []);

	return (
		<>
			<Header />

			<main className="relative mt-20 bg-grey-8 md:flex md:flex-col md:items-center">
				<div className="h-[516px] md:h-[484px] bg-brand1 absolute top-0 left-0 w-full z-10" />

				<div className="flex flex-col justify-center md:flex-row max-w-[1243px] md:w-full">
					<section className="z-20 flex flex-col w-full gap-4 px-4 pt-8 pb-4 md:w-2/3 md:py-4">
						<div className="h-[355px] sm:h-fit w-full bg-grey-10 rounded p-8 flex items-center justify-center">
							<img
								className="max-w-full max-h-full"
								src="https://carroscomcamanzi.com.br/wp-content/uploads/2020/05/Mazda-RX7-1999-1600-01.jpg"
								alt=""
							/>
						</div>

						<div className="flex flex-col w-full gap-4 p-4 rounded bg-grey-10 h-fit">
							<h1 className="font-semibold font-lexend text-h5">
								{announcementData?.model}
							</h1>

							<div className="flex flex-col w-full gap-4">
								<div className="flex items-center gap-4">
									<span className="p-1 text-sm font-semibold text-center rounded h-fit bg-brand4 text-brand1 font-inter">
										{announcementData?.mileage} KM
									</span>
									<span className="p-1 text-sm font-semibold text-center rounded h-fit bg-brand4 text-brand1 font-inter">
										{announcementData?.year}
									</span>
								</div>

								<p className="font-bold font-lexend">
									{announcementData?.price.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
									})}
								</p>
							</div>

							<Button type="button" variant="brand-1">
								Comprar
							</Button>
						</div>

						<div className="flex flex-col w-full gap-4 p-4 rounded bg-grey-10 h-fit">
							<h2 className="font-medium font-lexend text-h5">Descrição</h2>

							<p className="font-inter text-grey-2">
								{announcementData?.description}
							</p>
						</div>
					</section>

					<section className="flex flex-col w-full gap-4 p-4 bg-grey-8 z-20 md:w-1/3 md:bg-[transparent]">
						<div className="flex flex-col w-full gap-4 p-4 rounded bg-grey-10 h-fit">
							<h2 className="font-medium font-lexend text-h5">Fotos</h2>

							{announcementData && (
								<Gallery images={announcementData?.images} />
							)}
						</div>

						<div className="flex flex-col items-center w-full gap-4 px-4 py-8 rounded bg-grey-10 h-fit">
							{announcementData && (
								<div
									className={`rounded-full w-14 h-14 ${
										colorOptions[announcementData.user.color]
									} flex items-center justify-center`}
								>
									<p className="w-max text-grey-10 text-h4">
										{getUserAcronym(announcementData.user.name)}
									</p>
								</div>
							)}

							<h2 className="font-medium font-lexend text-h5">
								{announcementData?.user.name}
							</h2>

							<p className="font-inter text-grey-2">
								{announcementData?.user.description}
							</p>

							<Button
								type="button"
								variant="grey-0"
								onClick={() =>
									navigate(`/profile/${announcementData?.user.id}`)
								}
							>
								Ver todos os anúncios
							</Button>
						</div>
					</section>
				</div>

				<section className="flex flex-col w-full max-w-[1243px] gap-4 p-4 bg-grey-8 md:bg-[transparent]">
					{commentsData?.length! > 0 && (
						<div className="flex flex-col w-full gap-4 p-4 rounded bg-grey-10 h-fit md:w-2/3">
							<h2 className="font-medium font-lexend text-h5">Comentários</h2>

							<ul className="flex flex-col w-full gap-8">
								{commentsData?.map((comment) => (
									<Comment
										comment={comment}
										carOwnerId={announcementData?.user.id}
										key={comment.id}
									/>
								))}
							</ul>
						</div>
					)}

					<div className="flex flex-col w-full gap-4 p-4 rounded bg-grey-10 h-fit md:w-2/3">
						<div className="flex items-center gap-2">
							{user && (
								<div
									className={`rounded-full w-8 h-8 ${
										colorOptions[user.color]
									} flex items-center justify-center`}
								>
									<p className="font-medium w-max text-grey-10">
										{getUserAcronym(user?.name)}
									</p>
								</div>
							)}

							<h3 className="text-b1 text-grey-1">{user?.name}</h3>
						</div>

						<textarea
							onChange={(e) => setComment(e.target.value)}
							placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
							className="w-full h-32 p-2 border-2 rounded outline-none resize-none border-grey-6 focus:border-brand2 placeholder:text-b1"
						/>

						{user ? (
							<Button type="button" variant="brand-1" onClick={sendComment}>
								Comentar
							</Button>
						) : (
							<Button type="button" variant="disabled">
								Comentar
							</Button>
						)}

						<div className="flex flex-wrap w-full gap-4">
							<Button
								type="button"
								variant="grey-6"
								fullRounded
								onClick={() => suggestions("Gostei muito!")}
							>
								Gostei muito!
							</Button>
							<Button
								type="button"
								variant="grey-6"
								fullRounded
								onClick={() => suggestions("Incrível!")}
							>
								Incrível!
							</Button>
							<Button
								type="button"
								variant="grey-6"
								fullRounded
								onClick={() => suggestions("Recomendarei para meus amigos!")}
							>
								Recomendarei para meus amigos!
							</Button>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default Product;
