import { GetServerSideProps } from "next";

interface APIData {
  message: string;
}

interface APIDataPageProps {
  data: APIData;
}

export const getServerSideProps: GetServerSideProps<APIDataPageProps> = async () => {
  try {
    const res = await fetch("https://test-full-stack-app-backend.onrender.com/api/data");
    if (!res.ok) throw new Error("Failed to fetch API data");

    const data: APIData = await res.json();
    return { props: { data } };
  } catch {
    return { props: { data: { message: "Error fetching data" } } };
  }
};

export default function APIDataPage({ data }: APIDataPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">API Data Page</h1>
      <div className="border p-4 rounded shadow-lg bg-gray-100 dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Message from API:</h2>
        <p className="text-md">{data.message || "No message available"}</p>
      </div>
    </div>
  );
}
