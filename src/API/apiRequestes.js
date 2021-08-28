import {
	CREATE_COURSE_END_POINT,
	CREATE_MESSAGE_END_POINT,
	CREATE_POST_END_POINT,
	ENROLL_COURSE_END_POINT,
	GET_COURSES_END_POINT,
	GET_COURSE_END_POINT,
	GET_LIST_OF_POSTS_END_POINT,
	GET_LIST_OF_STUDENTS_END_POINT,
	USER_END_POINT,
} from "../Constants";

export const signUpApi = async (userType, userInfo) => {
	const res = await fetch(`${USER_END_POINT}/${userType}/signup`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(userInfo),
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	}

	return null;
};

export const logInApi = async (userType, userInfo) => {
	const res = await fetch(`${USER_END_POINT}/${userType}/login`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(userInfo),
	});

	console.log(res);
	const data = await res.json();

	return { data, res };

	// if(res.ok){

	//     const data =  await res.json();

	//     return data;
	// }
	// else {
	//     console.log(res);
	//     return null;
	// }
};

//createCourse

export const createCourse = async (name, abort) => {
	const token = localStorage.getItem("token");

	console.log("CourseName", name);
	// console.log("token", token);

	const res = await fetch(CREATE_COURSE_END_POINT, {
		signal: abort.signal,
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify(name),
	});
	const data = await res.json();

	return { data, res };
};

export const enrollCourse = async (key, abort) => {
	const token = localStorage.getItem("token");

	console.log("CourseKey", key);
	// console.log("token", token);

	const res = await fetch(`${ENROLL_COURSE_END_POINT}/${key}/enroll`, {
		signal: abort.signal,
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		// body: JSON.stringify(key),
	});
	const data = await res.json();

	return { data, res };
};
//get courses
export const fetchCourses = async abort => {
	const token = localStorage.getItem("token");

	// console.log("CourseName", name);
	// console.log("token", token);

	const res = await fetch(GET_COURSES_END_POINT, {
		signal: abort.signal,
		method: "GET",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
	const data = await res.json();

	return { data, res };
};
//get specefic course
export const fetchCourse = async (abort, id) => {
	const token = localStorage.getItem("token");

	console.log("Courseid", id);
	console.log("token", token);

	const res = await fetch(`${GET_COURSE_END_POINT}/${id}`, {
		signal: abort.signal,
		method: "GET",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
	const data = await res.json();

	return { data, res };
};

export const createPost = async ([content, id, abort]) => {
	const token = localStorage.getItem("token");

	console.log("contentPost", content);
	console.log("courseId", id);
	// console.log("CourseName", name);
	// console.log("token", token);

	const res = await fetch(`${CREATE_POST_END_POINT}/${id}`, {
		signal: abort.signal,
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify(content),
	});
	const data = await res.json();

	return { data, res };
};

export const fetchListOfPosts = async ([id, offset, abort]) => {
	const token = localStorage.getItem("token");

	console.log("Courseid", id);
	console.log("offset", offset);

	const res = await fetch(
		`${GET_LIST_OF_POSTS_END_POINT}/${id}?offset=${offset}&limit=${4}`,
		{
			signal: abort.signal,
			method: "GET",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${JSON.parse(token)}`,
			},
		}
	);
	const data = await res.json();

	return { data, res };
};

export const fetchListOfStudents = async ([id, abort]) => {
	const token = localStorage.getItem("token");

	console.log("Courseid", id);

	const res = await fetch(`${GET_LIST_OF_STUDENTS_END_POINT}/${id}/students`, {
		signal: abort.signal,
		method: "GET",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
	});
	const data = await res.json();

	return { data, res };
};
export const createMessage = async ([message, id, abort]) => {
	const token = localStorage.getItem("token");

	console.log("message", message);
	console.log("courseId", id);
	// console.log("CourseName", name);
	// console.log("token", token);

	const res = await fetch(`${CREATE_MESSAGE_END_POINT}/${id}`, {
		signal: abort.signal,
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify(message),
	});
	const data = await res.json();

	return { data, res };
};
