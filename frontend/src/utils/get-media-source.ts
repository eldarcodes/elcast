import { MEDIA_URL } from '@/libs/constants/url.constants';

export function getMediaSource(path: string | undefined | null) {
  let result = MEDIA_URL;

  if (path) {
    if (path.startsWith('/')) {
      result += path;
    } else {
      result += `/${path}`;
    }
  }

  return result;
}
