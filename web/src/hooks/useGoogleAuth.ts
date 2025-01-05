import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useGoogleAuth = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isFromGoogle = searchParams.has('fromGoogle');

    return useQuery({
        queryKey: ['googleAuth'],
        queryFn: async () => {
            const response = await authService.getCurrentUser();
            if (response.data) {
                login({ email: response.data.email });
                navigate('/contacts');
            }
            return response;
        },
        enabled: isFromGoogle,
        retry: false,
        staleTime: Infinity,
    });
};