import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { api } from "../lib/axios";
import content from "../assets/Content.svg";
import { iAnnouncements } from "../interfaces/announcements";

const Home = () => {
	const [cars, setCars] = useState([]);

	const fetchData = async () => {
		await api
			.get("/announcements")
			.then((res) => setCars(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Header />
			<img src={content} alt="banner" className="w-full" />
			<main>
				<ul className="flex flex-wrap justify-center w-11/12 gap-4 mx-auto my-16 max-md:overflow-auto max-md:flex-nowrap max-md:justify-start">
					{cars.map((car: iAnnouncements) => (
						<Card car={car} key={car.id} owner={false} />
					))}
				</ul>
			</main>

			<Footer />
		</>
	);
};

export default Home;
