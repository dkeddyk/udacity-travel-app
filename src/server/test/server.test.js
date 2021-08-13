var serverInstance;
const server = require('../server');
describe('Server lauching', () => {
  beforeEach(() => {
    serverInstance = server.server;
  });

  test('Server Running', () => {
    expect(serverInstance.listening).toBe(true);
  });

  afterAll(async function () {
    await serverInstance.close();
  });
});
