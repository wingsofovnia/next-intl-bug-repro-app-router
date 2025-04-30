import createNextIntlPlugin from 'next-intl/plugin';
import {NextConfig} from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/config.ts');

const nextConfig: NextConfig = {
    reactStrictMode: false,
    eslint: {
        dirs: [
            'app',
            'auth',
            'components',
            'hooks',
            'u18n',
            'libs',
            'providers',
            'types',
            'values',
            '.',
        ],
    }
};

export default withNextIntl(nextConfig);