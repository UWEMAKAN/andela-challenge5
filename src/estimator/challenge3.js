import { getPeriod } from './challenge1';

export const calculateCasesForICUByRequestedTime = (infectionsByRequestedTime) => ({
  casesForICUByRequestedTime: Math.trunc((infectionsByRequestedTime * 5) / 100)
});

export const calculateCasesForVentilatorsByRequestedTime = (infectionsByRequestedTime) => ({
  casesForVentilatorsByRequestedTime: Math.trunc((infectionsByRequestedTime * 2) / 100)
});

export const calculateDollarsInFlight = (
  avgDailyIncomeInUSD, avgDailyIncomePopulation,
  infectionsByRequestedTime, periodType, timeToElapse
) => {
  const period = getPeriod(periodType) * timeToElapse;
  const dollarsInFlight = Math.trunc((infectionsByRequestedTime * avgDailyIncomePopulation
  * avgDailyIncomeInUSD) / period);
  return { dollarsInFlight };
};
