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
      <div>
        <canvas class="image-render-pixel w-full h-full" ref="canvas"></canvas>
      </div>
      <form class="flex justify-between" action="#">
        <input
          class="flex-grow mr-4 p-2 bg-gray-50 rounded border border-2 border-blue-300 outline-blue-500"
          type="text"
          placeholder="filename"
          v-model="filename"
        />
        <button
        type="submit"
          class="p-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded shadow"
          @click.prevent="download"
        >
          Download
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RGBA, generate } from "lean-qr";
import { toSvgDataURL, toSvgPath } from "lean-qr/extras/svg";

const blackRGBA: RGBA = [0, 0, 0, 255]
const whiteRGBA: RGBA = [255, 255, 255, 255]
const canvas = ref<HTMLCanvasElement>();
let code = generate("Hello");
const text = ref("");
const filename = ref("");

onMounted(() => {
  watch(text, (newText) => {
    code = generate(newText);
    code.toCanvas(canvas.value!, {
      on: blackRGBA,
      off: whiteRGBA,
    });
  });

  code.toCanvas(canvas.value!, {
    on: blackRGBA,
    off: whiteRGBA,
  });
});

async function download() {
  const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d")!,
    imgData = code.toImageData(ctx, {
      on: blackRGBA,
      off: whiteRGBA,
    });

  canvas.width = 300;
  canvas.height = 300;
  ctx.putImageData(imgData, 0, 0);
  ctx.imageSmoothingEnabled = false;

  ctx.globalCompositeOperation = "copy";
  ctx.drawImage(
    canvas,
    0,
    0,
    imgData.width,
    imgData.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = filename.value || "qrcode.png";
  link.href = canvas.toDataURL("image/png", 1);
  link.click();
}
</script>
