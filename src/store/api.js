import axios from "axios"

const apiBaseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.ydlearning.com/"
    : "/api/"

export default axios.create({
  baseURL: apiBaseURL
})

