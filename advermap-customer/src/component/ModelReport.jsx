import React from "react";

import ReactDOM from "react-dom";

import FormReport from "./FormReport";

const Backdrop = (props) => {
  return (
    <div
      className="backdropTeacher bg-black bg-opacity-[55%]"
      onClick={props.HandleFalse}
    />
  );
};

export default function ModelReport(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop HandleFalse={props.HandleFalse} />,
        document.getElementById("root_1")
      )}
      {ReactDOM.createPortal(
        <>
          <div className=" modalTeacher hover:shadow-bs1 h-[80%] flex flex-row items-center justify-center">
            <FormReport HandleFalse={props.HandleFalse} />
          </div>
        </>,
        document.getElementById("root_2")
      )}
    </React.Fragment>
  );
}
