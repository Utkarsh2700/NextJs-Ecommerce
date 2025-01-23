import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

const NewProduct = () => {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm price="" title="" description="" />
    </Layout>
  );
};

export default NewProduct;
