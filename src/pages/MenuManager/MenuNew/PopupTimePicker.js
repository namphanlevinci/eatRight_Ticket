/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import TimeKeeper from 'react-timekeeper';
import '../index.scss';
import CustomButton from '../Components/CustomButton';
/**
 * @type {React.FC<{
 *   onDoneStartTime?: (time: string) => void;
 *   onDoneEndTime?: (time: string) => void;
 *   ref?: React.Ref<CustomModalHandle>;
 * }>}
 */
const CustomModal = forwardRef(
    ({ onDoneStartTime = () => {}, onDoneEndTime = () => {} }, ref) => {
        const [visible, setVisible] = useState(false);
        const [time, setTime] = useState(Date.now());
        const [processStartTime, setProcessStartTime] = useState(false);
        const [processEndTime, setProcessEndTime] = useState(false);

        const handleOk = () => {
            setVisible(false);
        };

        const handleCancel = () => {
            setVisible(false);
            setProcessEndTime(false);
            setProcessStartTime(false);
        };

        const onDone = () => {
            if (processStartTime) {
                onDoneStartTime(time);
            } else if (processEndTime) {
                onDoneEndTime(time);
            }
            setVisible(false);
        };

        useImperativeHandle(ref, () => ({
            openStartTime: () => {
                setVisible(true);
                setProcessStartTime(true);
            },
            openEndTime: () => {
                setVisible(true);
                setProcessEndTime(true);
            },
            close: () => setVisible(false),
        }));

        return (
            <>
                <Modal
                    title={null}
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    className="timkeeper-modal"
                    closeIcon={<div />}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TimeKeeper
                            time={time}
                            onChange={(data) => setTime(data.formatted12)}
                            switchToMinuteOnHourSelect
                            closeOnMinuteSelect
                            coarseMinutes={15}
                            doneButton={() => (
                                <CustomButton
                                    onClick={onDone}
                                    title="Done"
                                    style={{ background: 'var(--primary-6)' }}
                                />
                            )}
                        />
                    </div>
                </Modal>
            </>
        );
    },
);

export default CustomModal;
