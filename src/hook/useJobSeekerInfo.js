import { useQuery } from "@tanstack/react-query";
import api from "../api/http";

const useJobSeekerInfo = (jid) => {
  const token = sessionStorage.getItem("token");

  const endpoint = jid
    ? `/jobSeeker/candidate-profile/${jid}`
    : "/jobSeeker/candidate-profile";

  return useQuery({
    queryKey: ["JOBSEEKER_PROFILE", jid],
    queryFn: () =>
      api.get(endpoint, {
        headers: {
          Authorization: token, // Truyền token trực tiếp
        },
      }),
    retry: 1,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 60000),
    onError: (error) => {
      console.error("Lỗi khi lấy thông tin người tìm việc:", error);
      if (error.response && error.response.status === 400) {
        window.location.replace("login");
      }
    },
  });
};

export default useJobSeekerInfo;
