import { AiOutlineDownload } from "solid-icons/ai";
import { Component, createSignal } from "solid-js";
import $ from "jquery"; //api does'nt support axios so i use this :(
import { setLoadingText, setModalOpen } from "./FileUploader";

const [fileLink, setFileLink] = createSignal("");
const [errorText, setErrorText] = createSignal("");

const CodeInput: Component = () => {
  let inputField: HTMLInputElement | undefined;
  const onSubmit = async () => {
    if (inputField?.value) {
      const apiKey = import.meta.env.VITE_SA_API_KEY;
      const baseUrl = "https://send-anywhere.com/web/v1/";
      // get device
      setModalOpen(true);
      setErrorText("");
      setLoadingText("Getting Device Detail");
      await $.ajax({
        url: baseUrl + "device",
        type: "GET",
        dataType: "jsonp",
        data: { api_key: apiKey },
        cache: false,
      });
      setLoadingText("Getting File");
      await $.ajax({
        url: "https://send-anywhere.com/web/v1/key/" + inputField?.value,
        type: "GET",
        dataType: "jsonp",
        timeout: 3000,
        cache: false,
      })
        .done((data) => {
          setLoadingText("");
          setFileLink(data.weblink);
        })
        .fail((err) => {
          setModalOpen(false);
          setLoadingText("");
          setErrorText("The code might be expired or invalid");
        });
    } else {
      setErrorText("Please input the code first");
    }
  };
  return (
    <>
      <div class="relative flex w-full bg-gray-700 rounded ">
        <input
          type="text"
          maxLength={6}
          class="w-full py-4 md:text-xl font-bold text-center text-white bg-gray-700 rounded outline-none"
          placeholder="Type 6-Digit Number"
          ref={inputField}
        />
        <button
          class="absolute right-0 h-full p-3 text-white rounded-r hover:bg-gray-600"
          onClick={onSubmit}
        >
          <AiOutlineDownload size={25} />
        </button>
      </div>
      <small class="text-red-500">{errorText()}</small>
    </>
  );
};

export { fileLink, setFileLink };
export default CodeInput;
