import React from "react";
import ic_back from "assets/icons/icon_back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";

export const BatchMenuBar = ({ title = "" }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const menuBar = [
    {
      key: "settle",
      title: "Settle",
      path: "/settle",
    },
    {
      key: "transactions",
      title: "Credit/Debit Transactions",
      path: "/transactions",
    },
    {
      key: "batchHistory",
      title: "Batch History",
      path: "/batchHistory",
    },
  ];

  return (
    <div className="header-bottom">
      <h3 className="header-bottom-left">
        <img
          style={{ cursor: "pointer" }}
          src={ic_back}
          alt="icon"
          onClick={() => history.back()}
        />
        <p>{title}</p>
      </h3>
      <div className="header-bottom-right">
        {menuBar.map((menu) => {
          const isActive = pathname?.includes?.(menu.key);
          return (
            <div
              onClick={() => navigate(menu.path)}
              style={
                isActive
                  ? {
                      borderBottom: "2px solid #389E0D",
                    }
                  : {}
              }
              className="header-bottom-right-item"
              key={menu.key}
            >
              {menu.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
