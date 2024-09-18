/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import styled from 'styled-components';

interface MaxPartySizeProps {
    // Add any props if needed
}

const MaxPartySize: React.FC<MaxPartySizeProps> = () => {
    return (
        <MaxPartySizeContainer>
            <MaxPartySizeHeader>
                <MaxPartySizeTitle>Max Party Size</MaxPartySizeTitle>
                <InfoIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7115d55198b0ddc9e70eefeb1e4590dca6816ca470b63ee355d93f50934acf6?apiKey=e6c780a7ebf34f4faa3a30e13c1a7987&"
                    alt=""
                />
            </MaxPartySizeHeader>
            <MaxPartySizeContent>
                <MaxGuestsLabel>
                    Maximum number of guests accepted
                </MaxGuestsLabel>
                <MaxGuestsInput
                    type="number"
                    value="20"
                    aria-label="Maximum number of guests"
                />
            </MaxPartySizeContent>
        </MaxPartySizeContainer>
    );
};

const MaxPartySizeContainer = styled.section`
    display: flex;
    margin-top: 24px;
    width: 100%;
    max-width: 484px;
    flex-direction: column;
`;

const MaxPartySizeHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const MaxPartySizeTitle = styled.h3`
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

const MaxPartySizeContent = styled.div`
    display: flex;
    margin-top: 16px;
    flex-direction: column;
    justify-content: flex-start;
`;

const MaxGuestsLabel = styled.label`
    color: #1d2433;
    font-size: 15px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 8px;
`;

const MaxGuestsInput = styled.input`
    border-radius: 8px;
    background-color: #f8f9fc;
    font-size: 17px;
    color: #333741;
    font-weight: 400;
    line-height: 1;
    padding: 17px 12px;
    border: none;
    width: 100%;
`;

export default MaxPartySize;
