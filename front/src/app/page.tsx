import Featured from "@/components/Featured";
import Header from "@/components/Header";
import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/product.model";
import React from "react";

interface Product {
  title: string;
  description: string;
  price: number;
  images: [string];
}

const HomePage = async () => {
  await dbConnect();
  const featuredProductId = "677f6b94b30fcd4535ad447f";

  const product = await Product.findById(featuredProductId);
  console.log("product fetched", product);
  // const product = getServerSideProps();
  console.log({ product });
  return (
    <div>
      <Header />
      <Featured />
    </div>
  );
};

export default HomePage;

// export async function fetchProduct() {
//   await dbConnect();
//   const featuredProductId = "677f6b94b30fcd4535ad447f";

//   const product = await Product.findById(featuredProductId);
//   console.log("product fetched", product);
//   return {
//     props: { product: JSON.stringify(product) },
//   };
// }

// import Featured from "@/components/Featured";
// import Header from "@/components/Header";
// import dbConnect from "@/lib/dbConnect";
// import { Product } from "@/models/product.model";
// import React from "react";

// interface Product {
//   title: string;
//   description: string;
//   price: number;
//   images: [string];
// }

// const HomePage = ({ product }: { product: Product | null }) => {
//   console.log({ product });

//   return (
//     <div>
//       <Header />
//       <Featured />
//       {product ? (
//         <div>
//           <h1>{product.title}</h1>
//           <p>{product.description}</p>
//           <p>${product.price}</p>
//         </div>
//       ) : (
//         <p>Product not found</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// export async function getServerSideProps() {
//   try {
//     await dbConnect();

//     const featuredProductId = "677f6b94b30fcd4535ad447f";

//     const product = await Product.findById(featuredProductId);

//     if (!product) {
//       return {
//         props: { product: null }, // No product found
//       };
//     }

//     return {
//       props: { product: JSON.parse(JSON.stringify(product)) }, // Serialize MongoDB object
//     };
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return {
//       props: { product: null }, // Handle error gracefully
//     };
//   }
// }
