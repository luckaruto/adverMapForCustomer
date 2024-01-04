import React, { useState, useRef } from "react";
import Text from "./Text";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import shortid from "shortid";

import ReCAPTCHA from "react-google-recaptcha";
import { CookiesProvider, useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { ReportService } from "../services/ReportServices";

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
  const [cookies, setCookie] = useCookies(["user"]);
  const recaptcha = useRef();
  const [editorData, setEditorData] = useState("");
  const selectedSurface = useSelector((state) => state.nav.selectedSurface);

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

  const generateUniqueIdentifier = () => {
    const existingIdentifier = cookies.user;

    if (existingIdentifier) {
      // If the cookie already exists, return the existing value
      return existingIdentifier;
    } else {
      // Generate a unique ID using shortid
      const newIdentifier = shortid.generate();
      setCookie("user", newIdentifier, { path: "/" });
      return newIdentifier;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      const formData = {
        address: selectedSurface.address,
        format: event.target.elements["grid-option"].value,
        name: event.target.elements["grid-name"].value,
        email: event.target.elements["email"].value,
        phone: event.target.elements["phone"].value,
        content: editorData,
        imgUrl: extractImageUrls(editorData).join(),
      };
      const imageUrls = extractImageUrls(editorData);
      console.log("Image URLs:", imageUrls);

      console.log("Form Data:", formData);

      generateUniqueIdentifier(); // Implement a function to generate a unique identifier

      // const res = await fetch("http://localhost:8000/verify", {
      //   method: "POST",
      //   body: JSON.stringify({ captchaValue }),
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // });
      // const data = await res.json();

      if (formData) {
        // make form submission
        try {
          await ReportService.postReport(formData, selectedSurface.id);
          alert("Form submission successful!");
        } catch (error) {
          alert(error);
        }
      } else {
        alert("reCAPTCHA validation failed!");
      }
    }
  };
  return (
    <div className=" flex items-center justify-center h-full w-[70%] ">
      <form
        className=" flex flex-col relative w-full h-full bg-white p-5 overflow-y-auto no-scrollbar"
        onSubmit={handleSubmit}
      >
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
          <div className="w-full md:w-1/2 px-3 mb-6">
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
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="phone"
            >
              Số điện thoại
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone"
              type="phone"
              placeholder=""
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
        <ReCAPTCHA
          sitekey="6LdelEQpAAAAAGJJ6NI1H_o0SEIKxtBa-ewUnUYS"
          ref={recaptcha}
        />
        <button
          type="submit"
          className="  bg-blue-400 p-2 rounded-md  w-[20%] ml-auto"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
