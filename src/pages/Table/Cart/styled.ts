import { Button, Row } from 'antd';
import styled from 'styled-components';

export const CartHeader = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBlock: 10,
});

export const StyledCartBorder = styled.div({
    background: '#191919',
    border: '1px solid #804E00',
    borderRadius: 8,
});

export const StyledMenuItem = styled(Button)`
    display: flex;
    width: 160px;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 1px solid #663f00;
    padding: 0;
    @media (max-width: 768px) {
        width: 44vw;
    }
`;

export const StyledBreadCrum = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 0px solid white;
    padding: 0 16px;
    background: transparent;
`;

export const CusTomRow = styled(Row)`
    flex-wrap: nowrap;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`;
