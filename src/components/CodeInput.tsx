import { getDownloadURL, StorageReference } from "firebase/storage";
import { listAll, ref } from "firebase/storage";
import { AiOutlineDownload } from "solid-icons/ai";
import { Component, createSignal } from "solid-js";
import { storage } from "../../utils/getFirebaseStorage";
import { setLoadingText, setModalOpen } from "./FileUploader";
const [errorText, setErrorText] = createSignal("");
const [receivedFile, setReceivedFile] = createSignal<
  Array<{ name: string; link: string }>
>([]);

const CodeInput: Component = () => {
  let inputField: HTMLInputElement | undefined;
  const onSubmit = async () => {
    if (inputField?.value.length! === 6) {
      setModalOpen(true);
      const listRef = ref(storage, "/" + inputField?.value);
      setLoadingText("Getting Files");
      listAll(listRef)
        .then(async (res) => {
          const filesData = res.items.map(async (item) => {
            const downloadRef = ref(storage, item.fullPath)
            const fileUrl = await getDownloadURL(downloadRef).then((url) => url)
            return {
              name: item.name,
              link: fileUrl,
            }
          });
          setReceivedFile(await Promise.all(filesData));
          setLoadingText("")
        })
        .catch((error) => {
          setModalOpen(false);
          setErrorText("Invalid Code!");
        });
      setErrorText("");
    } else {
      setErrorText("Please input the valid code");
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

export { receivedFile, setReceivedFile };
export default CodeInput;
