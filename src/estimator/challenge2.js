export const calculateSevereCasesByRequestedTime = (infectionsByRequestedTime) => {
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  return { severeCasesByRequestedTime };
};

export const calculateHospitalBedsByRequestedTime = (
  totalHospitalBeds, severeCasesByRequestedTime
) => {
  const hospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35)
                                        - severeCasesByRequestedTime);
  return { hospitalBedsByRequestedTime };
};
