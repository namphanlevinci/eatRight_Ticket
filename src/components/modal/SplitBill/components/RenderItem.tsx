import { Row } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';

export default function RenderItemSplit({
    title,
    quantity,
    isSelected,
    onPress,
}: {
    title: string;
    quantity: number | string;
    isSelected: boolean;
    onPress: () => void;
}) {
    return (
        <Row
            style={{
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
                background: isSelected
                    ? 'rgba(255, 157, 0, 0.30)'
                    : 'transparent',
                borderRadius: 4,
                cursor: 'pointer',
            }}
            onClick={onPress}
        >
            <div style={{ width: 32, height: 32 }}>
                {isSelected ? <SelectBoxSelected /> : <SelectBox />}
            </div>
            <Text>{title}</Text>
            <div
                style={{
                    background: '#40464B',
                    borderRadius: 4,
                    height: 32,
                    minWidth: 32,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'auto',
                }}
            >
                <Text>{quantity}</Text>
            </div>
        </Row>
    );
}

const SelectBox = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                opacity="0.4"
                d="M11.0432 4H22.2895C26.2203 4 28.667 6.77492 28.667 10.7018V21.2981C28.667 25.2251 26.2203 28 22.2882 28H11.0432C7.11239 28 4.66699 25.2251 4.66699 21.2981V10.7018C4.66699 6.77492 7.12407 4 11.0432 4Z"
                stroke="#666666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const SelectBoxSelected = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.3237 13.629L15.1663 19.7863C14.9703 19.9823 14.7157 20.0797 14.4597 20.0797C14.2023 20.0797 13.9477 19.9823 13.7517 19.7863L10.673 16.7077C10.2823 16.317 10.2823 15.6837 10.673 15.293C11.0637 14.9023 11.6957 14.9023 12.0863 15.293L14.4597 17.665L19.909 12.2143C20.2997 11.8237 20.933 11.8237 21.3237 12.2143C21.7143 12.605 21.7143 13.2383 21.3237 13.629ZM21.6223 3.33301H10.3757C6.16367 3.33301 3.33301 6.29434 3.33301 10.7023V21.2997C3.33301 25.7063 6.16367 28.6663 10.3757 28.6663H21.621C25.8343 28.6663 28.6663 25.7063 28.6663 21.2997V10.7023C28.6663 6.29434 25.8357 3.33301 21.6223 3.33301Z"
                fill="#CC7D00"
            />
        </svg>
    );
};
