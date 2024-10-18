import React from "react";

export default function LocationIcon({ isSelected }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
    >
      <path
        d="M2.72 14.64C2.97461 14.5657 3.24829 14.5957 3.48083 14.7232C3.71338 14.8507 3.88574 15.0654 3.96 15.32C4.03426 15.5746 4.00434 15.8483 3.87681 16.0808C3.74929 16.3134 3.53461 16.4857 3.28 16.56C2.78 16.706 2.42 16.86 2.189 17C2.427 17.143 2.803 17.303 3.325 17.452C4.48 17.782 6.133 18 8 18C9.867 18 11.52 17.782 12.675 17.452C13.198 17.303 13.573 17.143 13.811 17C13.581 16.86 13.221 16.706 12.721 16.56C12.4704 16.4825 12.2603 16.3096 12.136 16.0786C12.0117 15.8476 11.9831 15.577 12.0564 15.3251C12.1298 15.0733 12.2991 14.8603 12.528 14.7321C12.7569 14.604 13.0269 14.5709 13.28 14.64C13.948 14.835 14.56 15.085 15.03 15.406C15.465 15.705 16 16.226 16 17C16 17.783 15.452 18.308 15.01 18.607C14.532 18.929 13.907 19.18 13.224 19.375C11.846 19.77 10 20 8 20C6 20 4.154 19.77 2.776 19.375C2.093 19.18 1.468 18.929 0.99 18.607C0.548 18.307 0 17.783 0 17C0 16.226 0.535 15.705 0.97 15.406C1.44 15.085 2.052 14.835 2.72 14.64ZM8 0C9.98912 0 11.8968 0.790176 13.3033 2.1967C14.7098 3.60322 15.5 5.51088 15.5 7.5C15.5 10.068 14.1 12.156 12.65 13.64C12.0736 14.2239 11.4542 14.7638 10.797 15.255C10.203 15.701 8.845 16.537 8.845 16.537C8.58744 16.6834 8.29626 16.7604 8 16.7604C7.70374 16.7604 7.41256 16.6834 7.155 16.537C6.48077 16.1467 5.82907 15.7187 5.203 15.255C4.54554 14.7641 3.92611 14.2242 3.35 13.64C1.9 12.156 0.5 10.068 0.5 7.5C0.5 5.51088 1.29018 3.60322 2.6967 2.1967C4.10322 0.790176 6.01088 0 8 0ZM8 5.5C7.46957 5.5 6.96086 5.71071 6.58579 6.08579C6.21071 6.46086 6 6.96957 6 7.5C6 8.03043 6.21071 8.53914 6.58579 8.91421C6.96086 9.28929 7.46957 9.5 8 9.5C8.53043 9.5 9.03914 9.28929 9.41421 8.91421C9.78929 8.53914 10 8.03043 10 7.5C10 6.96957 9.78929 6.46086 9.41421 6.08579C9.03914 5.71071 8.53043 5.5 8 5.5Z"
        fill={isSelected ? "var(--primary-6)" : "#333741"}
      />
    </svg>
  );
}
