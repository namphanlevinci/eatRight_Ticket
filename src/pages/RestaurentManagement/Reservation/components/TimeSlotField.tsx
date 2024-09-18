import React from 'react';
import styled from 'styled-components';

interface TimeSlotFieldProps {
    label: string;
    value: string;
}

const TimeSlotField: React.FC<TimeSlotFieldProps> = ({ label, value }) => {
    return (
        <FieldContainer>
            <FieldLabel>{label}</FieldLabel>
            <FieldValue>
                <ValueText>{value}</ValueText>
                <DropdownIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/813b2a08bc37e530494a0d98f4e77884f52f0d16faab3d55ae16e5348ba577f1?apiKey=e6c780a7ebf34f4faa3a30e13c1a7987&"
                    alt=""
                />
            </FieldValue>
        </FieldContainer>
    );
};

const FieldContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 20px;
`;

const FieldLabel = styled.label`
    color: #1d2433;
    font-size: 15px;
    font-weight: 500;
    line-height: 1;
    align-self: flex-start;
`;

const FieldValue = styled.div`
    border-radius: 8px;
    background-color: #f8f9fc;
    display: flex;
    margin-top: 8px;
    gap: 20px;
    font-size: 17px;
    color: #333741;
    font-weight: 400;
    line-height: 1;
    justify-content: space-between;
    padding: 12px;
`;

const ValueText = styled.span`
    margin: auto 0;
`;

const DropdownIcon = styled.img`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 32px;
`;

export default TimeSlotField;
