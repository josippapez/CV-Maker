export const queryToObject = (queryString: string) => {
  const pairsString =
    queryString[0] === '?' ? queryString.slice(1) : queryString;
  const pairs = pairsString
    .split('&')
    .map(str => str.split('=').map(decodeURIComponent));
  return pairs.reduce(
    (acc, [key, value]) => (key ? { ...acc, [key]: value } : acc),
    {}
  );
};

export const getURLWithQueryParams = (
  base: string,
  params: Record<string, string>
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${base}?${query}`;
};

export const LINKEDIN_STATE = 'linkedin_state';
export const LINKEDIN_SCOPE = 'openid profile email'; //v2
// export const LINKEDIN_SCOPE = 'r_liteprofile r_emailaddress';
export const LINKEDIN_REDIRECT = `${
  typeof window === 'object' && window.location.origin
}`;
export const LINKEDIN_CLIENT_ID = '';
export const LINKEDIN_CLIENT_SECRET = '';
export const LINKEDIN_URL = getURLWithQueryParams(
  'https://www.linkedin.com/oauth/v2/authorization',
  {
    response_type: 'code',
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri: LINKEDIN_REDIRECT,
    state: LINKEDIN_STATE,
    scope: LINKEDIN_SCOPE,
  }
);
