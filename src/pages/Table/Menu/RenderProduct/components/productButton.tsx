import { RadioSelected } from 'assets/icons/radioSelected';
import React from 'react';
import { BundleProductEnum } from '../RenderLeft';
import SquareIcon from 'assets/icons/square';
import SquareCheckIcon from 'assets/icons/square-check';

export default function ProductButton({
    children,
    backgroundColor,
    isSelected,
    type,
}: {
    children: React.ReactNode;
    backgroundColor: string;
    isSelected?: boolean;
    type?: string;
}) {
    const isCheckBox = type === BundleProductEnum.CHECK_BOX;
    const isRadio = type === BundleProductEnum.RADIO;
    const isDropDown = type === BundleProductEnum.DROP_DOWN;
    const RenderSelected = () => {
        return (
            <>
                <div
                    style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        background: 'black',
                        opacity: 0.3,
                    }}
                >
                    {' '}
                </div>
                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                    <RadioSelected />
                </div>
            </>
        );
    };
    const RenderCheckBox = ({ isSelected }: { isSelected?: boolean }) => {
        return (
            <>
                {isSelected && (
                    <div
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            background: 'black',
                            opacity: 0.3,
                        }}
                    >
                        {' '}
                    </div>
                )}
                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                    {isSelected ? <SquareCheckIcon /> : <SquareIcon />}
                </div>
            </>
        );
    };
    return (
        <div
            style={{
                height: 100,
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: backgroundColor,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            {(isDropDown || isRadio) && isSelected && <RenderSelected />}
            {isCheckBox && <RenderCheckBox isSelected={isSelected} />}
            {children}
        </div>
    );
}
