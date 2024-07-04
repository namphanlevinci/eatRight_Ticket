import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';

export const Page404: React.FC = () => {
    const navigation = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button
                    type="primary"
                    onClick={() => navigation(BASE_ROUTER.HOME)}
                >
                    Back Home
                </Button>
            }
        />
    );
};
