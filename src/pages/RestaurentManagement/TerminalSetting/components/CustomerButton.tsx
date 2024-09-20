export const CustomButton = function ({
    title = '',
    style = {},
    leftIcon,
    rightIcon,
    onClick,
}: {
    title: string;
    style?: object;
    leftIcon?: string;
    rightIcon?: string;
    onClick?: () => void;
}) {
    return (
        <div onClick={onClick} className="customButton" style={style}>
            {leftIcon ? (
                <div style={{ marginRight: 8 }}>
                    {<img src={leftIcon} alt="leftIcon" />}
                </div>
            ) : (
                <div />
            )}
            {title}
            {rightIcon ? (
                <div style={{ marginLeft: 8 }}>
                    {<img src={rightIcon} alt="rightIcon" />}
                </div>
            ) : (
                <div />
            )}
        </div>
    );
};
