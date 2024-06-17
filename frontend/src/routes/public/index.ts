import Welcome from "../../components/pages/Welcome"
import Authorize from "../../components/pages/Authorize"

export const WELCOME = {
    element: Welcome,
    route: `/welcome`
}
export const LOGIN = {
    element: Authorize,
    route: `/login`
}
export const REGISTRATION = {
    element: Authorize,
    route: `/registration`
}