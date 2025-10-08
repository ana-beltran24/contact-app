import React from "react";
import Line from "../../atoms/Line/line";
import "./Title.css";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => (
  <div className="title-div">
    <h1 className="main-title">{text}</h1>
    <Line />
  </div>
);

export default Title;
