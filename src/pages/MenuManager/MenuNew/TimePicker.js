import React from 'react';
import icon_arrow_down from '../../Merchant/assets/icon/icon_arrow_down.svg';

const days = [
    {
        key: 'Mon',
        title: 'Mon',
    },
    {
        key: 'Tue',
        title: 'Tue',
    },
    {
        key: 'Wed',
        title: 'Wed',
    },
    {
        key: 'Thu',
        title: 'Thu',
    },
    {
        key: 'Fri',
        title: 'Fri',
    },
    {
        key: 'Sat',
        title: 'Sat',
    },
    {
        key: 'Sun',
        title: 'Sun',
    },
];

const TimePicker = ({
    clickStartTime,
    clickEndTime,
    startTime,
    endTime,
    clickActiveDay,
    activeDays = [],
}) => {
    return (
        <div className="menu_new_tim_picker">
            <div className="menu_new_tim_picker_days">
                {days.map((d) => {
                    const isActive = activeDays.find((obj) => obj == d.key)
                        ? true
                        : false;
                    return (
                        <div
                            onClick={() => clickActiveDay(d.key)}
                            key={d.key}
                            style={
                                isActive
                                    ? {
                                          background: '#389E0E',
                                          color: '#fff',
                                      }
                                    : {}
                            }
                            className="menu_new_tim_picker_days_item"
                        >
                            {d.title.toUpperCase()}
                        </div>
                    );
                })}
            </div>
            <div style={{ display: 'flex', marginTop: 24, gap: 50 }}>
                <div className="menu_new_tim_picker_item">
                    <p>Start time</p>
                    <div
                        onClick={clickStartTime}
                        className="menu_new_tim_picker_item_select"
                    >
                        {startTime}
                        <img src={icon_arrow_down} alt="icon_arrow_down" />
                    </div>
                </div>
                <div className="menu_new_tim_picker_item">
                    <p>End time</p>
                    <div
                        onClick={clickEndTime}
                        className="menu_new_tim_picker_item_select"
                    >
                        {endTime}
                        <img src={icon_arrow_down} alt="icon_arrow_down" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimePicker;
