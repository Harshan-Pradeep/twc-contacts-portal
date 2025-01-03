// import React from 'react';
// import { UseFormRegister } from 'react-hook-form';

// interface InputProps {
//   id: string;
//   label: string;
//   type: string;
//   error?: string;
//   register: UseFormRegister<any>;
//   name: string;
// }

// const Input = ({ id, label, type, error, register, name }: InputProps) => {
//   return (
//     <div className="flex flex-col gap-[38px] font-FutuLight text-[25px] text-[#083F46]">
//       <input
//         id={id}
//         type={type}
//         {...register(name)}
//         className="input-field"
//       />
//       {error && (
//         <p className="mt-1 text-sm text-red-600">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Input;

import React from 'react';
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
        className="input-field font-FutuLight text-[25px] text-[#083F46]"
      />
      {error && (
        <p className="text-white text-sm mx-10">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;