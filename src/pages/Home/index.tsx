import React, { useMemo } from 'react';
import { Divider, Layout, Row } from 'antd';
import { Colors } from 'themes/colors';
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
const { Content } = Layout;

const HomePage: React.FC = () => {
    const navigation = useNavigate();
    const { data, counterTable, setSearchText, floorActive, setFloorActive } =
        useGetAllTable({
            cache: false,
        });
    const { floor: floors } = useSelector((state: RootState) => state.auth);

    const memoizedTables = useMemo(() => data, [data]);

    const renderContent = ({ data }: { data: any }) => {
        return (
            <ContainerTable>
                <ContainerTableHeader>
                    <StyledFloors>
                        <div>
                            <StyledFloor
                                onClick={() => setFloorActive(-1)}
                                color={
                                    -1 == floorActive ? '#ffffff' : '#CCCCCC'
                                }
                                opacity={-1 == floorActive ? 1 : 0.7}
                            >
                                All
                            </StyledFloor>
                            {-1 == floorActive && <StyledFloorLine />}
                        </div>
                        {floors?.map((floor, index) => (
                            <div key={floor.id}>
                                <StyledFloor
                                    onClick={() => setFloorActive(index)}
                                    color={
                                        index == floorActive
                                            ? '#ffffff'
                                            : '#CCCCCC'
                                    }
                                    opacity={index == floorActive ? 1 : 0.7}
                                >
                                    {floor.name}
                                </StyledFloor>
                                {index == floorActive && <StyledFloorLine />}
                            </div>
                        ))}
                    </StyledFloors>
                    <Link
                        to={`${BASE_ROUTER.TABLE}?tableId=${counterTable?.id}`}
                    >
                        <div style={{ position: 'relative' }}>
                            <CountAvaiable>
                                <div>{counterTable?.cartIds?.length || 0}</div>
                            </CountAvaiable>
                            <CounterTakeAway>
                                <h3>Counter</h3>
                                <h2>TAKE AWAY</h2>
                                <div />
                            </CounterTakeAway>
                        </div>
                    </Link>
                </ContainerTableHeader>
                <SearchTable onChangeText={(e: string) => setSearchText(e)} />
                <ContainerTableBody>
                    {data.map((dt: any) =>
                        dt ? (
                            <Table
                                onClick={() =>
                                    navigation(
                                        `${BASE_ROUTER.TABLE}?tableId=${dt?.id}`,
                                    )
                                }
                                item={dt}
                                key={`table ${dt?.id}`}
                            />
                        ) : (
                            <EmptyTable key={Math.random()} />
                        ),
                    )}
                </ContainerTableBody>
            </ContainerTable>
        );
    };

    return (
        <Layout style={{ backgroundColor: Colors.black, minHeight: '100vh' }}>
            <Content style={{ margin: '0 16px' }}>
                <Row style={{ marginBlock: 10 }} align={'middle'}>
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
                <Divider style={{ background: Colors.black }} />

                {renderContent({ data: memoizedTables })}
            </Content>
        </Layout>
    );
};

export default HomePage;
