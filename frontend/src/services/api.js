import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const uploadModel = (formData) =>
  API.post("/models/upload", formData);

export const runFederation = (modelId) =>
  API.post(`/federation/run/${modelId}`);

export const downloadReport = (modelId) =>
  API.post(`/federation/report/${modelId}`, {}, {
    responseType: "blob",
  });

export default API;
