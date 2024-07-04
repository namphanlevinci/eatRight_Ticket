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
    width: 166px;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-block: 12px;
    border: 1px solid #663f00;
    padding: 0;
`;

export const StyledBreadCrum = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid white;
    padding: 0 20px;
    height: 52px;
`;

export const CusTomRow = styled(Row)`
    flex-wrap: nowrap;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`;
