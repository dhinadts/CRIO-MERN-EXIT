import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function ResignationList() {
    const [resignations, setResignations] = useState([]);

    useEffect(() => {
        api.get('/api/admin/resignations').then(res => setResignations(res.data.data));
    }, []);

    const conclude = async (id, approved) => {
        const lwd = prompt("Enter exit date (YYYY-MM-DD):");
        await api.put('/api/admin/conclude_resignation', { resignationId: id, approved, lwd });
        alert("Resignation updated");
    };

    return (
        <div>
            <h2>Resignations</h2>
            <ul>
                {resignations.map(r => (
                    <li key={r._id}>
                        {r.employeeId} - {r.lwd} - {r.status}
                        <button onClick={() => conclude(r._id, true)}>Approve</button>
                        <button onClick={() => conclude(r._id, false)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
