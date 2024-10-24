import { Button } from 'antd';
import './index.scss';
import React from 'react';
function ButtonSubmit(props) {
    const {
        title,
        image,
        color,
        classname,
        onClick,
        loadingButton = false,
        form = 'myForm',
        style = {},
    } = props;
    return (
        <Button
            form={form}
            htmlType="submit"
            loading={loadingButton}
            className={`btn-submit ${classname ? classname : ''}`}
            key={title}
            style={{ background: color, ...style }}
            icon={<img src={image} alt="" style={{ marginRight: '5px' }} />}
            onClick={onClick}
        >
            {!loadingButton && title}
        </Button>
    );
}

export default ButtonSubmit;
