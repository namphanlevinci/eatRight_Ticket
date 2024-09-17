import { Row } from 'antd';
import logo from 'assets/logos/logo.png';
import CloseXIcon from 'assets/icons/closeIcon';
import { Text } from 'components/atom/Text';
import { ArrowRightIcon } from 'assets/icons/arrowRight';

export const Header = ({
    onClose,
    onLogo,
}: {
    onClose: () => void;
    onLogo: () => void;
}) => {
    return (
        <Row
            justify={'space-between'}
            align={'middle'}
            style={{ marginBottom: 16 }}
        >
            <div onClick={onLogo}>
                <img
                    src={logo}
                    alt="logo"
                    style={{ width: '100%', height: 40, minWidth: '188' }}
                />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={onClose}>
                <CloseXIcon />
            </div>
        </Row>
    );
};

export const RenderItem = ({
    icon,
    title,
    onPress,
}: {
    icon?: JSX.Element;
    title?: string;
    onPress?: () => void;
}) => {
    return (
        <Row
            justify={'space-between'}
            align={'middle'}
            style={{
                paddingBlock: 16,
                borderBottom: '1px solid #CCC',
                cursor: 'pointer',
            }}
            onClick={onPress}
        >
            <Row align={'middle'} style={{ gap: 16 }}>
                <div
                    style={{
                        width: 40,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </div>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>{title}</Text>
            </Row>
            <ArrowRightIcon />
        </Row>
    );
};

export const RenderLogout = ({ onPress }: { onPress: () => void }) => {
    return (
        <Row
            justify={'center'}
            align={'middle'}
            style={{
                paddingBlock: 16,
                gap: 16,
                cursor: 'pointer',
            }}
            onClick={onPress}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="34"
                viewBox="0 0 35 34"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8471 0.333008C19.9237 0.333008 23.2404 3.64967 23.2404 7.72634V9.27967C23.2404 9.96968 22.6804 10.5297 21.9904 10.5297C21.3004 10.5297 20.7404 9.96968 20.7404 9.27967V7.72634C20.7404 5.02634 18.5454 2.83301 15.8471 2.83301H7.72207C5.02707 2.83301 2.83374 5.02634 2.83374 7.72634V26.2747C2.83374 28.973 5.02707 31.1663 7.72207 31.1663H15.8654C18.5521 31.1663 20.7404 28.9797 20.7404 26.293V24.7213C20.7404 24.0313 21.3004 23.4713 21.9904 23.4713C22.6804 23.4713 23.2404 24.0313 23.2404 24.7213V26.293C23.2404 30.3597 19.9304 33.6663 15.8654 33.6663H7.72207C3.64874 33.6663 0.33374 30.3513 0.33374 26.2747V7.72634C0.33374 3.64967 3.64874 0.333008 7.72207 0.333008H15.8471ZM29.3139 11.2563L34.1939 16.1147C34.2374 16.1579 34.2764 16.2028 34.3121 16.2503L34.1939 16.1147C34.253 16.1729 34.3055 16.2365 34.351 16.3043C34.3711 16.3351 34.3904 16.3669 34.4084 16.3995C34.4229 16.4251 34.4363 16.4517 34.4487 16.4788C34.4592 16.5027 34.4693 16.5266 34.4787 16.551C34.4913 16.5826 34.5023 16.6152 34.5119 16.6482C34.5192 16.6742 34.5259 16.7001 34.5317 16.7263C34.5392 16.7582 34.545 16.7902 34.5496 16.8225C34.5523 16.8435 34.5548 16.8655 34.5568 16.8876C34.5606 16.9256 34.5622 16.9626 34.5622 16.9997L34.5537 17.103L34.5503 17.1692C34.5499 17.172 34.5495 17.1749 34.5491 17.1777L34.5622 16.9997C34.5622 17.0922 34.552 17.1838 34.5321 17.2729C34.5259 17.2992 34.5192 17.3252 34.5117 17.3508C34.5023 17.3842 34.4913 17.4167 34.4789 17.4488C34.4693 17.4727 34.4592 17.4966 34.4484 17.5202C34.4363 17.5476 34.4229 17.5743 34.4086 17.6004C34.3904 17.6325 34.3711 17.6643 34.3504 17.6951C34.3387 17.7134 34.3259 17.7314 34.3125 17.7491C34.2729 17.8013 34.2296 17.8504 34.1828 17.8959L29.3139 22.7447C29.0706 22.988 28.7506 23.1097 28.4322 23.1097C28.1122 23.1097 27.7906 22.988 27.5472 22.7413C27.0606 22.2513 27.0622 21.4613 27.5506 20.9747L30.2837 18.2497H13.2434C12.5534 18.2497 11.9934 17.6897 11.9934 16.9997C11.9934 16.3097 12.5534 15.7497 13.2434 15.7497H30.2871L27.5506 13.0263C27.0622 12.5397 27.0589 11.7497 27.5472 11.2597C28.0339 10.7697 28.8239 10.7697 29.3139 11.2563Z"
                    fill="#E63746"
                />
            </svg>
            <Text style={{ color: '#E63746' }}>Log out</Text>
        </Row>
    );
};
