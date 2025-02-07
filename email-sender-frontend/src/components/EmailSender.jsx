import React, { useState } from 'react';

export default function EmailSender() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [emails, setEmails] = useState('');
    const [resume, setResume] = useState(null);
    const [status, setStatus] = useState('');

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setResume(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('body', body);
        formData.append('emails', emails);
        if (resume) formData.append('resume', resume);
        
        try {
            const response = await fetch('http://localhost:5000/send-emails', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            setStatus(result.message || 'Emails sent successfully!');
        } catch (error) {
            setStatus('Error sending emails.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}> 
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}> 
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <h2>Send Emails</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subject:</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
                </div>
                <div>
                    <label>Emails (comma-separated):</label>
                    <textarea style={{ width: '100%', height: '100px', resize: 'vertical', padding: '5px' }} value={emails} onChange={(e) => setEmails(e.target.value)} required />
                </div>
                <div>
                    <label>Upload Resume:</label>
                    <input type="file" onChange={handleFileChange} accept=".pdf" />
                </div>
                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>Send Emails</button>
             </form>
        </div>
    </div>
            {status && <p>{status}</p>}
        </div>
    );
}
