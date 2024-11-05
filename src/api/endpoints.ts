import type { Endpoints } from '@/types/api.type.ts';

const baseURL = import.meta.env.VITE_BASE_URL;

const endpoints = {
  getAllElixirs: {
    method: 'GET',
    url: `${baseURL}/Elixirs`,
  },
} satisfies Endpoints;

export default endpoints;
