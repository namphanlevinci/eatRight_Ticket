import { Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import { useEffect, useRef, useState } from 'react';
import CloseInputIcon from 'assets/icons/closeInputIcon';
import { CURRENTCY } from 'constants/currency';

export default function ModalEditPrice({
    isModalOpen,
    onCancel,
    onSubmit,
    custom_price,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    custom_price: number;
}) {
    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (isModalOpen && inputRef.current) {
            setTimeout(() => {
                console.log('forcus input');
                inputRef.current.focus();
            }, 200);
        }
        setPrice(custom_price);
    }, [isModalOpen, custom_price]);

    const { theme } = useTheme();

    const [price, setPrice] = useState<any>(0);

    const handlechangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setPrice(value);
        }
    };

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
                },
            }}
            closeIcon={<></>}
            closable={false}
            centered
            width={537}
        >
            <Row>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>
                    Edit Price
                </Text>
                <div
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 10,
                        right: 20,
                    }}
                    onClick={onCancel}
                >
                    <CloseXIcon />
                </div>
            </Row>
            <div
                style={{
                    width: '95%',
                    height: '56px',
                    border: '1px solid #0455BF',
                    background: ' #F8F9FC',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 16,
                    marginTop: 24,
                }}
            >
                <div style={{ fontWeight: 600, fontSize: 18 }}>{CURRENTCY}</div>
                <input
                    ref={inputRef}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        marginLeft: 16,
                        outline: 'none',
                        fontSize: 18,
                        fontWeight: 600,
                    }}
                    value={price}
                    onChange={handlechangePrice}
                    inputMode="decimal"
                    maxLength={9}
                />
                <div
                    onClick={() => setPrice('')}
                    style={{ marginRight: 16, cursor: 'pointer' }}
                >
                    <CloseInputIcon />
                </div>
            </div>
            <Row
                align={'middle'}
                style={{ gap: 10, marginTop: 20 }}
                justify={'center'}
            >
                <ButtonPrimary
                    title={'Update'}
                    onClick={() => {
                        onSubmit(price);
                    }}
                    width="37%"
                    marginTop="0px"
                />
            </Row>
        </Modal>
    );
}
