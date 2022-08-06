import { Component, createSignal, mergeProps, Show } from "solid-js";
import { files, setFiles } from "./FileUploader/Input";
import Input from "./FileUploader/Input";
import FileList, { isFileError, setFileError } from "./FileUploader/FileList";
import SubmitButton from "./FileUploader/SubmitButton";
import getRandomNumber from "../../utils/getRandomNumber";
import { storage } from "../../utils/getFirebaseUtils";
import { ref, uploadBytes } from "firebase/storage";

const [downloadKey, setDownloadKey] = createSignal("");
const [isModalOpen, setModalOpen] = createSignal(false);
const [loadingText, setLoadingText] = createSignal("");

const FileUploader: Component<{ maxFileSize: number }> = (props) => {
  const data = mergeProps({ maxFileSize: 0 }, props);
  const onSubmit = async () => {
    const [uploadedFileCount, setUploadedFileCount] = createSignal(0);
    setModalOpen(true);
    setLoadingText(`Uploaded (0/${files()?.length}) Files`);
    const downloadKey = getRandomNumber();
    const filePromises = files()?.map(async (file) => {
      const storageRef = ref(storage, downloadKey + "/" + file.name);
      return uploadBytes(storageRef, file).then(() => {
        setUploadedFileCount((oldFileCount) => (oldFileCount += 1));
        setLoadingText(
          `Uploaded (${uploadedFileCount()}/${files()?.length}) Files`
        );
      });
    });
    await Promise.all(filePromises!);
    setDownloadKey(downloadKey);
    setLoadingText("");
    setFiles([]);
  };
  return (
    <>
      <Input
        maxFileSize={data.maxFileSize}
        on_error={() => setFileError(true)}
      />
      <FileList
        maxFileSize={data.maxFileSize}
        files={files()}
        setFiles={setFiles}
      />
      <Show when={files()?.length !== 0 && files() !== undefined}>
        <SubmitButton disabled={isFileError()} on_click={onSubmit} />
      </Show>
    </>
  );
};

export {
  downloadKey,
  setDownloadKey,
  loadingText,
  setLoadingText,
  isModalOpen,
  setModalOpen,
};
export default FileUploader;
