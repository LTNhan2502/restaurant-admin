import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, theme } from "antd";

const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
};

const MaterialTag = ({ isEditRecordID, recordID, initTags }) => {
    const { token } = theme.useToken();
    const [tags, setTags] = useState(initTags);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    // Tự động focus vào input khi hiển thị
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    // Xử lý xóa tag
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    // Hiển thị input thêm tag mới
    const showInput = () => {
        setInputVisible(true);
    };

    // Cập nhật giá trị trong input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Thêm tag mới vào danh sách
    const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue("");
    };

    // Style cho nút thêm tag mới
    const tagPlusStyle = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: "dashed",
        cursor: "pointer",
    };

    return (
        <div>
            {/* Phần hiển thị các tag */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                }}
            >
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        closable={isEditRecordID === recordID}
                        color="geekblue"
                        onClose={() => handleClose(tag)}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>

            {/* Nút thêm tag mới nằm phía dưới */}
            <div
                style={{
                    marginTop: "12px",
                }}
            >
                {inputVisible ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                ) : (
                    isEditRecordID === recordID && (
                        <Tag style={tagPlusStyle} onClick={showInput}>
                            <PlusOutlined /> Thêm nguyên liệu
                        </Tag>
                    )
                )}
            </div>
        </div>
    );
};

export default MaterialTag;
