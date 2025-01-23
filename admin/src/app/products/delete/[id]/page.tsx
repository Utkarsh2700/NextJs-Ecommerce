"use client";
import Layout from "@/components/Layout";
import { product } from "@/types/next-auth";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function DeleteProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<product>();

  async function findProductById() {
    if (!id) {
      return;
    }
    try {
      const response = await axios.get(`/api/products?id=${id}`);
      setProductInfo(response.data.products);
    } catch (error) {}
  }

  async function deleteProduct() {
    const response = await axios.delete(`/api/products?id=${id}`);
    goBack();
  }
  useEffect(() => {
    findProductById();
  }, []);
  function goBack() {
    router.push("/products");
  }
  return (
    <Layout>
      <h1>Do you really want to Delete &nbsp; "{productInfo?.title}" ?</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button onClick={goBack} className="btn-default">
          No
        </button>
      </div>
    </Layout>
  );
}

export default DeleteProductPage;
