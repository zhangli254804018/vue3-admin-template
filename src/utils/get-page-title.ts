import defaultSettings from '@/settings.ts'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
