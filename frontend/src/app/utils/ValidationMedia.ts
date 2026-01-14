export function ValidMedia(type: string) {
  const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
  const VIDEO_TYPES = ['video/mp4', 'video/webm'];
  return IMAGE_TYPES.includes(type) || VIDEO_TYPES.includes(type);
}

export function VerifySize(type: string, size: number) {
  const convertedSize = parseFloat((size / 1000000).toFixed(3))
  console.log(convertedSize);
  if (type.startsWith("image/") && convertedSize > 1) {
    return false;
  }
  if (type.startsWith("video/") && convertedSize > 3) {
    return false;
  }
  return true
}

