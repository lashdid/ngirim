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
import CodeInput, {
  receivedFile,
  receivedZip,
  setReceivedFile,
  setReceivedZip,
} from "./components/CodeInput";
import { saveAs } from "file-saver";

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
          <FileUploader maxFileSize={50 * 1024 ** 2} />
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
        <Show when={receivedZip() || receivedFile()}>
          <img src="/kissing_cat.gif" alt="kissing-cat" width={120} />
          <p class="text-white text-center">
            The file is ready! Click download to download the file.
          </p>
          <Show when={receivedZip()}>
            <button
              class="p-3 text-white text-center font-semibold rounded bg-green-500 hover:bg-green-600"
              onClick={() => {
                saveAs(receivedZip(), `ngirim_${new Date().valueOf()}.zip`);
                setModalOpen(false);
                setReceivedZip("");
              }}
            >
              Download & Close
            </button>
          </Show>
          <Show when={receivedFile()}>
            <a
              class="p-3 text-white text-center font-semibold rounded bg-green-500 hover:bg-green-600 cursor-pointer"
              onClick={() => {
                saveAs(receivedFile()?.url!, receivedFile()?.name);
                setModalOpen(false);
                setReceivedFile(null);
              }}
            >
              Download & Close
            </a>
          </Show>
        </Show>
      </div>
    </div>
  );
};

export default App;
