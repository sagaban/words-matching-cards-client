import apiClient from "./apiClient";

export default {
  getTags() {
    return apiClient.get("/tags");
  },
  postTag(tag) {
    return apiClient.post("/tags", tag);
  }
};
