import React, { useEffect, useState } from 'react';
import AxiosApi from '../AxiosApi';

const FeedbackView = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let owners = localStorage.getItem('owner');
  const owner = owners ? JSON.parse(owners) : null;

  const gettingFeedbacks = async () => {
    if (!owner) {
      setError('Owner data is missing or invalid.');
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosApi.get(`/api/owner/feedbacks/${owner._id}`);
      console.log(response.data.Feedbacks, "getting feedbacks");
      setData(response.data.Feedbacks);
    } catch (error) {
      console.log(error);
      setError('Failed to fetch feedbacks.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    gettingFeedbacks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const ownerid = owner?._id;

  const filterOwner = data.filter((dat) => {
    return dat.vehicals?.owner === ownerid;
  });

  console.log(filterOwner);

  return (
    <div className="grid grid-cols-3 gap-5">
      {filterOwner && filterOwner.length > 0 ? (
        filterOwner.map((item) => (
          <div key={item._id} className="max-w-sm rounded overflow-hidden shadow-lg">
            {/* Display Vehicle Image */}
            {item.vehicals && item.vehicals.Image ? (
              <img className="w-full" src={`http://localhost:8080/${item.vehicals.Image}`} alt="Vehicle" />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">No Image</div>
            )}
            
            <div className="px-6 py-4">
              {/* Display Rating */}
              <div className="font-bold text-xl mb-2">Rating: {item.rating}</div>
              
              {/* Display Feedback */}
              <p className="text-gray-700 text-base">
                Feedback: {item.feed}
              </p>
              
              {/* Display Username */}
              <p className="text-gray-700 text-base">
                Username: {item.books ? item.books.Username : 'Unknown'}
              </p>
              
              {/* Display Time */}
              <p className="text-gray-700 text-base">
                Time: {item.books && item.books.date ? new Date(item.books.date).toLocaleString() : 'No date available'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div><h1>No feedbacks available</h1></div>
      )}
    </div>
  );
};

export default FeedbackView;
