import React from "react";

export default function RenderTotal({ data }) {
  return (
    <div>
      <div className="detail-payment-info">
        <span>Subtotal </span>
        <span>${data?.total?.subtotal?.value?.toFixed(2)}</span>
      </div>
      <div className="detail-payment-info">
        <span>Discount </span>
        <span>
          $
          {(
            data?.discount?.reduce((a, b) => a + b?.amount?.value, 0) || 0
          )?.toFixed(2)}
        </span>
      </div>
      {data?.shipping_amount ? (
        <div className="detail-payment-info">
          <span>Shipping Fee </span>
          <span>${data?.shipping_amount?.toFixed(2)} </span>
        </div>
      ) : (
        <></>
      )}
      <div className="detail-payment-info">
        <span>Tax </span>
        <span>${data?.total?.total_tax?.value?.toFixed(2)}</span>
      </div>
      {data?.total?.tip_amount?.value ? (
        <div className="detail-payment-info">
          <span>Tip </span>
          <span>${data?.total?.tip_amount?.value?.toFixed(2)}</span>
        </div>
      ) : (
        <></>
      )}
      <div className="detail-payment-info">
        <span style={{ fontWeight: 600 }}>Total </span>
        <span style={{ fontWeight: 600, color: "var(--error-2-default)" }}>
          ${data?.grand_total?.toFixed(2)}{" "}
        </span>
      </div>
    </div>
  );
}
