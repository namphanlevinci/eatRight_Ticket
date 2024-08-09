import React, { useMemo } from 'react';
import { Layout, Row } from 'antd';
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
    CountAvaiable,
} from './styled';
import EmptyTable from './components/EmptyTable';
import Table from './components/Table';
import { BASE_ROUTER } from 'constants/router';
import BreadCrum from 'components/atom/BreadCrum/BreadCrum';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import SearchTable from './components/Search';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useTheme } from 'context/themeContext';
import HomeIcon from 'assets/icons/homeIcon';
import { useMediaQuery } from 'react-responsive';
const { Content } = Layout;

const HomePage: React.FC = () => {
    const navigation = useNavigate();
    const { data, counterTable, setSearchText, floorActive, setFloorActive } =
        useGetAllTable({
            cache: false,
        });
    const { floor: floors } = useSelector((state: RootState) => state.auth);

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
                                marginRight: 20,
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
                                    marginRight: 20,
                                    width: 70,
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
                    <Link
                        to={`${BASE_ROUTER.TABLE}?tableId=${counterTable?.id}`}
                    >
                        <div style={{ position: 'relative' }}>
                            <CountAvaiable
                                style={{
                                    background: theme.pRIMARY6Primary,
                                    color: theme.pRIMARY2,
                                    top: ismobile ? 0 : -20,
                                }}
                            >
                                <div>{counterTable?.cartIds?.length || 0}</div>
                            </CountAvaiable>
                            {!ismobile && (
                                <CounterTakeAway
                                    style={{ background: theme.pRIMARY3 }}
                                    background={theme.pRIMARY6Primary}
                                >
                                    <h3 style={{ color: theme.tEXTPrimary }}>
                                        Counter
                                    </h3>
                                    <h2
                                        style={{ color: theme.pRIMARY6Primary }}
                                    >
                                        TAKE AWAY
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
                                    <h3 style={{ color: theme.tEXTPrimary }}>
                                        Counter
                                    </h3>
                                    <h2
                                        style={{ color: theme.pRIMARY6Primary }}
                                    >
                                        TAKE AWAY
                                    </h2>
                                    <div />
                                </CounterTakeAway>
                            </div>
                        )}
                    </Link>
                </ContainerTableHeader>
                <SearchTable onChangeText={(e: string) => setSearchText(e)} />
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
            <Content style={{ margin: '0 16px' }}>
                <Row style={{ marginBlock: 10 }} align={'middle'}>
                    <HomeIcon />
                    <BreadCrum>Home</BreadCrum>
                    <ArrowRightIcon />
                    {floors?.length > 0 && (
                        <BreadCrum isSelected>
                            {floorActive === -1
                                ? 'All'
                                : floors[floorActive].name}
                        </BreadCrum>
                    )}
                </Row>

                {renderContent({ data: memoizedTables })}
            </Content>
        </Layout>
    );
};

export default HomePage;
