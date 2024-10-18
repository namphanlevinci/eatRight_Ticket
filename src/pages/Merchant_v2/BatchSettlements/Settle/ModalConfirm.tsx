import { Col, Divider, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useRef } from 'react';
export default function ModalConfirm({
    isModalOpen,
    onCancel,
    onSubmit,
    title,
    okText = 'Ok',
    isLoading,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    title: string;
    content?: string;
    okText?: string;
    cancelText?: string;
    isLoading?: boolean;
}) {
    const inputRef = useRef<any>(null);
    useEffect(() => {
        // Kiểm tra xem modal có mở không
        if (isModalOpen && inputRef.current) {
            // Nếu có, thì focus vào input
            inputRef.current.focus();
        }
    }, [isModalOpen]);

    const { theme } = useTheme();
    const [isSelect, setIsSelect] = React.useState(false);
    return (
        <Modal
            title="Basic Modal"
            open={isModalOpen}
            styles={{
                footer: {
                    display: 'none',
                },
                header: {
                    display: 'none',
                },
                content: {
                    backgroundColor: theme.nEUTRALPrimary,
                    borderRadius: 16,
                    padding: 0,
                    overflow: 'hidden',
                },
            }}
            closeIcon={<></>}
            closable={false}
            centered
            width={600}
        >
            <Row
                align={'middle'}
                style={{ background: '#F0F3F7', paddingInline: 40, height: 77 }}
                justify={'start'}
            >
                <Text style={{ fontWeight: '600', fontSize: 24 }}>{title}</Text>
                <div
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 20,
                        right: 40,
                    }}
                    onClick={onCancel}
                >
                    <CloseXIcon />
                </div>
            </Row>
            <div style={{ paddingInline: 40, paddingTop: 28 }}>
                <Row>
                    <Col
                        style={{ width: 40 }}
                        onClick={() => setIsSelect(!isSelect)}
                    >
                        {isSelect ? <CheckBoxSelect /> : <CheckBox />}
                    </Col>
                    <Col>
                        <Text style={{ fontWeight: 700, fontSize: 22 }}>
                            Mark All as Done
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: 40 }}> </Col>
                    <Col style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 500 }}>
                            This will finish all pending items and clear all
                            kitchen tickets.
                        </Text>
                    </Col>
                </Row>
            </div>
            <Divider />
            <Row
                align={'middle'}
                style={{ paddingInline: 40, paddingBottom: 32 }}
                justify={'space-between'}
            >
                <ButtonPrimary
                    title={okText}
                    onClick={() => {
                        onSubmit(isSelect);
                    }}
                    width="100%"
                    marginTop="0px"
                    backgroundColor="var(--primary-6)"
                    isLoading={isLoading}
                />
            </Row>
        </Modal>
    );
}

const CheckBoxSelect = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
        >
            <rect
                x="0.75"
                y="0.75"
                width="26.5"
                height="26.5"
                rx="3.25"
                fill="#389E0D"
                stroke="#389E0D"
                strokeWidth="1.5"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.2902 7.93669C23.5478 8.19138 23.6925 8.53678 23.6925 8.89692C23.6925 9.25706 23.5478 9.60246 23.2902 9.85716L12.9929 20.0372C12.8569 20.1718 12.6953 20.2785 12.5175 20.3513C12.3397 20.4242 12.1491 20.4616 11.9566 20.4617C11.7642 20.4616 11.5736 20.4242 11.3958 20.3513C11.2179 20.2785 11.0564 20.1718 10.9203 20.0372L5.80418 14.9802C5.67296 14.8549 5.5683 14.7051 5.4963 14.5394C5.4243 14.3737 5.3864 14.1954 5.38482 14.0151C5.38323 13.8348 5.41799 13.6559 5.48707 13.489C5.55615 13.3221 5.65816 13.1704 5.78715 13.0429C5.91614 12.9154 6.06953 12.8146 6.23837 12.7463C6.40721 12.678 6.58811 12.6436 6.77053 12.6452C6.95294 12.6467 7.13322 12.6842 7.30083 12.7554C7.46844 12.8266 7.62004 12.93 7.74677 13.0598L11.9562 17.2212L21.3467 7.93669C21.4743 7.81047 21.6258 7.71035 21.7925 7.64204C21.9593 7.57373 22.138 7.53857 22.3185 7.53857C22.499 7.53857 22.6777 7.57373 22.8444 7.64204C23.0112 7.71035 23.1626 7.81047 23.2902 7.93669Z"
                fill="white"
            />
        </svg>
    );
};

const CheckBox = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
        >
            <rect
                x="0.75"
                y="0.75"
                width="26.5"
                height="26.5"
                rx="3.25"
                fill="white"
                stroke="#389E0D"
                strokeWidth="1.5"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.2902 7.93669C23.5478 8.19138 23.6925 8.53678 23.6925 8.89692C23.6925 9.25706 23.5478 9.60246 23.2902 9.85716L12.9929 20.0372C12.8569 20.1718 12.6953 20.2785 12.5175 20.3513C12.3397 20.4242 12.1491 20.4616 11.9566 20.4617C11.7642 20.4616 11.5736 20.4242 11.3958 20.3513C11.2179 20.2785 11.0564 20.1718 10.9203 20.0372L5.80418 14.9802C5.67296 14.8549 5.5683 14.7051 5.4963 14.5394C5.4243 14.3737 5.3864 14.1954 5.38482 14.0151C5.38323 13.8348 5.41799 13.6559 5.48707 13.489C5.55615 13.3221 5.65816 13.1704 5.78715 13.0429C5.91614 12.9154 6.06953 12.8146 6.23837 12.7463C6.40721 12.678 6.58811 12.6436 6.77053 12.6452C6.95294 12.6467 7.13322 12.6842 7.30083 12.7554C7.46844 12.8266 7.62004 12.93 7.74677 13.0598L11.9562 17.2212L21.3467 7.93669C21.4743 7.81047 21.6258 7.71035 21.7925 7.64204C21.9593 7.57373 22.138 7.53857 22.3185 7.53857C22.499 7.53857 22.6777 7.57373 22.8444 7.64204C23.0112 7.71035 23.1626 7.81047 23.2902 7.93669Z"
                fill="white"
            />
        </svg>
    );
};
