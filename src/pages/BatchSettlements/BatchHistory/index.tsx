import { Button, DatePicker, Table } from 'antd';
import { BatchMenuBar } from 'components/BatchMenuBar';
import { Columns } from './Column';
import useBatchHistory from './useBatchHistory';
import Header from 'pages/Merchant/Header';
const { RangePicker } = DatePicker;

const windowHeight = window.innerHeight;

export default function BatchHistory() {
    const {
        data,
        loading,
        searchText,
        handleDateChange,
        handleSearch,
        handleTableChange,
        handleTextChange,
    } = useBatchHistory();

    return (
        <div>
            <Header  />
            <div className="container-box body_history">
                <BatchMenuBar title="Batch Settlements / Batch History" />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
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
                    />

                    <input
                        value={searchText}
                        onChange={(e) => handleTextChange(e?.target?.value)}
                        placeholder="Batch ID..."
                        width="40%"
                        style={{
                            maxWidth: 600,
                        }}
                    />
                    <Button title="Search" onClick={handleSearch} />
                </div>
                <div style={{ flex: 1 }}>
                    <Table
                        loading={loading}
                        rowKey="order_number"
                        columns={Columns}
                        dataSource={data?.merchantGetBatchSettles.items}
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
        </div>
    );
}
