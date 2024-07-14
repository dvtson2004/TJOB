import React, { useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export const ContactUs = () => {
  const { jid } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
    file: null,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        if (key === "file") {
          for (let i = 0; i < formData.file.length; i++) {
            data.append(key, formData.file[i]);
          }
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/jobSeeker/send/${jid}`,
        data
      );
      if (response.status === 200) {
        setIsSuccess(true);
        setErrorMessage("");
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage("Failed to send email. Please try again.");
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          Your message has been sent successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Your Name <span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Your Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formData.to}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <div className="mb-3">
                <label className="form-label fw-semibold">Subject</label>
                <input
                  name="subject"
                  id="subject"
                  className="form-control"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Comments <span className="text-danger">*</span>
                </label>
                <textarea
                  name="body"
                  id="body"
                  rows={4}
                  className="form-control"
                  placeholder="Message"
                  value={formData.body}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </>
  );
};
