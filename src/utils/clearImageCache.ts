import {clearCache} from '@candlefinance/faster-image';

export default async function clearImageCache(): Promise<void> {
        await clearCache();
}
