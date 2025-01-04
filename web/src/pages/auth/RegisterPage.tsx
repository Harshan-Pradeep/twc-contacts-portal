import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import Input from '../../components/common/Input';
import AlertError from '../../components/common/AlertError';
import AlertSuccess from '../../components/common/AlertSuccess';
import Button from '../../components/common/Button';
import { registerSchema, type RegisterFormData } from '../../utils/validations/auth.schema';
import Logo from '../../assets/mainLogo.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    let timer: number;
    if (isSuccess && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isSuccess && countdown === 0) {
      navigate('/login');
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authService.register({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      setRegisterError('');
      setIsSuccess(true);
    } catch (err: any) {
      if (err.response) {
        setRegisterError(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        setRegisterError('No response from server. Please try again.');
      } else {
        setRegisterError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <main className="background_login">
      <section className="min-h-screen flex flex-col lg:flex-row">
        <div className="bg-eclipce bg-cover bg-left bg-no-repeat lg:w-3/5 grid content-center pl-[122px] shrink-0 grow-1">
          <div className="font-FutuBold flex h-[487px] w-[477px] flex-col gap-[38px] text-left">
            <div className="h-[157px] w-[253px] flex-grow leading-none text-white">
              <h2 className="font-FutuBold text-[50px] font-bold whitespace-nowrap">Register Now!</h2>
            </div>

            {registerError && <AlertError message={registerError} />}

            {isSuccess && (
              <AlertSuccess
                message="Registration successful!"
                subMessage={`Redirecting to login in ${countdown} seconds...`}
              />
            )}

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

                <Input
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  error={errors.confirmPassword?.message}
                  register={register}
                  name="confirmPassword"
                />
              </div>

              <div className="flex items-center">
                <div className="flex h-12 w-[131px] items-center justify-center rounded-[50px] px-2.5 py-0 [box-shadow:0px_0px_0px_1px_white_inset]">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Creating account..."
                    disabled={isSuccess}
                    className="h-[50px] w-[58px] text-[25px] leading-[50px] text-white bg-transparent hover:bg-transparent text-center flex justify-center items-center"
                  >
                    Register
                  </Button>
                </div>
              </div>
              <div className="text-white mt-10">
                <Link to="/login" className="text-white underline underline-offset-4 font-FutuLight text-[20px] flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to login
                </Link>
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
};

export default RegisterPage;