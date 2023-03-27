<template>
  <div>
    <div
      class="flex flex-col items-center justify-center w-80 gap-1 mx-auto children:w-full"
    >
      <div>
        <textarea
          class="w-full p-2 bg-gray-50 rounded border border-2 border-blue-300 outline-blue-500"
          type="text"
          v-model="text"
          placeholder="Enter your text or link here"
        />
      </div>
      <div class="resize">
        <canvas
          class="w-full h-full image-render-pixel image-render-edge"
          width="500"
          height="500"
          id="qrcanvas"
        ></canvas>
      </div>
      <div class="flex justify-between">
        <input
          class="flex-grow mr-4 p-2 bg-gray-50 rounded border border-2 border-blue-300 outline-blue-500"
          type="text"
          placeholder="filename"
          v-model="filename"
        />
        <button
          class="p-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded shadow"
          @click="download"
        >
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generate } from "lean-qr";
import { toRGB, toRGBA } from "windicss/utils";
let code = generate("Hello");
const text = ref("");
const filename = ref("");

onMounted(() => {
  watch(text, (newText) => {
    code = generate(newText);
    code.toCanvas(document.getElementById("qrcanvas") as HTMLCanvasElement, {on: [0, 0, 0, 255], off: [255, 255, 255, 255]});
  });

  code.toCanvas(document.getElementById("qrcanvas") as HTMLCanvasElement, {on: [0, 0, 0, 255], off: [255, 255, 255, 255]});
});

function download() {
  const href = (
    document.getElementById("qrcanvas") as HTMLCanvasElement
  ).toDataURL();
  const link = document.createElement("a");
  link.download = filename.value || "qrcode.png";
  link.href = href;
  link.click();
}
</script>
