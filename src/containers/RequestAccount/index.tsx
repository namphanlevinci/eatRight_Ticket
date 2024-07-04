import { DarkLayout } from 'layouts/DarkLayout';
import LoginLayout from 'layouts/LoginLayout';
import { RequestAccountPage } from 'pages/RequestAccount';

export const RequestAccountContainer = () => {
    return (
        <DarkLayout>
            <LoginLayout>
                <RequestAccountPage />
            </LoginLayout>
        </DarkLayout>
    );
};

export default RequestAccountContainer;
