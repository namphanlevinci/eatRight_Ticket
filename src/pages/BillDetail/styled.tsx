import { Row } from 'antd';
import styled from 'styled-components';
import { Colors } from 'themes/colors';

export const BarCodeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 150px !important;
    }
`;

export const RowStyled = styled(Row)`
    margin-top: 8px;
    justify-content: space-between;
`;

export const text24: React.CSSProperties = {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: '28px',
    textWrap: 'pretty',
};
export const text16W: React.CSSProperties = {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: '20px',
    textWrap: 'pretty',
};
export const text16: React.CSSProperties = {
    fontSize: 16,
    lineHeight: '20px',
};
export const text16Bold: React.CSSProperties = {
    fontSize: 16,
    lineHeight: '20px',
    textWrap: 'pretty',
    fontWeight: '600',
};
export const DividedDashed = () => {
    return (
        <div
            style={{
                height: 1,
                border: 1,
                borderStyle: 'dashed',
                borderColor: Colors.grey8,
                marginTop: 20,
            }}
        >
            {''}
        </div>
    );
};

export const DividedSolid = ({ color }: { color?: string }) => {
    return (
        <div
            style={{
                height: 2,
                border: 2,
                borderStyle: 'solid',
                borderColor: color ? color : Colors.grey9,
                marginTop: 16,
            }}
        >
            {''}
        </div>
    );
};

export const ButtonContainer = styled.div<{
    isRight?: boolean;
}>`
    position: relative;
    @media (max-width: 767px) {
        position: fixed;
        bottom: 100px;
        left: ${(props) => (!props.isRight ? 0 : 'calc(100% - 140px)')};
        z-index: 50;
    }
`;

export const Container = styled.div`
    height: 'calc(100% - 100px)';
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 100;

    @media (max-width: 767px) {
        justify-content: center;
    }
`;
