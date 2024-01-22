import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "@radix-ui/themes";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
      <p className="text-blue-400">User Data Managment</p>
      <Table.Root variant="surface" className="mt-10">
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
              <Table.Cell>{data.name}</Table.Cell>
              <Table.Cell>{data.email}</Table.Cell>
              <Table.Cell>{data.mobile}</Table.Cell>
              <Table.Cell>{data.hobbies}</Table.Cell>
              <Table.Cell>
                <Button color="indigo" variant="soft">
                  <FaEdit />
                </Button>{" "}
                <Button color="crimson" variant="soft">
                  <MdOutlineDelete />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default UserDataTable;
