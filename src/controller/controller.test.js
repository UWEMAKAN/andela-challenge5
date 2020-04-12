import {
  checkCompleteData,
  parseInvalidFields,
  checkAllDataTypes
} from './controller';

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

describe('Test checkCompleteData', () => {
  test('expect to return { status: true, fields: [] } for valid case', () => {
    const input = { name: 'Africa', population: 2000000000 };
    const fields = ['name', 'population'];
    const output = { status: true, fields: [] };
    expect.assertions(1);
    expect(checkCompleteData(input, fields)).toEqual(output);
  });
  test("expect to return { status: false, fields: ['name'] } for invalid case", () => {
    const input = { population: 2000000000 };
    const fields = ['name', 'population'];
    const output = { status: false, fields: ['name'] };
    expect.assertions(1);
    expect(checkCompleteData(input, fields)).toEqual(output);
  });
});

describe('Test parseInvalidFields', () => {
  test('expect to return Error', () => {
    const fields = ['name', 'population'];
    expect.assertions(1);
    expect(parseInvalidFields(fields)).toBeInstanceOf(Error);
  });
});

describe('Test checkAllDataTypes', () => {
  test('expect to return null when fields are of expected types', () => {
    expect.assertions(1);
    expect(checkAllDataTypes(data)).toBeNull();
  });
  test('expect to return Error', () => {
    const invalidData = { ...data, timeToElapse: '58' };
    expect.assertions(1);
    expect(checkAllDataTypes(invalidData)).toBeInstanceOf(Error);
  });
});
