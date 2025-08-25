import React from "react";
import { useParams, useLocation } from "react-router-dom";
import TipDetailCard from "./components/TipDetailCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function TipDetail() {
  const query = useQuery();
  const [tip, setTip] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    try {
      const encodedData = query.get('data');
      if (encodedData) {
        const decodedTip = JSON.parse(decodeURIComponent(encodedData));
        setTip(decodedTip);
      } else {
        setError('No tip data found');
      }
    } catch (err) {
      console.error('Error parsing tip data:', err);
      setError('Invalid tip data');
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full mx-auto p-0">
        {error ? (
          <div className="text-center p-4">
            <p className="text-red-500">{error}</p>
          </div>
        ) : !tip ? (
          <div className="text-center p-4">
            <p>Loading...</p>
          </div>
        ) : (
          <TipDetailCard tip={tip} />
        )}
      </div>
    </div>
  );
}
