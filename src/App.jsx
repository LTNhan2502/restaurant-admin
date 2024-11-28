import {
    DashboardOutlined,
    DownloadOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
// import ContentPage from './containers/content/ContentPage';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useContext, useState} from "react";
import {AuthContext} from "./components/library/admin.context.jsx";
import {GiFruitBowl, GiHotMeal, GiNoodles} from "react-icons/gi";
import HeaderAvatar from "./pages/main/header.avatar.jsx";

const { Header, Content, Footer, Sider } = Layout;
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
    const {auth} = useContext(AuthContext);
    console.log(">>Check auth",auth);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout hasSider>
            {/* Side bar */}
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
                            label: "Bảng điều khiển"
                        },
                        {
                            icon: <ProductOutlined/>,
                            label: "Sản phẩm",
                            children: [
                                {
                                    key: "/hot-pot",
                                    icon: <GiHotMeal />,
                                    label: "Lẩu",
                                },
                                {
                                    key: "/spicy-noodles",
                                    icon: <GiNoodles />,
                                    label: "Mì cay",
                                },
                                {
                                    key: "/materials",
                                    icon: <GiFruitBowl />,
                                    label: "Nguyên liệu",
                                },
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

            {/* Phần nội dung bên phải */}
            <Layout
                style={{
                    marginInlineStart: collapsed ? 80 : 200,
                    transition: 'margin 0.2s ease',
                }}
            >
                {/* Header */}
                <Header
                    style={{
                        display: 'flex',
                        justifyContent: "space-between",
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div
                        style={{
                            width: 100,
                            height: 64,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}
                    >
                        <HeaderAvatar/>
                    </div>
                </Header>

                {/* Content */}
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            minHeight: "100vh"
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>

                {/* Footer */}
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;