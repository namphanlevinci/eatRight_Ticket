import { Row, Switch } from 'antd';
import { Text } from 'components/atom/Text';
import { SwitchContainer } from 'layouts/styled';
export const EnableReservation = ({
    isEnabled,
    onChange,
}: {
    isEnabled: boolean;
    onChange: (checked: boolean) => void;
}) => {
    return (
        <Row style={{ alignItems: 'center', gap: 20 }}>
            <Text style={{ fontSize: 18 }}>Enable Reservation</Text>
            <SwitchContainer>
                <Switch
                    checked={isEnabled}
                    onChange={onChange}
                    style={{
                        marginLeft: 5,
                        height: 32,
                        width: 72,
                    }}
                />
            </SwitchContainer>
        </Row>
    );
};
