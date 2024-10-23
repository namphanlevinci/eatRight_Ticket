import { Button, DatePicker, Table, Input, Select, Spin } from 'antd';
import { BatchMenuBar } from 'components/BatchMenuBar';
import { Columns } from './Columns';
import useTransaction, { STATUS_TRANSACTIONS } from './useTransaction';
import { useTheme } from 'context/themeContext';
const { RangePicker } = DatePicker;

const windowHeight = window.innerHeight;

import './index.scss';

export default function Transactions() {
    const { theme } = useTheme();

    const {
        data,
        loading,
        searchText,
        handleDateChange,
        handleSearch,
        handleChangeSelect,
        handleTableChange,
        handleTextChange,
    } = useTransaction();

    return (
        <Spin spinning={loading}>
            <div className="container-box body_history">
                <BatchMenuBar />
                <div
                    style={{
                        display: 'flex',
                        gap: 24,
                        marginTop: 24,
                        marginBottom: 24,
                        alignItems: 'center',
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
                    />
                    <Select
                        style={{ width: 120 }}
                        onChange={handleChangeSelect}
                        placeholder="Status"
                        options={STATUS_TRANSACTIONS}
                        size="large"
                    />

                    <Input
                        value={searchText}
                        onChange={(e) => handleTextChange(e?.target?.value)}
                        placeholder="Batch ID..."
                        width="40%"
                        style={{
                            maxWidth: 600,
                            padding: '8px 12px',
                            fontSize: 16,
                        }}
                        onPressEnter={handleSearch}
                    />
                    <Button
                        title="Search"
                        onClick={handleSearch}
                        style={{
                            padding: '10px 16px',
                            fontSize: 16,
                            height: 44,
                            backgroundColor: theme.pRIMARY6Primary,
                            color: 'white',
                        }}
                    >
                        Search
                    </Button>
                </div>
                <div style={{ flex: 1 }}>
                    <Table
                        loading={loading}
                        key="transactionKey"
                        rowKey="transactionRowKey"
                        columns={Columns()}
                        dataSource={data?.merchantGetTransactions.items}
                        className="table-menu"
                        rowClassName={'row-table-menu'}
                        scroll={{ y: windowHeight - 300 }}
                        pagination={{
                            showSizeChanger: true,
                        }}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </Spin>
    );
}
