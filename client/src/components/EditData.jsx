import React from "react";
import { Dialog, Flex, Button, Text, TextField } from "@radix-ui/themes";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

import { schema } from "./validate";
const EditData = (props) => {
  const { data, onClick } = props;
  const [open, setOpen] = React.useState(false);
  const [disableAddButton, setDisableAddButton] = React.useState(false);
  const { userId } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    setDisableAddButton(true);
    await axios.patch(
      "https://the-it-studio-task-ia2wouda3-vivek-78.vercel.app/update",
      { userId, ...data }
    );
    onClick();
    setDisableAddButton(false);
    setOpen(false);
  };
  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
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
                {errors.name && (
                  <p className="text-xs text-red-500 m-0">
                    {errors.name?.message}
                  </p>
                )}
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
                {errors.email && (
                  <p className="text-xs text-red-500 m-0">
                    {errors.email?.message}
                  </p>
                )}
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Mobile
                </Text>
                <TextField.Input
                  defaultValue={data.mobile}
                  placeholder="Enter your phone number"
                  {...register("mobile", { required: true })}
                />
                {errors.mobile && (
                  <p className="text-xs text-red-500 m-0">
                    {errors.mobile?.message}
                  </p>
                )}
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
              <Button type="submit" disabled={disableAddButton}>
                {disableAddButton && (
                  <LoadingIcon className="animate-spin h-5 w-5" />
                )}
                Save
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default EditData;
