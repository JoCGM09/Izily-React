import React, { useState, useEffect, useCallback } from "react";
import FeedbackForm from "../components/FeedbackForm";
import { db } from "../firebase";

function Feedback() {
  const [feedback, setFeedback] = useState([]);

  const addFeedback = async (feedbackObject) => {
    await db.collection("opiniones").doc().set(feedbackObject);
  };

  const getFeedback = async () => {
    const feedbackRef = await db.collection("opiniones");
    feedbackRef
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setFeedback(docs);
        console.log(docs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div>
      <FeedbackForm addFeedback={addFeedback} />
      {feedback && (
        <div>
          {feedback.map((feedbackElement) => 
            <p>{feedbackElement.content}</p>
          )}
          <div>
            <p>hola</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
