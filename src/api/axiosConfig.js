// Normalize API base: allow NEXT_PUBLIC_API_URL to be either host or host+/api/v1
const _RAW_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const API_BASE_URL = /\/api\/v1\/?$/.test(_RAW_API) ? _RAW_API.replace(/\/$/, '') : _RAW_API.replace(/\/$/, '') + '/api/v1';
