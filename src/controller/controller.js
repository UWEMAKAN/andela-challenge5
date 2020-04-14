import { expectedData, expectedRegion } from '../constants/constants';
import covid19ImpactEstimator from '../estimator/estimator';

export const checkCompleteData = (data, expectedInput) => {
  const isValid = {};
  isValid.fields = expectedInput.filter((input) => !(input in data));
  isValid.status = !isValid.fields.length;
  return isValid;
};

export const parseInvalidFields = (fields) => new Error(`Ooops! Invalid data format!!!
    Your request body is missing the following fields:

    ${fields.join('\n')}`);

export const checkAllDataTypes = (data) => {
  const { region } = data;
  const {
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = data;
  const {
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;
  if (typeof periodType !== 'string' || typeof timeToElapse !== 'number'
    || typeof reportedCases !== 'number' || typeof population !== 'number'
    || typeof totalHospitalBeds !== 'number' || typeof avgAge !== 'number'
    || typeof avgDailyIncomeInUSD !== 'number' || typeof avgDailyIncomePopulation !== 'number') {
    return new Error(`Ooops! Invalid data format!!!
      Your fields should be of the following types:

      region: {
        name: string,
        avgAge: number,
        avgDailyIncomeInUSD: number,
        avgDailyIncomePopulation: number
      }
      periodType: string,
      timeToElapse: number,
      reportedCases: number,
      population: number,
      totalHospitalBeds: number`);
  }
  return null;
};

export default function estimator(data) {
  const { region } = data;
  const isValidData = checkCompleteData(data, expectedData);
  if (!isValidData.status) {
    const invalidFields = parseInvalidFields(isValidData.fields);
    return Promise.reject(invalidFields);
  }
  const isValidRegion = checkCompleteData(region, expectedRegion);
  if (!isValidRegion.status) {
    const invalidFields = parseInvalidFields(isValidRegion.fields);
    return Promise.reject(invalidFields);
  }
  const invalidTypes = checkAllDataTypes(data);
  if (invalidTypes) {
    return Promise.reject(invalidTypes);
  }
  const estimate = covid19ImpactEstimator(data);
  return Promise.resolve(estimate);
}
