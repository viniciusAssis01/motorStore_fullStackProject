import { useNavigate } from "react-router-dom"
import { iAnnouncements } from "../interfaces/announcements"
import Button from "./Button"
import { getUserAcronym } from "../utils/getUserAcronym"
import { colorOptions } from "../utils/randomColors"
import { FormUpdateAnnouncement } from "./FormAnnouncementUpdate"
import { useModal } from "../contexts/modalContext"

interface iCardProps {
  car: iAnnouncements
  owner?: boolean
  userColor?: string,
  userName?: string
  idUser?: string,
  idEndPoint?: string
  fetchData?: () => void
}

const Card = ({ car, owner, userColor, userName, idUser, idEndPoint, fetchData }: iCardProps) => {
  const { setModal } = useModal();
  const navigate = useNavigate();

  const price = car.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  const userStaticName = userName || car.user.name;

  return (
    <li className="min-w-[262px] cursor-pointer">
      <div className="relative">
        <img src={car.coverImage} alt="carro" className="bg-grey-6 border-2 border-grey-6 h-[150px] rounded transition-colors duration-200 hover:border-brand1 w-full" onClick={() => navigate(`/product/${car.id}`)} />
        <span className="absolute hidden px-1 text-sm font-medium font-inter top-2 left-2 bg-brand1 text-grey-5">Ativo</span>
      </div>
      <div className="flex flex-col gap-3 px-1">
        <h2 className="font-bold truncate font-sm font-lexend">{car.brand}</h2>
        <p className="text-sm line-clamp-2 text-grey-2 font-inter">{car.description}</p>
        {car.user &&
          <div className="flex gap-1" onClick={() => navigate(`/profile/${car.user.id}`)}>
            <span className={`w-6 h-6 text-[12px] flex items-center justify-center rounded-full ${colorOptions[car.user.color]} text-grey-7 font-inter`}>{getUserAcronym(userStaticName)}</span><span className="text-sm font-medium text-grey-2 font-inter">{userName ?? car.user?.name}</span>
          </div>
        }
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-center rounded w-fit h-fit bg-brand4 text-brand1 font-inter">{car.mileage} KM</span>
            <span className="text-sm font-semibold text-center rounded w-fit h-fit bg-brand4 text-brand1 font-inter">{car.year}</span>
          </div>
          <span className="font-bold w-fit font-lexend">{price}</span>
        </div>
        <div className={(idUser && idEndPoint && idUser === idEndPoint) || (owner && (idUser === undefined || idEndPoint === undefined)) ? "flex w-10/12 gap-4" : "hidden w-10/12 gap-4"}>
          {fetchData && <Button type="button" variant="outline-1" onClick={() => setModal({ isOpen: true, data: { title: "Editar Anuncio", content: <FormUpdateAnnouncement fetchData={fetchData} car={car} /> } })}>Editar</Button>}
          <Button type="button" variant="outline-1" onClick={() => navigate(`/product/${car.id}`)} >Ver detalhes</Button>
        </div>
      </div>
    </li>
  )
}

export default Card
