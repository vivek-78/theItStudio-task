import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const DeleteRows = (props) => {
  const { userIds, onClick } = props;
  const [disableDeleteButton,setDisableDeleteButton] = React.useState(false);
  const handleOnDeleteData = async () => {
    setDisableDeleteButton(true)
    await axios.patch("https://the-it-studio-task-ia2wouda3-vivek-78.vercel.app/deleteMany", { userIds });
    setDisableDeleteButton(false);
    onClick();
  };
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={userIds.length === 0 ? true : false } variant="solid" color="red">
            <MdDelete />
            Delete Rows
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete Data</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete all the selected rows?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" disabled={disableDeleteButton} color="red" onClick={handleOnDeleteData}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteRows;
