import { useTheme } from 'context/themeContext';
import React from 'react';

export default function AccountIcon() {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.8762 17.3977C7.0298 18.1646 6.69141 19.1403 6.69141 19.9996C6.69141 20.4139 6.35562 20.7496 5.94141 20.7496C5.52719 20.7496 5.19141 20.4139 5.19141 19.9996C5.19141 18.7503 5.68483 17.359 6.86904 16.2861C8.0551 15.2114 9.86609 14.5156 12.4002 14.5156C14.9324 14.5156 16.7428 15.2059 17.9291 16.2754C19.1142 17.3438 19.608 18.7312 19.608 19.9815C19.608 20.3957 19.2722 20.7315 18.858 20.7315C18.4438 20.7315 18.108 20.3957 18.108 19.9815C18.108 19.1221 17.77 18.1516 16.9247 17.3895C16.0806 16.6285 14.6621 16.0156 12.4002 16.0156C10.1391 16.0156 8.72074 16.6325 7.8762 17.3977Z"
                fill={theme.tEXTPrimary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.4001 4.75C10.5367 4.75 9.02539 6.2611 9.02539 8.12567C9.02539 9.99024 10.5367 11.5013 12.4001 11.5013C14.2646 11.5013 15.7758 9.99013 15.7758 8.12567C15.7758 6.26122 14.2646 4.75 12.4001 4.75ZM7.52539 8.12567C7.52539 5.4329 9.70807 3.25 12.4001 3.25C15.093 3.25 17.2758 5.43279 17.2758 8.12567C17.2758 10.8186 15.093 13.0013 12.4001 13.0013C9.70807 13.0013 7.52539 10.8184 7.52539 8.12567Z"
                fill={theme.tEXTPrimary}
            />
        </svg>
    );
}
