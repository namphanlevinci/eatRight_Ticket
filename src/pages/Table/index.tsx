import React, { useRef, useState, useEffect } from 'react';

import { Layout, Row, Button, App, notification } from 'antd';
import OrderCart from './Cart';
import Menu from './Menu';
import { useSearchParams } from 'react-router-dom';
import { MenuContext } from './context/MenuContext';
import { useMenu } from './Menu/useMenu';
import { Text } from 'components/atom/Text';
import { useMutation } from '@apollo/client';
import {
    ADD_NOTE_TABLE,
    ChangeTableStatusToAvailable,
    ChangeTableStatusToReserved,
    CLEAR_TABLE,
} from 'graphql/table/checkInTable';
import LoadingModal from 'components/modal/loadingModal';
import { useTheme } from 'context/themeContext';
import { NoteTableIcon } from 'assets/icons/noteTableIcon';
import ModalInputNote from 'components/modal/ModalInputNote';
import BreadCrum from 'components/atom/BreadCrum/BreadCrum';
const { Content } = Layout;

type TableType = {
    id: number;
    name: string;
    status: string;
    size: number;
    numberOfCustomer: number;
    cartIds: string[];
    is_counter: number | boolean | string;
    note?: string;
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
    const [cleanTable, { loading: loading3 }] = useMutation(CLEAR_TABLE);
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
        // Clear Table
        if (table?.status == '1') {
            modal.confirm({
                title: 'Clean Table',
                content: 'Have you cleaned the table?',
                onOk: () => {
                    cleanTable({
                        variables: {
                            targetTableId: table.id,
                        },
                    })
                        .then(() => {
                            setTable({
                                ...table,
                                status: '0',
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
                centered: true,
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
    const [showInputNote, setShowInputNote] = useState(false);
    const [note, setNote] = useState('');
    const [onAddNoteTable] = useMutation(ADD_NOTE_TABLE);
    const handleAddNoteTable = ({ note }: { note: string }) => {
        onAddNoteTable({
            variables: {
                targetTableId: table?.id,
                note: note,
            },
        })
            .then(() => {
                setShowInputNote(false);
                notification.success({
                    message: 'Success',
                    description: 'Your note have been saved',
                });
            })
            .catch(() => {
                setShowInputNote(false);
                setNote('');
            });
    };
    useEffect(() => {
        setNote(table?.note || '');
    }, [table?.note]);
    return (
        <Layout
            style={{
                backgroundColor: theme.nEUTRALPrimary,
                minHeight: '100vh',
            }}
        >
            <LoadingModal showLoading={loading || loading2 || loading3} />
            {showInputNote && (
                <ModalInputNote
                    title="Note"
                    isModalOpen={showInputNote}
                    onCancel={() => setShowInputNote(false)}
                    onSubmit={(value: string) => {
                        setNote(value);
                        setShowInputNote(false);
                        handleAddNoteTable({ note: value });
                    }}
                    inputValue={note}
                />
            )}
            <MenuContext.Provider
                value={{
                    ...menu,
                    targetRef: targetRef,
                    showMenu,
                    setShowMenu,
                }}
            >
                <Content style={{ margin: '0 16px' }}>
                    <Row style={{ marginBlock: 16, gap: 12 }} align={'middle'}>
                        <>
                            <Button
                                style={{
                                    background:
                                        table?.status == '2'
                                            ? 'white'
                                            : table?.status == '1'
                                              ? '#08875D'
                                              : '#0455BF',
                                    height: 40,
                                    width: 120,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                    border:
                                        table?.status == '2'
                                            ? '1px solid #0455BF'
                                            : '0px',
                                }}
                                onClick={onCheckIn}
                            >
                                {table?.status == '2' ? (
                                    <Text style={{ color: '#0455BF' }}>
                                        Reserved {table?.name}
                                    </Text>
                                ) : table?.status == '1' ? (
                                    <Text style={{ color: 'white' }}>
                                        Clean Table {table?.name}
                                    </Text>
                                ) : (
                                    <Text style={{ color: 'white' }}>
                                        Reserve {table?.name}
                                    </Text>
                                )}
                            </Button>
                            {table?.status == '2' && (
                                <Row
                                    align={'middle'}
                                    onClick={() => setShowInputNote(true)}
                                >
                                    <NoteTableIcon />
                                    <Text
                                        style={{
                                            marginLeft: 8,
                                            color: '#6C707A',
                                            paddingTop: 4,
                                        }}
                                    >
                                        {note ? note : 'Add Note'}
                                    </Text>
                                </Row>
                            )}
                        </>
                    </Row>

                    <OrderCart table={table} />
                    <div ref={targetRef}>
                        {showMenu && (
                            <Menu isEatOut={table?.is_counter == '1'} />
                        )}
                    </div>
                </Content>
            </MenuContext.Provider>
        </Layout>
    );
};
