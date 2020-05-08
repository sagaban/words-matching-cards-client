import apiClient from "./apiClient";

export default {
  getCards() {
    return apiClient.get("/cards");
  },
  postCard(card) {
    return apiClient.post("/cards", card);
  }
};
