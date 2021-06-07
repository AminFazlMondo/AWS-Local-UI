import {DateTime} from 'luxon'

const fullStringFormat = 'dd/MM/yyyy HH:mm:ss.SSS'
export function toFullString(date) {
  return DateTime.fromJSDate(date).toFormat(fullStringFormat)
}
export function toFullStringFromMillis(timestamp) {
  return DateTime.fromMillis(timestamp).toFormat(fullStringFormat)
}
