import {
  Button,
  Form,
  Input,
  notification,
  Modal,
  Upload,
  Row,
  Col,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSS_HELPER } from "../../helper";
import { PlusOutlined } from "@ant-design/icons";
import "./CreateBlog.css";
import TextEditor from "../TextEditor/TextEditor";
import axiosService from "../../axiosService";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CreateBlog = () => {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState({
    previewOpen: false,
    previewImage: "",
    previewTitle: "",
  });
  const [uploadFile, setUploadFile] = useState(null);
  const [textEditor, setTextEditor] = useState();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setImagePreview({
      previewImage: file.url || file.preview,
      previewOpen: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Thumbnail
      </div>
    </div>
  );

  const CreateBlog = async (formValues) => {
    if (!textEditor || textEditor === "<p></p>\n") {
      notification.error({ message: 'PLEASE ADD BLOG CONTENT' })
      return
    }
    if (!formValues.imgUrl && !uploadFile) {
      notification.error({ message: 'THUMBNAIL URL OR IMAGE REQUIRED' })
      return
    }

    const formData = new FormData();
    if (uploadFile && uploadFile.originFileObj) {
      formData.append("blogImage", uploadFile.originFileObj);
    }
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("blogDescription", textEditor);
    if (formValues.imgUrl) {
      formData.append("imageUrl", formValues.imgUrl);
    }
    try {
      const apiRes = await axiosService.post(`/blog/createBlog`, formData);
      if (apiRes.status === 200) {
        navigate(`/`);
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      if (errorMessage) {
        notification.error({ message: errorMessage })
      } else {
        notification.error({ message: `SORRY! SOMETHING WENT WRONG` })
      }
    }
  };

  return (
    <div className="box create__blog">
      <Form
        onFinish={CreateBlog}
        size="large"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        scrollToFirstError
        className="create__blog--form"
      >
        <Form.Item
          label="Blog Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a title for the blog!",
            },
          ]}
          style={CSS_HELPER.input}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>
        <Form.Item
          label="Blog Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter a description for the blog !",
            },
          ]}
          style={CSS_HELPER.input}
        >
          <Input placeholder="Enter blog description" />
        </Form.Item>
        <div className="text__editor--wrapper">
          <h3>Add Blog Content : </h3>
          <TextEditor setTextEditor={setTextEditor} />
        </div>
        <div className="upload__thumbnail--wrapper">
          <Form.Item
            label="Thumnail URL"
            name="imgUrl"
            style={CSS_HELPER.input}
          >
            <Input
              placeholder="Enter or paste thumbnail url"
              disabled={uploadFile ? true : false}
            />
          </Form.Item>
          <div>
            <Upload
              listType="picture-card"
              uploadFile={uploadFile}
              onPreview={handlePreview}
              onChange={({ fileList }) => setUploadFile(fileList[0])}
              beforeUpload={() => false}
            >
              {!uploadFile || uploadFile.length <= 0 ? uploadButton : null}
            </Upload>
            <Modal
              open={imagePreview.previewOpen}
              title={imagePreview.previewTitle}
              footer={null}
              onCancel={() =>
                setImagePreview({ ...imagePreview, previewOpen: false })
              }
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={imagePreview.previewImage}
              />
            </Modal>
          </div>
        </div>
        <Row>
          <Col span={13} offset={6}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ ...CSS_HELPER.button, ...CSS_HELPER.createButton }}
              >
                CREATE BLOG
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </div>
  );
};

export default CreateBlog;
