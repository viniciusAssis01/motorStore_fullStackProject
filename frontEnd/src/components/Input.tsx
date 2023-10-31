import { UseFormRegisterReturn } from "react-hook-form";

interface iInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  type: string
}

export const Input = ({ id, label, register, error, type, ...inputProps }: iInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium text-b1 text-grey-1">{label}</label>
      <input type={type} id={id} {...register} {...inputProps} className="w-full p-2 border-2 rounded outline-none text-b0 border-grey-6 focus:border-brand2" />
      {error && <span className="text-alert-1 text-b1">{error}</span>}
    </div>
  )
}

interface iSelectProps extends React.HTMLProps<HTMLSelectElement> {
  id: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  array: string[];
  needType?: boolean;
  value?: string;
}

export const Select = ({
  id,
  label,
  placeholder,
  register,
  error,
  array,
  needType,
  ...selectProps
}: iSelectProps) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label className="font-medium text-b1 text-grey-1" htmlFor={id}>
        {label}
      </label>
    )}
    <select
      className="w-full p-2 border-2 rounded outline-none border-grey-6 focus:border-brand2"
      id={id}
      {...register}
      {...selectProps}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {array.map((item, i) =>
        typeof item !== "string" ? (
          <option key={item} value={item}>
            {item} {needType && `(${item})`}
          </option>
        ) : (
          <option value={item} key={i}>
            {item}
          </option>
        ),
      )}
    </select>
    {error && <span className="text-alert-1 text-b1">{error}</span>}
  </div>
);

interface iTextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export const TextArea = ({
  id,
  label,
  register,
  error,
  ...textArea
}: iTextAreaProps) => (
  <div className="flex flex-col gap-2">
    <label className="font-medium text-b1 text-grey-1" htmlFor={id}>
      {label}
    </label>

    <textarea
      className="w-full p-2 border-2 rounded outline-none resize-none border-grey-6 focus:border-brand2"
      id={id}
      {...register}
      {...textArea}
    />

    {error && <span className="text-alert-1 text-b1">{error}</span>}
  </div>
);

