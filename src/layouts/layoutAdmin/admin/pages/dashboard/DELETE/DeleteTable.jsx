import axios from "axios";
import React, { useEffect } from "react";
import swal from "sweetalert";

export default function DeleteTable({ nameTable, id }) {
  // useEffect(() => {
    axios.get(`/api/delete-${nameTable}/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      }
    });
  // },[id, nameTable]);
  // alert(id,nameTable)
}
