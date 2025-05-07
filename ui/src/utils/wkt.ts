export const toWKTPoint = (center: [number, number]) => {
    const [lat, lng] = center;
    return `POINT(${lat} ${lng})`;
};
