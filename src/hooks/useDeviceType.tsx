import { useEffect, useState } from 'react';
import { detectDeviceType } from '../utils/device';
import type { DeviceType } from '../types';

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(detectDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(detectDeviceType());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}
