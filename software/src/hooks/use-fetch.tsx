"use client";

import { useState } from "react";

type FetchOptions = RequestInit;

export type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (fetchOptions?: FetchOptions) => Promise<void>;
};

/**
 * useFetch hook uses the fetch API to request and send data to a REST server.
 *
 * @param url The URL to fetch at.
 * @param options The request options. Leave undefined for GET requests. Can also be left undefined if using the fetchData function.
 * @returns
 * - data: the data returned by the server.
 * - loading: a flag, indicating if the request is pending.
 * - error: an error if one occurs.
 * - fetchData: A function allowing Request options to be specified. Required for all requests other than GET.
 */
export const useFetch = <T = unknown,>(
  url: string,
  options?: FetchOptions
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle fetch.
  const fetchData = async (fetchOptions?: FetchOptions) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, fetchOptions || options);

      if (!response.ok) {
        throw new Error(
          `An error occurred. Status: ${response.status} Message: ${response.statusText}`
        );
      }

      const data: T = await response.json();

      setData(data);
    } catch (error: any) {
      setError(error.status || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
