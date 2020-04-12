import {
  calculateSevereCasesByRequestedTime,
  calculateHospitalBedsByRequestedTime
} from './challenge2';

describe('Test Challenge 2 functions', () => {
  test('expect to return 15% of infectionsByRequestedTime', () => {
    const input = 100000;
    const output = { severeCasesByRequestedTime: 15000 };
    expect.assertions(1);
    expect(calculateSevereCasesByRequestedTime(input)).toEqual(output);
  });
  test('expect to return hospitalBedsByRequestedTime', () => {
    const input1 = 100000;
    const input2 = 10000;
    const output = { hospitalBedsByRequestedTime: 25000 };
    expect.assertions(1);
    expect(calculateHospitalBedsByRequestedTime(input1, input2)).toEqual(output);
  });
});
