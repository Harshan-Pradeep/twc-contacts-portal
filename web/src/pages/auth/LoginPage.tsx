import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../../utils/validations/auth.schema";
import AlertError from "../../components/common/AlertError";
import { authService } from "../../services/authService";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Logo from '../../assets/mainLogo.png';
import GoogleButton from "../../components/common/GoogleButton";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string>('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useGoogleAuth();



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);

      if (response.data) {
        setLoginError('');
        login({ email: data.email });
        navigate('/contacts');
      }
    } catch (err: any) {
      if (err.response) {
        setLoginError(err.response.data.message || 'Login failed');
      } else if (err.request) {
        setLoginError('No response from server. Please try again.');
      } else {
        setLoginError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    authService.googleLogin();
};

  return (
    // <div className="background_login">
    //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //         <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
    //             <div>
    //                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //                     Sign in to your account
    //                 </h2>
    //             </div>

    //             {loginError && <AlertError message={loginError} />}

    //             <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //                 <div className="rounded-md shadow-sm space-y-4">
    //                     <Input
    //                         id="email"
    //                         label="Email address"
    //                         type="email"
    //                         error={errors.email?.message}
    //                         register={register}
    //                         name="email"
    //                     />

    //                     <Input
    //                         id="password"
    //                         label="Password"
    //                         type="password"
    //                         error={errors.password?.message}
    //                         register={register}
    //                         name="password"
    //                     />
    //                 </div>

    //                 <div>
    //                     <Button
    //                         type="submit"
    //                         isLoading={isSubmitting}
    //                         loadingText="Login account..."
    //                     >
    //                         Login
    //                     </Button>
    //                 </div>

    //                 <div className="text-center text-sm mt-4">
    //                     <span className="text-gray-600">Don't have an account? </span>
    //                     <Link
    //                         to="/register"
    //                         className="font-medium text-indigo-600 hover:text-indigo-500"
    //                     >
    //                         Sign up
    //                     </Link>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // </div>
    <main className="background_login">
      <section className="min-h-screen flex flex-col lg:flex-row">
        <div className="bg-eclipce bg-cover bg-left bg-no-repeat lg:w-3/5 grid content-center pl-[122px] shrink-0 grow-1">
          <div className="font-FutuBold flex h-[487px] w-[477px] flex-col gap-[38px] text-left">
            <div className="h-[157px] w-[253px] flex-grow leading-none text-white">
              <h2 className="font-FutuBold text-[50px] font-bold leading-[73px]">
                Hi there,
              </h2>
              <p className="font-FutuLight text-[35px] font-medium leading-[55px]">
                Welcome to our
                contacts portal
              </p>
            </div>

            {loginError && <AlertError message={loginError} />}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <div className="flex flex-col gap-[38px]">
                <Input
                  id="email"
                  label="Email address"
                  type="email"
                  error={errors.email?.message}
                  register={register}
                  name="email"
                />

                <Input
                  id="password"
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  register={register}
                  name="password"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <div className="flex h-12 w-[131px] items-center justify-center rounded-[50px] px-2.5 py-0 [box-shadow:0px_0px_0px_1px_white_inset]">
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      loadingText="Login..."
                      className="h-[50px] w-[58px] text-[25px] leading-[50px] text-white bg-transparent hover:bg-transparent"
                    >
                      login
                    </Button>
                  </div>
                  <p className="text-white pl-4">or</p>
                  <Link to="/register">
                    <p className="text-white underline underline-offset-4 px-4 font-FutuLight text-[20px]">
                      Click here to Register
                    </p>
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 h-[1px] bg-white"></div>
                  <p className="text-white font-FutuLight">or continue with</p>
                  <div className="w-32 h-[1px] bg-white"></div>
                </div>

                <GoogleButton
                  onClick={handleGoogleLogin}
                  isLoading={isGoogleLoading}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-2/5 order-first lg:order-2 flex shrink-1 justify-center items-center pt-56">
          <img src={Logo} alt="Logo" />
        </div>
      </section>
    </main>


  );
}

export default LoginPage;