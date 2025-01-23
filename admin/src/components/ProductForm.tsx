"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import Layout from "./Layout";
import { useRouter } from "next/navigation";
import axios from "axios";
import { categories, product, Properties } from "@/types/next-auth";
import Spinner from "./Spinner";
import { ItemInterface, ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}: product) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [gotoProducts, setGotoProducts] = useState(false);
  const [images, setImages] = useState<ItemInterface[]>(
    (existingImages || []).map((link) => ({ id: link, name: link }))
  );
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<categories[]>([]);
  const [productProperties, setProductProperties] = useState<Properties>(
    assignedProperties || {}
  );
  const [category, setCategory] = useState(assignedCategory || "");
  const router = useRouter();

  useEffect(() => {
    console.log("fetching categoreis");
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data.categories));
  }, []);
  async function saveProduct(e: FormEvent) {
    e.preventDefault();
    // console.log("images", images);
    try {
      // If we have _id that means we are on edit page so we should send a patch/put request
      const data = {
        title,
        description,
        price,
        images: images.map((image) => image.name),
        category,
        properties: productProperties,
      };
      console.log("data", data);
      if (_id) {
        // update
        await axios.put("/api/products", {
          ...data,
          _id: _id,
        });
      } else {
        // create
        await axios.post("/api/products", data);
      }
      setGotoProducts(true);
      router.push("/products");
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async function uploadImages(e: ChangeEvent) {
    // console.log(e);
    // e.preventDefault();
    setIsUploading(true);
    const files = (e.target as HTMLInputElement)?.files;
    if (files && files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const response = await axios.post("/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response.data.links) {
        throw new Error("Links not found");
      }
      const links = response.data.links as string[];
      setImages((prevImages) => [
        ...prevImages,
        ...links.map((link) => ({ id: link, name: link })),
      ]);
      setIsUploading(false);
      // console.log("images", images);

      // console.log("formdata ", data);
    }
  }

  // const updateImagesOrder = (images: string[]) => {
  //   setImages(images);
  // };
  const updateImagesOrder = (images: ItemInterface[]) => {
    setImages(images);
  };

  function setProductProp(name: string, value: string) {
    // console.log({ name, value });
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[`${name}`] = value;
      console.log({ newProductProps });
      return newProductProps;
    });
  }

  // console.log({ productProperties });
  const propertiesToFill: Properties[] = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    // console.log({ catInfo });
    propertiesToFill.push(...(catInfo?.properties ?? []));
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      // console.log({ parentCat });
      propertiesToFill.push(...(parentCat?.properties ?? []));
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={(e) => saveProduct(e)}>
      <label htmlFor="">Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Uncategorized</option>
        {categories.length > 0 &&
          categories.map((categ) => (
            <option key={categ._id} value={categ._id}>
              {categ.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className="" key={p.name}>
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <select
              value={productProperties[p.name]}
              onChange={(e) => setProductProp(p.name, e.target.value)}
            >
              {Array.isArray(p.values) &&
                p?.values?.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
            </select>
          </div>
        ))}
      <label htmlFor="">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images.length &&
            images.map((item) => (
              <div
                key={item.id}
                className="h-24 p-4 bg-white shadow-sm rounded-sm border border-gray-200"
              >
                <img src={item.name} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>

        {isUploading && (
          <div className="h-24  p-1 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="cursor-pointer w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div className="text-sm">Add Image</div>
          <input
            multiple
            type="file"
            className="hidden"
            onChange={(e) => uploadImages(e)}
          />
        </label>
      </div>
      <label htmlFor="">Description</label>
      <textarea
        placeholder="description"
        name=""
        id=""
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="">Price (in USD)</label>
      <input
        placeholder="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
