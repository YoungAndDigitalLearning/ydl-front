// A fully offline Axios adapter for the public portfolio build.
// Deliberately no fetch/XHR fallback: unknown requests receive a local 404.
import { seedData } from "./data"
import { DEMO_DATA_KEY, getDemoUserId } from "./session"

let ephemeralData = null

function clone (value) {
  return JSON.parse(JSON.stringify(value))
}

function loadData () {
  try {
    const stored = window.localStorage.getItem(DEMO_DATA_KEY)
    return stored ? JSON.parse(stored) : clone(seedData)
  } catch (error) {
    return ephemeralData ? clone(ephemeralData) : clone(seedData)
  }
}

function saveData (value) {
  ephemeralData = clone(value)
  window.localStorage.setItem(DEMO_DATA_KEY, JSON.stringify(value))
}

function result (config, status, data) {
  return { config: config, status: status, statusText: status < 400 ? "OK" : "Error", headers: {}, data: clone(data) }
}

function failure (config, status, message) {
  const response = result(config, status, { detail: message })
  const error = new Error("Request failed with status code " + status + ": " + message)
  error.isAxiosError = true
  error.config = config
  error.response = response
  return Promise.reject(error)
}

function parseRequest (config) {
  const raw = String(config.url || "").replace(/^https?:\/\/[^/]+/i, "")
  const clean = raw.replace(/^\//, "").replace(/^api\//, "")
  const q = clean.indexOf("?")
  const pathname = (q >= 0 ? clean.slice(0, q) : clean).replace(/^\/+|\/+$/g, "")
  const params = new URLSearchParams(q >= 0 ? clean.slice(q + 1) : "")
  const method = (config.method || "get").toLowerCase()
  return { pathname: pathname, parts: pathname ? pathname.split("/") : [], params: params, method: method }
}

function parseBody (config) {
  const value = config.data
  if (!value) return {}
  if (typeof FormData !== "undefined" && value instanceof FormData) {
    const object = {}
    value.forEach((entry, key) => { object[key] = entry })
    return object
  }
  if (typeof value === "string") {
    try { return JSON.parse(value) } catch (error) { return {} }
  }
  return value
}

function currentUser (data) {
  return data.users.find(user => user.id === getDemoUserId())
}

function nextId (records) {
  return records.reduce((max, record) => Math.max(max, Number(record.id) || 0), 0) + 1
}

function isTeacher (user) {
  return !!user && !!user.is_teacher
}

function canAccessCourse (course, user) {
  return course && user && (course.teacher === user.id || user.courses.indexOf(course.id) !== -1)
}

function safeText (value) {
  // Teacher edits are used in a v-html container in the legacy frontend.
  // Persist as plain text, not executable HTML, to avoid self-XSS in demo storage.
  const el = document.createElement("div")
  el.innerHTML = String(value || "")
  return el.textContent || ""
}

function getCourse (data, id) {
  return data.courses.find(course => course.id === Number(id))
}

function readFileAsDataUrl (file) {
  if (!file || typeof File === "undefined" || !(file instanceof File)) return Promise.resolve(null)
  if (file.size > 100000) return Promise.reject(new Error("Demo files must be at most 100 KB"))
  if (!/^(text\/plain|application\/pdf|image\/(png|jpeg|gif))$/.test(file.type)) {
    return Promise.reject(new Error("Demo accepts TXT, PDF, PNG or JPEG files only"))
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error("Could not read the local demo file"))
    reader.readAsDataURL(file)
  })
}

// Axios v0.18 supports instance.defaults.adapter. Return promises of Axios responses.
export function createDemoAdapter () {
  return async function demoAdapter (config) {
    const request = parseRequest(config)
    const parts = request.parts
    const method = request.method
    const data = loadData()
    const body = parseBody(config)
    const user = currentUser(data)
    const ok = (payload, status = 200) => {
      return Promise.resolve(result(config, status, payload))
    }
    const bad = (status, message) => failure(config, status, message)

    // Public announcements may be read without a demo session.
    if (parts[0] === "announcements" && method === "get") {
      const records = data.announcements.slice()
      const limit = Number(request.params.get("limit"))
      const list = limit > 0 ? records.slice(0, limit) : records
      if (parts.length === 1) return ok(list)
      const entry = list.find(item => item.id === Number(parts[1]))
      return entry ? ok(entry) : bad(404, "Announcement not found")
    }

    if (parts[0] === "token") {
      if (parts[1] === "verify" && method === "post") {
        return user ? ok({ token: "ydl-demo-session" }) : bad(400, "No active demo session")
      }
      return bad(400, "Choose Explore as Student or Explore as Teacher in the demo toolbar")
    }

    if (!user) return bad(401, "Start a demo session from the toolbar")

    if (parts[0] === "users") {
      if (method === "get") {
        if (parts.length === 1) return ok(data.users)
        const target = data.users.find(item => item.id === Number(parts[1]))
        return target ? ok(target) : bad(404, "User not found")
      }
      if ((method === "put" || method === "patch") && Number(parts[1]) === user.id) {
        const keys = ["first_name", "last_name", "email"]
        keys.forEach(key => {
          if (Object.prototype.hasOwnProperty.call(body, key)) user[key] = String(body[key]).slice(0, 120)
        })
        saveData(data)
        return ok(user)
      }
      return bad(403, "User updates are restricted to the active demo account")
    }

    if (parts[0] === "students" && (method === "put" || method === "patch")) {
      if (user.id !== Number(parts[1]) || user.is_teacher) return bad(403, "Only your own course enrollment can be updated")
      const ids = (Array.isArray(body.courses) ? body.courses : []).map(Number)
      if (ids.some(id => !getCourse(data, id))) return bad(400, "Unknown course ID")
      user.courses = Array.from(new Set(ids))
      saveData(data)
      return ok({ user: user.id, courses: user.courses })
    }

    if (parts[0] === "courses") {
      if (method === "get") {
        if (parts.length === 1) {
          if (request.params.get("type") === "free") return ok(data.courses.filter(course => course.price === 0))
          if (request.params.get("type") === "paid") return ok(data.courses.filter(course => course.price > 0))
          return ok(data.courses.filter(course => canAccessCourse(course, user)))
        }
        const entry = getCourse(data, parts[1])
        return canAccessCourse(entry, user) ? ok(entry) : bad(404, "Course not found in your account")
      }
      if (method === "post") {
        if (!isTeacher(user)) return bad(403, "Only teachers can create courses")
        if (!body.name || !String(body.name).trim()) return bad(400, "Course name is required")
        const newCourse = {
          id: nextId(data.courses),
          name: String(body.name).slice(0, 100),
          description: safeText(body.description),
          teacher: user.id,
          deadline: body.deadline || "2027-06-30T18:00:00+02:00",
          created: new Date().toISOString(),
          price: 0,
          paid: false,
          student_count: 0,
          resources: [],
          posts: [],
          tests: [],
          weeks: [],
          events: []
        }
        data.courses.push(newCourse)
        user.courses.push(newCourse.id)
        saveData(data)
        return ok(newCourse, 201)
      }
      if (method === "put" || method === "patch") {
        const entry = getCourse(data, parts[1])
        if (!entry) return bad(404, "Course not found")
        if (!isTeacher(user) || entry.teacher !== user.id) return bad(403, "Only the course teacher can edit this course")
        const keys = ["name", "description", "deadline"]
        keys.forEach(key => {
          if (Object.prototype.hasOwnProperty.call(body, key)) {
            entry[key] = key === "description" ? safeText(body[key]) : String(body[key])
          }
        })
        saveData(data)
        return ok(entry)
      }
      return bad(405, "Unsupported course operation")
    }

    if (parts[0] === "posts" && method === "get") {
      if (parts.length === 1) return ok(data.posts)
      const entry = data.posts.find(post => post.id === Number(parts[1]))
      return entry ? ok(entry) : bad(404, "Discussion not found")
    }

    if (parts[0] === "quiz" && parts[1] === "tests") {
      if (method === "get") {
        if (parts.length === 2) return ok(data.quizzes.map(test => ({ id: test.id, course: test.course, t_id: test.t_id })))
        const entry = data.quizzes.find(test => test.id === Number(parts[2]))
        return entry ? ok(entry) : bad(404, "Quiz not found")
      }
      if ((method === "put" || method === "patch" || method === "post") && isTeacher(user)) {
        const quiz = data.quizzes.find(test => test.id === Number(parts[2]))
        const owner = getCourse(data, quiz ? quiz.course : body.course)
        if (!owner || owner.teacher !== user.id) return bad(403, "Not your course")
        if (!Array.isArray(body.tasks)) return bad(400, "Quiz tasks must be an array")
        const id = quiz ? quiz.id : nextId(data.quizzes)
        const updated = Object.assign({}, quiz || {}, body, { id: id, course: owner.id })
        updated.tasks = body.tasks.map((task, index) => {
          const taskId = Number(task.id) || (index + 1 + id * 1000)
          const options = Array.isArray(task.answers) ? task.answers : []
          return {
            id: taskId,
            test: id,
            render_type: task.render_type || "MC",
            question: String(task.question || "").slice(0, 512),
            answers: options.map((option, offset) => ({
              id: Number(option.id) || (taskId * 10 + offset + 1),
              task: taskId,
              answer: String(option.answer || ""),
              checked: false,
              correct_answer: String(option.correct_answer || ""),
              max_score: Number(option.max_score) || 0,
              score: 0,
              order: offset + 1
            }))
          }
        })
        if (quiz) data.quizzes.splice(data.quizzes.indexOf(quiz), 1, updated)
        else { data.quizzes.push(updated); owner.tests.push(id) }
        saveData(data)
        return ok(updated)
      }
    }

    if (parts[0] === "resources") {
      if (method === "get") {
        if (parts.length === 1) return ok(data.resources)
        const entry = data.resources.find(resource => resource.id === Number(parts[1]))
        return entry ? ok(entry) : bad(404, "Resource not found")
      }
      if (method === "post" && isTeacher(user)) {
        const file = body.content
        let url = null
        try { url = await readFileAsDataUrl(file) } catch (error) { return bad(400, error.message) }
        const target = getCourse(data, body.course_id) || data.courses.find(course => course.teacher === user.id)
        if (!target || target.teacher !== user.id) return bad(403, "No course available")
        const entry = {
          id: nextId(data.resources),
          name: String(body.name || "Untitled resource").slice(0, 100),
          course_id: target.id,
          courseName: target.name,
          file: url,
          uploader: user.id,
          uploader_name: user.username,
          effective_from: body.effective_from || "2027-01-01T12:00:00+01:00",
          expires: body.expires || "2027-06-30T12:00:00+02:00",
          uploaded: new Date().toISOString()
        }
        data.resources.push(entry)
        target.resources.push(entry.id)
        try { saveData(data) } catch (error) { return bad(507, "Browser storage is full. Reset demo or use a smaller file") }
        return ok(entry, 201)
      }
      return bad(403, "Resources can only be created by a demo teacher")
    }

    if (parts[0] === "messages") {
      if (method === "get") return ok(data.messages.filter(message => message.sender === user.id || message.receiver === user.id))
      if (method === "post") {
        const recipient = Number(body.receiver)
        if (!data.users.some(item => item.id === recipient)) return bad(400, "Unknown message recipient")
        const entry = { id: nextId(data.messages),
          sender: user.id,
          receiver: recipient,
          text: String(body.text || "").slice(0, 4096),
          date: new Date().toISOString() }
        data.messages.push(entry)
        saveData(data)
        return ok(entry, 201)
      }
    }
    if (parts[0] === "students" && method === "get") return ok(data.users.filter(item => item.is_student).map(item => ({ user: item.id, courses: item.courses })))

    return bad(404, "This endpoint is not implemented in the public offline demo: " + request.pathname)
  }
}
