import { SVGProps } from 'react';

export default function HomeIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M32.4221 14.3998C32.4221 13.9224 32.2325 13.4645 31.8949 13.127C31.5573 12.7894 31.0995 12.5998 30.6221 12.5998C30.1447 12.5998 29.6869 12.7894 29.3493 13.127C29.0118 13.4645 28.8221 13.9224 28.8221 14.3998H32.4221ZM7.22212 14.3998C7.22212 13.9224 7.03247 13.4645 6.69491 13.127C6.35734 12.7894 5.89951 12.5998 5.42212 12.5998C4.94473 12.5998 4.48689 12.7894 4.14933 13.127C3.81176 13.4645 3.62212 13.9224 3.62212 14.3998H7.22212ZM32.9495 19.2724C33.289 19.6003 33.7437 19.7817 34.2156 19.7776C34.6876 19.7735 35.1391 19.5842 35.4728 19.2505C35.8065 18.9168 35.9958 18.4653 35.9999 17.9933C36.004 17.5214 35.8226 17.0667 35.4947 16.7272L32.9495 19.2724ZM18.0221 1.79963L19.2947 0.527021C18.9572 0.18957 18.4994 0 18.0221 0C17.5448 0 17.0871 0.18957 16.7495 0.527021L18.0221 1.79963ZM0.549519 16.7272C0.3776 16.8932 0.240473 17.0919 0.146136 17.3115C0.0518001 17.5311 0.00214483 17.7673 6.79621e-05 18.0063C-0.00200891 18.2453 0.0435342 18.4823 0.13404 18.7035C0.224545 18.9247 0.358201 19.1257 0.527208 19.2947C0.696215 19.4637 0.897188 19.5974 1.1184 19.6879C1.33961 19.7784 1.57664 19.824 1.81564 19.8219C2.05464 19.8198 2.29084 19.7701 2.51045 19.6758C2.73005 19.5815 2.92867 19.4443 3.09472 19.2724L0.549519 16.7272ZM9.02212 36H27.0221V32.4H9.02212V36ZM32.4221 30.5999V14.3998H28.8221V30.5999H32.4221ZM7.22212 30.5999V14.3998H3.62212V30.5999H7.22212ZM35.4947 16.7272L19.2947 0.527021L16.7495 3.07225L32.9495 19.2724L35.4947 16.7272ZM16.7495 0.527021L0.549519 16.7272L3.09472 19.2724L19.2947 3.07225L16.7495 0.527021ZM27.0221 36C28.4543 36 29.8278 35.4311 30.8405 34.4184C31.8532 33.4057 32.4221 32.0321 32.4221 30.5999H28.8221C28.8221 31.0773 28.6325 31.5352 28.2949 31.8727C27.9573 32.2103 27.4995 32.4 27.0221 32.4V36ZM9.02212 32.4C8.54473 32.4 8.08689 32.2103 7.74933 31.8727C7.41176 31.5352 7.22212 31.0773 7.22212 30.5999H3.62212C3.62212 32.0321 4.19105 33.4057 5.20374 34.4184C6.21644 35.4311 7.58995 36 9.02212 36V32.4Z"
                fill={props.color || 'white'}
            />
        </svg>
    );
}