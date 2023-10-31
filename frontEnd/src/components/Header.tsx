import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import logo from "../assets/LogoHeader.svg"
import { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import FormUserUpdate from "./FormUserUpdate";
import { useModal } from "../contexts/modalContext";
import FormAddressUpdate from "./FormAddressUpdate";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const { user, logOut } = useAuth()
  const { setModal } = useModal();

  return (
    <>
      <header className="fixed top-0 left-0 bg-grey-10 z-40 flex flex-col items-center justify-center h-20 min-h-20 w-full md:flex-row">
        <div className="relative flex items-center justify-between w-full h-20 px-4 border-b-2 border-grey-4">
          <Link to={"/"}>
            <img src={logo} alt="Logo Motors Shop" />
          </Link>
          <div className="md:hidden h-fit text-h3">
            {!isOpen && <GiHamburgerMenu onClick={() => setIsOpen(true)} />}
            {isOpen && <GrFormClose onClick={() => setIsOpen(false)} />}
          </div>
        </div>
        <div className="hidden w-fit md:flex ">
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {isOpen &&
          <>
            <div className="md:hidden h-fit">
              <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            {user &&
              <ul className="fixed flex flex-col gap-2 max-md:border-r-2 max-md: md:border-l-2 border-b-2 top-[164px] border-grey-4 max-md:left-0 md:right-0 w-48 p-4 bg-grey-10 z-20 md:top-[77px] md:min-w-[280px] md:w-[306px] md:cursor-pointer ">
                <li onClick={() => {
                  return (
                    setModal({ isOpen: true, data: { title: "Editar usuário", content: <FormUserUpdate /> } }),
                    setIsOpen(false)
                  );
                }}>Editar Perfil</li>
                <li onClick={() => {
                  return (
                    setModal({ isOpen: true, data: { title: "Editar endereço", content: <FormAddressUpdate /> } }),
                    setIsOpen(false)
                  );
                }}>Editar Endereço</li>
                {user?.accountType === "anunciante" &&
                  <li onClick={() => navigate(`/profile/${user.id}`)}>Meus Anúncios</li>
                }
                <li onClick={() => logOut()}>Sair</li>
              </ul>
            }
          </>
        }
      </header >
    </>
  )
}

export default Header