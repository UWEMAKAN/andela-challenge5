import {
  calculateCasesForICUByRequestedTime,
  calculateCasesForVentilatorsByRequestedTime,
  calculateDollarsInFlight
} from './challenge3';

describe('Test challenge3 functions', () => {
  test('expect to return 5% of infectionsByRequestedTime', () => {
    const input = 100000;
    const output = { casesForICUByRequestedTime: input * 0.05 };
    expect.assertions(1);
    expect(calculateCasesForICUByRequestedTime(input)).toEqual(output);
  });

  test('expect to return 2% of infectionsByRequestedTime', () => {
    const input = 100000;
    const output = { casesForVentilatorsByRequestedTime: input * 0.02 };
    expect.assertions(1);
    expect(calculateCasesForVentilatorsByRequestedTime(input)).toEqual(output);
  });

  test('expect to caluate dollarsInFlight', () => {
    const avgDailyIncomeInUSD = 5;
    const avgDailyIncomePopulation = 0.71;
    const infectionsByRequestedTime = 17668505600;
    const timeToElapse = 58;
    const periodType = 'days';
    const output = {
      dollarsInFlight: Math.floor((infectionsByRequestedTime * avgDailyIncomePopulation
        * avgDailyIncomeInUSD) / 58)
    };
    expect.assertions(1);
    expect(calculateDollarsInFlight(
      avgDailyIncomeInUSD, avgDailyIncomePopulation,
      infectionsByRequestedTime, periodType, timeToElapse
    )).toEqual(output);
  });
});
