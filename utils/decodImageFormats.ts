import { decode as decodeQoi } from "@jsquash/qoi";
import { decode as decodeJxl } from "@jsquash/jxl";

/* 
input: blob
output: data url
*/

export const decodeQoiFormat = async (data: Blob) => {
  const qoiData = await decodeQoi(await data.arrayBuffer());
  const canvas = document.createElement("canvas");
  canvas.width = qoiData.width;
  canvas.height = qoiData.height;

  // 2. Get the 2D rendering context
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D context for canvas.");
    // Handle error appropriately, maybe set a placeholder or throw
    return;
  }

  // 3. Put the ImageData onto the canvas
  ctx.putImageData(qoiData, 0, 0);

  // 4. Get the Data URL from the canvas
  // You can specify the image format (e.g., 'image/png', 'image/jpeg')
  // 'image/png' is generally lossless and good for ImageData.
  return canvas.toDataURL("image/png") ?? "";
};

/* 
input: blob
output: data url
*/

export const decodeJxlFormat = async (data: Blob) => {
  const jxlData = await decodeJxl(await data.arrayBuffer());
  const canvas = document.createElement("canvas");
  canvas.width = jxlData.width;
  canvas.height = jxlData.height;

  // 2. Get the 2D rendering context
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D context for canvas.");
    // Handle error appropriately, maybe set a placeholder or throw
    return;
  }

  // 3. Put the ImageData onto the canvas
  ctx.putImageData(jxlData, 0, 0);

  // 4. Get the Data URL from the canvas
  // You can specify the image format (e.g., 'image/png', 'image/jpeg')
  // 'image/png' is generally lossless and good for ImageData.
  return canvas.toDataURL("image/png") ?? "";
};
