import { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AddSubCategory = () => {
  const [category_id, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const nameInput = useRef();
  const statusInput = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/view-categories`).then((res) => {
      if (res.data.status === 200) {
        setCategories(res.data.bodyTable);
      }
    });
  }, []);
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setCategory(categoryId);
  };
  const addCategory = (e) => {
    e.preventDefault();

    const data = {
      subcategory_name: nameInput.current.value,
      subcategory_status: statusInput.current.checked ? "1" : "0",
      category_id: category_id,
    };
    axios.post(`/api/store-subcategories`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      }
    });
  };

  return (
    <>
      <form id="form" className={styles.form} onSubmit={addCategory}>
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
            />
          </label>

          <div>
            <label>Category:</label>
            <select value={category_id} onChange={handleCategoryChange}>
            <option >--Not subcategory--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <label className={styles.label}>
            <span>Status:</span>
            <input className={styles.input} type="checkbox" ref={statusInput} />
          </label>
        </div>
        <div className={styles.button_wrapper}>
          <button form="form" className={styles.button} type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddSubCategory;
