import React, { useEffect, useMemo } from 'react';
import { Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllTable } from './useTable';
import {
    ContainerTable,
    CounterTakeAway,
    ContainerTableHeader,
    ContainerTableBody,
    StyledFloor,
    StyledFloors,
    StyledFloorLine,
    CountAvailable,
} from './styled';
import Table from './components/Table';
import { BASE_ROUTER } from 'constants/router';
// import SearchTable from './components/Search';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
const { Content } = Layout;

const HomePage: React.FC = () => {
    const navigation = useNavigate();
    const { data, counterTable, floorActive, setFloorActive } = useGetAllTable({
        cache: false,
    });
    const { floor: floors, isTableView } = useSelector(
        (state: RootState) => state.auth,
    );
    useEffect(() => {
        if (isTableView) {
            navigation(BASE_ROUTER.MERCHANT_TABLEVIEW);
        }
    }, [isTableView]);
    const memoizedTables = useMemo(() => data, [data]);
    const { theme } = useTheme();
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const renderContent = ({ data }: { data: any }) => {
        return (
            <ContainerTable style={{ background: theme.pRIMARY1 }}>
                <ContainerTableHeader>
                    <StyledFloors>
                        <div
                            style={{
                                justifyContent: 'start',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: 10,
                                width: 70,
                            }}
                        >
                            <StyledFloor
                                onClick={() => setFloorActive(-1)}
                                color={theme.textTitle}
                                fontweight={-1 == floorActive ? '600' : '400'}
                            >
                                All
                            </StyledFloor>

                            <StyledFloorLine
                                background={theme.textTitle}
                                opacity={floorActive === -1 ? 1 : 0}
                            />
                        </div>
                        {floors?.map((floor, index) => (
                            <div
                                key={floor.id}
                                style={{
                                    justifyContent: 'start',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginRight: 10,
                                    width: 120,
                                }}
                            >
                                <StyledFloor
                                    onClick={() => setFloorActive(index)}
                                    color={theme.textTitle}
                                    fontweight={
                                        index == floorActive ? '600' : '400'
                                    }
                                >
                                    {floor.name}
                                </StyledFloor>
                                {index == floorActive && (
                                    <StyledFloorLine
                                        background={theme.textTitle}
                                    />
                                )}
                            </div>
                        ))}
                    </StyledFloors>
                    {counterTable && (
                        <Link
                            to={`${BASE_ROUTER.TABLE}?tableId=${counterTable?.id}`}
                        >
                            <div style={{ position: 'relative' }}>
                                <CountAvailable
                                    style={{
                                        background: theme.pRIMARY6Primary,
                                        color: theme.pRIMARY2,
                                        top: ismobile ? 0 : -20,
                                    }}
                                >
                                    <div>
                                        {counterTable?.cartIds?.length || 0}
                                    </div>
                                </CountAvailable>
                                {!ismobile && (
                                    <CounterTakeAway
                                        style={{ background: theme.pRIMARY3 }}
                                        background={theme.pRIMARY6Primary}
                                    >
                                        {/* <h3 style={{ color: theme.tEXTPrimary }}>
                                        Quick Order
                                    </h3> */}
                                        <h2
                                            style={{
                                                color: theme.pRIMARY6Primary,
                                            }}
                                        >
                                            {counterTable?.name ||
                                                `Quick Order`}
                                        </h2>
                                        <div />
                                    </CounterTakeAway>
                                )}
                            </div>
                            {ismobile && (
                                <div
                                    style={{
                                        marginTop: 16,
                                        width: 'calc(100vw - 64px)',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <CounterTakeAway
                                        style={{ background: theme.pRIMARY3 }}
                                        background={theme.pRIMARY6Primary}
                                    >
                                        {/* <h3 style={{ color: theme.tEXTPrimary }}>
                                        Quick Order
                                    </h3> */}
                                        <h2
                                            style={{
                                                color: theme.pRIMARY6Primary,
                                            }}
                                        >
                                            {counterTable?.name ||
                                                `Quick Order`}
                                        </h2>
                                        <div />
                                    </CounterTakeAway>
                                </div>
                            )}
                        </Link>
                    )}
                </ContainerTableHeader>
                {/* <SearchTable onChangeText={(e: string) => setSearchText(e)} /> */}
                <ContainerTableBody>
                    {data.map(
                        (dt: any) =>
                            dt && (
                                <Table
                                    onClick={() =>
                                        navigation(
                                            `${BASE_ROUTER.TABLE}?tableId=${dt?.id}`,
                                        )
                                    }
                                    item={dt}
                                    key={`table ${dt?.id}`}
                                />
                            ),
                    )}
                </ContainerTableBody>
            </ContainerTable>
        );
    };

    return (
        <Layout
            style={{
                backgroundColor: theme.nEUTRALPrimary,
                minHeight: '100vh',
            }}
        >
            <Content style={{ margin: '0 16px', paddingTop: 16 }}>
                {renderContent({ data: memoizedTables })}
            </Content>
        </Layout>
    );
};

export default HomePage;
