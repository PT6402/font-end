/* eslint-disable react/prop-types */

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
import React from 'react'
import { Link } from "react-router-dom";

export default function SubCategory({viewHeaderTable,viewBodyTable}) {
  return (
    <CardBody className=" overflow-auto px-0 pt-0 pb-2 ">
    <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr>
          {viewHeaderTable.map((el) => (
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
          ))}
        </tr>
      </thead>
      <tbody>
        {viewBodyTable.map((item, key) => {
          const className = `py-3 px-5 ${
            key === viewBodyTable.length - 1
              ? ""
              : "border-b border-blue-gray-50"
          }`;

          return (
            <tr key={item.id}>
              {/* <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                  {item.id}
                </Typography>
              </td> */}
              <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                  {item.subcategory_name}
                </Typography>
              </td>
              <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                  {item.product_count}
                </Typography>
              </td>
              <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                  {item.subcategory_slug}
                </Typography>
              </td>
              {/* <td className={className}>
                <div className="flex items-center gap-4">
                  <Avatar
                    src={`http://localhost:8000/${item.image}`}
                    alt={item.name}
                    size="lg"
                  />
                </div>
              </td> */}

              <td className={className}>
                <Chip
                  variant="gradient"
                  color={item.subcategory_status == "0" ? "green" : "blue-gray"}
                  value={item.subcategory_status == "0" ? "public" : "hide"}
                  className="py-0.5 px-2 text-[11px] font-medium"
                />
              </td>
              <td className={className}>
                <Link to={`edit-subcategory/${item.id}`}>
                  <Typography
                    as="div"
                    className="text-xs font-semibold text-blue-gray-600"
                  >
                    <Button>Edit</Button>
                  </Typography>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </CardBody>
  )
}
