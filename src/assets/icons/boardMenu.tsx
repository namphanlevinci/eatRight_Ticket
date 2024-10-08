import { useTheme } from 'context/themeContext';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function BoardMenuIcon() {
    const { theme } = useTheme();
    const { isMerchant } = useSelector((state: RootState) => state.auth);

    return (
        <svg
            width="37"
            height="36"
            viewBox="0 0 37 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle opacity="0.5" cx="18.5" cy="18" r="18" fill="#E1E6EF" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.8131 22.4951H15.013C14.5153 22.4951 14.113 22.8974 14.113 23.3951C14.113 23.8928 14.5153 24.2951 15.013 24.2951H25.8131C26.3108 24.2951 26.7131 23.8928 26.7131 23.3951C26.7131 22.8974 26.3108 22.4951 25.8131 22.4951Z"
                fill={isMerchant ? 'var(--primary-6)' : theme.pRIMARY6Primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.8131 17.0947H15.013C14.5153 17.0947 14.113 17.497 14.113 17.9947C14.113 18.4924 14.5153 18.8947 15.013 18.8947H25.8131C26.3108 18.8947 26.7131 18.4924 26.7131 17.9947C26.7131 17.497 26.3108 17.0947 25.8131 17.0947Z"
                fill={isMerchant ? 'var(--primary-6)' : theme.pRIMARY6Primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.013 13.4948H25.8131C26.3108 13.4948 26.7131 13.0925 26.7131 12.5948C26.7131 12.0971 26.3108 11.6948 25.8131 11.6948H15.013C14.5153 11.6948 14.113 12.0971 14.113 12.5948C14.113 13.0925 14.5153 13.4948 15.013 13.4948Z"
                fill={isMerchant ? 'var(--primary-6)' : theme.pRIMARY6Primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4218 11.4609C10.7963 11.4609 10.2869 11.973 10.2869 12.6039C10.2869 13.2285 10.7963 13.737 11.4218 13.737C12.0473 13.737 12.5576 13.2285 12.5576 12.6039C12.5576 11.973 12.0473 11.4609 11.4218 11.4609Z"
                fill={isMerchant ? 'var(--primary-6)' : theme.pRIMARY6Primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4218 16.9878C10.7963 16.9878 10.2869 17.4963 10.2869 18.1218C10.2869 18.7464 10.7963 19.2558 11.4218 19.2558C12.0473 19.2558 12.5576 18.7464 12.5576 18.1218C12.5576 17.4963 12.0473 16.9878 11.4218 16.9878Z"
                fill={isMerchant ? 'var(--primary-6)' : theme.pRIMARY6Primary}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4218 22.2612C10.7963 22.2612 10.2869 22.7733 10.2869 23.4042C10.2869 24.0288 10.7963 24.5373 11.4218 24.5373C12.0473 24.5373 12.5576 24.0288 12.5576 23.4042C12.5576 22.7733 12.0473 22.2612 11.4218 22.2612Z"
                fill={isMerchant ? 'var(--primary-6)' : theme.pRIMARY6Primary}
            />
        </svg>
    );
}
