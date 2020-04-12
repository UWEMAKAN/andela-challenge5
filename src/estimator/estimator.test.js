import estimator from './estimator';

describe('Test Estimator', () => {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
  const output = estimator(data);
  test('expect to return object with the correct properties', () => {
    expect.assertions(3);
    expect(output).toHaveProperty('data');
    expect(output).toHaveProperty('impact');
    expect(output).toHaveProperty('severeImpact');
  });

  describe('Test for currentlyInfected in properties impact and severeImpact', () => {
    test('expect to return impact.currentlyInfected in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('impact.currentlyInfected');
    });
    test('expect to return severeImpact.currentlyInfected in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('severeImpact.currentlyInfected');
    });
  });

  describe('Test for infectionsByRequestedTime in properties impact and severeImpact', () => {
    test('expect to return impact.infectionsByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('impact.infectionsByRequestedTime');
    });
    test('expect to return severeImpact.infectionsByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('severeImpact.infectionsByRequestedTime');
    });
  });

  describe('Test for severeCasesByRequestedTime in properties impact and severeImpact', () => {
    test('expect to return impact.severeCasesByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('impact.severeCasesByRequestedTime');
    });
    test('expect to return severeImpact.severeCasesByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('severeImpact.severeCasesByRequestedTime');
    });
  });

  describe('Test for hospitalBedsByRequestedTime in properties impact and severeImpact', () => {
    test('expect to return impact.hospitalBedsByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('impact.hospitalBedsByRequestedTime');
    });
    test('expect to return severeImpact.hospitalBedsByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('severeImpact.hospitalBedsByRequestedTime');
    });
  });

  describe('Test for casesForICUByRequestedTime in properties impact and severeImpact', () => {
    test('expect to return impact.casesForICUByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('impact.casesForICUByRequestedTime');
    });
    test('expect to return severeImpact.casesForICUByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('severeImpact.casesForICUByRequestedTime');
    });
  });

  describe('Test for casesForVentilatorsByRequestedTime in properties impact and severeImpact', () => {
    test('expect to return impact.casesForVentilatorsByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('impact.casesForVentilatorsByRequestedTime');
    });
    test('expect to return severeImpact.casesForVentilatorsByRequestedTime in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('severeImpact.casesForVentilatorsByRequestedTime');
    });
  });

  describe('Test for dollarsInFlight in properties impact and severeImpact', () => {
    test('expect to return impact.dollarsInFlight in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('impact.dollarsInFlight');
    });
    test('expect to return severeImpact.dollarsInFlight in return object', () => {
      expect.assertions(1);
      expect(output).toHaveProperty('severeImpact.dollarsInFlight');
    });
  });
});
