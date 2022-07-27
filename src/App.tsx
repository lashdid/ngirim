import type { Component } from "solid-js";
import { AiOutlineDownload } from "solid-icons/ai";
import MainTitle from "./components/MainTitle";
import FileUploader from "./components/FileUploader";

const App: Component = () => {
  return (
      <section class="flex w-full h-full my-20">
        <div class="flex flex-col items-center w-full md:w-auto md:max-w-screen-md px-10 mx-auto space-y-5">
          <MainTitle />
          <div class="relative flex w-full bg-gray-700 rounded ">
            <input
              type="text"
              maxLength={6}
              class="w-full py-4 md:text-xl font-bold text-center text-white bg-gray-700 rounded outline-none"
              placeholder="Type 6-Digit Number"
            />
            <button class="absolute right-0 h-full p-3 text-white rounded-r hover:bg-gray-600">
              <AiOutlineDownload size={25} />
            </button>
          </div>
          <p class="text-xl font-light text-white">Or</p>
          <FileUploader maxFileSize={300 * 1024 ** 2}/>
        </div>
      </section>
  );
};

export default App;
