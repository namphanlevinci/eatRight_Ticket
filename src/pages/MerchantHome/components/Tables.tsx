import { Fragment } from 'react/jsx-runtime';
import {
    SBottomSideBar,
    SDuration,
    SLeftSideBar,
    SRightSideBar,
    SSubtitle,
    STableContainer,
    STitle,
    STopSideBar,
} from './styled';
import { TABLE_STATUS } from 'constants/table';
import React from 'react';
import { useNavigate } from 'react-router';
import { BASE_ROUTER } from 'constants/router';

interface ITable {
    cartIds: { cartId: string }[];
    hasReadyItem: boolean;
    id: number;
    is_counter: number;
    name: string;
    note: string | null;
    numberOfCustomer: number;
    size: number;
    status: string;
}

interface IProps {
    tables: ITable[];
}

const Tables = ({ tables }: IProps) => {
    console.log(
        tables?.filter((table) => table?.name).sort((a, b) => a.size - b.size),
    );
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '5%',
                rowGap: '5%',
                padding: '0 24px 24px',
            }}
        >
            {tables
                ?.filter((table) => table?.name)
                .sort((a, b) => a.size - b.size)
                ?.map((table, idx) => {
                    const _status = table.status as TStatus;
                    return (
                        <Fragment key={idx}>
                            <Table
                                tableData={table}
                                size={table.size > 6 ? 'large' : 'small'}
                                status={_status}
                            />
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default Tables;

interface IPropsTable {
    tableData: ITable;
    status: TStatus;
}

interface ISize {
    size: 'small' | 'large';
}

type TStatus = 'small' | 'lagre';
interface IChairsTable {
    status: TStatus;
}

const Table = ({ tableData, size, status }: IPropsTable & ISize) => {
    const navigation = useNavigate();
    return (
        <STableContainer
            {...SIZES[size]}
            {...STATUS[status]}
            onClick={() =>
                navigation(`${BASE_ROUTER.TABLE}?tableId=${tableData.id}`)
            }
        >
            <Chairs size={size} status={status} />
            <STitle>{tableData?.name || 'Table name'}</STitle>
            <SSubtitle>Emily Nguyen</SSubtitle>
            <SDuration>00:46</SDuration>
        </STableContainer>
    );
};

const Chairs = ({ status, size }: IChairsTable & ISize) => {
    return (
        <>
            {size === 'small' && (
                <>
                    <SLeftSideBar
                        position="left"
                        empty={STATUS[status].empty}
                        backgroundColor={STATUS[status].backgroundColor}
                    />
                    <SRightSideBar
                        position="right"
                        backgroundColor={STATUS[status].backgroundColor}
                        empty={STATUS[status].empty}
                    />
                </>
            )}
            {size === 'large' && (
                <>
                    {[
                        { position: 'left', top: '30%' },
                        { position: 'right', top: '30%' },
                        { position: 'left', top: '70%' },
                        { position: 'right', top: '70%' },
                        { position: 'top', left: '35%' },
                        { position: 'bottom', left: '35%' },
                        { position: 'top', left: '70%' },
                        { position: 'bottom', left: '70%' },
                    ].map(({ position, top, left }, idx) => {
                        const isVertical =
                            position === 'top' || position === 'bottom';
                        const isLeftOrRight =
                            position === 'left' || position === 'right';

                        return (
                            <React.Fragment key={`${position}-${idx}`}>
                                {isLeftOrRight && (
                                    <>
                                        <SLeftSideBar
                                            position="left"
                                            empty={STATUS[status].empty}
                                            top={top}
                                            backgroundColor={
                                                STATUS[status].backgroundColor
                                            }
                                        />
                                        <SRightSideBar
                                            position="right"
                                            top={top}
                                            backgroundColor={
                                                STATUS[status].backgroundColor
                                            }
                                            empty={STATUS[status].empty}
                                        />
                                    </>
                                )}
                                {isVertical && (
                                    <>
                                        <STopSideBar
                                            position="top"
                                            left={left}
                                            empty={STATUS[status].empty}
                                            backgroundColor={
                                                STATUS[status].backgroundColor
                                            }
                                        />
                                        <SBottomSideBar
                                            position="bottom"
                                            left={left}
                                            backgroundColor={
                                                STATUS[status].backgroundColor
                                            }
                                            empty={STATUS[status].empty}
                                        />
                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}
                </>
            )}
        </>
    );
};

const SIZES: Record<
    string,
    { width: string; maxWidth: string; minWidth: string; height: string }
> = {
    small: {
        width: '20%',
        maxWidth: '220px',
        minWidth: '220px',
        height: '220px',
    },
    large: {
        width: '30%',
        maxWidth: '400px',
        minWidth: '400px',
        height: '220px',
    },
};

const STATUS: Record<
    string,
    { backgroundColor: string; borderColor: string; empty?: boolean }
> = {
    '0': {
        backgroundColor: Object.values(TABLE_STATUS)[0].primaryColor,
        borderColor: Object.values(TABLE_STATUS)[0].secondaryColor,
        empty: true,
    },
    '1': {
        backgroundColor: Object.values(TABLE_STATUS)[1].primaryColor,
        borderColor: Object.values(TABLE_STATUS)[1].secondaryColor,
    },
    '2': {
        backgroundColor: Object.values(TABLE_STATUS)[2].primaryColor,
        borderColor: Object.values(TABLE_STATUS)[2].secondaryColor,
    },
};
