import { Component, mergeProps } from "solid-js";
import { setFiles } from "./Input";

const SubmitButton: Component<{disabled: boolean}> = (props) => {
  const data = mergeProps({ disabled: false }, props);
  return (
    <button
      class={`w-full mt-3 py-3 text-white text-center font-semibold rounded ${
        data.disabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={() => {setFiles([]), alert('Sorry, this website is not finished yet :(')}}
      disabled={data.disabled}
    >
      Send
    </button>
  );
};

export default SubmitButton;
