import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import CustomTable from "../../../../Components/tables/CustomTable";
import { useGetAdminsQuery } from "../../../../redux/features/profile/profileApi";
import { useSelector } from "react-redux";

const AdminTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [username, setUsername] = useState("");

  const { admins, pagination } = useSelector((state) => state.profile);

  const { data, isLoading, isError, error, refetch } = useGetAdminsQuery({
    page,
    limit,
    username,
  });

  useEffect(() => {
    refetch({ page, limit, username });
  }, [limit]);

  const dateFormatter = (params) => {
    return new Date(params.value).toDateString();
  };
  console.log(admins);

  const handleUpdate = (value) => {};

  const handleRemove = (bill) => {};

  const headers = [
    {
      header: "Name",
      rowField: "fullName",
    },
    {
      header: "Phone",
      rowField: "phone",
    },

    { header: "Email", rowField: "username" },
    { header: "Address", rowField: "address" },
    { header: "City", rowField: "city" },
    { header: "Area", rowField: "area" },
    { header: "Postcode", rowField: "postCode" },
    { header: "Nid", rowField: "nid" },
    {
      header: "Actions",
      rowField: (params) => (
        <div className="flex gap-2">
          <button
            className="updateButton btns px-2"
            onClick={() => handleUpdate(params.data)}
          >
            update
          </button>
          <button
            className="removeButton btns px-2"
            onClick={() => handleRemove(params.data)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  let content;

  if (isLoading) {
    return (content = <div>Loading...</div>);
  }

  if (isError) {
    return (content = <div>Error: </div>);
  }

  if (!isLoading && !isError && data?.admins.length > 0) {
    return (content = (
      <div className="card my-3">
        <CustomTable
          title={"All Admin"}
          headers={headers}
          rowData={admins}
          serverCurrentPage={pagination.currentPage}
          serverTotalPages={pagination.totalPages}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    ));
  }

  return content;
};

export default AdminTable;
