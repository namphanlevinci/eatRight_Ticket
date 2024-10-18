import React from 'react';
import { CustomButton } from './components/CustomerButton';
import icon_plus from './icons/icon_plus.svg';
import { useNavigate } from 'react-router';
import './index.scss';
import RenderList from './components/RenderList';
import { BASE_ROUTER } from 'constants/router';
export default function TerminalSetupPage() {
    const navigation = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButton
                    style={{ marginLeft: 16 }}
                    leftIcon={icon_plus}
                    title="New Terminal"
                    onClick={() =>
                        navigation(BASE_ROUTER.RESTAURENT_TERMINAL_DETAIL)
                    }
                />
            </div>
            <RenderList />
        </div>
    );
}
