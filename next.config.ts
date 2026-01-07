import { image } from 'motion/react-client';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Whitelist the specific quality levels used in your project
        qualities: [25, 50, 75, 85],
    },
};

export default withNextIntl(nextConfig);
