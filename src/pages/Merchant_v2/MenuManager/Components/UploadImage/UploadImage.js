import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React from "react";
import "./index.scss";

const MAX_SIZE_UPLOAD = 2;
const TYPES_UPLOAD = ["jpg", "png", "jpeg"];

const getFileType = (file) => file.type?.slice(6);

const UploadImage = ({ listImage = [], setListImage }) => {
  const onBeforeCrop = (file) => {
    const fileType = getFileType(file);
    if (!TYPES_UPLOAD.includes(fileType)) {
      message.error(`Please upload file for type(JPG, PNG and JPEG)`);
      return Promise.reject();
    }
    if (file?.size > MAX_SIZE_UPLOAD * 1024 * 1024) {
      message.error(`Please upload files smaller than ${MAX_SIZE_UPLOAD}MB`);
      return Promise.reject();
    }
  };

  const onChange = ({ fileList: newFileList, file }) => {
    const fileType = getFileType(file);
    if (!TYPES_UPLOAD.includes(fileType)) {
      return;
    }
    if (file?.size > MAX_SIZE_UPLOAD * 1024 * 1024) {
      return;
    }
    const newList = newFileList.map((file) => {
      if (file.response) {
        return {
          ...file,
          status: "done",
        };
      }
      return file;
    });
    setListImage(newList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop beforeCrop={onBeforeCrop} rotationSlider>
      <Upload
        listType="picture-card"
        fileList={listImage}
        defaultFileList={listImage}
        accept=".png, .jpeg, .jpg"
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={() => false}
      >
        {listImage.length < 5 && (
          <div style={{ display: "block" }}>
            <span style={{ fontSize: 20, fontWeight: 500 }}>+</span>
            <p style={{ fontSize: 10, fontWeight: 500, marginTop: 4 }}>
              Support JPG, JPEG, PNG image files <br />
              MAX file size 2MB
            </p>
          </div>
        )}
      </Upload>
    </ImgCrop>
  );
};
export default UploadImage;
