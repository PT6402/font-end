import { useState, useRef } from "react";

import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AddCategory = () => {
  // const [loading, setLoading] = useState(true);
  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([]);
  const nameInput = useRef();
  const statusInput = useRef();


  const navigate = useNavigate();

 
 
  const addCategory = (e) => {
    e.preventDefault();

    const data = {
      category_name: nameInput.current.value,
      category_status: statusInput.current.checked ? "1" : "0",
     
    };
    axios.post(`/api/store-categories`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
       
      }
    });
  };
  // if (loading) {
  //   return <h4>Loading Add Category...</h4>;
  // }

  return (
    <form id="form" className={styles.form} onSubmit={addCategory}>
      <h2 className={styles.title}>Add-Category</h2>
      <div className={styles.form_inputs_wrapper}>
        <label className={styles.label}>
          <span>Name Category:</span>
          <input
            className={styles.input}
            type="text"
            placeholder="name"
            required
            ref={nameInput}
 
          />
        </label>
        <label className={styles.label}>
          <span>Status:</span>
          <input
            className={styles.input}
            type="checkbox"
            ref={statusInput}
          />
        </label>
      </div>
      <div className={styles.button_wrapper}>
        <button form="form" className={styles.button} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
