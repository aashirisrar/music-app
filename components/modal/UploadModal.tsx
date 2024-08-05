"use client";

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState();

  const uploadModal = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("title", { required: true })}
          id="title"
          disabled={isLoading}
          placeholder="Song title"
        />
        <Input
          {...register("author", { required: true })}
          id="author"
          disabled={isLoading}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            {...register("song", { required: true })}
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            {...register("image", { required: true })}
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
