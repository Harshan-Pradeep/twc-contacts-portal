import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { authService } from "../../services/authService";
import { loginSchema, type LoginFormData } from "../../utils/validations/auth.schema";
import AlertError from "../../components/common/AlertError";
import AlertSuccess from "../../components/common/AlertSuccess";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import GoogleButton from "../../components/common/GoogleButton";
import Logo from '../../assets/mainLogo.png';

const REDIRECT_DELAY = 1500;

const alertContainerClass = "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto";
const buttonClass = "h-[50px] w-[58px] text-[25px] leading-[50px] text-white bg-transparent hover:bg-transparent";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useGoogleAuth();

  const [authState, setAuthState] = useState({
    error: '',
    isSuccess: false,
    isGoogleLoading: false
  });

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
        login({ email: data.email });
        setAuthState({ error: '', isSuccess: true, isGoogleLoading: false });

        setTimeout(() => {
          navigate('/contacts');
        }, REDIRECT_DELAY);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ||
        (err.request ? 'No response from server' : 'An error occurred');

      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        isSuccess: false
      }));
    }
  };

  const handleGoogleLogin = () => {
    setAuthState(prev => ({ ...prev, isGoogleLoading: true }));
    authService.googleLogin();
  };

  return (
    <main className="background_login">
      {authState.isSuccess && (
        <div className={alertContainerClass}>
          <AlertSuccess message="Welcome back! Login successful" />
        </div>
      )}

      <section className="min-h-screen flex flex-col lg:flex-row">
        <div className="bg-eclipce bg-cover bg-left bg-no-repeat lg:w-3/5 grid content-center pl-[122px] shrink-0 grow-1">
          <div className="font-FutuBold flex h-[487px] w-[477px] flex-col gap-[38px] text-left">
            <div className="h-[157px] w-[283px] flex-grow leading-none text-white">
              <h2 className="font-FutuBold text-[50px] font-bold leading-[73px]">
                Hi there,
              </h2>
              <p className="font-FutuLight text-[35px] font-medium leading-[55px] font-[400]">
                Welcome to our contacts portal
              </p>
            </div>

            {authState.error && <AlertError message={authState.error} />}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <div className="flex flex-col gap-[38px]">
                <Input
                  id="email"
                  label="e-mail"
                  type="email"
                  error={errors.email?.message}
                  register={register}
                  name="email"
                />
                <Input
                  id="password"
                  label="password"
                  type="password"
                  error={errors.password?.message}
                  register={register}
                  name="password"
                />
              </div>

              <div className="flex flex-col gap-4 mt-5">
                <div className="flex items-center">
                  <div className="flex h-12 w-[131px] items-center justify-center rounded-[50px] px-2.5 py-0 [box-shadow:0px_0px_0px_1px_white_inset]">
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      loadingText="Login..."
                      className={buttonClass}
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
                  isLoading={authState.isGoogleLoading}
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