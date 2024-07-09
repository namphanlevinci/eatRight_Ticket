import { Modal, Row } from 'antd';
import CloseIcon from 'assets/icons/close';
import RadioButton from 'components/atom/Radio/RadioButton';
import { useState } from 'react';

import styled from 'styled-components';
import SplitEvenMode from './SplitEvenMode';

enum SplitBillMode {
    EVEN = 0,
    ITEM = 1,
}

export default function SplitBillModal({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) {
    const [mode, setMode] = useState(SplitBillMode.EVEN);
    return (
        <>
            <ModalStyled
                title="Change Table"
                centered
                open={visible}
                styles={{
                    header: { display: 'none' },
                    footer: { display: 'none' },
                    content: {
                        background: 'rgba(31, 36, 47, 1)',
                        border: `1px solid rgba(63, 63, 63, 1)`,
                    },
                }}
                closeIcon={null}
            >
                <div>
                    <Row justify={'space-between'} style={{ width: 390 }}>
                        <Row style={{ gap: 40 }}>
                            <RadioButton
                                title="Split evenly"
                                selected={mode === SplitBillMode.EVEN}
                                onPress={() => setMode(SplitBillMode.EVEN)}
                            />
                            <RadioButton
                                title="By item"
                                selected={mode === SplitBillMode.ITEM}
                                onPress={() => setMode(SplitBillMode.ITEM)}
                            />
                        </Row>
                        <div style={{ cursor: 'pointer' }} onClick={onClose}>
                            <CloseIcon />
                        </div>
                    </Row>
                    {mode === SplitBillMode.EVEN && (
                        <SplitEvenMode
                            total={200}
                            onSubmit={(number) => console.log(number)}
                        />
                    )}
                    {mode === SplitBillMode.ITEM && <></>}
                </div>
            </ModalStyled>
        </>
    );
}

export const Container = styled.div`
    width: 440px;
    height: 350px;
`;

export const ModalStyled = styled(Modal)`
    width: auto !important;
`;
