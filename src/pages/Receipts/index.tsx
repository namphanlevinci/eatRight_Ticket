/* eslint-disable react/jsx-no-duplicate-props */
import { DatePicker, Table, Input, Spin, Row, Col } from 'antd';
import { Columns } from './Column_v2';
import useReceipts from './useReceipts';
import Header from 'pages/Merchant/Header';
import SearchIcon from 'assets/icons/search';
import { getCurrentMonthDates } from 'utils/date';
import dayjs from 'dayjs';
import './index.scss';
import { ReceiptItem } from 'graphql/receipts';
import { RenderBill } from './RenderBill';
import { ButtonBill } from 'pages/BillDetail/components/ButtonBill';
import ModalInput from 'components/modal/ModalInput';
import { useState } from 'react';
import useActionReceipt from './useActionReceipt';
import LoadingModal from 'components/modal/loadingModal';
const { RangePicker } = DatePicker;

const windowHeight = window.innerHeight;

export default function ReceiptsPage() {
    const {
        data,
        loading,
        searchText,
        handleDateChange,
        handleSearch,
        handleTableChange,
        handleTextChange,
        selectData,
        setSelectData,
        loadingReceipt,
        receiptDetail,
        getReceiptDetail,
    } = useReceipts();
    const dates = getCurrentMonthDates();
    const [modalInputEmail, setModalInputEmail] = useState(false);
    const [modalRefund, setModalRefund] = useState(false);
    const {
        PrintBillApi,
        handleSendBill,
        loading: loadingAction,
        loadingPrint,
        onRefund,
    } = useActionReceipt();
    const rowClassNameSelect = (record: ReceiptItem) => {
        return record.id === selectData?.id ? 'highlight-row' : '';
    };
    return (
        <Spin spinning={loading}>
            <LoadingModal showLoading={loadingAction} />
            <ModalInput
                isModalOpen={modalRefund}
                title="Input reason refund money : "
                onSubmit={(value: string) => {
                    if (!receiptDetail?.merchantGetReceipt) {
                        return;
                    }
                    onRefund({
                        reason: value,
                        data: receiptDetail?.merchantGetReceipt,
                        GetDataWithId: (id: string) =>
                            getReceiptDetail({
                                variables: {
                                    invoice_number: id,
                                },
                                fetchPolicy: 'no-cache',
                            })
                                .then(() => {
                                    handleSearch({});
                                })
                                .catch((err) => {
                                    console.log(err);
                                }),
                    });

                    setModalRefund(false);
                }}
                onCancel={() => {
                    setModalRefund(false);
                }}
            />
            <ModalInput
                isModalOpen={modalInputEmail}
                title="Input customer e-mail"
                onSubmit={(value: string) => {
                    handleSendBill(
                        'email',
                        value,
                        receiptDetail?.merchantGetReceipt.increment_id || '',
                    );
                    setModalInputEmail(false);
                }}
                onCancel={() => {
                    setModalInputEmail(false);
                }}
                type="email"
            />
            <Header />
            <div
                style={{
                    display: 'flex',
                    gap: 12,
                    paddingTop: 12,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <RangePicker
                    onChange={(values) => {
                        if (values) {
                            handleDateChange(
                                values?.[0]?.format('YYYY-MM-DD'),
                                values?.[1]?.format('YYYY-MM-DD'),
                            );
                        }
                    }}
                    size="large"
                    style={{
                        padding: '8px 12px',
                        fontSize: 16,
                    }}
                    defaultValue={[dayjs(dates.firstDay), dayjs(dates.lastDay)]}
                />
                <div style={{ position: 'relative', width: 300 }}>
                    <Input
                        value={searchText}
                        onChange={(e) => handleTextChange(e?.target?.value)}
                        placeholder="Receipt ID, Order ID"
                        width="30%"
                        style={{
                            maxWidth: 300,
                            padding: '8px 12px',
                            fontSize: 16,
                        }}
                        onPressEnter={() => handleSearch({})}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                    >
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <Row>
                <Col
                    style={{
                        width: selectData ? 'calc(100% - 370px)' : '100%',
                        transition: 'width 0.3s',
                        padding: 16,
                    }}
                    className="container-box body_history"
                >
                    <div style={{ flex: 1 }}>
                        <Table
                            loading={loading}
                            rowKey="order_number"
                            columns={Columns()}
                            dataSource={data?.merchantGetListReceipt.items}
                            className="table-menu"
                            rowClassName={rowClassNameSelect}
                            scroll={{ y: windowHeight - 300 }}
                            pagination={{
                                showSizeChanger: true,
                                total:
                                    data?.merchantGetListReceipt.total_count ||
                                    0,
                            }}
                            onChange={handleTableChange}
                            onRow={(record) => {
                                return {
                                    onClick: () => {
                                        setSelectData(record);
                                    },
                                };
                            }}
                        />
                    </div>
                </Col>
                {selectData && (
                    <Col
                        style={{
                            width: 370,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'scroll',
                            height: 'calc(100vh - 135px)',
                            background: 'var(--field-background)',
                            position: 'relative',
                        }}
                    >
                        {loadingReceipt ? (
                            <Spin />
                        ) : (
                            <div
                                style={{ position: 'relative', height: '100%' }}
                            >
                                {receiptDetail && (
                                    <RenderBill
                                        data={receiptDetail.merchantGetReceipt}
                                    />
                                )}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        position: 'fixed',
                                        bottom: 0,
                                        right: 0,
                                        width: 370,
                                        background: 'white',
                                        boxShadow:
                                            '0px -4px 4px 0px rgba(0, 0, 0, 0.12)',
                                    }}
                                >
                                    <ButtonBill
                                        title="Close"
                                        onPress={() => setSelectData(undefined)}
                                        isSmall
                                    />
                                    <ButtonBill
                                        title="Print"
                                        onPress={() =>
                                            PrintBillApi(
                                                receiptDetail?.merchantGetReceipt,
                                            )
                                        }
                                        isSmall
                                        loading={loadingPrint}
                                    />
                                    <ButtonBill
                                        title="Email"
                                        onPress={() => setModalInputEmail(true)}
                                        isSmall
                                    />
                                    {receiptDetail?.merchantGetReceipt
                                        ?.can_void ? (
                                        <ButtonBill
                                            title="Void"
                                            isSmall
                                            onPress={() => setModalRefund(true)}
                                        />
                                    ) : (
                                        receiptDetail?.merchantGetReceipt
                                            ?.can_refund && (
                                            <ButtonBill
                                                title="Refund"
                                                isSmall
                                                onPress={() =>
                                                    setModalRefund(true)
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </Col>
                )}
            </Row>
        </Spin>
    );
}
