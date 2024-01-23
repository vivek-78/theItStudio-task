import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
const DeleteData = (props) => {
  const { userId, onClick } = props;
  const onDelete = async () => {
    await axios.patch("https://itstudiotask.onrender.com/deleteByUserId", { userId });
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
              <Button variant="solid" color="red" onClick={onDelete}>
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
