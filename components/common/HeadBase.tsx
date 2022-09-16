import Head from "next/head";
import React from "react";
import { HeadType } from "../../types/HeadType";

const HeadBase = ({ title, description="tax statistics" }: HeadType) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadBase;
