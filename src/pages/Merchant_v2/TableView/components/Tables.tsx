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
import React from 'react';
import { useNavigate } from 'react-router';
import { BASE_ROUTER } from 'constants/router';
import moment from 'moment';
import { EStatusTable, TTable } from 'graphql/table/table';
import { SIZES, STATUS } from 'constants/table';
interface IProps {
    tables: TTable[];
}

const Tables = ({ tables }: IProps) => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
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
                    return (
                        <Fragment key={idx}>
                            <Table
                                tableData={table}
                                size={
                                    table.size > SMALL_SIZE ? 'large' : 'small'
                                }
                                status={table.status}
                            />
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default Tables;

interface IPropsTable {
    tableData: TTable;
    status: EStatusTable;
}

interface ISize {
    size: 'small' | 'large';
}

interface IChairsTable {
    status: EStatusTable;
}

// SMALL TABLE IF SIZE < 4, ELSE

const SMALL_SIZE = 4;

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
            <SSubtitle>{tableData.customer_name}</SSubtitle>
            <SDuration>
                {moment
                    .utc(tableData.created_at, 'YYYY-MM-DD HH:mm')
                    .local()
                    .format('hh:mm A')}
            </SDuration>
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
