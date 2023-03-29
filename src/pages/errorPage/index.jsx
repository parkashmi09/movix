import React from "react";
import ContentWrapper from "../../components/contentWrapper";

import "./style.scss";

const ErrorPage = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrapper>
    </div>
  );
};

export default ErrorPage;
