import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, message } from 'antd';
import { getAllUsers } from "../../utils/userAPI.jsx";

const ManageUsers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchDataUsers = async () => {
            setLoading(true)
            const res = await getAllUsers()
            const result = res.data.data
            console.log(res)
            if(res.status === 200 && result) {
                setData(result);
                setLoading(false)
            }

        };

        fetchDataUsers();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []);

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.username}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{ pageSize: 5 }} // Phân trang
        />
    );
};

export default ManageUsers;
