import request from 'supertest';
import { server } from '../app';

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

describe('Testing Endpoint /api/v1/on-covid-19', () => {
  afterEach(() => {
    server.close();
  });

  test('expect /api/v1/on-covid-19/ to return 200, application/json', async (done) => {
    expect.assertions(4);
    const response = await request(server)
      .post('/api/v1/on-covid-19/')
      .send(data)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect('impact' in response.body).toBeTruthy();
    expect('severeImpact' in response.body).toBeTruthy();
    done();
  });

  test('expect /api/v1/on-covid-19/ to return 400 data is invalid', async (done) => {
    const invalidData = { ...data, population: '1234567890' };
    expect.assertions(1);
    const response = await request(server)
      .post('/api/v1/on-covid-19/')
      .send(invalidData)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    done();
  });

  test('expect /api/v1/on-covid-19/ to return 400 data is invalid', async (done) => {
    const region = { ...data.region, avgAge: '19.7' };
    const invalidData = { ...data, region };
    expect.assertions(1);
    const response = await request(server)
      .post('/api/v1/on-covid-19/')
      .send(invalidData)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    done();
  });

  test('expect /api/v1/on-covid-19/ to return 400 data is invalid', async (done) => {
    const invalidData = undefined;
    expect.assertions(1);
    const response = await request(server)
      .post('/api/v1/on-covid-19/')
      .send(invalidData)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    done();
  });
});

describe('Testing Endpoint /api/v1/on-covid-19/json', () => {
  afterEach(() => {
    server.close();
  });

  test('expect /api/v1/on-covid-19/json to return 200, application/json', async (done) => {
    expect.assertions(4);
    const response = await request(server)
      .post('/api/v1/on-covid-19/json')
      .send(data)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.header['content-type']).toMatch(/json/);
    expect('impact' in response.body).toBeTruthy();
    expect('severeImpact' in response.body).toBeTruthy();
    done();
  });
});

describe('Testing Endpoint /api/v1/on-covid-19/xml', () => {
  afterEach(() => {
    server.close();
  });

  test('expect /api/v1/on-covid-19/xml to return 200 and application/xml', async (done) => {
    expect.assertions(2);
    const response = await request(server)
      .post('/api/v1/on-covid-19/xml')
      .send(data)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.header['content-type']).toMatch(/xml/);
    done();
  });
});

describe('Testing log endpoint /api/v1/on-covid-19/logs', () => {
  afterEach(() => {
    server.close();
  });
  test('expect /api/v1/on-covid-19/logs to return status 200 and content-type text/plain', async (done) => {
    expect.assertions(2);
    const response = await request(server)
      .get('/api/v1/on-covid-19/logs');
    expect(response.status).toEqual(200);
    expect(response.header['content-type']).toMatch(/text/);
    done();
  });
});

describe('Testing log endpoint /api/v1/on-covid-19/everything-else', () => {
  afterEach(() => {
    server.close();
  });
  test('expect /api/v1/on-covid-19/everything-else to return status 200 and content-type text/plain', async (done) => {
    expect.assertions(1);
    const response = await request(server)
      .get('/api/v1/on-covid-19/everything-else');
    expect(response.status).toEqual(404);
    done();
  });
});
