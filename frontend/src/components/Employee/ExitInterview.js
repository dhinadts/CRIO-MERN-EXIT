import React, { useState } from 'react';
import api from '../../api';

export default function ExitInterview() {
    const [responses, setResponses] = useState([
        { questionText: "Why are you leaving the company?", response: "" },
        { questionText: "What did you like most about working here?", response: "" },
        { questionText: "What could we improve?", response: "" }
    ]);

    const handleChange = (index, value) => {
        const updated = [...responses];
        updated[index].response = value;
        setResponses(updated);
    };

    const submitInterview = async () => {
        try {
            await api.post('/api/user/responses', { responses });
            alert("Exit interview submitted successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Error submitting interview");
        }
    };

    return (
        <div>
            <h2>Exit Interview</h2>
            {responses.map((q, i) => (
                <div key={i}>
                    <p>{q.questionText}</p>
                    <textarea
                        value={q.response}
                        onChange={e => handleChange(i, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={submitInterview}>Submit</button>
        </div>
    );
}
