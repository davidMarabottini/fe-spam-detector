import type { InputProps } from "./Input.types";
import style from "./Input.module.scss";

const Input = ({value, onChange, placeholder, type = "text"}: InputProps) => {
  return (
    <input
      className={style['c-input']}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default Input;
