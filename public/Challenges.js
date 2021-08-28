let zero = 0;
let counter = 3;
let my = ["Ahmed", "Mazero", "Elham", "Osama", "Gamal", "Ameer"];

//Array Methods

//#1
// my = my
//     .reverse()
//     .filter(el => {
//         return el !== my[zero] && el !== my[zero+1];
//     });;

//#1 another way
// my.reverse().splice(zero, 2);

// console.log(my);

//#2
// console.log(my.slice(zero+1 , counter).reverse());

//#3
// console.log(my.slice(zero + 1,counter).reverse().reduce((value, value2) => {
//     return value.match(/El/) + value2.match(/zero/);
// }));

//#3 another way
// console.log((my.toString()).match(/El/) + (my.toString()).match(/zero/));

//#4
// console.log(my.toString().match(/ro/).toString().replace("o", "O"));

//Unique Numbers In List

// let numbers = [15.6, 2, 2, 2, 4, 5, true, true, 7, "A", 2, false, 2, 8, 9];
// let numbers = [15.60, 2, 2, 2, 4, 5, true, true, 7, "A", 2, false, 2, 3, 8, 9];
// let newNumbers = numbers
// 	.filter(el => {
// 		return !isNaN(el);
// 	})
// 	.map(el => {
// 		if (typeof el !== "boolean") {
// 			return parseInt(el);
// 		} else {
// 			return el === true ? 1 : 0;
// 		}
// 	})
// 	.filter((num, index, arr) => {
// 		for (let i = index + 1; i < arr.length; i++) {
// 			if (arr[i] === num) {
// 				return false;
// 			}
// 		}
// 		return true;
// 	})
// 	.sort((a, b) => {
// 		return b - a;
// 	});
// if (newNumbers.length % 2 === 0) {
// 	let a = 0;
// 	let b = 0;
// 	while (newNumbers.length !== 0) {
// 		if (newNumbers.length === 2) {
// 			a = newNumbers.pop();
// 			b = newNumbers.pop();
// 			console.log(a * b);
// 			break;
// 		}
// 		a = newNumbers.shift();
// 		b = newNumbers.pop();
// 		console.log(a + b);
// 	}
// } else {
// 	if (newNumbers.length !== 0) {
// 		newNumbers.forEach(num => {
// 			console.log(num);
// 		});
// 	}
// }

//Higher Order Functions chanllenges

// let myString = "1,2,3,EE,l,z,e,r,o, ,Web, ,S,c,h,o,o,l,2,0,z";

// let mySolution = myString
//                     .split(",")
//                     .filter(char => {
//                         return isNaN(char);
//                     })
//                     .map(el => {
//                         return el.length > 1 ? el.split("")
//                                 .reduce((acc, current) => {

//                             return acc === current ? acc : `${acc}${current}`
//                         }) : el;
//                     }).reduce((acc, current, index, arr) => {

//                         if(index === arr.length-1) {

//                             return acc;
//                         }
//                         current = current.length > 1 ? ` ${current} ` : current;
//                         return `${acc}${current}`;

//                     });

// console.log(mySolution); // Elzero Web School
