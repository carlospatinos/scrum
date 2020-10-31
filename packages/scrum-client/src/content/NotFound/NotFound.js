import React from "react";
import "./NotFound.css";

import ReactGA from 'react-ga';
if(process.env.NODE_ENV === "production") {
  ReactGA.pageview(window.location.pathname + window.location.search);
}


export default function NotFound() {
  return (
    <div className="NotFound">
      <h3>Sorry, page not found!</h3>
    </div>
  );
}