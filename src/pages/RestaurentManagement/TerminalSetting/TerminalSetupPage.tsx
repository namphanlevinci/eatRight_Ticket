import React from 'react';
import { useNavigate } from 'react-router';
import './index.scss';
import RenderList from './components/RenderList';
import { BASE_ROUTER } from 'constants/router';
import { NewTerminal } from './components/NewTerminalBtn';
export default function TerminalSetupPage() {
    const navigation = useNavigate();
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
            }}
        >
            <RenderList />
            <NewTerminal
                onClick={() =>
                    navigation(BASE_ROUTER.RESTAURENT_TERMINAL_DETAIL)
                }
            />
        </div>
    );
}
