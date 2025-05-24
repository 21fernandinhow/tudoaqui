export const checkDeviceType = (device: string) => {
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(device);
    return isMobile ? 'mobile' : 'desktop';
}