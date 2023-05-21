import { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const EditCategory = () => {
  const [loading, setLoading] = useState(true);
  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([]);
  const nameInput = useRef();
  const statusInput = useRef();

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/edit-categories/${id}`).then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      }
      setLoading(false);
    });
  }, [id, navigate]);
 
 
  const updateCategory = (e) => {
    e.preventDefault();

    const data = {
      category_name: nameInput.current.value,
      category_status: statusInput.current.checked ? "1" : "0",
      category_id: id,
    };
    axios.post(`/api/update-categories`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      }
    });
  };
  if (loading) {
    return <h4>Loading Edit Category...</h4>;
  }

  return (
    <form id="form" className={styles.form} onSubmit={updateCategory}>
      <h2 className={styles.title}>Edit-Category</h2>
      <div className={styles.form_inputs_wrapper}>
        <label className={styles.label}>
          <span>Name Category:</span>
          <input
            className={styles.input}
            type="text"
            placeholder="name"
            required
        
            ref={nameInput}
            defaultValue={categoryInput.category_name}
          />
        </label>
        <label className={styles.label}>
          <span>Status:</span>
          <input
            className={styles.input}
            type="checkbox"
            defaultChecked={categoryInput.category_status=="1"}
            ref={statusInput}
          />
        </label>
      </div>
      <div className={styles.button_wrapper}>
        <button form="form" className={styles.button} type="submit">
          Edit
        </button>
      </div>
    </form>
  );
};

export default EditCategory;
