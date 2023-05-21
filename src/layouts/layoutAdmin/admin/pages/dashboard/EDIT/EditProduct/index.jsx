import { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
const INITIAL_FIELD_STATE = { color: "", size: "", quantity: "" };
const EditProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [category_id, setCategory] = useState("");
  const [subcategory_id, setSubcategory] = useState("");
  const [fields, setFields] = useState([INITIAL_FIELD_STATE]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  // const [product, setProduct] = useState({});
  // const [colorSize, setColorSize] = useState([]);
  const { id } = useParams();
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
  useEffect(() => {
    axios.get("/api/showAll").then((response) => {
      setCategories(response.data.categories);
      setAllSubcategories(response.data.subcategories);
      setColors(response.data.colors);
      setSizes(response.data.sizes);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/edit-products/${id}`).then((response) => {
      // setProduct(response.data.product);
      // setColorSize(response.data.colorSizes)
      setFields(response.data.colorSizes);
      const filteredSubcategories = allSubcategories.filter(
        (subcategory) =>
          subcategory.category_id == response.data.product.category_id
      );
      setImages(response.data.product.images);
      setSubcategories(filteredSubcategories);
      setSubcategory(response.data.product.subcategory_id);
      setName(response.data.product.product_name);
      setDescription(response.data.product.product_description);
      setPrice(response.data.product.product_price);
      setCategory(response.data.product.category_id);
    });
  }, [allSubcategories, id]);

  const handleChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index],
      [field]: value,
    };
    setFields(newFields);
  };
  //
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setCategory(categoryId);

    const filteredSubcategories = allSubcategories.filter(
      (subcategory) => subcategory.category_id === parseInt(categoryId)
    );
    setSubcategories(filteredSubcategories);
    setSubcategory(filteredSubcategories[0].id);
  };

  const handleSubcategoryChange = (event) => {
    const subcategoryId = event.target.value;
    setSubcategory(subcategoryId);
  };

  //

  const handleAddFields = () => {
    setFields([...fields, INITIAL_FIELD_STATE]);
  };

  const handleRemoveFields = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };
  // const handleImageChange = (event) => {
  //   setImages(Array.from(event.target.files));
  //   setOriginalImages(Array.from(event.target.files));
  //   setMainImageIndex(0);
  // };

  // const handleMainImageChange = (event) => {
  //   const index = parseInt(event.target.value);
  //   const newMainImage = originalImages[index];
  //   const newImages = originalImages.filter((image) => image !== newMainImage);
  //   newImages.unshift(newMainImage);
  //   setMainImageIndex(0);
  //   setOriginalImages(newImages);
  //   setImages(newImages);
  // };
  //
  const handleSubmit = (event) => {
    event.preventDefault();
    const order = {
      name: name,
      price: price,
      description: description,
      colors: fields.map((field) => parseInt(field.color)),
      sizes: fields.map((field) => parseInt(field.size)),
      quantity: fields.map((field) => parseInt(field.quantity)),
      category_id: category_id,
      subcategory_id: subcategory_id,
      product_id: id,
    };
    console.log(order);
    if (order) {
      axios.post("/api/update-products", order).then(() => {});
    }
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    formData.append("id", 40);
    axios.post("/api/upload-image", formData);
  };

  return (
    <>
      <form id="form" className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Edit-Product</h2>
        <div className={styles.form_inputs_wrapper}>
          <div>
            <label className="text-center text-neutral-50">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
            <label>Category:</label>
            <select value={category_id} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  // selected={product.category_id == category.id}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Subcategory:</label>
            <select value={subcategory_id} onChange={handleSubcategoryChange}>
              <option>--Not subcategory--</option>
              {subcategories.map((subcategory) => (
                <option
                  key={subcategory.id}
                  value={subcategory.id}
                  // selected={product.subcategory_id == subcategory.id}
                >
                  {subcategory.subcategory_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {fields.map((field, index) => (
              <div key={index}>
                <select
                  name={`color${index}`}
                  value={field.color}
                  onChange={(event) =>
                    handleChange(index, "color", event.target.value)
                  }
                >
                  <option value="">--Chọn màu sắc--</option>
                  {colors.map((color) => (
                    <option
                      key={color.id}
                      value={color.id}
                      // selected={field.color_id==color.id}
                    >
                      {color.color_name}
                    </option>
                  ))}
                </select>

                <select
                  name={`size${index}`}
                  value={field.size}
                  onChange={(event) =>
                    handleChange(index, "size", event.target.value)
                  }
                >
                  <option value="">--Chọn size--</option>
                  {sizes.map((size) => (
                    <option
                      key={size.id}
                      value={size.id}
                      //  selected={field.size_id==size.id}
                    >
                      {size.size_name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name={`quantity${index}`}
                  value={field.quantity}
                  onChange={(event) =>
                    handleChange(index, "quantity", event.target.value)
                  }
                  placeholder="Nhập số lượng"
                />

                <button type="button" onClick={() => handleRemoveFields(index)}>
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <div>
            <button type="button" onClick={() => handleAddFields()}>
              Thêm thuộc tính
            </button>
          </div>
          <div>
            <label>Image:</label>
            {images.length > 0 &&
              images.map((image, index) => (
                <div key={index} className="flex flex-row justify-between">
                  <img
                    src={"http://127.0.0.1:8000/" + image.url}
                    alt={`Image}`}
                    width="100"
                    height="100"
                  />
                </div>
              ))}
                  
          </div>
        </div>
        <div className={styles.button_wrapper}>
          <button form="form" className={styles.button} type="submit">
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
