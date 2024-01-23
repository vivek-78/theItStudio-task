import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { IoMdSend } from "react-icons/io";

const SendData = (props) => {
  const { userIds, onClick } = props;
  const handleOnSendData = async () => {
    await axios.post("http://localhost:8080/sendMail", { userIds });
    onClick();
  };
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button className="bg-green-50 text-white px-4 py-2 rounded-md">
            Send Data
            <IoMdSend />
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Send Data</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to send selected Data to info@redpositive.in?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" onClick={handleOnSendData}>
                Send Data
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default SendData;
