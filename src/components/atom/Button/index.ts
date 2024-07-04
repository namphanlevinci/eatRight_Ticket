import styled from 'styled-components';
import { Colors } from 'themes/colors';
import { Button as ButtonAntd } from 'antd';
interface Props {
    isDisable?: boolean;
}
export const Button = styled(ButtonAntd)<Props>`
    min-height: 40px;
    min-width: 102px;
    border-radius: 8px;
    padding: 15px 36px;
    color: ${(props) =>
        !props.isDisable ? Colors.black : Colors.white} !important;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight: 600;
    margin: 10px;
    border: ${(props) => (!props.isDisable ? '2px solid #ff9d00' : 'none')};
    background: ${(props) =>
        !props.isDisable ? Colors.primary : Colors.grey7};
`;
