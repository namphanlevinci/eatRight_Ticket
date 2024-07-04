/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import './index.css';
import { Text } from 'components/atom/Text';
import { Colors } from 'themes/colors';
const ButtonAddToCart = ({ onClick }: { onClick: any }) => {
    const [bulletFired, setBulletFired] = useState(false);

    const handleTankClick = () => {
        if (!bulletFired) {
            // Bắn đạn khi xe tăng được bấm
            setBulletFired(true);

            // Sau khoảng thời gian ngắn, đặt lại trạng thái đạn để có thể bắn lại
            setTimeout(() => {
                setBulletFired(false);
            }, 500);
        }
    };

    return (
        <>
            {bulletFired && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 56,
                        background: Colors.primary,
                        marginTop: 20,
                        borderRadius: 8,
                        cursor: 'pointer',
                    }}
                    className="bullet"
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: Colors.black,
                        }}
                    >
                        Add to cart
                    </Text>
                </div>
            )}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 56,
                    background: Colors.primary,
                    marginTop: 20,
                    borderRadius: 8,
                    cursor: 'pointer',
                }}
                onClick={() => {
                    onClick();
                    handleTankClick();
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: Colors.black,
                    }}
                >
                    Add to cart
                </Text>
            </div>
        </>
    );
};

export default ButtonAddToCart;
