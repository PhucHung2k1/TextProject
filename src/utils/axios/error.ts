import { AxiosError } from "axios";

export type ErrorResponse = {
  headers: any;
  message: string;
  status: number;
};

export function catchAxiosError(err: AxiosError) {
 
  const error = {
    headers: null,
    message:
      "Something happened in setting up the request that triggered an Error",
    status: null,
  } as unknown as ErrorResponse;

  if (err && err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
<<<<<<< Updated upstream
    error.headers = err.response.headers;
    error.message = (err.response.data as { message: string }).message;
    error.status = err.response.status;
    console.error(error);
=======
    error.headers = err.response.headers
    error.message = (err.response.data as { message: string }).message
    error.status = err.response.status
>>>>>>> Stashed changes
  } else if (err && err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
<<<<<<< Updated upstream
    error.headers = err.request.headers;
    error.message = "The request was made, but no response was received";
    console.error(err.request);
=======
    error.headers = err.request.headers
    error.message = 'The request was made, but no response was received'
>>>>>>> Stashed changes
  }

  return { error };
}
