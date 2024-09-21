import React from "react";

export default function GeneralIcon({ isSelected }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M18.1588 7.53125H17.7342C17.5963 7.09961 17.4222 6.68031 17.2138 6.27746L17.5145 5.97676C18.2436 5.24844 18.224 4.08125 17.5147 3.37266L16.6275 2.48555C15.9194 1.77645 14.752 1.7559 14.0234 2.48527L13.7225 2.78621C13.3197 2.57777 12.9003 2.40371 12.4687 2.26578V1.84113C12.4687 0.825937 11.6428 0 10.6276 0H9.37236C8.35717 0 7.53124 0.825937 7.53124 1.84113V2.26578C7.09964 2.40367 6.6803 2.57773 6.27745 2.78621L5.97679 2.48555C5.24972 1.75762 4.08234 1.77469 3.37273 2.48531L2.4855 3.37246C1.77644 4.08074 1.75593 5.24801 2.48527 5.97656L2.78621 6.2775C2.57773 6.68035 2.40371 7.09961 2.26578 7.53129H1.84117C0.825975 7.53125 0 8.35719 0 9.37238V10.6276C0 11.6428 0.825975 12.4688 1.84117 12.4688H2.26578C2.40371 12.9004 2.57773 13.3197 2.78621 13.7225L2.4855 14.0232C1.7564 14.7516 1.77593 15.9187 2.48527 16.6273L3.37242 17.5145C4.08058 18.2236 5.248 18.2441 5.97651 17.5147L6.27745 17.2138C6.6803 17.4222 7.09964 17.5963 7.53124 17.7342V18.1589C7.53124 19.1741 8.35721 20 9.3724 20H10.6276C11.6428 20 12.4688 19.1741 12.4688 18.1589V17.7342C12.9004 17.5963 13.3197 17.4223 13.7226 17.2138L14.0232 17.5145C14.7503 18.2424 15.9176 18.2253 16.6273 17.5147L17.5145 16.6275C18.2236 15.9192 18.2441 14.752 17.5147 14.0234L17.2138 13.7225C17.4223 13.3196 17.5963 12.9004 17.7342 12.4687H18.1588C19.174 12.4687 20 11.6427 20 10.6275V9.3723C20 8.35719 19.174 7.53125 18.1588 7.53125ZM9.99998 14.3516C7.60049 14.3516 5.64843 12.3995 5.64843 10C5.64843 7.60055 7.60049 5.64844 9.99998 5.64844C12.3995 5.64844 14.3515 7.60055 14.3515 10C14.3515 12.3995 12.3995 14.3516 9.99998 14.3516Z"
        fill={isSelected ? "var(--primary-6)" : "#333741"}
      />
    </svg>
  );
}
