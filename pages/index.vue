<template>
  <div>
    <form action="#" class="children:w-full mx-auto flex w-11/12 flex-col items-center justify-center md:w-90">
      <div>
        <textarea class="w-full rounded border border-2 border-blue-300 bg-gray-50 p-2 outline-blue-500" type="text"
          v-model="text" placeholder="Enter your text or link here" />
      </div>
      <div>
        <canvas class="image-render-pixel h-full w-full" ref="canvas"></canvas>
      </div>
      <div class="grid grid-cols-2 grid-rows-2 gap-2">
        <input class="w-full rounded border border-2 border-blue-300 bg-gray-50 p-2 outline-blue-500" type="text"
          placeholder="filename" v-model="filename" />
        <div class="flex items-center w-full rounded border border-2 border-blue-300 bg-gray-50 outline-blue-500">
          <input class="flex-grow bg-transparent h-full pl-2 outline-0" type="number" name="imagesize" id="imagesize"
            placeholder="Image size (32-2000 px)" v-model="size" min="32" max="2000">
          <label class="mr-2" for="imagesize">px</label>
        </div>
        <button type="submit"
          class="col-span-2 rounded bg-gradient-to-br from-blue-400 to-blue-500 p-2 text-white shadow hover:shadow-lg transition"
          @click.prevent="download">
          Download
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { RGBA, generate } from "lean-qr";
import { toSvgDataURL, toSvgPath } from "lean-qr/extras/svg";

const blackRGBA: RGBA = [0, 0, 0, 255];
const whiteRGBA: RGBA = [255, 255, 255, 255];
const canvas = ref<HTMLCanvasElement>();
let code = generate("Hello");
const text = ref(""),
  filename = ref(""),
  size = ref(300);

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
  size.value = Math.min(Math.max(size.value, 32), 2000);

  const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d")!,
    imgData = code.toImageData(ctx, {
      on: blackRGBA,
      off: whiteRGBA,
    });

  canvas.width = canvas.height = size.value;
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
