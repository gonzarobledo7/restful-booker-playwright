/**
 * Single place where the suite learns where the system under test lives.
 * Defaults match docker-compose.yml, so a local run needs no configuration.
 */
const fromEnv = (name: string, fallback: string): string => process.env[name] ?? fallback;

export const env = {
  uiBaseUrl: fromEnv('UI_BASE_URL', 'http://localhost:3003'),
  services: {
    booking: fromEnv('BOOKING_API_URL', 'http://localhost:3000'),
    room: fromEnv('ROOM_API_URL', 'http://localhost:3001'),
    branding: fromEnv('BRANDING_API_URL', 'http://localhost:3002'),
    auth: fromEnv('AUTH_API_URL', 'http://localhost:3004'),
    report: fromEnv('REPORT_API_URL', 'http://localhost:3005'),
    message: fromEnv('MESSAGE_API_URL', 'http://localhost:3006'),
  },
} as const;

export type ServiceName = keyof typeof env.services;
