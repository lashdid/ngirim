// @ts-ignore
import JSZipUtils from "jszip-utils"; // there is no typed version yet
export default function setUrlToPromise(
  url: string
): Promise<ArrayBuffer | string> {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(
      url,
      (err: string, data: ArrayBuffer | string) =>
        err ? reject(err) : resolve(data)
    );
  });
}
