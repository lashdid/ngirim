import { AiOutlinePlus } from "solid-icons/ai";
import { Component, createSignal, mergeProps } from "solid-js";

const [files, setFiles] = createSignal<Array<File>>();

const Input: Component<{ maxFileSize: number; on_error: () => void }> = (
  props
) => {
  const data = mergeProps(
    { maxFileSize: 100 * 1024 ** 2, on_error: () => {} },
    props
  );
  const [isEnterInput, setEnterInput] = createSignal(false);
  return (
    <div
      class={`relative w-full rounded hover:bg-gray-900 ${
        isEnterInput() ? "bg-gray-900" : "bg-transparent"
      }`}
    >
      <p class="absolute w-full h-full flex items-center justify-center text-xl text-center font-semibold text-green-600 space-x-3 cursor-pointer">
        <AiOutlinePlus/>
        <span>Click / Drop to send files</span>
      </p>
      <input
        type="file"
        title="Input File Here"
        class="w-full h-full py-14 text-[0px] opacity-0 cursor-pointer"
        onDragEnter={() => setEnterInput(true)}
        onDragExit={() => setEnterInput(false)}
        onDrop={() => setEnterInput(false)}
        onChange={(event) => {
          setFiles([...(files() || []), ...(event.currentTarget.files || [])]);
          if(files()?.some((file) => file.size > data.maxFileSize)){
            data.on_error();
          }
        }}
        multiple
      />
    </div>
  );
};

export { files, setFiles };
export default Input;
