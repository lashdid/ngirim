import { Component, createSignal, mergeProps } from "solid-js";
import {files, setFiles} from './FileUploader/Input'
import Input from "./FileUploader/Input";
import FileList, { setFileError } from "./FileUploader/FileList";

const FileUploader: Component<{maxFileSize: number}> = (props) => {
  const data = mergeProps({maxFileSize: 100 * 1024 ** 2}, props)
  return (
    <>
      <Input maxFileSize={data.maxFileSize} on_error={() => setFileError(true)}/>
      <FileList maxFileSize={data.maxFileSize} files={files()} setFiles={setFiles}/>
    </>
  );
};

export default FileUploader;
