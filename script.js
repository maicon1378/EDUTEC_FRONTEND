import { verifytoken } from "./utils/verify-token.js"
import { getName } from "./utils/get-name.js"
import { logout } from "./utils/logout.js"

const url = "./pages/login/login.html"

verifytoken(url)
getName()
logout()