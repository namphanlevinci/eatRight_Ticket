import styled from 'styled-components';
import { Colors } from 'themes/colors';

interface StyledTableNameProps {
    textColor?: string;
}

interface StyledTableProps {
    background?: string;
    opacity?: number;
    mobileView: boolean;
}

interface StyledLineProps {
    background?: string;
    opacity?: number;
    height?: number;
}

interface StyledFloorProps {
    color?: string;
    opacity?: number;
    fontweight?: string;
}
interface StyledBackgroundProps {
    background?: string;
}

export const ContainerTable = styled.div`
    padding: 16px;
    background: #191919;
    border-radius: 8px;
    width: 100%;
`;
export const ContainerSearchInput = styled.div`
    height: 64px;
    width: '100%';
    margin-bottom: 10px;
    padding-inline: 16px;
`;
export const ContainerTableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 35px;
    @media (max-width: 768px) {
        padding: 0;
    }
    flex-wrap: wrap;
`;

export const ContainerTableBody = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const StyledEmtyTable = styled.div`
    width: 21%;
    height: 95px;
    background: #0d0d0d;
    border-radius: 5px;
    margin: 20px 2%;
`;

const shouldForwardProp = (prop: string) => !['mobileView'].includes(prop);

export const StyledTable = styled(StyledEmtyTable).withConfig({
    shouldForwardProp,
})<StyledTableProps>`
    background: ${(props) => props.background || '#333333'};
    opacity: ${(props) => props.opacity || 1};
    width: ${(props) => (props.mobileView ? '45%' : '21%')};
    padding: 10px;
    padding-left: 15px;
    position: relative;
    cursor: pointer;
`;

export const StyledLine = styled.div<StyledLineProps>`
    position: absolute;
    left: 0px;
    width: 4px;
    background: ${(props) => props.background || '#34A853'};
    height: 75px;
    top: 10px;
`;

const shouldForwardPropColor = (prop: string) => !['textColor'].includes(prop);

export const StyledTableName = styled.p.withConfig({
    shouldForwardProp: shouldForwardPropColor,
})<StyledTableNameProps>`
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.textColor || 'white'};
    font-family: 'Montserrat';
`;

export const StyledTableSize = styled.p`
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    font-family: 'Montserrat';
`;

export const StyledTableStatus = styled(StyledTableSize)`
    margin-top: 2px;
    color: ${Colors.grey7};
    font-weight: 400;
`;

export const CountAvailable = styled.div`
    border-radius: 3000px;
    background: #ff9d00;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: '600';
    position: absolute;
    right: -15px;
    top: -20px;
    font-family: 'Montserrat';
    z-index: 10;
`;

export const CounterTakeAway = styled.div<StyledBackgroundProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #333333;
    width: 150px;
    height: 80px;
    margin-bottom: 20px;
    position: relative;

    h3 {
        color: grey;
        font-size: 14px;
        font-weight: 400;
        font-family: 'Montserrat';
    }

    h2 {
        color: #ff9d00;
        font-weight: 800;
        font-size: 18px;
        margin-top: 6px;
        font-family: 'Montserrat';
    }

    div {
        position: absolute;
        top: 0px;
        width: 80px;
        height: 3px;
        background: ${(props) => props.background || '#34A853'};
        left: 35px;
    }
`;

export const StyledFloors = styled.div`
    display: flex;
`;

export const StyledFloor = styled.div<StyledFloorProps>`
    color: ${(props) => props.color || '#ffffff'};
    opacity: ${(props) => props.opacity || 1};
    cursor: pointer;
    height: 24px;
    font-family: 'Montserrat';
    font-size: 18px;
    font-weight: ${(props) => props.fontweight || '400'};
`;

export const StyledFloorLine = styled.div<StyledLineProps>`
    height: ${(props) => `${props.height ? props.height : '4px'}`};
    background: ${(props) => props.background || '#ccc'};
    width: 70px;
    opacity: ${(props) => props.opacity};
    z-index: 10;
`;

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
