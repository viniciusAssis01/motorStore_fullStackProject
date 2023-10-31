import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "../contexts/modalContext";
import { Input, Select, TextArea } from "./Input";
import { z } from "zod";
import { useAuth } from "../contexts/authContext";
import { api } from "../lib/axios";
import Button from "./Button";
import { useState } from "react";

interface iPropsCreateAnouncement {
  fetchData: () => void;
}

interface iAnnouncementData {
  id: string,
  brand: string,
  model: string,
  color: string,
  coverImage: string,
  description: string,
  fipeTablePrice: string,
  fuel: string,
  images: [{
    image_url: string
  }],
  mileage: number,
  price: number
  year: number,
}

interface iImages {
  image_url: string;
}

export const FormCreateAnnouncement = ({ fetchData }: iPropsCreateAnouncement) => {
  const { closeModal } = useModal();
  const { token } = useAuth()

  const fuels = ["gasolina", "etanol", "flex", "eletrico", "híbrido",]

  const [inputImage, setInputImage] = useState<iImages[]>([{ image_url: "" }, { image_url: "" }]);
  const [images, setImages] = useState<Record<string, string>[]>([])

  const addInputImage = () => {
    if (inputImage.length < 6) {
      setInputImage([...inputImage, { image_url: "" }]);
      setImages([...images, { image_url: "" }])
    }
  };

  const schema = z.object({
    brand: z.string().max(45).min(1),
    model: z.string().max(120).min(1),
    year: z.string().min(1).transform((val) => +val),
    fuel: z.string().min(1),
    mileage: z.string().transform((val) => +val),
    color: z.string().max(45).min(1),
    fipeTablePrice: z.string(),
    price: z.string().min(1).transform((val) => +val),
    description: z.string().min(1),
    coverImage: z.string().min(1),
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<iAnnouncementData>({
    resolver: zodResolver(schema)
  });

  const createAnnouncement = async (data: iAnnouncementData) => {
    const filteredImages = images.filter((image) => image);
    const formatedData = {
      ...data,
      images: filteredImages
    };

    const headers = { Authorization: `Bearer ${token}` };
    await api.post(`/announcements`, formatedData, { headers })
      .then(() => {
        fetchData()
        closeModal();
      })
      .catch((err) => console.log(err));
  };



  return (
    <form onSubmit={handleSubmit(createAnnouncement)}>
      <div className="flex flex-col gap-4 px-5 mt-4">
        <h3 className="font-medium text-b1 text-grey-1">Infrmações do Veículo</h3>
        <Input
          id="brand"
          label="Marca"
          type="text"
          register={register("brand")}
          placeholder="Chevrolet"
          error={errors.brand?.message}
        />
        <Input
          id="model"
          label="Modelo"
          type="text"
          register={register("model")}
          placeholder="camaro ss 6.2 v8 16v"
          error={errors.model?.message}
        />
        <div className="flex flex-wrap justify-between gap-4">
          <Input
            id="year"
            label="Ano"
            type="number"
            register={register("year")}
            placeholder="2018"
            error={errors.year?.message}
          />
          <Select
            id="fuel"
            label="Combustível"
            type="text"
            array={fuels}
            register={register("fuel")}
            placeholder="Gasolina/Etanol"
            error={errors.brand?.message}
          />
          <Input
            id="mileage"
            label="Quilometragem"
            type="number"
            register={register("mileage")}
            placeholder="30.000"
            error={errors.mileage?.message}
          />
          <Input
            id="color"
            label="Cor"
            type="text"
            register={register("color")}
            placeholder="Branco"
            error={errors.color?.message}
          />
          <Input
            id="fipeTablePrice"
            label="Preço tabela FIPE"
            type="text"
            register={register("fipeTablePrice")}
            placeholder="R$ 48.000,00"
            error={errors.fipeTablePrice?.message}
          />
          <Input
            id="price"
            label="Preço"
            type="number"
            register={register("price")}
            placeholder="R$ 50.000,00"
            error={errors.price?.message}
          />
        </div>
        <TextArea
          id="description"
          label="Descrição"
          type="text"
          register={register("description")}
          placeholder="Descrição do carro"
          error={errors.description?.message}
        />
        <Input
          id="coverImage"
          label="Imagem de capa"
          type="text"
          register={register("coverImage")}
          placeholder="https://image.com"
          error={errors.coverImage?.message}
        />
        {
          inputImage.map((input, i) => {
            return (
              <input
                className="w-full p-2 border-2 rounded outline-none text-b0 border-grey-6 focus:border-brand2"
                key={i}
                id={`image ${input}`}
                type="text"
                placeholder={"https://image.com"}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[i] = { image_url: e.target.value };
                  setImages(newImages);
                }}
              />
            )
          })
        }
        <Button onClick={() => addInputImage()} type="button" variant="brand-1">
          Adicionar mais imagens
        </Button>

      </div>
      <div className="flex justify-end w-full gap-3 pr-6 my-6">
        <Button onClick={() => closeModal()} type="button" variant="grey-6">
          Cancelar
        </Button>
        <Button type="submit" variant="brand-1">
          Criar Anuncio
        </Button>
      </div>
    </form>
  )
}
