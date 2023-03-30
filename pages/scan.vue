<template>
  <div class="max-w-140 rounded p-8 text-center transition" :class="dragClasses" @drop.prevent="dropHandler"
    @dragover.prevent="dragClasses = 'bg-blue-100 shadow'" @dragleave.prevent="dragClasses = ''">
    <p class="mb-12 w-full break-all text-lg">Result : {{ text }}</p>
    <div class="rounded-lg shadow-lg">
      <div v-if="cams && cams.length > 1" class="flex place-content-center items-center p-2 text-sm">
        <label for="cams">
          <CameraIcon />
        </label>
        <select class="ml-2 p-2 rounded bg-transparent hover:bg-gray-100 hover:shadow transition" v-model="activeCamId"
          name="cams" id="cams">
          <option v-for="c in cams" :value="c.id">{{ c.label }}</option>
        </select>
      </div>
      <video v-if="hasCamera" ref="videoElement" class="w-full rounded-lg"></video>
      <div class="flex h-full">
        <label for="image"
          class="flex h-full w-full cursor-pointer place-content-center gap-2 bg-white p-8 font-bold text-gray-600 transition hover:text-gray-800">
          <UploadIcon />
          <p class="-md:text-sm">Drop or click to upload image</p>
        </label>
        <input type="file" accept="image/*" class="hidden" id="image" @change="() => upload" />
      </div>
    </div>
    <p v-if="errorText && !text" class="mt-4 text-sm text-red-500">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import QrScanner from "qr-scanner";

const videoElement = ref<HTMLVideoElement>()
  , text = ref("")
  , errorText = ref("")
  , hasCamera = ref(true)
  , dragClasses = ref("")
  , cams = ref<QrScanner.Camera[]>()
  , activeCamId = ref("");
let qrScanner: QrScanner;

watch(activeCamId, (id) => qrScanner.setCamera(id))

onMounted(async () => {
  hasCamera.value = await QrScanner.hasCamera();

  if (hasCamera.value) {
    cams.value = await QrScanner.listCameras(true);
    activeCamId.value = cams.value[0].id;

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

onUnmounted(() => qrScanner?.destroy());
</script>
