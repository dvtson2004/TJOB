import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import NavbarDark from "../components/navbarDark";

function JobSeekersTable() {
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [status, setStatus] = useState(""); // Added state for CV status
  const [jobSeekersData, setJobSeekersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [resumeContent, setResumeContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/enterprises/get-cv-applied",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setJobSeekersData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Update status filter
  };

  const handleResumeClick = (resumeUrl) => {
    setResumeContent(resumeUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setResumeContent("");
  };

  const handleAcceptCV = async (uid) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:8080/enterprises/accept-cv/${uid}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert(response.data);
      // Optionally refresh the jobSeekersData or update UI to reflect changes
    } catch (error) {
      console.error("Error accepting CV", error);
    }
  };

  const handleRejectCV = async (uid) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:8080/enterprises/reject-cv/${uid}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert(response.data);
      // Optionally refresh the jobSeekersData or update UI to reflect changes
    } catch (error) {
      console.error("Error rejecting CV", error);
    }
  };

  const handleRevertCV = async (uid) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:8080/enterprises/revert-cv/${uid}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert(response.data);
      // Optionally refresh the jobSeekersData or update UI to reflect changes
    } catch (error) {
      console.error("Error reverting CV", error);
    }
  };

  // Filter job seekers based on category, job type, and status
  const filteredJobSeekers = jobSeekersData.filter((jobSeeker) => {
    const statusCondition =
      status === "" && jobSeeker.isApllied === 0
        ? true
        : (status === "Accepted" && jobSeeker.isApllied === 1) ||
        (status === "Rejected" && jobSeeker.isApllied === -1) ||
        status === "All";

    return (
      (category ? jobSeeker.job === category : true) &&
      (jobType ? jobSeeker.jobType === jobType : true) &&
      statusCondition
    );
  });

  return (
    <>
      <NavbarDark />
      <section className="section container mt-4">
        <h1>Job Seekers</h1>
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="category" className="form-label">
              Filter by Category
            </label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="jobType" className="form-label">
              Filter by Job Type
            </label>
            <select
              id="jobType"
              className="form-select"
              value={jobType}
              onChange={handleJobTypeChange}
            >
              <option value="">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              {/* Add more job types as needed */}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="status" className="form-label">
              Filter by Status
            </label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job</th>
              <th>Job Type</th>
              <th>Description</th>
              <th>Status</th> {/* Added Status Column */}
              <th>Resume</th>
              <th>Actions</th> {/* Add a new column for actions */}
            </tr>
          </thead>
          <tbody>
            {filteredJobSeekers.map((jobSeeker) => {
              const statusText =
                jobSeeker.isApllied === 1
                  ? "Accepted"
                  : jobSeeker.isApllied === -1
                    ? "Rejected"
                    : "Pending";
              const statusColor =
                jobSeeker.isApllied === 1
                  ? "green"
                  : jobSeeker.isApllied === -1
                    ? "red"
                    : "black";

              return (
                <tr key={jobSeeker.cvId}>
                  <td>{jobSeeker.full_name}</td>
                  <td>{jobSeeker.email}</td>
                  <td>{jobSeeker.phone || "N/A"}</td>
                  <td>{jobSeeker.job}</td>
                  <td>{jobSeeker.jobType}</td>
                  <td
                    dangerouslySetInnerHTML={{ __html: jobSeeker.description }}
                  ></td>
                  <td style={{ color: statusColor }}>{statusText}</td>
                  <td>
                    {jobSeeker.resume_url ? (
                      jobSeeker.resume_url.startsWith("data:image/") ? (
                        <button
                          onClick={() =>
                            handleResumeClick(jobSeeker.resume_url)
                          }
                          style={{ borderStyle: "none" }}
                          className="tw-text-blue-600"
                        >
                          View Resume
                        </button>
                      ) : (
                        <p>Invalid URL</p>
                      )
                    ) : (
                      <p className="text text-muted">No Resume</p>
                    )}
                  </td>
                  <td>
                    {jobSeeker.isApllied === 0 ? (
                      <>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleAcceptCV(jobSeeker.user.uid)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRejectCV(jobSeeker.user.uid)}
                        >
                          Reject
                        </button>
                      </>
                    ) : jobSeeker.isApllied === 1 ? (
                      <>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleRevertCV(jobSeeker.user.uid)}
                        >
                          Pending
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRejectCV(jobSeeker.user.uid)}
                        >
                          Reject
                        </button>
                      </>
                    ) : jobSeeker.isApllied === -1 ? (
                      <>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleRevertCV(jobSeeker.user.uid)}
                        >
                          Pending
                        </button>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleAcceptCV(jobSeeker.user.uid)}
                        >
                          Accept
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Resume</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {resumeContent.startsWith("data:image/") ? (
              <img src={resumeContent} alt="Resume" style={{ width: "100%" }} />
            ) : (
              <iframe
                src={resumeContent}
                title="Resume"
                style={{ width: "100%", height: "500px" }}
              ></iframe>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
}

export default JobSeekersTable;
