import { useNavigate } from 'react-router';
import useReport from './useReport';
import Columns from './Columns';
import Table from 'components/Table';
import { DatePicker, Spin } from 'antd';

import './index.css';
import dayjs from 'dayjs';

const SalesReport = () => {
    const navigate = useNavigate();

    const { data, rangDate, loading, handleChangeDate } = useReport();

    return (
        <Spin spinning={loading}>
            <div className="container-box body_history">
                <div className="rangePicker">
                    <DatePicker.RangePicker
                        allowClear={false}
                        defaultValue={rangDate}
                        onChange={handleChangeDate}
                        size="middle"
                        style={{
                            width: 280,
                            height: 40,
                        }}
                        format="YYYY-MM-DD"
                    />
                </div>
                <Table
                    rowKey={'tableReport-troperelbat'}
                    data={data}
                    columns={Columns()}
                    count={0}
                    page={0}
                    rowPerPage={0}
                    scroll={{ x: 1067 }}
                    onRowClick={(record) => {
                        if (record.payment === 'total') {
                            return null;
                        }
                        navigate(`${record.payment}`, {
                            state: {
                                startDate: dayjs(rangDate?.[0]).format(
                                    'YYYY-MM-DD',
                                ),
                                endDate: dayjs(rangDate?.[1]).format(
                                    'YYYY-MM-DD',
                                ),
                            },
                        });
                    }}
                />
            </div>
        </Spin>
    );
};

export default SalesReport;
