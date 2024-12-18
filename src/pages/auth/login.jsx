import {Button, Col, Form, Input, notification, Row} from 'antd';
import {loginAdmin} from "../../utils/loginAPI.js";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../components/library/admin.context.jsx";

const LoginPage = () => {
    const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const { username, password } = values;
        const res = await loginAdmin(username, password);
        console.log(">>Check res",res)
        if(res){
            localStorage.setItem("access_token", res.data.data.access_token);
            localStorage.setItem("refresh_token", res.data.data.refresh_token);
            setAuth({
                isAuthenticated: true,
                user: {
                    username: res.data.data.username,
                }
            })

            notification.success({
                message: "Đăng nhập thành công",
                description: `Chào mừng trở lại, ${res.data.data.username}`,
                duration: 2,
                showProgress: true,
                pauseOnHover: true,
            })

            navigate('/')
        }else{
            notification.error({
                message: "Đăng nhập thất bại",
                description: "Lỗi",
                duration: 3.5,
                showProgress: true,
                pauseOnHover: true,
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Tên người dùng"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;