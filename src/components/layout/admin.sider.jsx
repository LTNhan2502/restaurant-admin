import {
    DashboardOutlined,
    DownloadOutlined,
    LogoutOutlined,
    ProductOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
// import ContentPage from './containers/content/ContentPage';
import { useLocation, useNavigate } from 'react-router-dom';
import {useState} from "react";

const { Sider } = Layout;
const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const App = () => {
    const [collapsed] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={(item) => {
                    navigate(item.key)
                }}
                items={[
                    {
                        key: "/",
                        icon: <DashboardOutlined/>,
                        label: "Dashboard"
                    },
                    {
                        key: "2",
                        icon: <ProductOutlined/>,
                        label: "Product",
                        children: [
                            {
                                key: "/products",
                                icon: <DownloadOutlined/>,
                                label: "Option 1",
                            }
                        ]
                    },
                    {
                        key: "/users",
                        icon: <UserOutlined/>,
                        label: "User"
                    },
                    {
                        key: "4",
                        icon: <LogoutOutlined/>,
                        label: "Log out"
                    },

                ]}
            />
        </Sider>
    );
};
export default App;