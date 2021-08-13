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

let numbers = [15.60, 2, 2, 2, 4, 5, true, true, 7, "A", 2, false, 2, 8, 9];

numbers.forEach((num, index) => {
    
    numbers[index] = Math.floor(num);
})
console.log(numbers);