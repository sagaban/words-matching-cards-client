import apiClient from "./apiClient";

export default {
  getTags() {
    return apiClient.get("/tags");
  },
  postTag(tag) {
    return apiClient.post("/tags", tag);
  },
  putTag(tag) {
    return apiClient.put(`/tags/${tag.id}`, tag);
  },
  deleteTag(tagId) {
    return apiClient.delete(`/tags/${tagId}`);
  }
};
