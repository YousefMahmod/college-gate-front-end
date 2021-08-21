import { createCourse } from "../API/apiRequestes";
import { CREATE_COURSE } from "../Constants";

export const courseReducer = (state, action) => {

    // console.log(state);
    let course = null;

    switch (action.type) {
        case CREATE_COURSE:
            
            createCourse(action.course).then(({data, res}) => {

                if(res.ok) {

                    console.log("fetchedCourse", data);
                    course = data;
                }

                console.log(data.status, data.message);

                course =  null;

            })
            .catch(err => {

                console.log(err);
            })
            return course;
        default:
            return state;
    }

}