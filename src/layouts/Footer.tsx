import { Col, Layout, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useMediaQuery } from 'react-responsive';
import { Colors } from 'themes/colors';
import { TABLE_STATUS } from 'constants/table';
import { useTheme } from 'context/themeContext';
import { useLocation } from 'react-router';
import { BASE_ROUTER } from 'constants/router';
import { useDispatch } from 'react-redux';
import { updateFilterTable } from 'features/global/globalSlice';
import { EStatusTable } from 'graphql/table/table';

const Footer = () => {
    const {
        isLogged,
        firstname,
        lastname,
        restaurant_address,
        restaurant_name,
        isMerchant,
        isTableView,
    } = useSelector((state: RootState) => state.auth);
    const { theme } = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isHomePage = useMemo(
        () => location.pathname === BASE_ROUTER.MERCHANT_TABLEVIEW,
        [location],
    );

    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return (
        <>
            {isLogged && !isMobile && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        zIndex: 1000,
                    }}
                >
                    <Layout.Footer
                        style={{
                            textAlign: 'center',
                            background: theme.nEUTRALPrimary,
                            paddingInline: 16,
                            paddingBlock: isMobile ? 10 : 16,
                        }}
                    >
                        {isHomePage && isTableView && isMerchant && (
                            <AdditionalTableView />
                        )}
                        <Row justify={'space-between'}>
                            <Col style={{ textAlign: 'left' }}>
                                <Text style={{ fontWeight: '600' }}>
                                    {firstname} {lastname}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginTop: isMobile ? 0 : 6,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {restaurant_name} {'-'} {restaurant_address}
                                </Text>
                            </Col>
                            <Col
                                style={
                                    isMobile
                                        ? {
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              width: '100%',
                                              alignItems: 'center',
                                          }
                                        : {}
                                }
                            >
                                <Text
                                    style={{
                                        color: isOnline
                                            ? Colors.green
                                            : Colors.red,
                                        fontWeight: '600',
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <circle
                                            cx="6"
                                            cy="6"
                                            r="6"
                                            fill={
                                                isOnline
                                                    ? Colors.green
                                                    : Colors.red
                                            }
                                        />
                                    </svg>{' '}
                                    {isOnline ? 'Connect' : 'Disconnect'}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: '400',
                                        color: Colors.grey5,
                                        marginTop: 5,
                                    }}
                                >
                                    {' '}
                                    Version 0.1.1.1
                                </Text>
                            </Col>
                        </Row>
                    </Layout.Footer>
                </div>
            )}
        </>
    );
};

export default Footer;

const AdditionalTableView = () => {
    const dispatch = useDispatch();
    const { filterTable } = useSelector((state: RootState) => state.global);
    return (
        <Row
            style={{
                borderBottom: '1px solid #E1E6EF',
                paddingBottom: 8,
                marginBottom: 8,
            }}
        >
            <Row
                style={{
                    width: 'fit-content',
                    display: 'flex',
                    gap: 80,
                    margin: '0 auto',
                }}
            >
                {Object.values(TABLE_STATUS).map((table, idx) => {
                    return (
                        <Row
                            key={idx}
                            justify="space-between"
                            align="middle"
                            onClick={() => {
                                if (table.value === filterTable) {
                                    dispatch(
                                        updateFilterTable({
                                            filterTable: EStatusTable.ALL,
                                        }),
                                    );
                                } else {
                                    dispatch(
                                        updateFilterTable({
                                            filterTable: table.value,
                                        }),
                                    );
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: table.primaryColor,
                                    border: `4px solid ${table.secondaryColor}`,
                                    borderRadius: 6,
                                    marginRight: 8,
                                }}
                                onClick={() => {
                                    if (table.value === filterTable) {
                                        dispatch(
                                            updateFilterTable({
                                                filterTable: EStatusTable.ALL,
                                            }),
                                        );
                                    } else {
                                        dispatch(
                                            updateFilterTable({
                                                filterTable: table.value,
                                            }),
                                        );
                                    }
                                }}
                            />
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 18,
                                    color: Colors.grey3,
                                }}
                            >
                                {table.label}
                            </Text>
                        </Row>
                    );
                })}
            </Row>
        </Row>
    );
};
