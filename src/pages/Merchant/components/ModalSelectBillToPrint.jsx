import { useState } from 'react';
import { Modal, Spin, notification } from 'antd';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { PRINT_BILL } from 'graphql/printer';
function RadioBtnSelected() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17Z"
                fill={'var(--primary-6)'}
            />
        </svg>
    );
}

export const ModalSelectBillToPrint = ({
    data,
    isVisibleModal,
    setVisibleMoal,
}) => {
    const [selectedOption, setSelectedOption] = useState();
    const [isPrinting, setIsPrinting] = useState(false);
    const [apiPrintInvoice] = useMutation(PRINT_BILL);
    const handleCancel = () => {
        setVisibleMoal(false);
    };

    const handleChange = (item) => {
        setSelectedOption(item);
    };
    const handleOk = async () => {
        setIsPrinting(true);
        try {
            await apiPrintInvoice({
                variables: { invoice_number: selectedOption?.number },
            });
            notification.success({
                message: 'Send request print bill success',
                description: 'Please go to printer to take the bill!',
            });
        } catch (err) {
            notification.error({
                message: 'Error',
                description: err?.errors?.[0]?.message,
            });
        } finally {
            setIsPrinting(false);
            setVisibleMoal(false);
        }
    };
    return (
        <>
            <Modal
                open={isVisibleModal}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ borderRadius: 16 }}
                styles={{
                    content: {
                        backgroundColor: 'var(--neutral-primary)',
                        boxShadow: 'none',
                    }, // turns the Modal #191919,
                    header: {
                        background: 'var(--neutral-primary)',
                        color: 'white',
                    },
                }}
                closeIcon={null}
                footer={null}
            >
                <div style={{ paddingTop: 8 }}>
                    <p
                        style={{
                            color: 'var(--text-primary)',
                            fontSize: 24,
                            fontWeight: '600',
                            marginBottom: 24,
                        }}
                    >
                        Receipts
                    </p>
                    {data?.length > 0 ? (
                        data?.map?.((pos) => (
                            <Button
                                key={`pos ${pos?.id}`}
                                style={{
                                    height: 56,
                                    width: '100%',
                                    background: 'var(--neutral-base)',

                                    borderRadius: 8,
                                    border: `1px solid  var(--neutral-line)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    marginBottom: 12,
                                }}
                                onClick={() => handleChange(pos)}
                            >
                                <div
                                    style={{
                                        width: 30,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {pos?.id == selectedOption?.id && (
                                        <RadioBtnSelected />
                                    )}
                                </div>
                                <p>{pos?.number}</p>
                            </Button>
                        ))
                    ) : (
                        <Spin />
                    )}
                    <Button
                        style={{
                            height: 56,
                            width: '100%',
                            background: selectedOption
                                ? 'var(--primary-6)'
                                : 'var(--bg-disabled)',
                            color: 'var(--primary-1)',
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginTop: 20,
                            borderRadius: 8,
                        }}
                        disabled={!selectedOption}
                        loading={isPrinting}
                        title="Select"
                        onClick={handleOk}
                    >
                        Select
                    </Button>
                </div>
            </Modal>
        </>
    );
};
