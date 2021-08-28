// //async and wait and promise and then catch
// // const getSomething = (something, isError) => {

// //     return new Promise((resolve, reject) => {

// //         if(!isError)
// //             resolve(something);
// //         else
// //             reject("faild");
// //     })
// // }

// // getSomething("first", false).then(data => {

// //     console.log(data);
// //     return getSomething("second", true);

// // }).then(secondData => {
// //     console.log(secondData);
// //     return getSomething("third", false);
// // }).then(thirdData => {
// //     console.log(thirdData);
// // })
// // .catch(error => {

// //     console.log(error);
// // });

// // fetch("https://jsonplaceholder.typicode.com/tods")
// // .then((res) => {

// //     console.log(res);

// //     return res.json();
// // })
// // .then(data => {

// //     console.log(data);
// // })
// // .catch(err => {

// //     console.log(err);
// // });

// // console.log("called first");

// // const fetchData = async () => {

// //     const res = await fetch("https://jsonplaceholder.typicode.com/todos");
// //     const data = await res.json();
// //     return data;
// // }

// // const handleData = async () => {

// //     data = await fetchData();
// //     console.log("I have Data", data);
// // }

// // handleData();

// //non premitive values
// /*
//     I want to take copy from obj1 to obj2 but this way doesn't work only with
//     premitive values (numbers , boolean, string)
// */
// let obj1 = { name: "hasona" };
// let obj2 = obj1; // obj2 pointer to obj1

// console.log(obj1, obj2); // {name:"hasona"}

// obj2.name = "ramadan";

// console.log(obj1, obj2); // {name:ramadan}

// // there is way in ES6 (spread operators) to take copy from obj1 to obj3

// let obj3 = { ...obj1 };
// obj3.name = "mohsen";
// obj3.age = 32;
// console.log(obj3, obj2); // {name: mohsen, age: 32} , {name:hasona}

// //(spread operators) to add two arrays instead of concat func

// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];
// let arr = [...arr1, ...arr2]; // instead arr1.concat(arr2);

// console.log(arr); // [1, 2, 3, 4, 5, 6]

// let obj4 = { name: "ahmed" };
// let obj5 = { age: 34 };
// let obj = { ...obj4, ...obj5 };

// const { name } = obj4;
// const { age } = obj5;

// console.log(name, age);
// console.log(obj); // {name:"ahmed", age:34}

// // (rest operator)
// // i used it in function instead of write all arguments
// const testFunc = (...args) => {
// 	let [a, ...rest] = args;

// 	console.log(a, ...rest); // 1 2 3 4

// 	return rest.reduce((a, b) => {
// 		return a + b;
// 	}); // 9
// };

// console.log(testFunc(1, 2, 3, 4)); // 2 + 3 + 4 result of reduce

// let arr10 = [];

// if(arr10.length !== 0 && arr10[0].course.id !== "aklsdjklsaj"){

// 	console.log("yes");
// }
// else {
// 	console.log("no");
// }

let message = { content: "asdlfadsf", subject: "", student: "" };

const setMessage = newMessage => {
	message = { ...newMessage };
	console.log(message);
};

setMessage({ ...message, student: "youssef" });
