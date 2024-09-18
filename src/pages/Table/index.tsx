import React, { useRef, useState, useEffect } from 'react';

import { Divider, Layout, Row, Button, App } from 'antd';
import { Colors } from 'themes/colors';
import OrderCart from './Cart';
import Menu from './Menu';
import BreadCrum from 'components/atom/BreadCrum/BreadCrum';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import { Link, useSearchParams } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { MenuContext } from './context/MenuContext';
import { useMenu } from './Menu/useMenu';
import { Text } from 'components/atom/Text';
import { useMutation } from '@apollo/client';
import {
    ChangeTableStatusToAvailable,
    ChangeTableStatusToReserved,
} from 'graphql/table/checkInTable';
import LoadingModal from 'components/modal/loadingModal';
import { useTheme } from 'context/themeContext';
const { Content } = Layout;

type TableType = {
    id: number;
    name: string;
    status: string;
    size: number;
    numberOfCustomer: number;
    cartIds: string[];
};

export const TablePage: React.FC = () => {
    const menu = useMenu();
    const targetRef = useRef(null);
    const [showMenu, setShowMenu] = useState(true);
    const tables: any = localStorage.getItem('tableData');
    const [searchParams] = useSearchParams();
    const tableId = searchParams.get('tableId');
    const [table, setTable] = useState<TableType>();
    const { modal } = App.useApp();
    useEffect(() => {
        const dataTables = JSON.parse(tables);
        if (tableId && dataTables) {
            const value = dataTables?.find((item: any) => item.id == tableId);
            setTable(value);
        }
    }, [tableId, tables]);

    const [checkin, { loading }] = useMutation(ChangeTableStatusToReserved);
    const [toAvailable, { loading: loading2 }] = useMutation(
        ChangeTableStatusToAvailable,
    );
    const onCheckIn = () => {
        if (table?.status == '0') {
            checkin({
                variables: {
                    targetTableId: table.id,
                },
            }).then((res) => {
                setTable(res.data.waiterChangeTableStatusToReserved);
            });
        }
        if (table?.status == '2') {
            // Cancel Check In Table
            modal.confirm({
                title: 'Change table status to available',
                content:
                    'Are you sure you want to change the table status to available?',
                onOk: () => {
                    toAvailable({
                        variables: {
                            targetTableId: table.id,
                        },
                    }).then((res) => {
                        setTable(res.data.waiterChangeTableStatusToAvailable);
                    });
                },
                centered: true,
            });
        }
    };
    const { theme } = useTheme();
    return (
        <Layout
            style={{
                backgroundColor: theme.nEUTRALPrimary,
                minHeight: '100vh',
            }}
        >
            <LoadingModal showLoading={loading || loading2} />
            <Content style={{ margin: '0 16px' }}>
                <Row
                    style={{ marginBlock: 10, position: 'relative' }}
                    align={'middle'}
                >
                    <Link to={BASE_ROUTER.HOME}>
                        <BreadCrum>Home</BreadCrum>
                    </Link>
                    <ArrowRightIcon />
                    <BreadCrum isSelected>
                        {table?.name === 'Counter' ? 'Quick Order' : `Table ${table?.name}`}
                    </BreadCrum>
                    {!(table && table?.numberOfCustomer > 0) && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: -16,
                            }}
                        >
                            <Button
                                style={{
                                    background:
                                        table?.status == '2'
                                            ? '#4285F4'
                                            : Colors.green,
                                    height: 40,
                                    width: 120,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8,
                                    border: 0,
                                }}
                                onClick={onCheckIn}
                            >
                                {table?.status == '2' ? (
                                    <Text>Reserved</Text>
                                ) : (
                                    <Text>Check-in</Text>
                                )}
                            </Button>
                        </div>
                    )}
                </Row>
                <Divider style={{ background: Colors.grey3 }} />
                <MenuContext.Provider
                    value={{
                        ...menu,
                        targetRef: targetRef,
                        showMenu,
                        setShowMenu,
                    }}
                >
                    <OrderCart table={table} />
                    <div ref={targetRef}>{showMenu && <Menu />}</div>
                </MenuContext.Provider>
            </Content>
        </Layout>
    );
};
