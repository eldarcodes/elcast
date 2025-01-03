import type { Request } from 'express';
import { lookup } from 'geoip-lite';

import type { SessionMetadata } from '../types/session-metadata.type';

import { IS_DEV_ENV } from './is-dev.util';

import DeviceDetector = require('device-detector-js');

const getClientIp = (req: Request) => {
  if (IS_DEV_ENV) return '173.166.164.121';

  const cfIp = req.headers['cf-connecting-ip'];
  const forwardedFor = req.headers['x-forwarded-for'];

  if (Array.isArray(cfIp)) return cfIp[0];
  if (cfIp) return cfIp;
  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip;
};

export function getSessionMetadata(
  req: Request,
  userAgent: string,
): SessionMetadata {
  const ip = getClientIp(req);
  const location = lookup(ip);
  const device = new DeviceDetector().parse(userAgent);

  return {
    ip,
    location: {
      country: location?.country || 'Unknown',
      city: location?.city || 'Unknown',
      latitude: location?.ll[0] || 0,
      longitude: location?.ll[1] || 0,
    },
    device: {
      browser: device.client?.name || 'Unknown',
      os: device.os?.name || 'Unknown',
      type: device.device?.type || 'Unknown',
    },
  };
}
