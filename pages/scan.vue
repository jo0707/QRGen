<template>
  <div
    class="text-center max-w-140 p-8 rounded transition"
    :class="dragClasses"
    @drop.prevent="dropHandler"
    @dragover.prevent="dragClasses = 'bg-blue-100 shadow'"
    @dragleave.prevent="dragClasses = ''"
  >
    <p class="text-lg w-full break-all mb-4">Text : {{ text }}</p>
    <div class="rounded-lg shadow-lg">
      <video
        v-if="hasCamera"
        ref="videoElement"
        class="mt-12 w-full rounded-lg"
      ></video>
      <!-- create div "or drag here" with upload button in center -->
      <div class="flex h-full">
        <label
          for="image"
          class="flex place-content-center gap-2 w-full h-full p-8 font-bold text-gray-600 hover:text-gray-800 cursor-pointer transition bg-white"
        >
          <i class="inline"
            ><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z"
                fill="currentColor"
              />
              <path
                d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                fill="currentColor"
              /></svg></i>
          <p>Drop or click to upload image</p>
        </label>
        <input
          type="file"
          accept="image/*"
          class="hidden"
          id="image"
          @change="() => upload"
        />
      </div>
    </div>
    <p v-if="errorText && !text" class="mt-4 text-red-500 text-sm">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import QrScanner from "qr-scanner";

const videoElement = ref<HTMLVideoElement>();
const text = ref("");
const errorText = ref("");
const hasCamera = ref(true);
const dragClasses = ref("");
let qrScanner: QrScanner;

function decodeError(error: Error | string) {
  console.error(error);
  errorText.value = error instanceof Error ? error.message : error;
}

async function upload(e: Event, f: File | null) {
  text.value = "";
  const file = f ? f : (e.target as HTMLInputElement).files?.[0];
  if (file) {
    try {
      let r = await QrScanner.scanImage(file);
      text.value = r;
    } catch (error: any) {
      decodeError(error instanceof Error ? error : error);
    }
  }
}

function dropHandler(e: DragEvent) {
  dragClasses.value = "";

  if (e.dataTransfer?.items[0]) {
    if (e.dataTransfer.items[0].kind === "file") {
      const file = e.dataTransfer.items[0].getAsFile();
      upload(e, file);
    }
  }
}

onMounted(async () => {
  hasCamera.value = await QrScanner.hasCamera();

  if (hasCamera.value) {
    try {
      qrScanner = new QrScanner(
        videoElement.value!,
        (r) => (text.value = r.data),
        {
          onDecodeError: (error) => decodeError(error),
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await qrScanner.start();
    } catch (error: any) {
      decodeError(error instanceof Error ? error : error);
    }
  } else {
    decodeError("No camera found");
  }
});

onUnmounted(() => {
  qrScanner?.destroy();
});
</script>
