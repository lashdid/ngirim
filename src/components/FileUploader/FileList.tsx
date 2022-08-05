import { Component, createSignal, For, mergeProps, Show } from "solid-js";
import bytes from "bytes";
import { AiOutlineClose } from "solid-icons/ai";

const [isFileError, setFileError] = createSignal(false);

const FileList: Component<{
  maxFileSize: number;
  files: Array<File> | undefined;
  setFiles: (files: Array<File>) => void;
}> = (props) => {
  const data = mergeProps(
    { files: [], setFiles: () => {}, maxFileSize: 0 },
    props
  );
  return (
    <Show when={data.files.length > 0}>
      <div class="w-full flex flex-col space-y-3">
        <For each={data.files}>
          {(file: File, idx) => (
            <div class="flex justify-between items-center space-x-2 text-white text-sm">
              <p class="w-full flex flex-col sm:flex-row justify-between sm:items-center ">
                <span>
                  {/* f*** regex */}
                  {`${file.name.slice(0, 30).split(".")[0]}${
                    file.name.split(".").length > 1
                      ? `.${file.name.split(".")[1]}`
                      : ""
                  }`}
                </span>
                <Show
                  when={file.size < data.maxFileSize}
                  fallback={
                    <span class="text-red-500">
                      File too big ({bytes.format(file.size)})
                    </span>
                  }
                >
                  <span class="text-green-500">{bytes.format(file.size)}</span>
                </Show>
              </p>
              <AiOutlineClose
                class="cursor-pointer hover:text-red-500"
                onClick={() => {
                  const filteredFiles = data.files.filter(
                    (_, i) => i !== idx()
                  );
                  data.setFiles(filteredFiles);
                  if (
                    !data.files.some((file) => file.size > data.maxFileSize)
                  ) {
                    setFileError(false);
                  }
                }}
              />
            </div>
          )}
        </For>
        <Show when={isFileError()}>
          <span class="text-red-500 text-xs">Maximum file size: 50MB</span>
        </Show>
      </div>
    </Show>
  );
};

export { isFileError, setFileError };
export default FileList;
