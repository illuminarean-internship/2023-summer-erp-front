export default function dateToString(date) {
    return date
        ? JSON.stringify(date).slice(6, 8) +
              ' / ' +
              JSON.stringify(date).slice(9, 11) +
              ' / ' +
              JSON.stringify(date).slice(1, 5)
        : null;
}
