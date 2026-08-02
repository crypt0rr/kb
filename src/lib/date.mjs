const datePattern = /^(\d{4})-(\d{2})-(\d{2})(?:$|[T\s])/;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

export function normalizeDate(value) {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined;
    return value.toISOString().slice(0, 10);
  }

  const text = String(value ?? "").trim();
  const match = text.match(datePattern);
  if (!match) return undefined;

  const normalized = `${match[1]}-${match[2]}-${match[3]}`;
  return isValidCalendarDate(normalized) ? normalized : undefined;
}

export function isValidDateValue(value) {
  return Boolean(normalizeDate(value));
}

export function parseDateOnly(value) {
  const normalized = normalizeDate(value);
  if (!normalized) return undefined;

  const [year, month, day] = normalized.split("-").map(Number);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
}

export function subtractMonths(value, months) {
  const normalized = normalizeDate(value);
  if (!normalized || !Number.isInteger(months) || months < 0) return undefined;

  const [year, month, day] = normalized.split("-").map(Number);
  const monthIndex = year * 12 + month - 1 - months;
  const targetYear = Math.floor(monthIndex / 12);
  const targetMonth = monthIndex % 12;
  const targetDay = Math.min(day, daysInMonth(targetYear, targetMonth + 1));

  return formatDate(targetYear, targetMonth + 1, targetDay);
}

export function differenceInDays(later, earlier) {
  const laterDate = parseDateOnly(later);
  const earlierDate = parseDateOnly(earlier);
  if (!laterDate || !earlierDate) return undefined;
  return Math.floor((laterDate.getTime() - earlierDate.getTime()) / millisecondsPerDay);
}

function isValidCalendarDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);
}

function daysInMonth(year, month) {
  if (month === 2) {
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    return leap ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function formatDate(year, month, day) {
  return [year, month, day]
    .map((value, index) => (index === 0 ? String(value).padStart(4, "0") : String(value).padStart(2, "0")))
    .join("-");
}
