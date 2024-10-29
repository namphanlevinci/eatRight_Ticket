import { Modal, Spin } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
export default function LoadingModalPaymentDJV({
    showLoading,
    title = 'Waiting for the payment...',
    listPos,
    posSelected,
}: {
    showLoading: boolean;
    title?: string;
    onClose?: () => void;
    isClose?: boolean;
    listPos?: any[];
    posSelected?: string;
}) {
    const { primary_terminal_setting } = useSelector(
        (state: RootState) => state.auth,
    );
    return showLoading ? (
        <CustomModal
            open={showLoading}
            footer={() => <></>}
            centered
            closable={false}
            style={{ background: 'transparent' }}
            width={620}
        >
            <div
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    background: 'white',
                    flexDirection: 'column',
                    gap: 20,
                    height: 365,
                    width: 620,
                    borderRadius: 16,
                }}
            >
                <Spin
                    size="large"
                    indicator={
                        <LoadingOutlined style={{ fontSize: 40 }} spin />
                    }
                />
                <Text
                    style={{
                        color: '#0455BF',
                        fontSize: 24,
                        fontWeight: '600',
                    }}
                >
                    {title}
                </Text>
                {listPos && listPos?.length > 0 && posSelected && (
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>
                        Payment via{' '}
                        <span style={{ fontWeight: '600' }}>
                            {
                                listPos.find(
                                    (pos) =>
                                        `${pos.entity_id}` ===
                                        `${primary_terminal_setting}`,
                                )?.name
                            }{' '}
                        </span>
                        failed. Auto routing to{' '}
                        <span style={{ fontWeight: '600' }}>
                            {
                                listPos.find(
                                    (pos) =>
                                        `${pos.entity_id}` === `${posSelected}`,
                                )?.name
                            }
                        </span>
                        .
                    </Text>
                )}
            </div>
        </CustomModal>
    ) : (
        <></>
    );
}

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background: transparent;
        box-shadow: none !important;
    }
`;

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const SpinContainer = styled.div`
//     display: inline-block;
//     animation: ${rotate} 1s linear infinite;
// `;
// const CustomSpin = () => {
//     return (
//         <SpinContainer>
//             <svg
//                 width="73"
//                 height="73"
//                 viewBox="0 0 73 73"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//             >
//                 <path
//                     opacity="0.1"
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M36.5 10.4286C29.5854 10.4286 22.9541 13.1754 18.0647 18.0647C13.1754 22.9541 10.4286 29.5854 10.4286 36.5C10.4286 43.4146 13.1754 50.0459 18.0647 54.9353C22.9541 59.8246 29.5854 62.5714 36.5 62.5714C43.4146 62.5714 50.0459 59.8246 54.9353 54.9353C59.8246 50.0459 62.5714 43.4146 62.5714 36.5C62.5714 29.5854 59.8246 22.9541 54.9353 18.0647C50.0459 13.1754 43.4146 10.4286 36.5 10.4286ZM0 36.5C0 16.3416 16.3416 0 36.5 0C56.6584 0 73 16.3416 73 36.5C73 56.6584 56.6584 73 36.5 73C16.3416 73 0 56.6584 0 36.5Z"
//                     fill="#0455BF"
//                 />
//                 <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M36.5 10.4286C29.7784 10.4142 23.3138 13.0103 18.469 17.6695C17.4654 18.5975 16.1374 19.0943 14.7711 19.0529C13.4048 19.0114 12.1094 18.4352 11.1638 17.4481C10.2182 16.461 9.69803 15.1421 9.71526 13.7752C9.73249 12.4084 10.2858 11.103 11.2559 10.1401C18.0416 3.62097 27.0903 -0.0137089 36.5 3.88578e-05C37.8829 3.88578e-05 39.2092 0.5494 40.1871 1.52727C41.165 2.50514 41.7143 3.83141 41.7143 5.21432C41.7143 6.59724 41.165 7.92351 40.1871 8.90138C39.2092 9.87925 37.8829 10.4286 36.5 10.4286Z"
//                     fill="#0455BF"
//                 />
//             </svg>
//         </SpinContainer>
//     );
// };
