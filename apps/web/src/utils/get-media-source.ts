import { MEDIA_URL } from '@/libs/constants/url.constants';

export function getMediaSource(path: string | undefined | null) {
  let result = MEDIA_URL;

  if (path) {
    if (
      path.startsWith('http://') ||
      path.startsWith('https://') ||
      path.startsWith('blob:')
    ) {
      result = path;
    } else {
      result = MEDIA_URL + (path.startsWith('/') ? path : `/${path}`);
    }
  }

  return result;
}
