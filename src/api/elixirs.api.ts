import endpoints from '@/api/endpoints.ts';

// GET ALL ELIXIRS

interface GetAllElixirsParams {
  params: Record<string, string>;
}

interface GetAllElixirsInventors {
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetAllElixirsOutput {
  id: string;
  name: string;
  difficulty: string;
  inventors: GetAllElixirsInventors[];
  manufacturer: string | null;
}

type GetAllElixirs = (params: GetAllElixirsParams) => Promise<GetAllElixirsOutput | Error>;

export const getAllElixirs: GetAllElixirs = async ({ params }) => {
  try {
    const searchParams = new URLSearchParams(params).toString();

    const res = await fetch(`${endpoints.getAllElixirs.url}?${searchParams}`, {
      method: endpoints.getAllElixirs.method,
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return new Error(err as string);
  }
};
