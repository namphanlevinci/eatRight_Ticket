/* eslint-disable no-undef */
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

const PrinterContext = createContext(undefined);

// Custom hook để sử dụng PrinterContext
export const usePrinter = () => {
    const context = useContext(PrinterContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const PrinterProvider = ({ children }) => {
    const [printerIPAddress, setPrinterIPAddress] = useState('192.168.1.149');
    const [printerPort, setPrinterPort] = useState('8043');
    const [connectionStatus, setConnectionStatus] = useState('');
    const ePosDevice = useRef();
    const printer = useRef();

    const STATUS_CONNECTED = 'Connected';
    const connect = () => {
        setConnectionStatus('Connecting ...');

        if (!printerIPAddress) {
            setConnectionStatus('Type the printer IP address');
            return;
        }
        if (!printerPort) {
            setConnectionStatus('Type the printer port');
            return;
        }

        setConnectionStatus('Connecting ...');
        try {
            let ePosDev = new window.epson.ePOSDevice();
            ePosDevice.current = ePosDev;

            ePosDev.connect(printerIPAddress, printerPort, (data) => {
                if (data === 'OK' || data === 'SSL_CONNECT_OK') {
                    ePosDev.createDevice(
                        'local_printer',
                        ePosDev.DEVICE_TYPE_PRINTER,
                        { crypto: true, buffer: false },
                        (devobj, retcode) => {
                            if (retcode === 'OK') {
                                printer.current = devobj;
                                setConnectionStatus(STATUS_CONNECTED);
                            } else {
                                throw retcode;
                            }
                        },
                    );
                } else {
                    throw data;
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    const print = async () => {
        await html2canvas(document.getElementById('billHeader')).then(
            (htmlCanvas) => {
                const newContext = htmlCanvas.getContext('2d');
                let prn = printer.current;
                if (!prn) {
                    alert('Not connected to printer');
                    return;
                }
                prn.addImage(
                    newContext,
                    0,
                    0,
                    htmlCanvas.width,
                    htmlCanvas.height,
                );
                prn.send();
            },
        );
        await html2canvas(document.getElementById('billContent')).then(
            (htmlCanvas) => {
                const newContext = htmlCanvas.getContext('2d');
                let prn = printer.current;
                if (!prn) {
                    alert('Not connected to printer');
                    return;
                }
                prn.addImage(
                    newContext,
                    0,
                    0,
                    htmlCanvas.width,
                    htmlCanvas.height,
                );
                prn.send();
            },
        );
        await html2canvas(document.getElementById('billFooter')).then(
            (htmlCanvas) => {
                const newContext = htmlCanvas.getContext('2d');
                let prn = printer.current;
                if (!prn) {
                    alert('Not connected to printer');
                    return;
                }
                prn.addImage(
                    newContext,
                    0,
                    0,
                    htmlCanvas.width,
                    htmlCanvas.height,
                );
                prn.addCut();
                prn.send();
            },
        );
    };
    useEffect(() => {
        connect();
    }, []);
    return (
        <PrinterContext.Provider
            value={{
                connectionStatus,
                connect,
                print,
                printerIPAddress,
                setPrinterIPAddress,
                printerPort,
                setPrinterPort,
            }}
        >
            {children}
        </PrinterContext.Provider>
    );
};
