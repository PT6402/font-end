import { useState, useEffect, useRef} from "react";
import styles from "./index.module.scss";
import axios from "axios";
const INITIAL_FIELD_STATE = { color: "", size: "", quantity: "" };
const AddProduct = () => {
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
  const statusInput = useRef();
  axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
  useEffect(() => {
    axios
      .get("/api/view-categories")
      .then((response) => setCategories(response.data.bodyTable));
  }, []);

  useEffect(() => {
    axios
      .get("/api/view-subcategories")
      .then((response) => setAllSubcategories(response.data.bodyTable));
  }, []);
  useEffect(() => {
    axios.get("/api/view-color").then((response) => {
      setColors(response.data.colors);
    });
    axios.get("/api/view-size").then((response) => {
      setSizes(response.data.sizes);
    });
  }, []);

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
  const handleImageChange = (event) => {
    setImages(Array.from(event.target.files));
    setOriginalImages(Array.from(event.target.files));
    setMainImageIndex(0);
  };

  const handleMainImageChange = (event) => {
    const index = parseInt(event.target.value);
    const newMainImage = originalImages[index];
    const newImages = originalImages.filter((image) => image !== newMainImage);
    newImages.unshift(newMainImage);
    setMainImageIndex(0);
    setOriginalImages(newImages);
    setImages(newImages);
  };
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
      product_status: statusInput.current.checked ? "0" : "1",
    };
    console.log(order);
    if (order) {
      axios.post("/api/add-products", order).then((res) => {
        if (res.data.product_id) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append("images[]", images[i]);
        }
        formData.append("id", res.data.product_id);
        axios.post("/api/upload-image", formData);
      }
      });
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
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
          <option value="">--Select category--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
    { subcategories.length > 0 && <div>
        <label>Subcategory:</label>
        <select value={subcategory_id} onChange={handleSubcategoryChange}>
          <option value="">--Select subcategory--</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.subcategory_name}
            </option>
          ))}
        </select>
      </div>}
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
              <option key={color.id} value={color.id}>
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
              <option key={size.id} value={size.id}>
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
      <button type="button" onClick={() => handleAddFields()}>
        Thêm thuộc tính
      </button>

      <div>
        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label>Choose main image:</label>
        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`main-image-${index}`}
                name="main-image"
                value={index}
                checked={mainImageIndex === index}
                onChange={handleMainImageChange}
              />
              <label htmlFor={`main-image-${index}`}>{image.name}</label>
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
                width="100"
                height="100"
              />
            </div>
          ))}
      </div>
      <label className={styles.label}>
            <span>Status:</span>
            <input className={styles.input} type="checkbox" ref={statusInput} />
          </label>

      <button type="submit">Add Product</button>
    </form>
    </>
  );
};

export default AddProduct;
