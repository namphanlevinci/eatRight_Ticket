/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import styled from 'styled-components';
import TimeSlotField from './TimeSlotField';

interface TimeSlotManagementProps {
    // Add any props if needed
}

const TimeSlotManagement: React.FC<TimeSlotManagementProps> = () => {
    const timeSlotFields = [
        { label: 'From time', value: '10:30 AM' },
        { label: 'To time', value: '8:30 PM' },
        { label: 'Slot duration', value: '30 mins' },
    ];

    return (
        <TimeSlotContainer>
            <TimeSlotHeader>
                <TimeSlotTitle>Time Slot Management</TimeSlotTitle>
                <InfoIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7115d55198b0ddc9e70eefeb1e4590dca6816ca470b63ee355d93f50934acf6?apiKey=e6c780a7ebf34f4faa3a30e13c1a7987&"
                    alt=""
                />
            </TimeSlotHeader>
            <TimeSlotFieldsContainer>
                {timeSlotFields.map((field, index) => (
                    <TimeSlotField
                        key={index}
                        label={field.label}
                        value={field.value}
                    />
                ))}
            </TimeSlotFieldsContainer>
        </TimeSlotContainer>
    );
};

const TimeSlotContainer = styled.section`
    display: flex;
    margin-top: 24px;
    width: 100%;
    max-width: 484px;
    flex-direction: column;
`;

const TimeSlotHeader = styled.header`
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    color: #1d2433;
    font-weight: 600;
    line-height: 1.2;
    justify-content: flex-start;
`;

const TimeSlotTitle = styled.h3`
    align-self: stretch;
    margin: auto 0;
`;

const InfoIcon = styled.img`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 20px;
    align-self: stretch;
    margin: auto 0;
`;

const TimeSlotFieldsContainer = styled.div`
    display: flex;
    margin-top: 16px;
    flex-direction: column;
    justify-content: flex-start;
`;

export default TimeSlotManagement;
