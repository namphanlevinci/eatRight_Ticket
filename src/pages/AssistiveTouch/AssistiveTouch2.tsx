/* eslint-disable react/no-direct-mutation-state */
import { Col, Row } from 'antd';
import BagIcon from 'assets/icons/bag';
import MenuTabIcon from 'assets/icons/menuTab';
import ReceiptBillIcon from 'assets/icons/receiptBill';
import SettingIcon from 'assets/icons/setting';
import TableSimpleIcon from 'assets/icons/tableSimple';
import { Text18 } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router';
import { Colors } from 'themes/colors';
export default class AssistiveTouch2 extends Component {
    position = JSON.parse(
        localStorage.getItem('position') || '{"x": 0, "y": 500}',
    );

    state = {
        isActive: false,
        timeStart: 0,
        position: this.position,
    };

    updatePosition = ({ x, y }: { x: number; y: number }) => {
        const maxX = window.innerWidth - 32;
        const maxY = window.innerHeight - 32;
        const newX = Math.max(0, Math.min(x - 32, maxX));
        const newY = Math.max(0, Math.min(y - 32, maxY));

        this.setState({
            position: {
                x: newX,
                y: newY,
            },
        });

        localStorage.setItem(
            'position',
            JSON.stringify({
                x: newX,
                y: newY,
            }),
        );
    };

    render() {
        const { isActive } = this.state;
        return (
            <div>
                <div style={{ position: 'fixed', zIndex: 1000, top: '0' }}>
                    <Draggable
                        allowAnyClick
                        onStart={(e) => {
                            this.setState({ timeStart: e.timeStamp });
                        }}
                        onStop={(e: any) => {
                            if (!isActive) {
                                if (e.timeStamp - this.state.timeStart < 200) {
                                    this.setState({
                                        isActive: !this.state.isActive,
                                    });
                                }
                            }

                            try {
                                if (!this.state.isActive) {
                                    const { x, y } = e;
                                    if (x) {
                                        this.updatePosition({ x, y });
                                    } else {
                                        this.updatePosition({
                                            x: e.changedTouches[0].clientX,
                                            y: e.changedTouches[0].clientY,
                                        });
                                    }
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        position={{
                            x: this.state.position.x,
                            y: this.state.position.y,
                        }}
                    >
                        {isActive ? (
                            <div>{''}</div>
                        ) : (
                            <div>
                                <RenderMenuIcon />
                            </div>
                        )}
                    </Draggable>
                </div>
                {isActive && (
                    <div
                        style={{
                            position: 'fixed',
                            zIndex: 101,
                            top: this.state.position.y,
                            left: this.state.position.x,
                        }}
                    >
                        <RenderActiveMenu
                            onUnActive={() =>
                                this.setState({ isActive: false })
                            }
                        />
                    </div>
                )}
                {isActive && (
                    <div
                        style={{
                            position: 'fixed',
                            height: '100%',
                            width: '100%',
                            background: 'grey',
                            opacity: 0.7,
                            zIndex: 100,
                        }}
                        onClick={() => this.setState({ isActive: false })}
                    >
                        {' '}
                    </div>
                )}
            </div>
        );
    }
}
const RenderActiveMenu = ({ onUnActive }: { onUnActive: any }) => {
    const navigation = useNavigate();
    const onClick = ({ to }: { to: string }) => {
        onUnActive();
        navigation(to);
    };
    return (
        <div
            style={{
                height: 200,
                minWidth: 220,
                transform: 'translateY(-63px)',
            }}
        >
            <Row style={{ marginLeft: 30, marginBottom: 10 }}>
                <RenderMenu
                    icon={<TableSimpleIcon />}
                    title="Tables"
                    onClick={() => onClick({ to: BASE_ROUTER.HOME })}
                />
            </Row>
            <Row>
                <Col
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <RenderMenuIcon />
                </Col>
                <Col style={{ marginLeft: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                        <RenderMenu
                            icon={<BagIcon />}
                            title="Orders"
                            onClick={() => onClick({ to: BASE_ROUTER.ORDERS })}
                        />
                    </div>
                    <div>
                        <RenderMenu
                            icon={<ReceiptBillIcon />}
                            title="Receipts"
                            onClick={() => onClick({ to: BASE_ROUTER.BILL })}
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{ marginLeft: 30, marginTop: 10 }}>
                <RenderMenu
                    icon={<SettingIcon />}
                    title="Settings"
                    onClick={() => onClick({ to: BASE_ROUTER.SETTINGS })}
                />
            </Row>
        </div>
    );
};
const RenderMenuIcon = () => {
    return (
        <div
            style={{
                background: '#FFE2B3',
                height: 64,
                width: 64,
                cursor: 'pointer',
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <MenuTabIcon />
        </div>
    );
};

const RenderMenu = ({
    icon,
    title,
    onClick,
}: {
    icon: any;
    title: string;
    onClick: any;
}) => {
    return (
        <div
            style={{
                height: 40,
                width: 140,
                background: Colors.primary,
                borderRadius: 100,
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
            }}
            onClick={() => {
                onClick();
            }}
        >
            {icon}
            <Text18
                style={{ color: 'black', fontWeight: '600', marginLeft: 8 }}
            >
                {title}
            </Text18>
        </div>
    );
};
