export const fmt = (n: number): string => '₹' + n.toLocaleString('en-IN')

export const fmtReviews = (n: number): string =>
  n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n)
