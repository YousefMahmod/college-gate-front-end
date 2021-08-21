import { createContext, useReducer, useState } from "react";
import { createCourse, fetchCourses } from "../API/apiRequestes";
import { courseReducer } from "../Reducers/CourseReducer";

export const CourseContext = createContext();

// course state dispatch get a certain course or create
// courses state get all courses


const CourseContextProvider = ({children}) => {

    //if you change one of state the other still keeping its data not the default

    // const [course, dispatch] = useReducer(courseReducer, {});
    const [course, setCourse] = useState(null);
    // const [fetchError, setFetchError] = useState("");
    // const [isPending, setIsPending] = useState(true);
    const [waitCourses, setWaitCourses] = useState(true);
    const [courses, setCourses] = useState([]);

    // console.log("fetchError State", fetchError);
    console.log("courses State", courses);

    const addCourse = (newCourse) => {

        return createCourse(newCourse).then(({data, res}) => {

            if(res.ok) {

                // console.log("fetchedCourse", data);
                
                // setCourse(data);
                
                setCourses([...courses, data]);
                // setIsPending(false);
                // setFetchError("");
                return {data, res};
            }

            return {data, res};
            // setFetchError(data.message);
            // setIsPending(true);
            // console.log(data.status, data.message);

            // setCourses([...courses]);

        })
        .catch(err => {

            console.log(err);
        });

    }

    const getCourses = (abort) => {

        fetchCourses(abort).then(({data, res}) => {

            setWaitCourses(false);
            if(res.ok) {

                setCourses(data.items);
                return;
            }
            console.log(data.message, data.status);
            setCourses([]);

        })
        .catch(err => {

            if(err.name === 'AbortError'){
                console.log("Abort fetch");
            }
            else{
                console.log(err);
            }
            
        });
    }

    return ( 

        <CourseContext.Provider value={{course, courses, addCourse, getCourses, waitCourses}}>
            {children}
        </CourseContext.Provider> 
        
    );
}
 
export default CourseContextProvider;