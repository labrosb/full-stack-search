import { getCodeSandboxHost } from "@codesandbox/utils";

// TODO: use env variables
const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

export const QueryError = (error: unknown) => error as Error & { status?: number };

// Fetches multiSearch results, returning hotels, countries and cities
export const MultiSearch = async (searchTerm: string): Promise<SearchResults> => {
  const response = await fetch(`${API_URL}/multi-search?searchTerm=${searchTerm}`);
  const status = response.status;
  if (!response.ok) {
    const errorMsg = `Error ${status}, Failed to retrieve results`;
    console.error(errorMsg);
    return Promise.reject({ status, message: errorMsg });
  }

  const results: SearchResults = await response.json();

  return results;
};
