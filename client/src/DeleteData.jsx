import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
const DeleteData = (props) => {
  const { userId } = props;
  const onDelete = async () => {
    await axios.patch("http://localhost:8080/delete", { userId });
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
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
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
