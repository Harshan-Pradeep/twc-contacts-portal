import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/secondaryLogo.png';
import LogoutIcon from '../assets/bx_log-out-circle.svg';

const buttonBaseClasses = "text-white bg-transparent hover:bg-transparent font-FutuLight";

const HomePage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <main className="background_home min-h-screen">
            <section className="h-screen flex flex-col">
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-[138px] h-[91px] mt-[72px] ml-[204px]"
                />

                <div className="grow px-[204px] flex justify-center">
                    <div className="text-left text-white">
                        <div className="py-12">
                            <p className="inline font-FutuBold text-[50px] font-[700] leading-[73px]">
                                Welcome,<br />
                            </p>
                            <p className="inline font-FutuLight text-[35px] font-[400] leading-[55px]">
                                This is where your contacts will live. Click the button below to add a new contact.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/contacts/new')}
                            className={`${buttonBaseClasses} h-[50px] px-6 text-[25px] font-[400] leading-[50px] rounded-full border border-white`}
                        >
                            add your first contact
                        </button>
                    </div>
                </div>
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="flex items-center gap-5 px-4 py-2 text-white rounded"
                    >
                        <img src={LogoutIcon} alt="Logout" />
                        <span className="font-FutuBold text-[25px] font-[400] leading-[73px] underline">
                            Logout
                        </span>
                    </button>
                </div>
            </section>
        </main>
    );
};

export default HomePage;