import React from 'react';
import './index.scss';
import moment from 'moment';
import Countdown from 'react-countdown';
import { isEmpty } from 'lodash';
import CountDownIcon from 'pages/Merchant/assets/countDown';

function ButtonTime(props) {
    const { dataOrder } = props;
    const { pickup_date, pickup_time } = dataOrder || {};

    const pickup_estimate =
        moment(pickup_date, ['YYYY-MM-DD  hh:mm:ss']).format('YYYY-MM-DD ') +
        ' ' +
        pickup_time;

    const diff = moment(pickup_estimate, ['YYYY-MM-DD  hh:mm A']).diff(
        moment(dataOrder?.created_at),
        'minutes',
    );
    const timeToEnd = moment(dataOrder?.created_at)
        .add(
            Number(isEmpty(pickup_date) ? dataOrder?.delivery_time : diff),
            'm',
        )
        .toDate();
    const renderer = (props) => {
        const { hours, minutes, seconds, days } = props;
        const pickup_time = props.props.pickup_time;
        const totalMinutes =
            days * 24 * 60 + hours * 60 + minutes + Math.floor(seconds / 60);
        return (
            <>
                <CountDownIcon />
                {totalMinutes > 60 ? (
                    <span className="text-light-14">
                        {pickup_time || `0 mins`}
                    </span>
                ) : (
                    <span className="text-light-14">{totalMinutes} mins</span>
                )}
            </>
        );
    };
    return (
        <Countdown
            key={dataOrder?.id}
            pickup_time={pickup_time}
            date={timeToEnd}
            renderer={renderer}
        />
    );
}

export default ButtonTime;
