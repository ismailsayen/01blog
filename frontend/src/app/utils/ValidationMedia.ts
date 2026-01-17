export function ValidImage(type: string) {
  const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp' , 'image/gif'];
  return IMAGE_TYPES.includes(type) ;
}

export function ValidVideo(type: string) {
  const VIDEO_TYPES = ['video/mp4', 'video/webm','video/ogg'];
  return  VIDEO_TYPES.includes(type);
}
export function VerifySize(type: string, size: number) {
  const convertedSize = parseFloat((size / 1000000).toFixed(3))
  if (type.startsWith("image/") && convertedSize > 1.5) {
    return false;
  }
  if (type.startsWith("video/") && convertedSize > 3) {
    return false;
  }
  return true
}

