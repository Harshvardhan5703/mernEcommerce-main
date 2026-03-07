import React, { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { ErrorMessage, SuccessMessage } from "../../components/Alert";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../services/auth";
import { Loading } from "../../components/Loading";
import { FavoriteCard } from "../../components/FavoriteCard";
import { useCheckoutContext } from "../../contexts/checkoutContext";

const Profile = () => {
  const { user, setUser, setLoggedIn, token, userWishlist } = useUserContext();
  const { address, setAddress } = useCheckoutContext();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const isSuccess = logout();
    if (isSuccess) {
      setError("");
      setLoggedIn(false);
      setSuccess("Successfully logged out");
      setTimeout(() => {
        navigate("/login");
        setUser(undefined);
      }, 2000);
      return;
    }
    setError("Unable to log out. Please try again.");
  };

  const shippingDetails = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <h2 className="text-2xl font-Poppins text-gray-600">Please sign in to view your profile</h2>
        <Link to="/login" className="bg-PrimaryBlue text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
          Login First
        </Link>
      </div>
    );
  }

  if (!user) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-Poppins">
      {/* Notifications */}
      <div className="fixed top-5 right-5 z-50">
        {error && <ErrorMessage error={error} />}
        {success && <SuccessMessage success={success} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PROFILE CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-lightestBlue rounded-full flex items-center justify-center text-PrimaryBlue text-3xl font-bold mb-4">
                {user?.fullname?.charAt(0) || "U"}
              </div>
              <h1 className="text-2xl font-Volkhov font-bold text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Shipping Details</h3>
              
              <div className="space-y-3">
                {[
                  { label: "Full Name", name: "fullname", value: user?.fullname, type: "text" },
                  { label: "Street", name: "street", value: address?.street, type: "text" },
                  { label: "Country", name: "country", value: address?.country, type: "text" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600 ml-1">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      disabled={!isEditing}
                      value={field.value || ""}
                      onChange={shippingDetails}
                      className={`px-3 py-2 rounded-lg border transition-all outline-none text-sm ${
                        isEditing ? "border-PrimaryBlue bg-white" : "border-transparent bg-gray-50 text-gray-500"
                      }`}
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600 ml-1">State</label>
                    <input
                      type="text"
                      name="state"
                      disabled={!isEditing}
                      value={address?.state || ""}
                      onChange={shippingDetails}
                      className={`px-3 py-2 rounded-lg border transition-all outline-none text-sm ${
                        isEditing ? "border-PrimaryBlue bg-white" : "border-transparent bg-gray-50 text-gray-500"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600 ml-1">City</label>
                    <input
                      type="text"
                      name="city"
                      disabled={!isEditing}
                      value={address?.city || ""}
                      onChange={shippingDetails}
                      className={`px-3 py-2 rounded-lg border transition-all outline-none text-sm ${
                        isEditing ? "border-PrimaryBlue bg-white" : "border-transparent bg-gray-50 text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`w-full py-2.5 rounded-xl font-semibold transition-all ${
                    isEditing 
                    ? "bg-green text-white hover:bg-green-700" 
                    : "bg-PrimaryBlue text-white hover:shadow-lg"
                  }`}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>

                <button
                  onClick={handleSubmit}
                  className="w-full py-2.5 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WISHLIST */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-Volkhov font-bold text-gray-800">Your Wishlist</h2>
            <span className="bg-lightestBlue text-PrimaryBlue px-3 py-1 rounded-full text-xs font-bold">
              {userWishlist?.length || 0} Items
            </span>
          </div>

          {userWishlist?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[75vh] pr-2 custom-scrollbar">
              {userWishlist.map((item) => (
                <FavoriteCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 h-[50vh] flex flex-col items-center justify-center text-center p-10">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h3>
              <p className="text-gray-500 mt-2 mb-6">Start adding items you love to find them later!</p>
              <Link to="/shop" className="text-PrimaryBlue font-bold hover:underline">
                Explore Shop
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export { Profile };