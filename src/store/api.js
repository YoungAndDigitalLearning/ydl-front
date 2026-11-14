import axios from "axios"
import { isDemo } from "@/demo/session"
import { createDemoAdapter } from "@/demo/mockApi"

const apiBaseURL = isDemo
  ? "/"
  : process.env.NODE_ENV === "production"
    ? "https://api.ydlearning.com/"
    : "/api/"

const api = axios.create({ baseURL: apiBaseURL })

if (isDemo) {
  // Reject rather than forward unknown requests; never contact the old API.
  const adapter = createDemoAdapter()
  api.defaults.adapter = adapter
  axios.defaults.adapter = adapter
}

export default api
