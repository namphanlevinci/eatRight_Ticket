import React, { useMemo } from 'react';
import { SFloorItem, SFloorsContaier } from './styled';

interface IFloor {
    id: number;
    status: number;
    name: string;
}

interface IProps {
    floors: IFloor[];
    floorActive: number;
    onFloorActive: (floorId: number) => void;
}

const floorAll: IFloor = {
    id: -1,
    status: -1,
    name: 'All',
};

const Floors = ({ floorActive, onFloorActive, floors }: IProps) => {
    const floosList = useMemo(() => [floorAll, ...floors], [floors]);
    return (
        <SFloorsContaier>
            {floosList.map((floor, idx) => {
                return (
                    <SFloorItem
                        key={floor.id}
                        isFirst={idx === 0}
                        isLast={idx === floosList.length - 1}
                        isActive={floorActive === floor.id}
                        onClick={() => onFloorActive(floor.id)}
                    >
                        {floor.name}
                    </SFloorItem>
                );
            })}
        </SFloorsContaier>
    );
};

export default Floors;
