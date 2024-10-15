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
    maxWidth: string;
    minWidth: string;
}>`
    border: 10px solid #9be0ff;
    background-color: #15b7ff;
    margin-top: 48px;
    border-radius: 20px;
    text-align: center;
    position: relative;
    z-index: 2;
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    min-width: ${(props) => props.minWidth};
`;

export const SSideBar = styled.div<{ left?: boolean }>`
    position: absolute;
    background: #15b7ff;
    height: 68px;
    width: 11px;
    top: 25%;
    border-radius: ${(props) => (props.left ? '6px 0 0 6px' : '0 6px 6px 0')};
    ${(props) => (props.left ? 'left: -20px;' : 'right: -20px;')}
`;

export const STitle = styled.div`
    font-size: 40px;
    font-weight: 700;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const SSubtitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: white;
    text-overflow: ellipsis;
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
