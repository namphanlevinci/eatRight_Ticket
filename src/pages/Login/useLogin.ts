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
    const [remember, setRemember] = useState(false);
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
                } else if (
                    res.data.generateMerchantToken.account_type === 'waiter'
                ) {
                    dispatch(updateStatusLogin());
                } else {
                    notification.open({
                        message: 'Login Failed',
                        description: 'Your account type is not valid',
                        type: 'error',
                    });
                    return;
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
                if (remember) {
                    localStorage.setItem('us-923', btoa(username));
                    localStorage.setItem('pw-155', btoa(password));
                } else {
                    localStorage.removeItem('us-923');
                    localStorage.removeItem('pw-155');
                }
            });
    };
    return {
        handleLogin,
        loading,
        remember,
        setRemember,
    };
};
