import { expect, test } from '@playwright/test';
import { env, type ServiceName } from '../../src/config/env';

const services = Object.keys(env.services) as ServiceName[];

test.describe('Service health', { tag: '@smoke' }, () => {
  for (const service of services) {
    test(`${service} service reports UP`, async ({ request }) => {
      const response = await request.get(`${env.services[service]}/${service}/actuator/health`);

      expect(response.status()).toBe(200);
      expect(await response.json()).toMatchObject({ status: 'UP' });
    });
  }
});
