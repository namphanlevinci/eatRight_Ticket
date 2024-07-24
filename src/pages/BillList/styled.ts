import { Pagination } from 'antd';
import styled from 'styled-components';

interface StyledColumnProps {
    fontWeight?: string;
    opacity?: number;
}

export const StyledTitle = styled.p`
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    font-family: 'Montserrat';

    &div {
        display: flex;
    }
`;

export const PaginationText = styled.p`
    color: #ffffff;
    font-weight: 400;
    font-size: 17px;
    font-family: 'Montserrat';
`;

export const ContainerPaginationText = styled.p`
    display: flex;
    justify-content: center;
    margin-top: 50px;
    background: black;
`;

export const StyledColumnContainer = styled.div`
    display: flex;
    height: 64px;
    overflow: visible;
`;

export const StyledColumn = styled.div<StyledColumnProps>`
    min-width: 200px;
    opacity: ${(props) => props.opacity || 1};
    font-weight: ${(props) => props.fontWeight || '400'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.7;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 5px;
`;

export const PaginationStyled = styled(Pagination)`
    // modify here
`;

export const StyledSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 166px;
    height: 56px;
    background: #333333;
    cursor: pointer;
    border-radius: 8px;

    p {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 600;
        margin-right: 12px;
    }
`;
