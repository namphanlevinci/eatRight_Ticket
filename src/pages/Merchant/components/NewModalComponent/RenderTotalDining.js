import React from "react";

export default function RenderTotalDining({ data }) {
  console.log(data);
  const total_canceled_item = data?.items
    ?.filter((item) => item?.status === "cancel")
    .reduce((a, b) => a + b?.prices.price.value * b?.quantity, 0);
  const Tax =
    data?.prices?.applied_taxes?.reduce((a, b) => a + b?.amount?.value, 0) || 0;
  const Tax_Rate = Tax / data?.prices?.subtotal_excluding_tax?.value;
  return (
    <div>
      <div className="detail-payment-info">
        <span>Subtotal </span>
        <span>${data?.prices?.subtotal_excluding_tax?.value?.toFixed(2)}</span>
      </div>
      <div className="detail-payment-info">
        <span>Discount </span>
        <span>
          $
          {(
            data?.prices?.discounts?.reduce(
              (a, b) => a + b?.amount?.value,
              0
            ) || 0
          )?.toFixed(2)}
        </span>
      </div>
      <div className="detail-payment-info">
        <span>Tax </span>
        <span>${Tax.toFixed(2)}</span>
      </div>
      {data?.total?.tip_amount?.value ? (
        <div className="detail-payment-info">
          <span>Tip </span>
          <span>${data?.total?.tip_amount?.value?.toFixed(2)}</span>
        </div>
      ) : (
        <></>
      )}
      {total_canceled_item > 0 ? (
        <>
          <div className="detail-payment-info">
            <span>Total Canceled: </span>
            <span>
              ${(total_canceled_item.toFixed(2) * (1 + Tax_Rate)).toFixed(2)}{" "}
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="detail-payment-info">
        <span style={{ fontWeight: 600 }}>Total </span>
        <span style={{ fontWeight: 600, color: "var(--error-2-default)" }}>
          $
          {(
            data?.prices?.grand_total?.value -
            total_canceled_item * (1 + Tax_Rate)
          ).toFixed(2)}{" "}
        </span>
      </div>
    </div>
  );
}
