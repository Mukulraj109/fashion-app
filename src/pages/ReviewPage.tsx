import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { productAPI, reviewAPI } from "../services/api";

import coinImage from "./coin.png";

const ReviewPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [recentEarners, setRecentEarners] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const userId = "12345"; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productAPI.getProductById(productId!);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentEarners = async () => {
      try {
        const res = await reviewAPI.getRecentEarners(productId!);
        setRecentEarners(res.data.data);
      } catch (error) {
        console.error("Failed to load recent earners", error);
      }
    };

    if (productId) {
      fetchProduct();
      fetchRecentEarners();
    }
  }, [productId]);

  const handleSubmit = async () => {
    if (!review.trim()) {
      alert("Please enter a review before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      console.log({ productId,
        userId,
        rating: 5, 
        comment: review,
      });
      await reviewAPI.submitReview({
        productId,
        userId,
        rating: 5, 
        comment: review,
      });

      setSubmitted(true);
      setShowPopup(true);
    } catch (error) {
      console.error("Review submission failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-2 pb-12 overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Top Nav */}
        <div
          className="flex items-center mb-1 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
          <h1 className="ml-2 text-lg font-medium">Review</h1>
        </div>

       
        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : product ? (
          <>
            
            <div className="flex justify-center mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-cover rounded-xl"
              />
            </div>

         
            <p className="text-center text-sm mb-2">
              Earn{" "}
              <span className="font-semibold text-purple-600">
                10% cashback
              </span>{" "}
              by leaving a review!
            </p>

           
            {!submitted ? (
              <div className="bg-white border border-purple-200 rounded-xl p-4 mb-3 shadow-sm">
                <label className="block text-sm text-gray-700 mb-2">
                  Review
                </label>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full">
                  <Pencil className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write a review"
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`w-full mt-4 ${
                    submitting ? "bg-purple-400" : "bg-purple-600"
                  } text-white font-medium py-2 rounded-full text-sm`}
                >
                  {submitting ? "Submitting..." : "Submit & get 10% cashback"}
                </button>
              </div>
            ) : (
              <div className="text-center mt-6">
                <h3 className="text-xl font-semibold text-green-600">
                  🎉 10% Cashback Earned!
                </h3>
              </div>
            )}

          
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-gray-700">
                Recent cash back
              </h4>
              <div className="space-y-2">
                {recentEarners.map((user: any) => (
                  <div
                    key={user.id}
                    className="flex items-center bg-gray-100 rounded-xl p-2"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full mr-3 object-cover"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {user.name} ₹{user.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

 
      {showPopup && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-30 z-50">
          <div className="relative bg-white w-full max-w-md rounded-t-3xl shadow-lg p-4 animate-slideUp">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
            <div className="flex justify-center items-center">
              <img
                src={coinImage}
                alt="Cashback Earned"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
