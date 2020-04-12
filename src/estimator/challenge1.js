export const impactCurrentlyInfectedPeople = (reportedCases) => ({
  currentlyInfected: reportedCases * 10
});

export const severeImpactCurrentlyInfectedPeople = (reportedCases) => ({
  currentlyInfected: reportedCases * 50
});

export const getPeriod = (periodType) => {
  let period;
  if (periodType === 'days') {
    period = 1;
  } else if (periodType === 'weeks') {
    period = 7;
  } else if (periodType === 'months') {
    period = 30;
  }
  return period;
};

export const getFactor = (periodType, timeToElapse) => {
  const period = getPeriod(periodType);
  return 2 ** Math.trunc((timeToElapse * period) / 3);
};

export const calculateInfectionsByRequestedTime = (currentlyInfected, period, time) => {
  const power = getFactor(period, time);
  return {
    infectionsByRequestedTime: currentlyInfected * power
  };
};

// export const challenge1 = ({ reportedCases, periodType, timeToElapse }) => {
//   let impact = { ...impactCurrentlyInfectedPeople(reportedCases) };
//   let severeImpact = { ...severeImpactCurrentlyInfectedPeople(reportedCases) };
//   impact = {
//     ...impact,
//     ...calculateInfectionsByRequestedTime(impact.currentlyInfected, periodType, timeToElapse)
//   };
//   severeImpact = {
//     ...severeImpact,
//     ...calculateInfectionsByRequestedTime(severeImpact.currentlyInfected,
// periodType, timeToElapse)
//   };
//   return { impact, severeImpact };
// };
