import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import AlertError from '../components/common/AlertError';
import AlertSuccess from '../components/common/AlertSuccess';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import RadioGroup from '../components/common/RadioGroup';
import { contactService } from '../services/contactService';
import { ContactFormData } from '../types/contact.types';
import { contactSchema } from '../utils/validations/contact.schema';
import Logo from '../assets/secondaryLogo.png';
import LogoutIcon from '../assets/bx_log-out-circle.svg';
import { useAuth } from '../context/AuthContext';

const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
];

const AddContact = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string>('');
    const [countdown, setCountdown] = useState(2);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    useEffect(() => {
        let timer: number;
        if (isSuccess && countdown > 0) {
            timer = window.setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (isSuccess && countdown === 0) {
            navigate('/contacts');
        }
        return () => clearTimeout(timer);
    }, [isSuccess, countdown, navigate]);

    const onSubmit = async (data: ContactFormData) => {
        try {
            await contactService.createContact(data);
            setError('');
            setIsSuccess(true);
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || 'Failed to add contact');
            } else {
                setError('An error occurred while adding the contact');
            }
        }
    };

    return (
        <main className="background_home min-h-screen overflow-hidden">
            <img src={Logo} className="w-[138px] h-[91px] mt-[72px] ml-[204px]" />
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Add New Contact</h2>
                    {isSuccess && (
                        <AlertSuccess
                            message="Contact added successfully!"
                            subMessage={`Redirecting to contacts in ${countdown} seconds...`}
                        />
                    )}
                </div>

                {error && <AlertError message={error} />}

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
                                    label=""
                                    name="gender"
                                    options={genderOptions}
                                    error={errors.gender?.message}
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>

                    <div >
                        {/* <Button
                            type="button"
                            onClick={() => navigate('/contacts')}
                            className="h-[50px] px-6 text-[25px] font-[400] leading-[50px] text-white bg-transparent hover:bg-transparent font-FutuLight rounded-full border border-white"
                            disabled={isSuccess}
                        >
                            Cancel
                        </Button> */}
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            loadingText="Adding..."
                            className="h-[50px] px-6 text-[25px] font-[400] leading-[50px] text-white bg-transparent hover:bg-transparent font-FutuLight rounded-full border border-white"
                            disabled={isSuccess}
                        >
                            Add Contact
                        </Button>
                    </div>

                    {isSuccess && (
                        <div className="text-center">
                            <button
                                onClick={() => navigate('/contacts')}
                                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                            >
                                Go to contacts now
                            </button>
                        </div>
                    )}
                </form>
            </div>
            <div className="absolute bottom-4 right-4">
                <button onClick={handleLogout} className="flex items-center gap-5 px-4 py-2 text-white rounded">
                    <img src={LogoutIcon} alt="Logout" />
                    <span className="font-FutuBold text-[25px] font-[400] leading-[73px] underline">
                        Logout
                    </span>
                </button>
            </div>
        </main>
    );
};

export default AddContact;