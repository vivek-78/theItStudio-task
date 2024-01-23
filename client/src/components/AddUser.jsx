import React from "react";
import { Dialog, Flex, Button, Text, TextField } from "@radix-ui/themes";
import { MdAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validate";

const AddUserData = (props) => {
  const { onClick } = props;
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    await axios.post("https://itstudiotask.onrender.com/add", { data });
    onClick();
    setOpen(false)
  };
  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            <MdAdd />
            Add New User
          </Button>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add User</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Add User to the table
          </Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" weight="bold">
                  Name
                </Text>
                <TextField.Input
                  placeholder="Enter your full name"
                  {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 m-0">
                      {errors.name?.message}
                    </p>
                  )}
              </label>
              <label>
                <Text as="div" size="2" weight="bold">
                  Email
                </Text>
                <TextField.Input
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 m-0">
                    {errors.email?.message}
                  </p>
                )}
              </label>
              <label>
                <Text as="div" size="2" weight="bold">
                  Mobile
                </Text>
                <TextField.Input
                  placeholder="Enter your email"
                  {...register("mobile", { required: true })}
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-500 m-0">
                      {errors.mobile?.message}
                    </p>
                  )}
              </label>
              <label>
                <Text as="div" size="2" weight="bold">
                  hobbies
                </Text>
                <TextField.Input
                  placeholder="Enter your hobbies saperated by comma"
                  {...register("hobbies", { required: true })}
                  />
                  {errors.hobbies && (
                    <p className="text-xs text-red-500 m-0">
                      {errors.mobile?.hobbies}
                    </p>
                  )}
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit">Add User</Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default AddUserData;
