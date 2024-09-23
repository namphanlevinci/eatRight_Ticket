/* eslint-disable @typescript-eslint/no-empty-function */
import { Modal, Button } from 'antd';
import React from 'react';

export default function ModalCancel({
    renderTitleModal,
    isShowModalCancel,
    closeModalCancel,
    dataOrderModal,
    loadingButton,
    handleSubmitBom = () => {},
    renderModalData = () => {},
    detailOrder,
}) {
    return (
        <Modal
            centered={true}
            destroyOnClose={true}
            className="modal-cancel"
            title={renderTitleModal()}
            open={isShowModalCancel}
            width={695}
            onCancel={closeModalCancel}
            footer={[
                <Button
                    key={dataOrderModal?.id}
                    block
                    loading={loadingButton}
                    onClick={() => handleSubmitBom(dataOrderModal)}
                    style={{ backgroundColor: '#E31837' }}
                    className="btn-left btn-confirm"
                >
                    {!loadingButton && `CONFIRM BOM ORDER`}
                </Button>,
            ]}
        >
            {renderModalData(detailOrder, dataOrderModal)}
        </Modal>
    );
}
