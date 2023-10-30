import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/authContext";
import { useModal } from "../contexts/modalContext";
import { iComments } from "../pages/Product";
import { calcTimePassed } from "../utils/calcTimePassed";
import { getUserAcronym } from "../utils/getUserAcronym";
import { colorOptions } from "../utils/randomColors";
import { z } from "zod";

import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { TextArea } from "./Input";

interface iComment {
	comment: string;
}

interface iCommentProps {
	comment: iComments;
	carOwnerId: string | undefined;
}

export const Comment = ({ comment, carOwnerId }: iCommentProps) => {
	const { user } = useAuth();
	const { setModal } = useModal();

	const schema = z.object({
		comment: z.string().optional(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<iComment>({
		resolver: zodResolver(schema),
	});

	const commentUser = {
		id: "f26a4bee-00c8-400f-9fda-4e76faecf901",
		name: "Juninho",
		color: "random-1",
	};

	const isCommentOwner = user?.id === comment.user.id;
	const isCarOwner = user?.id === carOwnerId;

	const openEditModal = () => {
		setModal({
			isOpen: true,
			data: {
				title: "Editar comentário",
				content: (
					<div className="flex flex-col gap-4 p-6">
						<TextArea
							id="comment"
							label="Comentário"
							register={register("comment")}
							placeholder="Digitar descrição"
							defaultValue={comment.comment}
							error={errors.comment?.message}
						/>

						{/* <Button
              onClick={() => {
                navigate("/login");
                closeModal();
              }}
              type="button"
              variant="brand-1"
            >
              Ir para o login
            </Button> */}
					</div>
				),
			},
		});
	};

	const openDeleteModal = () => {};

	return (
		<li>
			<div className="flex flex-col w-full gap-4">
				<div className="flex items-center gap-2">
					<div className="flex w-full gap-2">
						<div
							className={`rounded-full w-8 h-8 flex items-center justify-center ${
								colorOptions[commentUser.color!]
							}`}
						>
							<p className="font-medium w-max text-grey-10">
								{getUserAcronym(commentUser.name!)}
							</p>
						</div>

						<div className="flex items-center gap-2">
							<h3 className="text-b1 text-grey-1">{commentUser.name}</h3>

							<p className="text-grey-3">•</p>

							<p className="text-[12px] text-grey-3">
								{calcTimePassed(comment.createdAt)}
							</p>
						</div>
					</div>

					<div className="flex gap-4">
						{isCommentOwner && (
							<button type="button" onClick={openEditModal}>
								<AiFillEdit />
							</button>
						)}
						{(isCommentOwner || isCarOwner) && (
							<button type="button" onClick={openDeleteModal}>
								<AiOutlineDelete />
							</button>
						)}
					</div>
				</div>

				<p className="font-inter text-grey-2 text-b1">{comment.comment}</p>
			</div>
		</li>
	);
};
