import { AiOutlineClose } from "react-icons/ai";
import { useModal } from "../contexts/modalContext";

export const Modal = () => {
  const { modal, closeModal } = useModal();

  if (!modal.isOpen) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full min-h-screen mb-20 overflow-y-auto bg-grey-0 bg-opacity-40 md:p-4">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded w-[512px] mb-20 max-w-full">
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="font-medium font-lexend">{modal.data?.title}</h2>

          <button onClick={closeModal} className="text-grey-4 text-h5">
            <AiOutlineClose />
          </button>
        </div>

        {modal.data?.content && modal.data.content}
      </div>
    </div>
  )
};
