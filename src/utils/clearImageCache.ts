import FastImage from "react-native-fast-image";

export default async function clearImageCache(): Promise<void> {
        await FastImage.clearMemoryCache();
        await FastImage.clearDiskCache();
}
