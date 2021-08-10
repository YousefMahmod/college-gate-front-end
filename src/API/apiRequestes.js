import { USER_API } from "../Constants";

export const signUpApi = async (userType, userInfo) => {

    const res = await fetch(`${USER_API}/${userType}/signup`, {

        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        const data = await res.json();
        return data;
    }

    return null;
    
}

export const logInApi = async (userType, userInfo) => {    
    
    const res = await fetch(`${USER_API}/${userType}/login`, {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify(userInfo)
    })

    console.log("response", res);

    if(res.ok){

        const data =  await res.json();
        console.log("Successed Data", data);
        return data;
    }
    else {
        console.log(res.status);
        return null;
    }
   
}