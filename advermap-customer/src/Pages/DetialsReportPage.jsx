import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ReportComponent from "../component/ReportComponent";

export default function DetailsReportPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { state: report } = useLocation();

  useEffect(() => {
    if (!report) {
      navigate("/");
    }
  }, [report]);

  return (
    <>
      {report ? (
        <ReportComponent
          reportDate={report.reportDate}
          state={report.state}
          address={report.address}
          content={report.content}
          email={report.email}
          name={report.name}
          phone={report.phone}
          reportType={report.reportType}
          imgUrl={report.imgUrl}
        />
      ) : (
        <div> Pending</div>
      )}
    </>
  );
}
