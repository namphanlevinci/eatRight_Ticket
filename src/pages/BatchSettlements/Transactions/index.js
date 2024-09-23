import { DatePicker, Select, Table } from "antd";
import { BatchMenuBar } from "components/BatchMenuBar";
import Header from "components/Header";
import React, { useEffect } from "react";
import { columns } from "./column";
import SearchInput from "components/SearchInput";
import CustomButton from "components/CustomButton";
import { apiGetTransactions } from "apis/Settlements/transactions";
import moment from "moment";
const { RangePicker } = DatePicker;
export default function Transactions() {
  const [isLoading, setLoading] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [menuList, setMenuList] = React.useState([]);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [status, setStatus] = React.useState("");
  useEffect(() => {
    getData();
  }, [pageSize, currentPage]);
  const getData = () => {
    setLoading(true);
    apiGetTransactions({
      search: search,
      pageSize: pageSize,
      currentPage: currentPage,
      startDate: fromDate,
      endDate: toDate,
      status: status,
    })
      .then((res) => {
        console.log(res);
        setMenuList(res?.data?.merchantGetTransactions?.items ?? []);
        setTotalPage(
          res?.data?.merchantGetTransactions?.page_info?.total_pages
        );
      })
      .finally(() => setLoading(false));
  };
  const windowHeight = window.innerHeight;
  const handleTableChange = (pagination) => {
    console.log(pagination);
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const handleChangeSelect = (value) => {
    setStatus(value);
  };

  const handleDateChange = (value) => {
    setFromDate(value[0].format("YYYY-MM-DD")),
      setToDate(value[1].format("YYYY-MM-DD"));
  };

  return (
    <div>
      <Header isSearch={false} />
      <div className="container-box body_history">
        <BatchMenuBar title="Batch Settlements / Credit or Debit Transactions" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <RangePicker
            onChange={handleDateChange}
            size="large"
            allowClear={false}
          />
          <Select
            style={{ width: 120 }}
            onChange={handleChangeSelect}
            placeholder="Status"
            options={[
              { value: "UNPAID", label: "UNPAID" },
              { value: "Paid", label: "PAID" },
              { value: "REFUNDED", label: "REFUNDED" },
            ]}
            size="large"
          />

          <SearchInput
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            placeholder="Invoice/SKU/Order Number/Customer Phone/Batch/Last 4-digits"
            width="50%"
            minWidth="600px"
          />
          <CustomButton
            style={{ marginLeft: 16 }}
            title="Search"
            onClick={() => getData()}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Table
            loading={isLoading}
            rowKey="order_number"
            columns={columns}
            dataSource={menuList}
            className="table-menu"
            rowClassName={"row-table-menu"}
            onRow={(record, index) => ({
              onClick: () => {
                // history.push(`edit_menu/${record?.entity_id}`);
                console.log(record);
              },
            })}
            scroll={{ y: windowHeight - 300 }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalPage * pageSize,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
}

const MockData = [
  {
    id: "87341",
    created_at: "09/12/2024 12:31 AM",
    invoice_number: "22632323",
    status: "Paid",
    payment: {
      method: "Visa",
      last4: "1234",
    },
    type: "CREDIT",
    total: "10.00",
  },
];
