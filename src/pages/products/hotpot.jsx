import React, {useEffect, useState} from 'react';
import {Button, Space, Table, Tag, Typography} from 'antd';
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import MaterialTag from "./materialTag.jsx";
import lauKimchi from '../../assets/lau-kimchi.jpg';
import lauThai from '../../assets/lau-thai.jpg';
import lauGaLaE from '../../assets/lau-ga-la-e.jpg';

const ManageHotPot = () => {
    const [loading, setLoading] = useState(false);
    const [isEditRecordID, setEditRecordId] = useState(false);
    const [data, setData] = useState([
        {
            key: '1',
            srcImg: lauKimchi,
            price: '325.000',
            description: 'Lẩu kim chi',
            name: 'Lẩu Kimchi',
            materials: ['Nước dùng lẩu kimchi', 'Nấm kim các loại', 'Thịt bò'],
        },
        {
            key: '2',
            srcImg: lauThai,
            price: '199.000',
            description: 'Lẩu Thái',
            name: 'Lẩu Thái',
            materials: ['Nước dùng lẩu Thái', 'Nấm kim châm', 'Hải sản các loại'],
        },
        {
            key: '3',
            srcImg: lauGaLaE,
            price: '299.000',
            description: 'Lẩu gà lá é',
            name: 'Lẩu gà lá é',
            materials: ['Nước dùng lẩu gà lá é', 'Thịt gà', 'Măng', 'Nấm'],
        },
    ]);

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (srcImg, record) => (
                <img
                    src={record.srcImg}
                    alt={record.description}
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "7px" }}
                />
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Nguyên liệu',
            dataIndex: 'materials',
            width: 600,
            render: (_, record) => (
                <MaterialTag
                    isEditRecordID={isEditRecordID}
                    recordID={record.key}
                    initTags={record.materials}
                />
            ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => handleView(record.key)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record.key)} />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    const handleView = (id) => {
        console.log(">>Check handleView", id);
    }

    const handleEdit = (id) => {
        setEditRecordId(prevId => (prevId === id ? null : id));
    }

    const handleDelete = (record) => {
        console.log(">>Check handleEdit", record);
    }

    useEffect(() => {
        const setLoadingStatus = () => {
            setLoading(true);
            setTimeout(() => { setLoading(false)}, 2000)
        }

        setLoadingStatus();
    }, [])

    return (
        <>
            <Typography.Title level={2} style={{ textAlign: "left" }}>Quản lý lẩu</Typography.Title>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 3 }}
            />
        </>
    )
}
export default ManageHotPot;