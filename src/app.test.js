import http from 'http';

describe('Server Ok status', () => {
  test('should return 200', (done) => {
    http.get('http://127.0.0.1:4500', (res) => {
      expect.assertions(1);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
});
