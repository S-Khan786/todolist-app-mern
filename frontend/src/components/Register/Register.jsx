import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("image", image);

    try {
      const res = await api.post("auth/register", formdata);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Upload Profile Image</label>
        <input
          type="file"
          name="image"
          accept=".jpeg,.png"
          required
          onChange={handleImageChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
