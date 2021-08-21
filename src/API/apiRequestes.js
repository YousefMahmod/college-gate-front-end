import {
	CREATE_COURSE_END_POINT,
	GET_COURSES_END_POINT,
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

export const createCourse = async name => {
	const token = localStorage.getItem("token");

	// console.log("CourseName", name);
	// console.log("token", token);

	const res = await fetch(CREATE_COURSE_END_POINT, {
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
