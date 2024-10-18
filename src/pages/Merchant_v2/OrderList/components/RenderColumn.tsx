import React from 'react';
import ImgPendding from '../assets/status-pending.png';
import ImgRecieved from '../assets/file.png';
import ImgCooking from '../assets/cooking.png';
import ImgReadyShip from '../assets/ready_ship.png';
import ImgShipping from '../assets/status-shipping.png';

export const renderHeaderColumnByStatus = (
    item: any,
    countOrderByStatus: number,
) => {
    return (
        <div className="columns-header">
            <div className="columns-header-left">
                <span className="columns-header-title">{item?.title}</span>
            </div>

            <div className="colums-header-right">
                <span
                    className="columns-header-count"
                    style={{
                        fontFamily: 'Montserrat',
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: 'var(--secondary-1-light)',
                    }}
                >
                    {`${countOrderByStatus}`}
                </span>
            </div>
        </div>
    );
};

export const renderImageTitle = (status: any) => {
    let img;
    switch (status) {
        case 'pending':
            img = ImgPendding;
            break;
        case 'received':
            img = ImgRecieved;
            break;
        case 'cooking':
            img = ImgCooking;
            break;
        case 'ready_to_ship':
            img = ImgReadyShip;
            break;
        case 5:
        case 'shipping':
            img = ImgShipping;
            break;
        default:
            break;
    }
    return img && <img src={img} alt="" />;
};