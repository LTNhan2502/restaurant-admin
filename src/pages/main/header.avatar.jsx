import React from 'react';
import {BellOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Badge, Dropdown, Space} from 'antd';
import {useNavigate} from "react-router-dom";
import instance from "../../utils/axios.config.js";
const HeaderAvatar = () => {
    const navigate = useNavigate();
    const items = [
        {
            label: <a href="https://www.antgroup.com">Đổi mật khẩu</a>,
            key: '0',
        },
        {
            label: <div onClick={() => handleLogout()}>Đăng xuất</div>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    const handleLogout = () => {
        console.log(">>Check logout")
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        delete instance.defaults.headers.Authorization;
        navigate('/login')
    }

    return(
        <>
            <Badge count={3}>
                <BellOutlined style={{ fontSize: '24px' }} />
            </Badge>

            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />}
                        />
                    </Space>
                </a>
            </Dropdown>
        </>
    )
};
export default HeaderAvatar;