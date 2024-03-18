import React, { useEffect, useState } from "react";
import "../../css/edit.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
const Edit = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");
  const ls = JSON.parse(localStorage.getItem("auth"));

  const getUser = async () => {
    try {
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/myprofile",
        {
          headers: {
            Authorization: ls.token,
          },
        }
      );
      setName(res.data.user.name);
      setPhone(res.data.user.phone);
    } catch (e) {
      console.log("Error while fetching all user data");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let newForm = new FormData();
      newForm.append("name", name);
      newForm.append("phone", phone);
      photo && newForm.append("photo", photo);
      about && newForm.append("about", about);
      for (var key of newForm.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/updateprofile/${ls.user._id}`,
        newForm
      );
      if (res && res.data.success) {
        setAuth({ ...auth, user: res?.data.user });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.user;
        console.log(res.data.user);
        console.log(ls);
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <div className="edit_con">
        <h2>Update Profile</h2>

        <form onSubmit={handleUpdate}>
          <div>
            <label
              className="button3"
              style={{ width: "190px", padding: "15px" }}
            >
              {photo ? (
                <span class="button__text">{photo.name}</span>
              ) : (
                <span class="button__text">Upload Photo</span>
              )}
              <span class="button__icon">
                <svg
                  class="svg"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />

              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div>
            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={
                    !ls.user.photo
                      ? ls.user.avatar
                      : `http://localhost:8000/api/v1/user/photo/${ls.user._id}`
                  }
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>
          <div className="updateProfileName">
            {/* <FaceIcon /> */}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="updateProfileEmail">
            {/* <MailOutlineIcon /> */}
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={about}
              placeholder="write a description"
              className="form-control"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary"
              style={{ width: "160px" }}
              type="submit"
            >
              UPDATE PRODUCT
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Edit;
