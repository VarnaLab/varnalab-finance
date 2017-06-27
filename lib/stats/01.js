
// Средна месечна вноска на всеки спонсор за тази година

module.exports = (sponsors, period) =>
  Object.keys(sponsors)
    .map((name) => ({name, monthly: sponsors[name]}))
    .map(({name, monthly}) => (
      (
        total =
          monthly.reduce((total, month) => (total += month, total), 0)
      ) =>
      ({
        name,
        monthly,
        total,
        average: Math.floor(total / period)
      })
    )())
    .filter((sponsor) => (sponsor.average >= 10))
    .sort((a, b) => (b.average - a.average))
