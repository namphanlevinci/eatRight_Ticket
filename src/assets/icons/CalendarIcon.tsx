import * as React from 'react';
import { SVGProps } from 'react';
const CalenderIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M17.7778 19.8H2.22222V7.7H17.7778M14.4444 0V2.2H5.55556V0H3.33333V2.2H2.22222C0.988889 2.2 0 3.179 0 4.4V19.8C0 20.3835 0.234126 20.9431 0.650874 21.3556C1.06762 21.7682 1.63285 22 2.22222 22H17.7778C18.3671 22 18.9324 21.7682 19.3491 21.3556C19.7659 20.9431 20 20.3835 20 19.8V4.4C20 3.81652 19.7659 3.25695 19.3491 2.84437C18.9324 2.43179 18.3671 2.2 17.7778 2.2H16.6667V0M15.5556 12.1H10V17.6H15.5556V12.1Z"
            fill="white"
        />
    </svg>
);
export default CalenderIcon;
