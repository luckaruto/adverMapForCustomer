
const FormReport = ({ show,setShow }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-20 ">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
          <div className="fixed inset-0  w-screen overflow-y-auto flex justify-center items-center">
            <div className="bg-red-500 w-[400px] h-[400px] ">
              <button onClick={() => setShow(false)}>Click</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormReport;
