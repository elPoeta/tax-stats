import React from "react";
import HeadBase from "../common/HeadBase";

export const Layout = (props: { children: any }) => {
  return (
    <>
      <HeadBase title={`Tax Stats ${new Date().getFullYear()}`} />
      {props.children}
    </>
  );
};
