// Public, fictional demonstration mode. No real authentication or server tokens.
export const isDemo = process.env.YDL_DEMO === "true"
export const DEMO_SESSION_KEY = "ydl-demo-session-v1"
export const DEMO_DATA_KEY = "ydl-demo-data-v1"

export function getDemoUserId () {
  if (!isDemo) return null
  const value = window.localStorage.getItem(DEMO_SESSION_KEY)
  const id = Number(value)
  return id === 1 || id === 2 ? id : null
}

export function setDemoUserId (id) {
  if (!isDemo) return
  if (Number(id) !== 1 && Number(id) !== 2) return
  window.localStorage.setItem(DEMO_SESSION_KEY, String(id))
}

export function clearDemoUserId () {
  if (isDemo) window.localStorage.removeItem(DEMO_SESSION_KEY)
}

export function resetDemoData () {
  if (isDemo) window.localStorage.removeItem(DEMO_DATA_KEY)
}
