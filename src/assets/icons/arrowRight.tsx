import { useTheme } from 'context/themeContext';

export const ArrowRightIcon = () => {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.0892 9.41086C13.2454 9.56713 13.3332 9.77906 13.3332 10C13.3332 10.221 13.2454 10.4329 13.0892 10.5892L8.375 15.3034C8.29813 15.383 8.20617 15.4464 8.1045 15.4901C8.00283 15.5338 7.89348 15.5568 7.78284 15.5577C7.67219 15.5587 7.56245 15.5376 7.46004 15.4957C7.35763 15.4538 7.26458 15.3919 7.18634 15.3137C7.10809 15.2354 7.04622 15.1424 7.00432 15.04C6.96242 14.9376 6.94133 14.8278 6.94229 14.7172C6.94325 14.6065 6.96624 14.4972 7.00992 14.3955C7.05359 14.2939 7.11708 14.2019 7.19667 14.125L11.3217 10L7.19667 5.87503C7.04487 5.71786 6.96087 5.50736 6.96277 5.28886C6.96467 5.07036 7.05231 4.86135 7.20682 4.70685C7.36133 4.55234 7.57034 4.4647 7.78883 4.4628C8.00733 4.4609 8.21783 4.5449 8.375 4.6967L13.0892 9.41086Z"
                fill={theme.itemCardText}
            />
        </svg>
    );
};
