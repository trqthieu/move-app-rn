import moment from 'moment';
export function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} giờ ${minutes} phút`;
}

export function formatDateTime(dateTime) {
  return moment(dateTime).format('HH:mm DD/MM/YYYY');
}
export function formatDate(date) {
  return moment(date).format('DD/MM/YYYY');
}
export function formatTime(time) {
  return moment(time).format('HH:mm');
}

export function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export function isValidEmail(email) {
  return emailRegex.test(email);
}
