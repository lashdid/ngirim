import { Component, mergeProps } from "solid-js";
import { setFiles } from "./Input";

const SubmitButton: Component<{disabled: boolean, on_click: () => void}> = (props) => {
  const data = mergeProps({ disabled: false, on_click: () => {} }, props);
  return (
    <button
      class={`w-full mt-3 py-3 text-white text-center font-semibold rounded ${
        data.disabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      onClick={data.on_click}
      disabled={data.disabled}
    >
      Send
    </button>
  );
};

export default SubmitButton;
