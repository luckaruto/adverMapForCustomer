import React, { useState, useRef } from "react";
import Text from "./Text";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { storage } from "../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ReactComponent as SvgCamera } from "../images/camera.svg";
import shortid from "shortid";

import ReCAPTCHA from "react-google-recaptcha";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { ReportService } from "../services/ReportServices";
import { ReactComponent as SvgDelete } from "../images/delete.svg";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.uploadedImages = 0; // Track the number of uploaded images
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          if (this.uploadedImages < 2) {
            // Allow only two images
            const storageRef = ref(storage, `images/${v4()}_${file.name}`);

            uploadBytes(storageRef, file).then(
              async (snapshot) => {
                try {
                  const downloadURL = await getDownloadURL(snapshot.ref);
                  console.log("File available at", downloadURL);

                  this.uploadedImages++; // Increment the count of uploaded images

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
          } else {
            reject("You can only upload two images."); // Reject if trying to upload more than two images
          }
        })
    );
  }
}

export default function FormReport() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isHovered2, setIsHovered2] = React.useState(false);
  const recaptcha = useRef();
  const [editorData, setEditorData] = useState("");
  const selectedSurface = useSelector((state) => state.nav.selectedSurface);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [selectedImage2, setSelectedImage2] = React.useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    setSelectedImage2(file);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  const removeImage = (imageIndex) => {
    if (imageIndex === 1) {
      setSelectedImage("");
    } else if (imageIndex === 2) {
      setSelectedImage2("");
    }
  };

  function extractImageUrls(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgElements = doc.querySelectorAll("img");

    const imageUrls = [];
    imgElements.forEach((img, index) => {
      if (index < 2) {
        // Allow only two image URLs
        const url = img.getAttribute("src");
        if (url) {
          imageUrls.push(url);
        }
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

      // Set the cookie with an expiration time of one year
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      setCookie("user", newIdentifier, { path: "/", expires: expirationDate });
      return newIdentifier;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      generateUniqueIdentifier(); // Implement a function to generate a unique identifier

      // Upload images
      const imageUrls = [];
      if (selectedImage) {
        const image1Ref = ref(storage, `images/${v4()}_image1`);
        await uploadBytes(image1Ref, selectedImage);
        const image1DownloadURL = await getDownloadURL(image1Ref);
        imageUrls.push(image1DownloadURL);
      }

      if (selectedImage2) {
        const image2Ref = ref(storage, `images/${v4()}_image2`);
        await uploadBytes(image2Ref, selectedImage2);
        const image2DownloadURL = await getDownloadURL(image2Ref);
        imageUrls.push(image2DownloadURL);
      }

      const formData = {
        address: selectedSurface.address,
        format: event.target.elements["grid-option"].value,
        name: event.target.elements["grid-name"].value,
        email: event.target.elements["email"].value,
        phone: event.target.elements["phone"].value,
        content: editorData,
        userAddress: cookies.user,
        imgUrl: imageUrls.join(),
      };

      console.log("Image URLs:", imageUrls);
      console.log("Form Data:", formData);

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
    <div className=" flex flex-col items-center justify-center h-full w-[70%] ">
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
                required
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
              className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-name"
              type="text"
              placeholder="Nguyễn Văn A"
              required
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
              required
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
              required
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
          Image of Report
        </label>
        <div className="flex flex-row  w-full items-center justify-center">
          <div className="w-[40%] h-full relative">
            {selectedImage && (
              <button
                className="absolute top-0 right-4 p-2 text-white"
                onClick={() => removeImage(1)}
              >
                <SvgDelete className="h-5 w-5"></SvgDelete>
              </button>
            )}
            <div
              className="relative rounded-[8%] h-[155px] w-[155px] bg-[#878787] "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {selectedImage ? (
                <img
                  className="rounded-[8%] h-full w-full"
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                />
              ) : (
                <SvgCamera className="rounded-[8%] h-full w-full" />
              )}

              {isHovered && (
                <label
                  htmlFor="imageInput"
                  className="absolute top-0 h-full w-full flex items-center justify-center bg-white bg-opacity-10 rounded-[8%]"
                >
                  <input
                    id="imageInput"
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <SvgCamera className="h-[50%] " />
                </label>
              )}
            </div>
          </div>
          <div className="w-[40%] h-full relative">
            {selectedImage2 && (
              <button
                className="absolute top-0 right-4 p-2 text-white"
                onClick={() => removeImage(2)}
              >
                <SvgDelete className="h-5 w-5"></SvgDelete>
              </button>
            )}
            <div
              className="relative rounded-[8%] h-[155px] w-[155px] bg-[#878787] "
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              {selectedImage2 ? (
                <img
                  className="rounded-[8%] h-full w-full"
                  src={URL.createObjectURL(selectedImage2)}
                  alt="Selected"
                />
              ) : (
                <SvgCamera className="rounded-[8%] h-full w-full" />
              )}

              {isHovered2 && (
                <label
                  htmlFor="imageInput2"
                  className="absolute top-0 h-full w-full flex items-center justify-center bg-white bg-opacity-10 rounded-[8%]"
                >
                  <input
                    id="imageInput2"
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleImageChange2}
                    className="hidden"
                  />
                  <SvgCamera className="h-[50%] " />
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <ReCAPTCHA
            sitekey="6LdelEQpAAAAAGJJ6NI1H_o0SEIKxtBa-ewUnUYS"
            ref={recaptcha}
          />
        </div>

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
