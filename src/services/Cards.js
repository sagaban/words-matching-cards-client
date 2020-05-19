import apiClient from "./apiClient";

export default {
  getCards() {
    return apiClient.get("/cards");
  },
  getCard(id) {
    return apiClient.get("/cards/" + id);
  },
  postCard(card) {
    return apiClient.post("/cards", card);
  },
  putCard(card) {
    return apiClient.put("/cards/" + card.id, card);
  },
  deleteCard(cardId) {
    return apiClient.delete(`/cards/${cardId}`);
  }
};
