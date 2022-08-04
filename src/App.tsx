import { Component, For, Show } from "solid-js";
import MainTitle from "./components/MainTitle";
import FileUploader, {
  downloadKey,
  isModalOpen,
  loadingText,
  setDownloadKey,
  setLoadingText,
  setModalOpen,
} from "./components/FileUploader";
import CodeInput, { receivedFile } from "./components/CodeInput";
import { AiOutlineDownload } from "solid-icons/ai";

const App: Component = () => {
  return (
    <>
      <Show when={isModalOpen()}>
        <Modal />
      </Show>
      <section class="flex w-full h-full py-20">
        <div class="flex flex-col items-center w-full md:w-auto md:max-w-screen-md px-10 mx-auto space-y-5">
          <MainTitle />
          <CodeInput />
          <p class="text-xl font-light text-white">Or</p>
          <FileUploader maxFileSize={300 * 1024 ** 2} />
        </div>
      </section>
    </>
  );
};

const Modal: Component = () => {
  return (
    <div class="fixed flex w-full h-full bg-black bg-opacity-80 z-10 items-center">
      <div class="w-[30rem] flex flex-col p-10 bg-gray-700 mx-auto items-center sm:rounded space-y-3">
        <Show when={loadingText()}>
          <img src="/vibing_cat.gif" alt="vibing-cat" width={120} />
          <span class="text-xl text-white">{loadingText()}</span>
        </Show>
        <Show when={downloadKey()}>
          <span class="text-white">Here is your code:</span>
          <p class="text-6xl text-green-500">{downloadKey()}</p>
          <button
            class="p-3 text-white text-center font-semibold rounded bg-green-500 hover:bg-green-600"
            onClick={() => {
              navigator.clipboard.writeText(downloadKey().toString());
              setLoadingText("");
              setDownloadKey("");
              setModalOpen(false);
            }}
          >
            Copy & Close
          </button>
        </Show>
        <Show when={receivedFile().length > 0}>
          <img src="/kissing_cat.gif" alt="kissing-cat" width={120} />
          <p class="text-white text-center border-b border-green-500 pb-2">
            The file is ready!
          </p>
          <div class="w-full flex flex-col space-y-3">
            <For each={receivedFile()}>
              {(file) => {
                return (
                  <div class="w-full flex justify-between items-center">
                    <p class="text-sm text-white">
                      {/* f*** regex */}
                      {`${file.name.slice(0, 30).split(".")[0]}${
                        file.name.split(".").length > 1
                          ? `.${file.name.split(".")[1]}`
                          : ""
                      }`}
                    </p>
                    <a
                      target="_blank"
                      download={file.name}
                      href={file.link}
                      class="p-3 text-white text-center font-semibold rounded bg-green-500 hover:bg-green-600"
                    >
                      <AiOutlineDownload/>
                    </a>
                  </div>
                );
              }}
            </For>
          </div>
          <button onClick={() => setModalOpen(false)} class="px-3 py-2 text-white text-center font-semibold rounded border hover:text-green-500 hover:border-green-500">Close</button>
        </Show>
      </div>
    </div>
  );
};

export default App;
