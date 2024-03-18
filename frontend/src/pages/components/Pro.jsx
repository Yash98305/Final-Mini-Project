import React, { useEffect, useState } from "react";
import "../../css/edit.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
const Pro = ({setEdit}) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
      setEmail(res.data.user.email);
      setAbout(res.data.user.about);
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
        window.location.reload();
        setEdit(false) 
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
      <div className="space"></div>
      <div className="pro_con">
        {/* <div>
          <img
            src="https://www.imgacademy.com/sites/default/files/boarding-homepage-row-2022.jpg"
            alt=""
          />
        </div> */}
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
        {/* <div><h1>Your Profile</h1></div> */}
        <div class="container">
          <div class="text">Update Profile</div>
          {/* <div className="btn1_con">
          <button class="Btn1" onClick={EditHandle}>Edit 
      <svg class="svg" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
    </button></div> */}
          <form onSubmit={handleUpdate}>
          <div>
            <label
              className="button3"
              style={{ width: "190px", padding: "15px" }}
            >
              {photo ? (
                <span class="button__text">Upload Photo</span>
              ) : (
                <span class="button__text">Upload Photo</span>
              )}
              {/* <span class="button__icon"> */}
                {/* <svg
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
                </svg> */}
              {/* </span> */}
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
            <div class="form-row">
              <div class="input-data">
                <input type="text"  placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus />
                <div class="underline"></div>
                <label for="">Your Name</label>
              </div>
             
            </div>
            <div class="form-row">
              <div class="input-data">
                <input type="text" placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
                <div class="underline"></div>
                <label for="">Email Address</label>
              </div>
              <div class="input-data">
                <input type="text" placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
             />
                <div class="underline"></div>
                <label for="">Contact No.</label>
              </div>
            </div>
            {/* <div class="form-row">
              <div class="input-data textarea">
                <textarea rows="8" cols="80" required></textarea>
                <br />
                <div class="underline"></div>
                <label for="">Write your message</label>
                <br />
                <div class="form-row submit-btn">
                  <div class="input-data">
                    <div class="inner"></div>
                    <input type="submit" value="submit" />
                  </div>
                </div>
              </div>
            </div> */}
            <div class="form-row">
              <div class="input-data">
                <input type="text"  value={about}
              placeholder="write a description"
              className="form-control"
              onChange={(e) => setAbout(e.target.value)}
             />
                <div class="underline"></div>
                <label for="">About</label>
              </div>
            </div>
            <button type="submit" className="button2">
  <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
      </svg>
    </div>
  </div>
  <span>Update Profile</span>
</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pro;
