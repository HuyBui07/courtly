import axios from "axios";

const client = axios.create({
  timeout: 10000,
  baseURL: "", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
