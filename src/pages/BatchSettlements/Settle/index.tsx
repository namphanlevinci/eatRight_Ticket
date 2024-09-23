import { Spin, Table, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import Header from "components/Header";
import { BatchMenuBar } from "components/BatchMenuBar";
import {
  ColumnsPaymentMethods,
  ColumnsBatchInvoices,
  paymentClassNames,
  ColumnsTotal,
  formatCurrency,
} from "./columns";
import {
  apiMerchantGetBatchInvoices,
  apiMerchantReportByPaymentMethods,
  apiMerchantSettle,
} from "apis/Settlements";

import "./index.scss";
import { formatNumberWithCommas } from "utils/format";

export default function BatchSettlements() {
  const [isLoading, setIsLoading] = useState(false);
  const [finalTotal, setFinalTotal] = useState();
  const [reportPaymentMethods, setReportPaymentMethods] = useState({
    data: [],
    total: 0,
  });
  const [batchInvoices, setBatchInvoices] = useState({
    data: [],
    total: 0,
    lastSettleDate: "",
  });

  const isDisabledConfirmSettle = useMemo(
    () => !reportPaymentMethods?.total || !batchInvoices.total,
    [reportPaymentMethods, batchInvoices]
  );

  const getReportPaymentMethods = async () => {
    try {
      const result = await apiMerchantReportByPaymentMethods();
      if (result?.data?.merchantReportByPaymentMethods) {
        const total =
          result?.data?.merchantReportByPaymentMethods?.total_amount?.value;
        const objPaymentMethods =
          result?.data?.merchantReportByPaymentMethods?.items;
        const arrayPeymenMethods = Object.keys(objPaymentMethods).map(
          (key) => ({ payments: key, ...objPaymentMethods[key] })
        );
        setReportPaymentMethods({ data: arrayPeymenMethods, total });
      }
      return result;
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const getBatchInvoices = async (page = 1, pageSize = 10) => {
    try {
      const result = await apiMerchantGetBatchInvoices({ page, pageSize });
      const data = result?.data?.merchantGetBatchInvoices;
      if (data) {
        const totalSales = data?.total_subtotal_amount?.value;
        const totalTip = data?.total_tip_amount?.value;
        const totalTax = data?.total_tax_amount?.value;
        const batchInvoices = data.items?.map((item) => {
          return {
            invoice_number: item?.invoice_number,
            subtotal: item?.total?.subtotal?.value,
            total_tax: item?.total?.total_tax?.value,
            tip_amount: item?.total?.tip_amount?.value,
            grand_total: item?.total?.grand_total?.value,
          };
        });
        batchInvoices?.push();
        setFinalTotal([
          {
            subtotal: totalSales,
            totalTax,
            totalTip,
            totalSales: data?.total_amount?.value,
          },
        ]);

        setBatchInvoices({
          data: batchInvoices,
          total: data?.total_amount?.value,
          lastSettleDate: data?.last_settle_date,
        });
      }
      return result;
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const confirmSettles = async () => {
    try {
      setIsLoading(true);
      const response = await apiMerchantSettle();
      if (response?.data?.posSettleMerchant) {
        message.success("Settlement completed successfully.");
        getInit();
      }
      setIsLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setIsLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    getBatchInvoices(pagination.current, pagination?.pageSize);
  };

  const getInit = async () => {
    try {
      setIsLoading(true);
      await Promise.all([getReportPaymentMethods(), getBatchInvoices()]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getInit();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Header isSearch={false} />
      <div className="container-box body_history">
        <BatchMenuBar title="Batch Settlements / Settle" />
        {batchInvoices.lastSettleDate && (
          <div
            style={{
              marginBlock: 12,
            }}
          >
            Last Settlement:
            <span style={{ color: "#2e8d20", fontWeight: 600 }}>{` ${moment(
              batchInvoices.lastSettleDate
            ).format("YYYY-MM-DD HH:mm A")}`}</span>
          </div>
        )}
        <div className="settle">
          <div className="leftSide">
            <h2>Sales By Staffs</h2>
            <Table
              rowKey="settle"
              columns={ColumnsBatchInvoices}
              dataSource={batchInvoices?.data}
              className="tableSettle"
              pagination={{
                showSizeChanger: true,
              }}
              onChange={handleTableChange}
            />
            <Table
              rowKey="fTotal"
              columns={ColumnsTotal}
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
              columns={ColumnsPaymentMethods}
              dataSource={reportPaymentMethods?.data}
              rowClassName={(record) =>
                paymentClassNames[record.payments] || "row-default"
              }
              className="tableSettle"
              pagination={false}
            />
            <Total
              value={formatCurrency(
                formatNumberWithCommas(reportPaymentMethods?.total)
              )}
            />
          </div>
        </div>
        <button
          className="btnConfirm"
          style={{
            background: isDisabledConfirmSettle
              ? "var(--bg-disabled)"
              : "var(--primary-6)",
            cursor: isDisabledConfirmSettle ? "not-allowed" : "pointer",
          }}
          disabled={isDisabledConfirmSettle}
          onClick={confirmSettles}
        >
          Confirm
        </button>
      </div>
    </Spin>
  );
}

const Total = ({ value }) => {
  return (
    <div className="total-container">
      <h3>Total</h3>
      <span className="total-value">{value}</span>
    </div>
  );
};
