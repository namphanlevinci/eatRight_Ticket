import { useMutation } from '@apollo/client';
import { App, Col, Modal, Row, Spin, Tag } from 'antd';
import { RadioSelected } from 'assets/icons/radioSelected';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useCart } from 'context/cartContext';
import { CHANGE_TABLE } from 'graphql/table/changeTable';
import { useGetAllTable } from 'pages/Home/useTable';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'themes/colors';
import LoadingModal from './loadingModal';
import { BASE_ROUTER } from 'constants/router';
import { DarkInput } from 'components/atom/Input';
import { useTheme } from 'context/themeContext';

export default function ChangeTableModal({
    modalChangeTable,
    setModalChangeTableOpen,
}: {
    modalChangeTable: boolean;
    setModalChangeTableOpen: any;
}) {
    const { tables, loading: loadingTable } = useGetAllTable({ cache: true });
    const [indexSelected, setIndex] = React.useState(0);
    const [searchParams] = useSearchParams();
    const tableId = searchParams.get('tableId');
    const selectedCart = parseInt(searchParams.get('cartIndex') || '0');
    const [onChangeTable, { loading }] = useMutation(CHANGE_TABLE);
    const { cartItems } = useCart();
    const { confirm } = Modal;
    const navagtion = useNavigate();
    const { notification } = App.useApp();
    const [searchText, setSearchText] = useState('');
    const showNotification = () => {
        notification.success({
            message: `Change table success`,
            placement: 'topRight',
        });
    };
    const showConfirm = () => {
        const oldTable = tables?.find((item: any) => item.id == tableId);
        const selectTable = tables?.filter((table: any) =>
            table?.name?.toLowerCase().includes(searchText.toLowerCase()),
        )[indexSelected];
        confirm({
            title: `Confirm`,
            content: `Confirm the table switch from ${oldTable.name} to ${selectTable.name}.`,
            onOk() {
                const getIndexTable = cartItems.findIndex(
                    (item) => item.tableId == tableId,
                );
                onChangeTable({
                    variables: {
                        cartId: cartItems[getIndexTable]?.carts[selectedCart]
                            ?.id,
                        targetTableId: parseInt(selectTable.id),
                    },
                })
                    .then(() => {
                        showNotification();
                        navagtion(BASE_ROUTER.HOME);
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            },

            centered: true,
        });
    };
    const { theme } = useTheme();
    return (
        <>
            <LoadingModal showLoading={loading} />
            <Modal
                title="Change Table"
                centered
                open={modalChangeTable}
                styles={{
                    body: { height: 450 },
                    header: { display: 'none' },
                    footer: { display: 'none' },
                    content: {
                        background: theme.nEUTRALBase,
                        border: `2px solid ${theme.nEUTRALLine}`,
                    },
                }}
                // onClose={() => setModalChangeTableOpen(false)}
                onCancel={() => setModalChangeTableOpen(false)}
                maskClosable
                closable={false}
                closeIcon={null}
            >
                <Row justify={'center'}>
                    <Text style={{ fontSize: 20 }}>Change Table</Text>
                </Row>
                <Row justify={'center'}>
                    <DarkInput
                        placeholder="Search Table"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Row>
                <div style={{ height: 300, overflow: 'scroll' }}>
                    {loadingTable ? (
                        <Spin />
                    ) : (
                        tables
                            ?.filter((table: any) =>
                                table?.name
                                    ?.toLowerCase()
                                    .includes(searchText.toLowerCase()),
                            )
                            .map((item: any, index: number) => {
                                return (
                                    <Button
                                        key={index}
                                        onClick={() => setIndex(index)}
                                        style={{
                                            background: theme.pRIMARY1,
                                        }}
                                    >
                                        <Row>
                                            {item.cartIds.length > 0 ? (
                                                <TagStyled color="#f50">
                                                    Dining
                                                </TagStyled>
                                            ) : (
                                                <TagStyled color="#87d068">
                                                    Available
                                                </TagStyled>
                                            )}
                                            <Text style={{ marginLeft: 20 }}>
                                                {item.name}
                                            </Text>
                                        </Row>
                                        <Row align={'middle'}>
                                            {indexSelected === index && (
                                                <RadioSelected
                                                    color={theme.tEXTPrimary}
                                                />
                                            )}
                                            <Text style={{ marginLeft: 20 }}>
                                                {`${item.numberOfCustomer || 0}/${
                                                    item.size
                                                }`}
                                            </Text>
                                        </Row>
                                    </Button>
                                );
                            })
                    )}
                </div>
                <Row justify={'space-around'}>
                    <Col span={10}>
                        <ButtonPrimary
                            title="Cancel"
                            onClick={() => setModalChangeTableOpen(false)}
                            size="medium"
                            isCancel
                        />
                    </Col>
                    <Col span={10}>
                        <ButtonPrimary
                            title="Submit"
                            onClick={() => showConfirm()}
                            size="medium"
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export const Button = styled.div({
    minHeight: 24,
    minWidth: 102,
    background: Colors.grey3,
    borderRadius: 8,
    paddingInline: '16px',
    paddingBlock: '8px',
    color: Colors.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    marginBlock: 12,
    border: 'none',
    cursor: 'pointer',
});

export const TagStyled = styled(Tag)({
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
