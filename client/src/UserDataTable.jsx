import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "@radix-ui/themes";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditData from "./EditData";
import DeleteData from "./DeleteData";
import AddUserData from "./AddUser";
const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedData = await axios.get("http://localhost:8080/");
      setUserData(fetchedData.data);
    };
    fetchUserData();
  }, []);
  return (
    <div>
      <header className="flex items-center justify-between p-5 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
        <AddUserData />
      </header>
      <Table.Root variant="surface" className="m-14">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Hobbies</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userData.map((data) => (
            <Table.Row>
                <Table.Cell>{data.userId}</Table.Cell>
              <Table.Cell>{data.name}</Table.Cell>
              <Table.Cell>{data.email}</Table.Cell>
              <Table.Cell>{data.mobile}</Table.Cell>
              <Table.Cell>{data.hobbies}</Table.Cell>
              <Table.Cell className="flex flex-row gap-1 items-center">
                <EditData data={data} />
                <DeleteData userId={data.userId} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default UserDataTable;
