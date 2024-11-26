import { Layout } from "antd";

const AdminContent = ({ children }) => {
    const { Content } = Layout;

    return (
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
                style={{
                    padding: 24,
                    minHeight: 'calc(100vh - 180px)',
                }}
            >
                {children}
            </div>
        </Content>
    );
};

export default AdminContent;
