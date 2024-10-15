import styled from 'styled-components';
import { Colors } from 'themes/colors';

interface IFloorItem {
    isFirst?: boolean;
    isLast?: boolean;
    isActive?: boolean;
}

export const SFloorsContaier = styled.div`
    display: flex;
    align-items: center;
`;

export const SFloorItem = styled.div<IFloorItem>`
    border: 1px solid ${Colors.grey3};
    background-color: ${(props) => (props.isActive ? Colors.grey3 : 'white')};
    color: ${(props) => (props.isActive ? 'white' : Colors.grey3)};
    font-weight: 600;
    font-size: 20px;
    min-width: 200px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: ${(props) =>
        props.isFirst ? '6px 0 0 6px' : props.isLast ? '0 6px 6px 0' : '0'};
    &:hover {
        opacity: 0.75;
    }
`;

export const STableContainer = styled.div<{
    width: string;
    height: string;
    maxWidth: string;
    minWidth: string;
    backgroundColor: string;
    borderColor: string;
}>`
    border: ${(props) => `10px solid ${props.borderColor}`};
    background-color: ${(props) => props.backgroundColor};
    margin-top: 80px;
    border-radius: 20px;
    text-align: center;
    position: relative;
    z-index: 2;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    max-width: ${(props) => props.maxWidth};
    min-width: ${(props) => props.minWidth};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SSideBar = styled.div<{
    position: 'top' | 'left' | 'right' | 'bottom';
    empty?: boolean;
    top?: string;
    left?: string;
    backgroundColor: string;
}>`
    position: absolute;
    background-color: ${(props) =>
        props.empty ? '#f4f4f4' : props.backgroundColor};
    height: 68px;
    width: 11px;
    border: ${(props) =>
        props.empty ? `3px solid ${props.backgroundColor}` : ''};
    ${(props) => getPropsByPosition(props.position, 'radius')};
    ${(props) => getPropsByPosition(props.position, 'borderNone')}
    ${(props) => getPropsByPosition(props.position, 'rotate')}
    ${(props) => getPropsByPosition(props.position, 'position')}
`;

export const STopSideBar = styled(SSideBar)`
    position: absolute;
    top: -49px;
    left: 50%;
    transform: rotate(90deg);
    ${(props) => `left: ${props.left ?? '50%'}`}
`;

export const SLeftSideBar = styled(SSideBar)`
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    ${(props) => `top: ${props.top ?? '50%'}`}
`;

export const SRightSideBar = styled(SSideBar)`
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    ${(props) => `top: ${props.top ?? '50%'}`}
`;

export const SBottomSideBar = styled(SSideBar)`
    position: absolute;
    bottom: -49px;
    left: 50%;
    transform: rotate(90deg);
    ${(props) => `left: ${props.left ?? '50%'}`}
`;

export const STitle = styled.div`
    font-size: 40px;
    font-weight: 700;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-clamp: 2;
    margin-top: 20px;
`;

export const SSubtitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: white;
    text-overflow: ellipsis;
    line-clamp: 2;
    overflow: hidden;
    white-space: nowrap;
`;

export const SDuration = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: white;
    padding: 4px 8px;
    border-radius: 8px;
`;

const getPropsByPosition = (
    position: 'top' | 'left' | 'right' | 'bottom',
    prop: string,
) => {
    const radiusObj = {
        top: 'border-radius: 6px 0 0 6px; ',
        left: 'border-radius: 6px 0 0 6px;',
        right: 'border-radius: 0 6px 6px 0;',
        bottom: 'border-radius: 0 6px 6px 0;',
    };
    const borderObj = {
        top: 'border-right: none;',
        left: 'border-right: none;',
        right: 'border-left: none;',
        bottom: 'border-left: none;',
    };
    const rotateObj = {
        top: 'transform: rotate(-90deg);',
        left: 'transform: rotate(0deg);',
        right: 'transform: rotate(0deg);',
        bottom: 'transform: rotate(90deg);',
    };
    const positionObj = {
        top: 'top: -49px;',
        left: 'left: -20px;',
        right: 'right: -20px;',
        bottom: 'bottom: -49px;',
    };

    const propsObj: Record<string, any> = {
        radius: radiusObj,
        borderNone: borderObj,
        rotate: rotateObj,
        position: positionObj,
    };

    return propsObj[prop][position];
};
