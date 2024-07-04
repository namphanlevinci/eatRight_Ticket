import { DarkLayout } from 'layouts/DarkLayout';
import LoginLayout from 'layouts/LoginLayout';
import { LoginPage } from 'pages/Login';

export const LoginContainer = () => {
    return (
        <DarkLayout>
            <LoginLayout>
                <LoginPage />
            </LoginLayout>
        </DarkLayout>
    );
};

export default LoginContainer;
