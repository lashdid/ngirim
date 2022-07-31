import { Component, Show } from "solid-js";
import MainTitle from "./components/MainTitle";
import FileUploader, {
  downloadKey,
  isModalOpen,
  loadingText,
  setDownloadKey,
  setLoadingText,
  setModalOpen,
} from "./components/FileUploader";
import CodeInput, { fileLink, setFileLink } from "./components/CodeInput";
import { Meta, MetaProvider, Title } from "@solidjs/meta";

const App: Component = () => {
  return (
    <MetaProvider>
      <Title>Ngirim</Title>
      <Meta name="description" content="A file transfer website with 6-digit key sharing system."/>
      <Meta name="keywords" content="ngirim, file, transfer"/>
      <Meta property="og:site_name" content="ngirim.vercel.app"/>
      <Meta property="og:title" content="Ngirim - File Transfer Website"/>
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
    </MetaProvider>
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
        <Show when={downloadKey() !== 0}>
          <span class="text-white">Here is your code:</span>
          <p class="text-6xl text-green-500">{downloadKey()}</p>
          <small class="text-white">
            The code will be expired in 10 minutes
          </small>
          <button
            class="p-3 text-white text-center font-semibold rounded bg-green-500 hover:bg-green-600"
            onClick={() => {
              navigator.clipboard.writeText(downloadKey().toString());
              setLoadingText("");
              setDownloadKey(0);
              setModalOpen(false);
            }}
          >
            Copy & Close
          </button>
        </Show>
        <Show when={fileLink()}>
          <img src="/kissing_cat.gif" alt="kissing-cat" width={120} />
          <p class="text-white text-center">
            The file is ready! Click the button to download
          </p>
          <a
            href={fileLink()}
            class="p-3 text-white text-center font-semibold rounded bg-green-500 hover:bg-green-600"
            onClick={() => {
              setFileLink("");
              setModalOpen(false);
            }}
          >
            Download File
          </a>
        </Show>
      </div>
    </div>
  );
};

export default App;
