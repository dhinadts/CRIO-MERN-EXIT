import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function ExitResponses() {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        api.get('/api/admin/exit_responses')
            .then(res => setResponses(res.data.data))
            .catch(err => alert("Error fetching responses"));
    }, []);

    return (
        <div>
            <h2>Exit Interview Responses</h2>
            {responses.map((r, i) => (
                <div key={i} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                    <h4>Employee: {r.employeeId}</h4>
                    {r.responses.map((resp, j) => (
                        <p key={j}><strong>{resp.questionText}</strong>: {resp.response}</p>
                    ))}
                </div>
            ))}
        </div>
    );
}
