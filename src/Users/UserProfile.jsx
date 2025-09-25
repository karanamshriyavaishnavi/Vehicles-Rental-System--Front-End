import React from "react";

const UserProfile = () => {
  const userJson = localStorage.getItem("customer");
  const user = JSON.parse(userJson);
  return (
    <div>
      <h1>User Profile</h1>

      <div className="bg-white shadow-lg  rounded-md h-1/2 border w-1/3 p-5">
        <img src={`http://localhost:8080/upload/Customerimages/${user.image}`} style={{height:70, margin:"20px auto" }} alt="" />
        <h1>FullName : {user.fullName}</h1> <br />
        <h1>Email :{user.email}</h1> <br />
        <h1>MobileNumber :{user.mobileNumber}</h1> <br />
        <h1>Address :{user.address}</h1> 

      </div>
    </div>
  );
};

export default UserProfile;
