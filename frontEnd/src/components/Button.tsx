interface iButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: "submit" | "button" | "reset";
  fullWidth?: boolean;
  fullRounded?: boolean;
  variant:
  "grey-0" |
  "grey-6" |
  "brand-1" |
  "brand-op" |
  "outline-1" |
  "outline-2" |
  "outline-brand" |
  "alert" |
  "success" |
  "disabled"
}

const Button = ({ children, type, fullWidth, fullRounded, variant, ...rest }: iButtonProps) => {

  const variantStyles = {
    "grey-0": "bg-grey-0 text-white hover:bg-grey-1",
    "grey-6": "bg-grey-6 text-grey-2 hover:bg-grey-5",
    "brand-1": "bg-brand1 text-white hover:bg-brand2",
    "brand-op": "bg-brand4 text-brand1",
    "outline-1": "border border-grey-0 hover:bg-grey-1 hover:border-grey-1 hover:text-white",
    "outline-2": "border border-grey-4 hover:bg-grey-1 hover:border-grey-1 hover:text-white",
    "outline-brand": "border border-brand-1 text-brand1 hover:bg-brand4",
    "alert": "bg-alert-3 text-alert-1 hover:bg-alert-2",
    "success": "bg-success-3 text-success-1 hover:bg-success-2",
    "disabled": "bg-brand3 text-white cursor-default"
  };

  return (
    <button {...rest} type={type} className={`${fullWidth ? "w-full" : "w-fit"} p-2 ${fullRounded ? "rounded-full" : "rounded"} ${variantStyles[variant]} text-b1 font-medium transition-colors duration-300  md:text-b0`}>
      {children}
    </button>
  );
};

export default Button;
