import React from "react";
import { Dialog, Flex, Button, Text, TextField } from "@radix-ui/themes";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditData = (props) => {
  const { data } = props;
  const { userId } = data
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await axios.patch("http://localhost:8080/update", { userId,...data });
  };
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="indigo" variant="soft">
            <FaEdit />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Name
                </Text>
                <TextField.Input
                  defaultValue={data.name}
                  placeholder="Enter your full name"
                  {...register("name", { required: true })}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Email
                </Text>
                <TextField.Input
                  defaultValue={data.email}
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Mobile
                </Text>
                <TextField.Input
                  defaultValue={data.mobile}
                  placeholder="Enter your email"
                  {...register("mobile", { required: true })}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  hobbies
                </Text>
                <TextField.Input
                  defaultValue={data.hobbies}
                  placeholder="Enter your email"
                  {...register("hobbies", { required: true })}
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button type="submit">Save</Button>
              </Dialog.Close>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default EditData;
