import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Checkbox } from "@radix-ui/themes";
import EditData from "./components/EditData";
import DeleteData from "./components/DeleteData";
import AddUserData from "./components/AddUser";
import TableActionButtons from "./components/TableActionButtons";
const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const fetchUserData = async () => {
    const fetchedData = await axios.get("http://localhost:8080/userData");
    setUserData(fetchedData.data);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };
  return (
    <div>
      <header className="flex items-center justify-between p-5 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
        <AddUserData onClick={fetchUserData}/>
      </header>
      <div className="flex flex-col gap-2 m-14">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Select</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>S.no</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>User Id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Phone Number</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Hobbies</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userData.map((data,index) => (
              <Table.Row key={data.id}>
                <Table.Cell>
                  <Checkbox
                    checked={selectedRows.includes(data.userId)}
                    onCheckedChange={() => handleCheckboxChange(data.userId)}
                  />
                </Table.Cell>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell>{data.userId}</Table.Cell>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.email}</Table.Cell>
                <Table.Cell>{data.mobile}</Table.Cell>
                <Table.Cell>{data.hobbies}</Table.Cell>
                <Table.Cell className="flex flex-row gap-1 items-center">
                  <EditData data={data} onClick={fetchUserData}/>
                  <DeleteData userId={data.userId} onClick={fetchUserData}/>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <div>
          <TableActionButtons
            userIds={selectedRows}
            onClick={() => {
              setSelectedRows([]);
              fetchUserData();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDataTable;
