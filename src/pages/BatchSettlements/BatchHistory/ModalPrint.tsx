import { useMutation } from '@apollo/client';
import { Modal, Row, Spin } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import {
    data_BatchHistoryReport,
    gql_BatchHistoryReport,
} from 'graphql/batchSettlements/batchHistory';
import React, { useEffect } from 'react';
export default function ModalPrint({
    isModalOpen,
    onCancel,
    okText = 'Print',
    batchId,
}: {
    isModalOpen: boolean;
    onCancel: any;
    okText?: string;
    batchId: string;
}) {
    const [onBatchHistoryReport, { data }] =
        useMutation<data_BatchHistoryReport>(gql_BatchHistoryReport);
    useEffect(() => {
        if (batchId) {
            onBatchHistoryReport({
                variables: {
                    batch_id: parseInt(batchId),
                },
            });
        }
    }, [batchId]);
    const HandlePrint = (url: string) => {
        setLoading(true);
        const is_used_terminal =
            localStorage.getItem('merchantGetPrinterConfig') === 'true'
                ? true
                : false;
        if (!is_used_terminal) {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'merchant',
                        imageUrl: url,
                    }),
                );
            }
        }
    };
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    }, [loading]);
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
                    borderRadius: 0,
                    padding: 0,
                    overflow: 'hidden',
                },
            }}
            closeIcon={<></>}
            closable={false}
            centered
            width={500}
        >
            <Row
                align={'middle'}
                style={{ paddingInline: 40, height: 0 }}
                justify={'start'}
            >
                <Text style={{ fontWeight: '600', fontSize: 24 }}>{''}</Text>
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
            {data?.merchantPrintBatch.image_url ? (
                <img
                    src={data?.merchantPrintBatch.image_url}
                    alt="logo"
                    style={{ width: '100%', height: '100%' }}
                />
            ) : (
                <div
                    style={{
                        height: 400,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Spin />
                </div>
            )}
            <Row
                align={'middle'}
                style={{ paddingInline: 40, paddingBottom: 32 }}
                justify={'space-between'}
            >
                <ButtonPrimary
                    title={okText}
                    onClick={() => {
                        if (data?.merchantPrintBatch?.image_url) {
                            HandlePrint(data?.merchantPrintBatch?.image_url);
                        }
                    }}
                    width="100%"
                    marginTop="0px"
                    backgroundColor="var(--primary-6)"
                    isLoading={loading}
                />
            </Row>
        </Modal>
    );
}
