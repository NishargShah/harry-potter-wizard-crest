import endpoints from '@/api/endpoints.ts';
import constants from '@/constants';

// GET ALL ELIXIRS

interface GetAllElixirsParams {
  params: Record<string, string>;
}

interface GetAllElixirsIngredient {
  id: string;
  name: string;
}

interface GetAllElixirsInventor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetAllElixirsOutput {
  id: string;
  name: string;
  difficulty: string;
  ingredients: GetAllElixirsIngredient[];
  inventors: GetAllElixirsInventor[];
  manufacturer: string | null;
}

type GetAllElixirs = (params: GetAllElixirsParams) => Promise<GetAllElixirsOutput | Error>;

export const getAllElixirs: GetAllElixirs = async ({ params }) => {
  try {
    const searchParams = new URLSearchParams(params).toString();

    const res = await fetch(`${endpoints.getAllElixirs.url}?${searchParams}`, {
      method: endpoints.getAllElixirs.method,
    });

    const data = await res.json();
    if (!res.ok) throw data;

    return data;
  } catch (err) {
    console.error(err);

    const message = (() => {
      const error = (() => {
        if (typeof err === 'object' && err && 'errors' in err) {
          const errors = Object.values(err.errors ?? {}).flat(1);
          return errors[0] || undefined;
        }

        return undefined;
      })();

      return error || constants.TECHNICAL_ERROR;
    })();

    return new Error(message);
  }
};
