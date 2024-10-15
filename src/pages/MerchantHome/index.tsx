import React, { useEffect, useMemo } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetAllTable } from './useTable';
import {
    ContainerTable,
    // CounterTakeAway,
    ContainerTableHeader,
    ContainerTableBody,
    // CountAvailable,
} from './styled';
import Table from './components/Table';
import { BASE_ROUTER } from 'constants/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
// import { useTheme } from 'context/themeContext';
// import { useMediaQuery } from 'react-responsive';
import Floors from './components/Floors';
import WaitingListButton from './components/WaitingListButton';
import Tables from './components/Tables';
const { Content } = Layout;

const MerchantHomePage: React.FC = () => {
    const navigation = useNavigate();
    const { data, counterTable, floorActive, handleActiveFloor } =
        useGetAllTable({
            cache: false,
        });
    const { floor: floors, isTableView } = useSelector(
        (state: RootState) => state.auth,
    );
    useEffect(() => {
        if (!isTableView) {
            navigation(BASE_ROUTER.MERCHANT_PAGE);
        }
    }, [isTableView]);
    const memoizedTables = useMemo(() => data, [data]);
    // const { theme } = useTheme();
    // const ismobile = useMediaQuery({
    //     query: '(max-width: 768px)',
    // });

    console.log(floors);
    const renderContent = () => {
        console.log(data);
        return (
            <ContainerTable style={{ background: '#f4f4f4' }}>
                <ContainerTableHeader>
                    <Floors
                        floorActive={floorActive}
                        floors={floors}
                        onFloorActive={handleActiveFloor}
                    />
                    <WaitingListButton
                        count={41}
                        onClick={() => console.log('Clicked')}
                    />
                </ContainerTableHeader>
                {/* <SearchTable onChangeText={(e: string) => setSearchText(e)} /> */}
                <ContainerTableBody>
                    {/* {data.map(
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
                    )} */}
                   {data?.length ?  <Tables tables={data} />: <div>Notfound tables</div>}
                </ContainerTableBody>
            </ContainerTable>
        );
    };

    return (
        <Layout
            style={{
                backgroundColor: '#fafafa',
                minHeight: '100vh',
            }}
        >
            <Content
                style={{
                    margin: '0 16px',
                    paddingTop: 16,
                    backgroundColor: '#fafafa',
                }}
            >
                {renderContent()}
            </Content>
        </Layout>
    );
};

export default MerchantHomePage;

// {counterTable && (
//     <Link
//         to={`${BASE_ROUTER.TABLE}?tableId=${counterTable?.id}`}
//     >
//         <div style={{ position: 'relative' }}>
//             <CountAvailable
//                 style={{
//                     background: theme.pRIMARY6Primary,
//                     color: theme.pRIMARY2,
//                     top: ismobile ? 0 : -20,
//                 }}
//             >
//                 <div>
//                     {counterTable?.cartIds?.length || 0}
//                 </div>
//             </CountAvailable>
//             {!ismobile && (
//                 <CounterTakeAway
//                     style={{ background: theme.pRIMARY3 }}
//                     background={theme.pRIMARY6Primary}
//                 >
//                     {/* <h3 style={{ color: theme.tEXTPrimary }}>
//                     Quick Order
//                 </h3> */}
//                     <h2
//                         style={{
//                             color: theme.pRIMARY6Primary,
//                         }}
//                     >
//                         {counterTable?.name ||
//                             `Quick Order`}
//                     </h2>
//                     <div />
//                 </CounterTakeAway>
//             )}
//         </div>
//         {ismobile && (
//             <div
//                 style={{
//                     marginTop: 16,
//                     width: 'calc(100vw - 64px)',
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                 }}
//             >
//                 <CounterTakeAway
//                     style={{ background: theme.pRIMARY3 }}
//                     background={theme.pRIMARY6Primary}
//                 >
//                     {/* <h3 style={{ color: theme.tEXTPrimary }}>
//                     Quick Order
//                 </h3> */}
//                     <h2
//                         style={{
//                             color: theme.pRIMARY6Primary,
//                         }}
//                     >
//                         {counterTable?.name ||
//                             `Quick Order`}
//                     </h2>
//                     <div />
//                 </CounterTakeAway>
//             </div>
//         )}
//     </Link>
// )}
