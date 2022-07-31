import { Component, createSignal, mergeProps, Show } from "solid-js";
import { files, setFiles } from "./FileUploader/Input";
import Input from "./FileUploader/Input";
import FileList, { isFileError, setFileError } from "./FileUploader/FileList";
import SubmitButton from "./FileUploader/SubmitButton";
import $ from "jquery"; //api does'nt support axios so i use this :(

const [downloadKey, setDownloadKey] = createSignal(0);
const [isModalOpen, setModalOpen] = createSignal(false);
const [loadingText, setLoadingText] = createSignal("");

const FileUploader: Component<{ maxFileSize: number }> = (props) => {
  const data = mergeProps({ maxFileSize: 100 * 1024 ** 2 }, props);
  const onSubmit = async () => {
    const apiKey = import.meta.env.VITE_SA_API_KEY;
    const baseUrl = "https://send-anywhere.com/web/v1/";
    // get device
    setModalOpen(true);
    setLoadingText("Getting Device Detail");
    await $.ajax({
      url: baseUrl + "device",
      type: "GET",
      dataType: "jsonp",
      data: { api_key: apiKey },
      cache: false,
    });
    const roughFiles = files()?.map((file) => ({
      name: file.name,
      size: file.size,
    }));
    // get key
    setLoadingText("Generating Key");
    await $.ajax({
      url: baseUrl + "key",
      type: "GET",
      dataType: "jsonp",
      data: { file: roughFiles },
      cache: false,
    }).done((data) => {
      postFiles(data.weblink);
      setDownloadKey(data.key);
      setLoadingText("");
      setFiles([]);
    });
    // post files
    function postFiles(url: string) {
      let filesFormData = new FormData();
      files()?.forEach((file, idx) => {
        filesFormData.append("file" + idx, file, file.name);
      });
      $.ajax({
        url: url,
        type: "POST",
        processData: false,
        contentType: false,
        data: filesFormData,
        cache: false,
      })
    }
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

export { downloadKey, setDownloadKey, loadingText, setLoadingText, isModalOpen, setModalOpen };
export default FileUploader;
