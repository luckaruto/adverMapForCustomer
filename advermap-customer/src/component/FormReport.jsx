import React, { useState } from "react";
import Text from "./Text";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

// import { HOST } from "./constants";

export default function FormReport() {
  const [editorData, setEditorData] = useState("");

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const file = await loader.file;
            const response = await axios.request({
              method: "POST",
              url: `${"12222"}/upload_files`,
              data: {
                files: file,
              },
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            resolve({
              default: `${"`11111"}/${response.data.filename}`,
            });
          } catch (error) {
            reject("Hello");
          }
        });
      },
      abort: () => {},
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleSubmit = (event) => {
    // Handle form submission here
    event.preventDefault();
    const formData = {
      option: event.target.elements["grid-option"].value,
      name: event.target.elements["grid-name"].value,
      email: event.target.elements["email"].value,
      content: editorData,
    };

    // Log the form data
    console.log("Form Data:", formData);
  };
  return (
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
  );
}
