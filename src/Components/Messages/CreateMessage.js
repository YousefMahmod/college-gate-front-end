import { useContext, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { PROFESSOR_COURSES_LINK } from "../../Constants";
import { MessageContext } from "../../Contexts/MessagesContext";
import { UserDataContext } from "../../Contexts/UserDataContext";
import styles from "./CreateMessage.module.css";

const CreateMessage = ({ isProfessor }) => {
	const [message, setMessage] = useState({
		reciever_id: "",
		subject: "",
		content: "",
	});
	const sendButtonRef = useRef();
	const [waitForSendingMessage, setWaitForSendingMessage] = useState(false);
	const {
		getStudentList,
		course,
		students,
		waitStudentList,
		// sendMessage,
		// finishSendingMessage,
		// handleFinishSendingMessage,
	} = useContext(UserDataContext);

	const { sendMessage, finishSendingMessage, handleFinishSendingMessage } =
		useContext(MessageContext);

	console.log("student", students[0]);
	useEffect(() => {
		const abortConst = new AbortController();

		if (isProfessor) {
			getStudentList(course.id, abortConst);
		}

		return () => {
			abortConst.abort();
		};
	}, []);

	/* to abort fetch if the user change the comp 
	so i use waitForSendingMessage state to get into useEffect when press on submit*/
	useEffect(() => {
		const abortConst = new AbortController();

		if (waitForSendingMessage) {
			sendMessage(message, course.id, abortConst);

			sendButtonRef.current.className = `submit_button submit_not_active_button`;
			//ref to send button to change its style
		}

		return () => {
			abortConst.abort();
		};
	}, [waitForSendingMessage]);

	useEffect(() => {
		if (finishSendingMessage) {
			handleFinishSendingMessage(); //render two components
			sendButtonRef.current.className = `submit_button submit_active_button`;
			return (
				<Redirect to={`${PROFESSOR_COURSES_LINK}/${course.id}/messages/sent`} />
			);
		}
	}, [finishSendingMessage]);

	const handleSendMessage = e => {
		e.preventDefault();
		setWaitForSendingMessage(true);
	};

	const handleSubjectOnChange = e => {
		setMessage({ ...message, subject: e.target.value });
	};

	const handleContentOnChange = e => {
		setMessage({ ...message, content: e.target.value });
	};

	const handleChoosingStudentOnChange = e => {
		console.log(typeof e.target.value, e.target.value);
		setMessage({ ...message, reciever_id: e.target.value });
	};

	// const professorForm = () => {
	// 	if (!waitStudentList) {
	// 		return (
	// 			<form onSubmit={e => handleSendMessage(e)}>
	// 				<div className={styles.student_list}>
	// 					<label htmlFor="studentList">To:</label>

	// 					{students && (
	// 						<select id="studentList" required>
	// 							{/* {students.map((student, index) => (
	// 								<option
	// 									value={student.id}
	// 									onChange={e => handleChoosingStudentOnChange(e)}
	// 									key={index}
	// 								>
	// 									{student.name}
	// 								</option>
	// 							))} */}
	// 							<option value={students[0].id}>{students[0].name}</option>
	// 						</select>
	// 					)}
	// 				</div>

	// 				<label htmlFor="subject">Subject:</label>
	// 				<input
	// 					type="text"
	// 					id="subject"
	// 					className={styles.subject}
	// 					value={message.subject}
	// 					onChange={e => handleSubjectOnChange(e)}
	// 					required
	// 				/>

	// 				<textarea
	// 					cols="30"
	// 					rows="8"
	// 					maxLength="310"
	// 					placeholder="Message content"
	// 					value={message.content}
	// 					onChange={e => handleContentOnChange(e)}
	// 					required
	// 				></textarea>

	// 				<div style={{ textAlign: "right", marginTop: "10px" }}>
	// 					<input
	// 						type="submit"
	// 						value="send"
	// 						ref={sendButtonRef}
	// 						className={`submit_button submit_active_button`}
	// 					/>
	// 				</div>
	// 			</form>
	// 		);
	// 	}
	// };

	// const studentForm = () => {
	// 	if (!waitStudentList) {
	// 		return (
	// 			<form onSubmit={e => handleSendMessage(e)}>
	// 				<label htmlFor="subject">Subject:</label>
	// 				<input
	// 					type="text"
	// 					id="subject"
	// 					value={message.subject}
	// 					className={styles.subject}
	// 					onChange={e => handleSubjectOnChange(e)}
	// 					required
	// 				/>

	// 				<textarea
	// 					cols="30"
	// 					rows="8"
	// 					maxLength="310"
	// 					placeholder="Message content"
	// 					value={message.content}
	// 					onChange={e => handleContentOnChange(e)}
	// 					required
	// 				></textarea>

	// 				<div style={{ textAlign: "right", marginTop: "10px" }}>
	// 					<input
	// 						type="submit"
	// 						value="send"
	// 						ref={sendButtonRef}
	// 						className={`submit_button submit_active_button`}
	// 					/>
	// 				</div>
	// 			</form>
	// 		);
	// 	}
	// };
	return (
		<div className={styles.create_message}>
			{/* {isProfessor ? professorForm() : studentForm()} */}

			<form onSubmit={e => handleSendMessage(e)}>
				{isProfessor && (
					<div className={styles.student_list}>
						<label htmlFor="studentList">To:</label>
						<select
							id="studentList"
							required
							onChange={e => handleChoosingStudentOnChange(e)}
						>
							{students && (
								<>
									{students.map((student, index) => (
										<option
											value={student.id}
											// onChange={e => handleChoosingStudentOnChange(e)}
											key={index}
										>
											{student.name}
										</option>
									))}
								</>
							)}
						</select>
					</div>
				)}

				<label htmlFor="subject">Subject:</label>
				<input
					type="text"
					id="subject"
					className={styles.subject}
					value={message.subject}
					onChange={e => handleSubjectOnChange(e)}
					required
				/>

				<textarea
					cols="30"
					rows="8"
					maxLength="310"
					placeholder="Message content"
					value={message.content}
					onChange={e => handleContentOnChange(e)}
					required
				></textarea>

				<div style={{ textAlign: "right", marginTop: "10px" }}>
					<input
						type="submit"
						value="send"
						ref={sendButtonRef}
						className={`submit_button submit_active_button`}
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateMessage;
