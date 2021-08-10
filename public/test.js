const getSomething = (something, isError) => {

    return new Promise((resolve, reject) => {

        if(!isError)
            resolve(something);
        else    
            reject("faild");
    })
}

getSomething("first", false).then(data => {

    console.log(data);
    return getSomething("second", true);

}).then(secondData => {
    console.log(secondData);
    return getSomething("third", false);
}).then(thirdData => {
    console.log(thirdData);
}) 
.catch(error => {

    console.log(error);
});

// fetch("https://jsonplaceholder.typicode.com/tods")
// .then((res) => {

//     console.log(res);
  
//     return res.json();
// })
// .then(data => {

//     console.log(data);
// })
// .catch(err => {

//     console.log(err);
// });

console.log("called first");    

const fetchData = async () => {

    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data;
}

const handleData = async () => {

    data = await fetchData();
    console.log("I have Data", data);
}

handleData();



