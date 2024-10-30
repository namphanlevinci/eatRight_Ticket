import { Scanner } from '@yudiel/react-qr-scanner';

const Ticket = () => {
    const onReadQRCode = (result: any) => {
        const qrCodeValue = result?.[0]?.rawValue;
    };

    return <Scanner onScan={onReadQRCode} />;
};

export default Ticket;
