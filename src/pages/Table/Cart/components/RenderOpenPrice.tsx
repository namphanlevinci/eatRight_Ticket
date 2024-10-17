import EditPriceIcon from 'assets/icons/editPriceIcon';
import React from 'react';

export default function RenderOpenPrice({
    value,
    onEditOpenPrice,
    isNeedInput = false,
}: {
    value: any;
    onEditOpenPrice: () => void;
    isNeedInput?: boolean;
}) {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={onEditOpenPrice}
            >
                <EditPriceIcon />
                <p
                    style={{
                        color: value ? '#1D2433' : '#737B89',
                        fontWeight: '500',
                        fontSize: value ? 20 : 16,
                        fontFamily: 'Montserrat',
                        marginLeft: 16,
                    }}
                >
                    {value ? `$ ${value}` : 'Enter price'}
                </p>
            </div>
            {isNeedInput && (
                <div
                    style={{
                        fontFamily: 'Montserrat',
                        color: 'red',
                        marginTop: 8,
                    }}
                >
                    * Please enter price
                </div>
            )}
        </div>
    );
}
