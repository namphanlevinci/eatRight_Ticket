import { Modal } from 'antd';
import React from 'react';
import ButtonSubmit from '../Button/ButtonSubmit';
import iconFile from '../../assets/file.png';
import './index.scss';
import { useTranslation } from 'react-i18next';
import ButtonGr from '../Button/ButtonGr';

const ModalPending = ({
    isShowModalPending,
    closeModalPending,
    handleSubmitRecievedOrder,
    dataOrderModal,
    loadingButton,
    currentModalCancel,
    currentModalOpen,
    setReload,
    reload,
    handleClick,
    setShowModalPending,
    setShowModalTransfer,
    renderModalData,
    detailOrder,
    renderTitleModal,
}) => {
    const { t } = useTranslation();
    return (
        <Modal
            key="pending"
            centered={true}
            destroyOnClose={true}
            className="modal-pending"
            title={renderTitleModal()}
            open={isShowModalPending}
            width={900}
            onCancel={closeModalPending}
            footer={[
                <span
                    onClick={() =>
                        handleSubmitRecievedOrder(dataOrderModal?.id)
                    }
                    key={dataOrderModal?.id}
                >
                    <ButtonSubmit
                        loadingButton={loadingButton}
                        title={t('receivedOrder')}
                        color="#0A8D87"
                        key={dataOrderModal?.id}
                        image={iconFile}
                    />
                </span>,
                <ButtonGr
                    cancelCurrentModal={currentModalCancel.current}
                    openCurrentModal={currentModalOpen.current}
                    reload={() => setReload(!reload)}
                    dataOrder={dataOrderModal}
                    handleClick={() => handleClick()}
                    key={2}
                    handleClose={() => {
                        setShowModalPending(false);
                        setReload(!reload);
                    }}
                    setShowModalTransfer={setShowModalTransfer}
                />,
            ]}
        >
            {renderModalData(detailOrder, dataOrderModal)}
        </Modal>
    );
};

export default ModalPending;
