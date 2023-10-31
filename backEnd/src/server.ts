import { app } from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
	.then(() => {
		const PORT: number = Number(process.env.PORT) || 3000;

		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => console.error(err));
