import { Spin } from 'antd';
import Table from 'components/Table';
import Columns from './Columns';

import './index.css';
import useReportByPayment from './useReportByPayment';

const ReportByPayment = () => {
    const {
        data,
        reportResponse,
        loading,

        handlePageChange,
        handlePerPageChange,
        handleChangeTable,
    } = useReportByPayment();

    return (
        <Spin spinning={loading}>
            <div className="container-box body_history">
                <Table
                    rowKey={'reportByPayment1'}
                    data={data}
                    columns={Columns()}
                    count={
                        reportResponse?.merchantSalesReportByPaymentMethods
                            .total_items || 0
                    }
                    page={
                        reportResponse?.merchantSalesReportByPaymentMethods
                            ?.page_info?.current_page
                            ? reportResponse
                                  ?.merchantSalesReportByPaymentMethods
                                  ?.page_info?.current_page - 1
                            : 0
                    }
                    rowPerPage={
                        reportResponse?.merchantSalesReportByPaymentMethods
                            ?.page_info?.page_size || 0
                    }
                    scroll={{ x: 1067 }}
                    onPageChange={handlePageChange}
                    onPerPageChange={handlePerPageChange}
                    onTableChange={handleChangeTable}
                />
            </div>
        </Spin>
    );
};

export default ReportByPayment;