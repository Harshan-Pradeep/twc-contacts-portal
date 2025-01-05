import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { contactService } from '../services/contactService';
import { ContactFormData } from '../types/contact.types';
import { contactSchema } from '../utils/validations/contact.schema';
import AlertError from '../components/common/AlertError';
import AlertSuccess from '../components/common/AlertSuccess';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import RadioGroup from '../components/common/RadioGroup';
import Logo from '../assets/secondaryLogo.png';
import LogoutIcon from '../assets/bx_log-out-circle.svg';
import { GENDER_OPTIONS } from '../types/gender.enum';

const REDIRECT_DELAY = 2;

const AddContact = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    
    const [submission, setSubmission] = useState({
        isSuccess: false,
        error: '',
        countdown: REDIRECT_DELAY
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    useEffect(() => {
        let timer: number;
        if (submission.isSuccess && submission.countdown > 0) {
            timer = window.setTimeout(() => {
                setSubmission(prev => ({
                    ...prev,
                    countdown: prev.countdown - 1
                }));
            }, 1000);
        } else if (submission.isSuccess && submission.countdown === 0) {
            navigate('/contacts');
        }
        return () => clearTimeout(timer);
    }, [submission.isSuccess, submission.countdown, navigate]);

    const onSubmit = async (data: ContactFormData) => {
        try {
            await contactService.createContact(data);
            setSubmission({
                isSuccess: true,
                error: '',
                countdown: REDIRECT_DELAY
            });
        } catch (err: any) {
            setSubmission(prev => ({
                ...prev,
                error: err.response?.data?.message || 'Failed to add contact'
            }));
        }
    };

    const alertContainerClasses = "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto";

    return (
        <main className="background_home min-h-screen flex flex-col">
            <div className={alertContainerClasses}>
                {submission.isSuccess && (
                    <AlertSuccess
                        message="Contact added successfully!"
                        subMessage={`Redirecting to contacts in ${submission.countdown} seconds...`}
                    />
                )}
            </div>
            <div className={alertContainerClasses}>
                {submission.error && <AlertError message={submission.error} />}
            </div>

            <div className="w-full px-[204px]">
                <img src={Logo} alt="Logo" className="w-[138px] h-[91px] mt-[72px]" />
                <h2 className="mb-6 lg:my-[23px] text-slate-50 md:text-5xl font-bold leading-8 font-FutuBold">
                    New Contact
                </h2>
            </div>

            <div className="w-full max-w-[1050px] px-4 mx-auto mt-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                id="fullName"
                                label="Full Name"
                                type="text"
                                error={errors.fullName?.message}
                                register={register}
                                name="fullName"
                            />
                            <Input
                                id="email"
                                label="Email"
                                type="email"
                                error={errors.email?.message}
                                register={register}
                                name="email"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                id="phoneNumber"
                                label="Phone Number"
                                type="tel"
                                error={errors.phoneNumber?.message}
                                register={register}
                                name="phoneNumber"
                            />
                            <div className="flex items-center gap-5 text-white text-[25px]">
                                <label>Gender</label>
                                <RadioGroup
                                    name="gender"
                                    options={GENDER_OPTIONS}
                                    error={errors.gender?.message}
                                    register={register} label={''}                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            loadingText="Adding..."
                            className="h-[50px] px-6 text-[25px] font-[400] leading-[50px] text-white bg-transparent hover:bg-transparent font-FutuLight rounded-full border border-white"
                            disabled={submission.isSuccess}
                        >
                            Add Contact
                        </Button>
                    </div>
                </form>
            </div>

            <button 
                onClick={() => {
                    logout();
                    navigate('/login');
                }}
                className="absolute bottom-4 right-4 flex items-center gap-5 px-4 py-2 text-white rounded"
            >
                <img src={LogoutIcon} alt="Logout" />
                <span className="font-FutuBold text-[25px] font-[400] leading-[73px] underline">
                    Logout
                </span>
            </button>
        </main>
    );
};

export default AddContact;