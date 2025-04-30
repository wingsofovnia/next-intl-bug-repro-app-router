import {AbstractIntlMessages} from 'use-intl'
import {getRequestConfig, RequestConfig} from 'next-intl/server'
import {defineRouting} from 'next-intl/routing'

const Locales: Locale[] = [
  {
    code: 'en',
    name: 'English',
    location: 'en.json',
    flag: '🇺🇸',
  },
]
const defaultLocaleCode: string = 'en'

const LocalesDict = Locales.reduce((dict, e) => {
  dict[e.code] = e
  return dict
}, {} as Dictionary)

const LocaleCodes: string[] = Object.keys(LocalesDict)

const defaultLocale: Locale = LocalesDict[defaultLocaleCode]

export { defaultLocale, defaultLocaleCode, LocaleCodes, Locales }

export interface Locale {
  code: string
  name: string
  location: string
  flag: string
}

export interface Dictionary {
  [locale: string]: Locale
}

export async function loadMessages(locale: Locale): Promise<AbstractIntlMessages> {
  try {
    // must be prefixed statically, see https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
    return (await import(`@/i18n/${locale.location}`)).default
  } catch (e) {
    throw new Error(`Failed to load locale: ${e}`)
  }
}

export function localeOf(code: string): Locale | undefined {
  return LocalesDict[code]
}

export default getRequestConfig(async({ requestLocale }): Promise<RequestConfig> => {
  let localeCode = await requestLocale
  if (!localeCode) localeCode = defaultLocaleCode

  let locale = localeOf(localeCode)
  if (!locale) locale = defaultLocale

  return {
    locale: localeCode,
    messages: await loadMessages(locale),
  }
})

export const intlRouting = defineRouting({
  locales: LocaleCodes,
  defaultLocale: defaultLocaleCode,
})

