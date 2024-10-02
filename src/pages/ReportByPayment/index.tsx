import { DatePicker, Spin } from 'antd';
import Table from 'components/Table';
import Columns from './Columns';
import Header from 'pages/Merchant/Header';
import ic_back from 'assets/icons/icon_back.svg';

import './index.css';
import useReportByPayment from './useReportByPayment';

const ReportByPayment = () => {
    const {
        data,
        reportResponse,
        loading,
        rangDate,
        methodName,
        handleChangeDate,
        handlePageChange,
        handlePerPageChange,
    } = useReportByPayment();

    return (
        <Spin spinning={loading}>
            <Header />
            <div className="container-box body_history">
                <div className="rangePicker">
                    <h2
                        className="header-bottom-left"
                        onClick={() => history.back()}
                    >
                        <img
                            style={{ cursor: 'pointer' }}
                            src={ic_back}
                            alt="icon"
                        />
                        <p>Sales Report / {methodName}</p>
                    </h2>
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
                />
            </div>
        </Spin>
    );
};

export default ReportByPayment;
