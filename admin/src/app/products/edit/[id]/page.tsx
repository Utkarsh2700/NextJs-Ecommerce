"use client";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { product } from "@/types/next-auth";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditProductPage = () => {
  const [productInfo, setProductInfo] = useState<product>();
  const { id } = useParams();

  async function fetchProductById() {
    try {
      const response = await axios.get(`/api/products?id=${id}`);
      // console.log("response", response);
      setProductInfo(response.data.products);
    } catch (error) {
      console.log("Error : ", error);
    }
  }
  useEffect(() => {
    fetchProductById();
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
};

export default EditProductPage;
