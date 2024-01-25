import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";
import axios from "axios";
const DeleteData = (props) => {
  const { userId, onClick } = props;
  const [disableDeleteButton, setDisableDeleteButton] = React.useState(false);
  const onDelete = async () => {
    setDisableDeleteButton(true);
    await axios.patch(
      "https://the-it-studio-task-ia2wouda3-vivek-78.vercel.app/deleteByUserId",
      { userId }
    );
    setDisableDeleteButton(false);
    onClick();
  };
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="crimson" variant="soft">
            <MdOutlineDelete />
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete Data</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to Delete?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                disabled={disableDeleteButton}
                variant="solid"
                color="red"
                onClick={onDelete}
              >
                {disableDeleteButton && <LoadingIcon className="animate-spin h-5 w-5"/>}
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};
export default DeleteData;
