import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type: string;
  error?: string;
  register: UseFormRegister<any>;
  name: string;
}

const Input = ({ id, label, type, error, register, name }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        id={id}
        type={type}
        {...register(name)}
        placeholder={label}
        className="input-field font-[Futura Md BT] font-[400] text-[25px] text-[#083F46] placeholder:text-[#083F46]"
      />
      {error && (
        <p className="text-red-500 text-sm mx-12">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;