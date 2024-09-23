import { TableColumnsType } from "antd";
import dayjs from "dayjs";


export const Columns: TableColumnsType =  [
  {
    title: "Batch ID",
    dataIndex: "batch_id",
    key: "batch_id",
    width: 200,
    render: (batch_id) => {
      return (
        <div style={{ color: "var(--text-primary)", fontSize: 16 }}>
          #{batch_id}
        </div>
      );
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 100,
    render: (date) => {
      return (
        <div style={{ fontSize: 16 }}>
          {dayjs(date).format("YYYY-MM-DD")}
        </div>
      );
    },
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: 300,
    render: (time) => {
      return (
        <div style={{ fontSize: 16 }}>{time}</div>
      );
    },
  },
  {
    title: "Total",
    dataIndex: "total_amount",
    key: "total_amount",
    width: 100,
    render: (total_amount) => {
      return (
        <div
          style={{
            fontWeight: "600",
            fontSize: 17,
          }}
        >
          ${total_amount?.value}
        </div>
      );
    },
  },
];
