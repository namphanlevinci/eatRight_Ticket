import { SVGProps } from 'react';

export default function BoardMenuIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="39"
            height="29"
            viewBox="0 0 39 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="8.21094"
                y="0.710938"
                width="30.7895"
                height="5.13158"
                rx="2.56579"
                fill={props.color || 'white'}
            />
            <rect
                y="0.710938"
                width="5.13158"
                height="5.13158"
                rx="2.56579"
                fill={props.color || 'white'}
            />
            <rect
                x="8.21094"
                y="12"
                width="30.7895"
                height="5.13158"
                rx="2.56579"
                fill={props.color || 'white'}
            />
            <rect
                y="12"
                width="5.13158"
                height="5.13158"
                rx="2.56579"
                fill={props.color || 'white'}
            />
            <rect
                x="8.21094"
                y="23.2891"
                width="30.7895"
                height="5.13158"
                rx="2.56579"
                fill={props.color || 'white'}
            />
            <rect
                y="23.2891"
                width="5.13158"
                height="5.13158"
                rx="2.56579"
                fill={props.color || 'white'}
            />
        </svg>
    );
}
