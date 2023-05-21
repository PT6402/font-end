import { useState, useEffect, useRef } from "react";



import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const EditSubCategory = () => {
  const [loading, setLoading] = useState(true);
  const [category_id, setCategory] = useState("");
  const [subCategoryInput, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState([]);
  const nameInput = useRef();

  const statusInput = useRef();

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/edit-subcategories/${id}`).then((res) => {
      if (res.data.status === 200) {
        setSubCategory(res.data.subcategory);
        setCategory(res.data.subcategory.category_id)
      }
      setLoading(false);
    });
  }, [id]);
  useEffect(() => {
    axios.get(`/api/view-categories`).then((res) => {
      if (res.data.status === 200) {
        setCategories(res.data.bodyTable);
      }
      setLoading(false);
    });
  }, [id]);
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setCategory(categoryId);
  }
  const updateCategory = (e) => {
    e.preventDefault();

    const data = {
      subcategory_name: nameInput.current.value,
      subcategory_status: statusInput.current.checked  ? "1" : "0",
      category_id: category_id ,
      subcategory_id: id,
    };
    axios.post(`/api/update-subcategories`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      }
    });
  };
  if (loading) {
    return <h4>Loading Edit SubCategory...</h4>;
  }

  return (
    <>
      <form id="form" className={styles.form} onSubmit={updateCategory}>
        <h2 className={styles.title}>Edit-SubCategory</h2>
        <div className={styles.form_inputs_wrapper}>
          <label className={styles.label}>
            <span>Name Subcategory:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="name"
              required
              ref={nameInput}
              defaultValue={subCategoryInput.subcategory_name}
            />
          </label>
         
          <div>
            <label>Category:</label>
            <select  value={category_id} onChange={handleCategoryChange} >
             
              {categories.map((category) => (
                <option key={category.id} value={category.id} selected={subCategoryInput.category_id==category.id} >
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <label className={styles.label}>
            <span>Status:</span>
            <input
              className={styles.input}
              type="checkbox"
              ref={statusInput}
               defaultChecked={subCategoryInput.subcategory_status=="1"}
            />
          </label>
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

export default EditSubCategory;
