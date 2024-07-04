import { DarkLayout } from 'layouts/DarkLayout';
import LoginLayout from 'layouts/LoginLayout';
import { ForgotPasswordPage } from 'pages/ForgotPassword';

export const LoginContainer = () => {
    return (
        <DarkLayout>
            <LoginLayout>
                <ForgotPasswordPage />
            </LoginLayout>
        </DarkLayout>
    );
};

export default LoginContainer;
