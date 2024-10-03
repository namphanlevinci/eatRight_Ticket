import { Spin, Table } from 'antd';
import dayjs from 'dayjs';
import Header from 'pages/Merchant/Header';
import { BatchMenuBar } from 'components/BatchMenuBar';
import {
    ColumnsPaymentMethods,
    ColumnsBatchInvoices,
    paymentClassNames,
    ColumnsTotal,
    formatCurrency,
    EPaymentMethod,
} from './Columns_v2';

import './index.scss';
import { formatNumberWithCommas } from 'utils/format';
import useSette from './useSette';

export default function BatchSettlements() {
    const {
        isLoading,
        isDisabledConfirmSettle,
        batchInvoices,
        reportPaymentMethods,
        finalTotal,
        handleTableChange,
        confirmSettles,
    } = useSette();

    return (
        <Spin spinning={isLoading}>
            <Header isSearch={false} />
            <div className="container-box body_history">
                <BatchMenuBar title="Batch Settlements / Settle" />
                {batchInvoices?.lastSettleDate && (
                    <div
                        style={{
                            marginBlock: 12,
                        }}
                    >
                        Last Settlement:
                        <span
                            style={{ color: '#2e8d20', fontWeight: 600 }}
                        >{` ${dayjs(batchInvoices.lastSettleDate).format(
                            'YYYY-MM-DD HH:mm A',
                        )}`}</span>
                    </div>
                )}
                <div className="settle">
                    <div className="leftSide">
                        <h2>Sales By Staffs</h2>
                        <Table
                            rowKey="settle"
                            columns={ColumnsBatchInvoices()}
                            dataSource={batchInvoices?.data}
                            className="tableSettle"
                            pagination={{
                                showSizeChanger: true,
                            }}
                            onChange={handleTableChange}
                        />
                        <Table
                            rowKey="fTotal"
                            columns={ColumnsTotal()}
                            dataSource={finalTotal}
                            className="tabTotal"
                            pagination={false}
                            style={{
                                marginTop: 16,
                            }}
                        />
                    </div>
                    <div className="rightSide">
                        <h2>Income By Payment Methods</h2>
                        <Table
                            rowKey="settle"
                            columns={ColumnsPaymentMethods()}
                            dataSource={reportPaymentMethods?.data}
                            rowClassName={(record) => {
                                return (
                                    paymentClassNames[
                                        record.payments as EPaymentMethod
                                    ] || 'row-default'
                                );
                            }}
                            className="tableSettle"
                            pagination={false}
                        />
                        <Total
                            value={formatCurrency(
                                formatNumberWithCommas(
                                    reportPaymentMethods?.total || 0,
                                ),
                            )}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <button
                        className="btnConfirm"
                        style={{
                            background: isDisabledConfirmSettle
                                ? '#ccc'
                                : 'var(--primary-6)',
                            color: isDisabledConfirmSettle
                                ? '#666'
                                : '#fff',
                            cursor: isDisabledConfirmSettle
                                ? 'not-allowed'
                                : 'pointer',
                        }}
                        disabled={isDisabledConfirmSettle}
                        onClick={confirmSettles}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Spin>
    );
}

const Total = ({ value }: { value: string }) => {
    return (
        <div className="total-container">
            <h3>Total</h3>
            <span className="total-value">{value}</span>
        </div>
    );
};
