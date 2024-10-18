import React from 'react';
import { CustomButton } from './components/CustomerButton';
import icon_plus from './icons/icon_plus.svg';
import { useNavigate } from 'react-router';
import './index.scss';
import RenderList from './components/RenderList';
import { BASE_ROUTER } from 'constants/router';
export default function KitchenStationPage() {
    const navigation = useNavigate();
    return (
        <div
            style={{
                paddingInline: 16,
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButton
                    style={{ marginLeft: 16 }}
                    leftIcon={icon_plus}
                    title="New Station"
                    onClick={() =>
                        navigation(
                            BASE_ROUTER.RESTAURENT_KITCHEN_STATION_DETAIL,
                        )
                    }
                />
            </div>
            <RenderList />
        </div>
    );
}
