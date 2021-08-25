//Routes
export const STUDENT_HOME_LINK = "/student/home";
export const STUDENT_COURSES_LINK = "/student/courses";
export const STUDENT_WARNINGS_LINK = "/student/warnings";

export const PROFESSOR_MESSAGES_OVERVIEW_LINK = "/professor/messagesoverview";
export const PROFESSOR_COURSES_LINK = "/professor/courses";
// export const PROFESSOR_COURSE_LINK = "/professor/course";
export const DEPARTMENT_WARNINGS_LINK = "/department/warnings";

export const LOGIN_LINK = "/auth/login";
export const SIGNUP_LINK = "/auth/signup";
export const NOT_FOUND = "*";

//End points

const URL = "http://localhost:4000/api/v1";

export const USER_END_POINT = `${URL}/user`;
export const CREATE_COURSE_END_POINT = `${URL}/course/me`;
export const GET_COURSES_END_POINT = `${URL}/course/all`;
export const GET_COURSE_END_POINT = `${URL}/course`;
export const CREATE_POST_END_POINT = `${URL}/announcement/me/course`;
export const GET_LIST_OF_POSTS_END_POINT = `${URL}/announcement/course`;
// export const CREATE_POST_END_POINT = `${URL}/announcement/me/course`;

//Actions

export const CREATE_COURSE = "createCourse";
