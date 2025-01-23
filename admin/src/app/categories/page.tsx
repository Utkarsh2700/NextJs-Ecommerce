"use client";
import Layout from "@/components/Layout";
import { categories, Properties } from "@/types/next-auth";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { SweetAlert2Props, withSwal } from "react-sweetalert2";
import { SweetAlertResult } from "sweetalert2";
const Categories = ({ swal }) => {
  // console.log("swal", swal);
  const [editedCategory, setEditedCategory] = useState<categories>();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<categories[]>([]);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState<Properties[]>([]);
  async function saveCategory(e: FormEvent) {
    console.log("parentCategory", parentCategory);
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    console.log("data", data);
    e.preventDefault();
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(undefined);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
    setProperties([]);
    setParentCategory("");
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  async function fetchCategories() {
    try {
      await axios
        .get("/api/categories")
        .then((res) => res.data)
        .then((data) => {
          console.log(data.categories);
          return setCategories(data.categories);
        });
    } catch (error: any) {
      throw new Error(error.message);
      console.error(error);
    }
  }

  function editCategory(category: categories) {
    console.log("category", category);
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties?.map(({ name, values }) => ({
        name,
        values: (values as string[]).join(","),
      }))
    );
  }

  function deleteCategory(category: categories) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you Want to delete ${category.name}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        cancelButtonColor: "#1cc71c",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result: SweetAlertResult) => {
        // when confirmed and promise resolved...
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete(`/api/categories?_id=${_id}`);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChange(
    property: Properties,
    index: number,
    newName: string
  ) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
    // console.log({ property, index, newName });
  }
  function handlePropertyValueChange(
    property: Properties,
    index: number,
    newValue: string
  ) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
    // console.log({ property, index, newValue });
  }
  function removeProperty(index: number) {
    setProperties((prev) => {
      const deleted = prev.filter((_, ind) => ind != index);
      return deleted;
    });
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor="">
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Create New Category"}
      </label>
      <form onSubmit={saveCategory} className="">
        <div className="flex gap-1">
          <input
            className=""
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className=""
            value={parentCategory}
            onChange={(event) => setParentCategory(event.target.value)}
          >
            <option value="">No Parent Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block" htmlFor="">
            Properties
          </label>
          <button
            type="button"
            className="btn-default text-sm mb-2"
            onClick={addProperty}
          >
            Add New Property
          </button>
        </div>

        {properties.length > 0 &&
          properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input
                type="text"
                className="mb-0"
                value={property.name}
                onChange={(ev) =>
                  handlePropertyNameChange(property, index, ev.target.value)
                }
                placeholder="property name {example : color}"
              />
              <input
                type="text"
                className="mb-0"
                value={property.values}
                onChange={(e) =>
                  handlePropertyValueChange(property, index, e.target.value)
                }
                placeholder="values, comma seprated"
              />
              <button
                type="button"
                className="btn-red"
                onClick={() => removeProperty(index)}
              >
                Remove
              </button>
            </div>
          ))}
        <div className="flex gap-1">
          {editedCategory && (
            <button
              className="btn-default"
              type="button"
              onClick={() => {
                setEditedCategory(undefined);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      className="btn-default mr-1"
                      onClick={() => editCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-red"
                      onClick={() => deleteCategory(category)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default withSwal(({ swal }) => <Categories swal={swal} />);
