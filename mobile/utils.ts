
/**
 * utility function to format song features
 * @param features the song features using +
 * @returns the song features separated by ,
 */
export const processSongFeatures = (features: string) => features.split('+').map((feature) => feature.trim()).join(", ")
