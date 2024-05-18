import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "../Error";
import axios from "axios";
export default function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    level: 0,
  });
  const [error, setError] = useState({});
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  };

  const handleUserInputFile = (e) => {
    const file = e.target.files;

    //send file to api server
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(file[0]);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    let arr = ["png", "jpg", "jpeg", "PNG", "JPG"];
    var tenFile = file?.name;
    var duoiFile = tenFile?.split(".")?.pop() || "";
    if (input.name === "") {
      errorSubmit.name = "Tên này chưa được nhập";
      flag = false;
    }
    if (input.email === "") {
      errorSubmit.email = "Chưa nhập email này";
      flag = false;
    } else if (!isEmail(input.email)) {
      errorSubmit.email = "Email này không đúng định dạng";
      flag = false;
    }

    if (input.password === "") {
      errorSubmit.password = "Chưa nhập Mật khẩu này ";
      flag = false;
    }

    if (input.phone === "") {
      errorSubmit.phone = "Chưa nhập Số điện thoại ";
      flag = false;
    }

    if (input.address === "") {
      errorSubmit.address = "Chưa nhập địa chỉ này ";
      flag = false;
    }

    if (!file) {
      errorSubmit.file = "Chưa nhập file này";
      flag = false;
    } else {
      if (file.size > 1024 * 1024) {
        errorSubmit.file = "Dung lượng ảnh quá lớn";
        flag = false;
      }
      if (!arr.includes(duoiFile)) {
        errorSubmit.file = "Định dạng ảnh không được hỗ trợ";
        flag = false;
      }
    }

    setError(errorSubmit);
    if (flag) {
      const { name,email,password ,  phone ,address ,level } =input
      const data = {
        name,
        email,
        password,
        phone,
        address,
        avatar,
        level,
      }
      console.log(data)
      axios.post("http://127.0.0.1:8000/api/register",data)
        .then(res => {
          console.log(res)
          toast.success("đăng ký thành công")
        })
        .catch(error => console.log(error))
    }
  };
  // console.log(input)
  console.log(avatar)
  console.log(file)
  return (
    <>
      <div className="col-sm-4">
        <div className="signup-form">
          {/*sign up form*/}
          <h2>New User Signup!</h2>
          <Error error={error} />
          <form encType="multipart/form-data" onSubmit={handleForm}>
            <input
              onChange={handleInput}
              type="text"
              name="name"
              placeholder="Name"
            />
            <input
              onChange={handleInput}
              type="text"
              name="email"
              placeholder="Email Address"
            />
            <input
              onChange={handleInput}
              type="password"
              name="password"
              placeholder="Password"
            />
            <input
              onChange={handleInput}
              type="tel"
              name="phone"
              placeholder="Phone"
            />
            <input
              onChange={handleInput}
              type="text"
              name="address"
              placeholder="Address"
            />
            <input
              onChange={handleUserInputFile}
              type="file"
              name="avatar"
              className="form-control "
            />
            <input
              readOnly
              type="number"
              name="level"
              value={input.level}
              placeholder="level"
            />
            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
          <ToastContainer />
        </div>
        {/*/sign up form*/}
      </div>
    </>
  );
}
