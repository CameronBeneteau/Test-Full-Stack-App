import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface APIData {
  message: string;
}

interface APIDataPageProps {
  serverData: APIData;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch data on the server (runs only on the backend)
export const getServerSideProps: GetServerSideProps<APIDataPageProps> = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/data`);
    if (!res.ok) throw new Error("Failed to fetch API data");

    const serverData: APIData = await res.json();
    return { props: { serverData } };
  } catch {
    return { props: { serverData: { message: "Error fetching data (Server)" } } };
  }
};

export default function APIDataPage({ serverData }: APIDataPageProps) {
  const [clientData, setClientData] = useState<APIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on the client (runs in the browser)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/data`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch API data (Client)");
        return res.json();
      })
      .then((data) => {
        setClientData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">API Data Page</h1>

      {/* Server-Side Data */}
      <div className="border p-4 rounded shadow-lg bg-gray-100 dark:bg-gray-800 mb-4">
        <h2 className="text-lg font-semibold">Server-Side Data (getServerSideProps):</h2>
        <p className="text-md">{serverData.message || "No message available"}</p>
      </div>

      {/* Client-Side Data */}
      <div className="border p-4 rounded shadow-lg bg-blue-100 dark:bg-blue-800">
        <h2 className="text-lg font-semibold">Client-Side Data (useEffect Fetch):</h2>
        {loading ? (
          <p className="text-md">Loading...</p>
        ) : error ? (
          <p className="text-md text-red-500">{error}</p>
        ) : (
          <p className="text-md">{clientData?.message || "No message available"}</p>
        )}
      </div>
    </div>
  );
}
