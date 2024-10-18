/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import styled from 'styled-components';
import TimeSlotField from './TimeSlotField';

interface LeadTimeProps {
    // Add any props if needed
}

const LeadTime: React.FC<LeadTimeProps> = () => {
    const leadTimeOptions = [
        { label: 'Hours', checked: true },
        { label: 'Days', checked: false },
    ];

    const leadTimeFields = [
        { label: 'Lead Time Min', value: '1 hour' },
        { label: 'Lead Time Max', value: '12 hours' },
    ];

    return (
        <LeadTimeContainer>
            <LeadTimeHeader>
                <LeadTimeTitle>Lead Time</LeadTimeTitle>
                <InfoIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7115d55198b0ddc9e70eefeb1e4590dca6816ca470b63ee355d93f50934acf6?apiKey=e6c780a7ebf34f4faa3a30e13c1a7987&"
                    alt=""
                />
            </LeadTimeHeader>
            <LeadTimeContent>
                <LeadTimeOptions>
                    {leadTimeOptions.map((option, index) => (
                        <CheckOption key={index} checked={option.checked}>
                            <CheckIcon
                                src={`http://b.io/ext_${option.checked ? '3' : '4'}-`}
                                alt=""
                            />
                            <OptionLabel>{option.label}</OptionLabel>
                        </CheckOption>
                    ))}
                </LeadTimeOptions>
                {leadTimeFields.map((field, index) => (
                    <TimeSlotField
                        key={index}
                        label={field.label}
                        value={field.value}
                    />
                ))}
            </LeadTimeContent>
        </LeadTimeContainer>
    );
};

const LeadTimeContainer = styled.section`
    display: flex;
    margin-top: 24px;
    width: 100%;
    max-width: 484px;
    flex-direction: column;
`;

const LeadTimeHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const LeadTimeTitle = styled.h3`
    color: #1d2433;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
`;

const InfoIcon = styled.img`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 20px;
`;

const LeadTimeContent = styled.div`
    display: flex;
    margin-top: 16px;
    flex-direction: column;
    justify-content: flex-start;
`;

const LeadTimeOptions = styled.div`
    display: flex;
    width: 262px;
    max-width: 100%;
    padding-right: 31px;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
    color: #4a505c;
    font-weight: 400;
    white-space: nowrap;
    line-height: 1;
    margin-bottom: 20px;
`;

const CheckOption = styled.div<{ checked: boolean }>`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    cursor: pointer;
`;

const CheckIcon = styled.img`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 32px;
`;

const OptionLabel = styled.span`
    margin: auto 0;
`;

export default LeadTime;
