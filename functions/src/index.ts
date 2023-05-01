import * as functions from "firebase-functions";
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

export const queryToObject = (queryString: string) => {
  const pairsString =
    queryString[0] === "?" ? queryString.slice(1) : queryString;
  const pairs = pairsString
    .split("&")
    .map((str) => str.split("=").map(decodeURIComponent));
  return pairs.reduce(
    (acc, [key, value]) => (key ? {...acc, [key]: value} : acc),
    {}
  );
};

export const getURLWithQueryParams = (
  base: string,
  params: Record<string, string>
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${base}?${query}`;
};

export const helloWorld = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
  });

// const LINKEDIN_STATE = "random_string";
// const LINKEDIN_SCOPE = "openid profile email";
// const LINKEDIN_REDIRECT = "http://localhost:3000";
// const LINKEDIN_CLIENT_ID = "";
// const LINKEDIN_CLIENT_SECRET = "";

// const authClient = new AuthClient({
//   clientId: LINKEDIN_CLIENT_ID,
//   clientSecret: LINKEDIN_CLIENT_SECRET,
//   redirectUrl: LINKEDIN_REDIRECT,
// });
// const restliClient = new RestliClient();
// restliClient.setDebugParams({enabled: true});

// export const getAccessTokenForLinkedin = functions
//   .region("europe-west1")
//   .https.onCall(async (request, response) => {
//     if (!request?.code) return;
//     const res = await authClient
//       .exchangeAuthCodeForAccessToken(request.code)
//       .then((response) => {
//         const accessToken = response.access_token;
//         console.log(`Access token: ${accessToken}`);
//         return response;
//       })
//       .catch((err) => {
//         return err;
//       });

//     console.log("RESDATA", res);

//     return res;
//   });

// export const getLinkedinProfile = functions
//   .region("europe-west1")
//   .https.onCall(async (request, response) => {
//     const {access_token} = request;

//     return await restliClient
//       .get({
//         // resourcePath: "/userinfo",
//         resourcePath: "/me",
//         accessToken: access_token,
//       })
//       .then((response) => {
//         console.log("ME data", response.data);

//         return response.data;
//       })
//       .catch((err) => {
//         return err;
//       });
//   });
