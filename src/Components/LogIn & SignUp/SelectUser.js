
import styles from './LoginAndSignUp.module.css'

const SelectUser = ({userType, handleOnChange}) => {

    // const handleOnChange = (e) => {
    //     e.preventDefault();
    //     setUserType(e.target.value);
    // }
    return ( 
        <div className={styles.radio_buttons_for_users}>

            <div className={styles.radio_container} style={{margin:0}} >

                <input 
                    type="radio" 
                    id="student" 
                    value="student" 
                    onChange={(e) => handleOnChange(e)}
                    name="user"
                    checked = {userType === "student"}
                />
                {/* <span className={styles.checkmark}></span> */}
                <label htmlFor="student" > student </label>
                

            </div>
            
            <div className={styles.radio_container}>
                
                <input 
                    type="radio" 
                    id="professor" 
                    value="professor" 
                    onChange={(e) => handleOnChange(e)}
                    name="user"
                    checked = {userType === "professor"}
                />

                <label htmlFor="professor">professor</label>

            </div>
           
            <div className={styles.radio_container}>

                <input 
                    type="radio" 
                    id="department" 
                    value="department" 
                    onChange={(e) => handleOnChange(e)}
                    // checked="checked"
                    name="user"
                    checked = {userType === "department"}
                />

                <label htmlFor="department">department</label>

            </div>
           
        </div>
    );
}
 
export default SelectUser;