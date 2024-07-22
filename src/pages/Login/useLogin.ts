import { useMutation } from '@apollo/client';
import { notification } from 'antd';
import { LOGIN } from 'graphql/auth/login';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    updateStatusLogin,
    updateStatusLoginForMerchant,
} from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';

export const useLogin = () => {
    const [onLogin] = useMutation(LOGIN);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        setLoading(true);
        onLogin({
            variables: {
                username,
                password,
            },
        })
            .then((res) => {
                localStorage.setItem(
                    'token',
                    res.data.generateMerchantToken.token,
                );
                if (
                    res.data.generateMerchantToken.account_type === 'merchant'
                ) {
                    dispatch(updateStatusLoginForMerchant());
                } else {
                    dispatch(updateStatusLogin());
                }

                navigate(BASE_ROUTER.HOME);
            })
            .catch((err) => {
                notification.open({
                    message: 'Login Failed',
                    description: err.message,
                    type: 'error',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return {
        handleLogin,
        loading,
    };
};
