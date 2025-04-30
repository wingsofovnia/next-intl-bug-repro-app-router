import createNextIntlPlugin from 'next-intl/plugin';
import {NextConfig} from 'next';
import {Locales} from '@/i18n/config'

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
    },
    async redirects() {
        return Locales.flatMap(({code: locale}) => [
            {
                source: `/${locale}/settings`,
                destination: `/${locale}/settings/me`,
                permanent: true,
            },
        ])
    },
};

export default withNextIntl(nextConfig);