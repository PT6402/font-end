import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  // Tooltip,
  // Progress,
} from "@material-tailwind/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "../../data";
import Select from "../../../../../components/Select/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Product from "./componetTable/Product";
import SubCategory from "./componetTable/SubCategory";
import Category from "./componetTable/Category";

export function Tables() {
  const extensions = [
    {
      id: "1",
      label: "Product",
      value: "products",
      filterArray: [3, 4],
      component: Product,
      add:"add-product"
    },
    {
      id: "2",
      label: "User",
      value: "users",
    },
    {
      id: "4",
      label: "Category",
      value: "categories",
      filterArray: [],
      component: Category,
      add:"add-category"
    },
    {
      id: "5",
      label: "SubCategory",
      value: "subcategories",
      filterArray: [2],
      component: SubCategory,
      add:"add-subcategory"
    },
    {
      id: "6",
      label: "Order",
      value: "orders",
    },
  ];
const navigate = useNavigate()
  const temp = extensions.find((ext) => ext.value);

  const [currentExtension, setCurrentExtension] = useState(temp);
  const [loading, setLoading] = useState(true);
  const [viewBodyTable, setBodyTable] = useState([]);
  const [viewHeaderTable, setHeaderTable] = useState([]);
  function filterArray(array) {
    const filteredArray = array.slice(1, -2);
    return filteredArray;
  }
  function removeSelectedIndexes(array, indexes) {
    // Sắp xếp các index theo thứ tự giảm dần
    indexes.sort(function (a, b) {
      return b - a;
    });

    // Xóa từng index trong mảng
    for (var i = 0; i < indexes.length; i++) {
      array.splice(indexes[i], 1);
    }

    return array;
  }

  useEffect(() => {
    let isMounted = true;
    document.title = "View Product";

    axios.get(`/api/view-${currentExtension.value}`).then((res) => {
      console.log(res);
      if (isMounted) {
        if (res.data.status == 200) {
          setHeaderTable(
            removeSelectedIndexes(
              filterArray(res.data.headerTable),
              currentExtension.filterArray
            )
          );
          setBodyTable(res.data.bodyTable);
          setLoading(false);
          console.log(res.data.headerTable);
          console.log(res.data.bodyTable);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentExtension]);
const handleAdd = ()=>{
navigate(`/admin/dashboard/tables/${currentExtension.add}`)
}
  if (loading) {
    return <h4>{`View ${currentExtension.value} Loading...`}</h4>;
  }

  return (
    <div className="mt-3 mb-8 flex flex-col gap-3">
      <div className="relative z-10 w-full flex justify-between items-center">
        <Select
          options={extensions}
          selectedOption={currentExtension}
          handelChange={(event) => {
            console.log("parent", event);
            setCurrentExtension(event);
          }}
        />
        <Typography
          as="div"
          className="text-xs font-semibold text-blue-gray-600 flex items-center justify-center"
        >
          <Button onClick={handleAdd}>Add</Button>
        </Typography>
      </div>
      <Card>
        <currentExtension.component
          viewHeaderTable={viewHeaderTable}
          viewBodyTable={viewBodyTable}
        />
      </Card>
      {/* <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "blue"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card> */}
    </div>
  );
}

export default Tables;
