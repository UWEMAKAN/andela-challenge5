import {
  impactCurrentlyInfectedPeople,
  severeImpactCurrentlyInfectedPeople,
  calculateInfectionsByRequestedTime
} from './challenge1';
import {
  calculateSevereCasesByRequestedTime,
  calculateHospitalBedsByRequestedTime
} from './challenge2';
import {
  calculateCasesForICUByRequestedTime,
  calculateCasesForVentilatorsByRequestedTime,
  calculateDollarsInFlight
} from './challenge3';

const covid19ImpactEstimator = (data) => {
  // challenge 1 start here
  // inputs { reportedCases, periodType, timeToElaspse }
  const {
    reportedCases, periodType, timeToElapse, region
  } = data;

  let impact = { ...impactCurrentlyInfectedPeople(reportedCases) };
  let severeImpact = { ...severeImpactCurrentlyInfectedPeople(reportedCases) };

  impact = {
    ...impact,
    ...calculateInfectionsByRequestedTime(impact.currentlyInfected, periodType, timeToElapse)
  };
  severeImpact = {
    ...severeImpact,
    ...calculateInfectionsByRequestedTime(severeImpact.currentlyInfected, periodType, timeToElapse)
  };
  // challeng1 end

  // challenge 2 start here
  // inputs { totalHospitalBeds, impact, severeImpact }
  const { totalHospitalBeds } = data;
  impact = {
    ...impact,
    ...calculateSevereCasesByRequestedTime(impact.infectionsByRequestedTime)
  };
  severeImpact = {
    ...severeImpact,
    ...calculateSevereCasesByRequestedTime(severeImpact.infectionsByRequestedTime)
  };

  impact = {
    ...impact,
    ...calculateHospitalBedsByRequestedTime(totalHospitalBeds, impact.severeCasesByRequestedTime)
  };
  severeImpact = {
    ...severeImpact,
    ...calculateHospitalBedsByRequestedTime(
      totalHospitalBeds, severeImpact.severeCasesByRequestedTime
    )
  };
  // challenge 2 ends here

  // challenge 3 starts here
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  impact = {
    ...impact,
    ...calculateCasesForICUByRequestedTime(impact.infectionsByRequestedTime)
  };
  severeImpact = {
    ...severeImpact,
    ...calculateCasesForICUByRequestedTime(severeImpact.infectionsByRequestedTime)
  };

  impact = {
    ...impact,
    ...calculateCasesForVentilatorsByRequestedTime(impact.infectionsByRequestedTime)
  };
  severeImpact = {
    ...severeImpact,
    ...calculateCasesForVentilatorsByRequestedTime(severeImpact.infectionsByRequestedTime)
  };

  impact = {
    ...impact,
    ...calculateDollarsInFlight(avgDailyIncomeInUSD, avgDailyIncomePopulation,
      impact.infectionsByRequestedTime, periodType, timeToElapse)
  };
  severeImpact = {
    ...severeImpact,
    ...calculateDollarsInFlight(avgDailyIncomeInUSD, avgDailyIncomePopulation,
      severeImpact.infectionsByRequestedTime, periodType, timeToElapse)
  };

  // challenge 3 ends here
  const returnValue = { data, impact, severeImpact };
  return returnValue;
};

export default covid19ImpactEstimator;
