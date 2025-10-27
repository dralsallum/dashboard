import React from "react";
import {} from "./Template.elements";
import inputIcon from "../../assets/input.png";
import logo from "../../assets/drslallum.png";
import { useDispatch, useSelector } from "react-redux";
import NavSide from "../NavSide/NavSide";

const Template = () => {
  const dispatch = useDispatch();

  const storeName = useSelector((state) => state.tab.storeName);

  return <MaFirst></MaFirst>;
};

export default Template;
