import { getDownloadURL, StorageReference } from "firebase/storage";
import { listAll, ref } from "firebase/storage";
import { AiOutlineDownload } from "solid-icons/ai";
import { Component, createSignal } from "solid-js";
import { storage } from "../../utils/getFirebaseStorage";
import { setLoadingText, setModalOpen } from "./FileUploader";
import JSZip, { file, files } from "jszip";
import setUrlToPromise from "../../utils/setUrlToPromise";
const [errorText, setErrorText] = createSignal("");
const [receivedZip, setReceivedZip] = createSignal<Blob | string>("");
const [receivedFile, setReceivedFile] = createSignal<{
  name?: string;
  url?: string;
} | null>(null);

const CodeInput: Component = () => {
  let inputField: HTMLInputElement | undefined;
  const onSubmit = async () => {
    if (inputField?.value.length! === 6) {
      setModalOpen(true);
      const listRef = ref(storage, "/" + inputField?.value);
      setLoadingText("Getting Files");
      const zip = new JSZip();
      await listAll(listRef)
        .then(async (res) => {
          if (res.items.length > 1) {
            const filesPromises = res.items.map(async (item) => {
              const downloadRef = ref(storage, item.fullPath);
              const fileUrl = await getDownloadURL(downloadRef).then(
                (url) => url
              );
              zip.file(item.name, setUrlToPromise(fileUrl));
            });
            await Promise.all(filesPromises);
            zip.generateAsync({ type: "blob" }).then((content) => {
              setReceivedZip(content);
              setLoadingText("");
            });
            setErrorText("");
          } else {
            const downloadRef = ref(storage, res.items[0].fullPath);
            const fileUrl = await getDownloadURL(downloadRef).then(
              (url) => url
            );
            setReceivedFile({ name: res.items[0].name, url: fileUrl });
            setLoadingText("");
          }
        })
        .catch((error) => {
          setModalOpen(false);
          setErrorText("Invalid Code!");
        });
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

export { receivedZip, setReceivedZip, receivedFile, setReceivedFile };
export default CodeInput;
