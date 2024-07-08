import { Button, Layout } from 'antd';
import AvatarUpdate from 'components/atom/Avartar';
import { Text } from 'components/atom/Text';
import { useSocket } from 'context/noticationContext';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function ProfilePages() {
    const { lastname, firstname, restaurant_address, restaurant_name } =
        useSelector((state: RootState) => state.auth);
    const socketInstance = useSocket();
    return (
        <Layout
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                background: 'transparent',
                gap: 20,
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
                Personal Information
            </Text>
            <AvatarUpdate />
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
                {lastname} {firstname}
            </Text>

            <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 30 }}>
                Store Information
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
                {restaurant_name}
            </Text>
            <Text>{restaurant_address} </Text>

            <Button
                onClick={() => {
                    socketInstance?.emit('get clients', 'hello world');
                    socketInstance?.on('get clients', (data) => {
                        console.log(data);
                    });
                }}
            >
                Hello world
            </Button>
        </Layout>
    );
}
