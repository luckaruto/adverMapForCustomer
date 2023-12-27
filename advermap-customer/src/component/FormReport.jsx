import React, { useState } from "react";
import Text from "./Text";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const storageRef = ref(storage, `images/${v4()}_${file.name}`);

          uploadBytes(storageRef, file).then(
            async (snapshot) => {
              try {
                const downloadURL = await getDownloadURL(snapshot.ref);
                console.log("File available at", downloadURL);

                resolve({ default: downloadURL });
              } catch (error) {
                console.error("Error getting download URL", error);
                reject(error.message);
              }
            },
            (error) => {
              console.error("Error uploading file", error);
              reject(error.message);
            }
          );
        })
    );
  }
}

export default function FormReport() {
  const [editorData, setEditorData] = useState("");

  function extractImageUrls(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgElements = doc.querySelectorAll("img");

    const imageUrls = [];
    imgElements.forEach((img) => {
      const url = img.getAttribute("src");
      if (url) {
        imageUrls.push(url);
      }
    });

    return imageUrls;
  }

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      option: event.target.elements["grid-option"].value,
      name: event.target.elements["grid-name"].value,
      email: event.target.elements["email"].value,
      content: editorData,
    };
    const imageUrls = extractImageUrls(editorData);
    console.log("Image URLs:", imageUrls);

    console.log("Form Data:", formData);
  };
  return (
    <div className="w-full h-full relative flex flex-col">
      <div
        className=" absolute bg-white h-full w-full z-0
    "
      ></div>{" "}
      <div className="relative z-10 flex items-center justify-center h-full w-full bg-black bg-opacity-40">
        <form className=" relative w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-option"
              >
                Hình thức báo cáo
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-option"
                >
                  <option>Tố giác sai phạm</option>
                  <option>Đăng kí nội dung</option>
                  <option>Đóng góp ý kiến</option>
                  <option>Giải đáp thắc mắc</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Họ và tên{" "}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-name"
                type="text"
                placeholder="Nguyễn Văn A"
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                placeholder="123@gmail.com"
              />
            </div>
            <div className="mt-6 w-full md:w-1/2 px-3">
              <Text className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Content
              </Text>
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleChange}
                config={{
                  extraPlugins: [uploadPlugin],
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className=" absolute right-3 bg-blue-400 p-2 rounded-md  w-[20%] "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
