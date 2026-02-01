import React, { useState } from 'react';
import api from '../../api';

export default function ResignationForm() {
    const [lwd, setLwd] = useState('');

    const submitResignation = async () => {
        try {
            const res = await api.post('/api/user/resign', { lwd });
            alert(`Resignation submitted with ID: ${res.data.data.resignation._id}`);
        } catch (err) {
            alert(err.response?.data?.message || 'Error submitting resignation');
        }
    };

    return (
        <div>
            <h2>Submit Resignation</h2>
            <input type="date" value={lwd} onChange={e => setLwd(e.target.value)} />
            <button onClick={submitResignation}>Submit</button>
        </div>
    );
}
