// client/src/App.js
import React, { useState } from 'react';
import { saveHistory, summarizeText } from '../services/api';
import axios from 'axios';

const SummarizerPage = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [style, setStyle] = useState('default');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleSummarize = async () => {
        setLoading(true);
        try {
            const result = await summarizeText(text, style);
            setSummary(result);
            
            const sessionId = localStorage.getItem('sessionId');
            const wordCount = text.trim().split(/\s+/).length;

            await saveHistory(sessionId, text, result, style, {
                filename: 'N/A',
                filetype: 'manual-input',
                wordCount,
            });
            
        } catch (err) {
            console.error('Summarization failed:', err);
            setSummary('Error summarizing text.');
        }
        setLoading(false);
    };

    const handleFileUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('style', style);

        setLoading(true);
        try {
            const sessionId = localStorage.getItem('sessionId');
            // upload route
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // save summary from response
            const { summary, text, filename, filetype, wordCount } = res.data;

            setSummary(summary);

            await saveHistory(sessionId, text, summary, style, {
                filename,
                filetype,
                wordCount
            });

        } catch (err) {
            console.error('Upload failed:', err);
            setSummary('Error summarizing uploaded file.');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '2rem', maxWidth: 675, margin: 'auto' }}>
        {/* <h1>📝 Smart Note Summarizer</h1> */}

        <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleFileUpload} disabled={!file || loading}>
            {loading ? 'Uploading...' : 'Upload & Summarize'}
        </button>

        <textarea
            rows="10"
            cols="80"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your notes here..."
        />
        <br />
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="default">Balanced</option>
            <option value="bullet">Bullet Points</option>
            <option value="tldr">TL;DR</option>
            <option value="action-items">Action Items</option>
            <option value="outline">Outline</option>
            <option value="study-guide">Study Guide</option>
            <option value="highlighted-quotes">Highlighted Quotes</option>
            <option value="rewrite-simplified">Rewrite for a 10-Year-Old</option>
            <option value="question-generator">Quiz Generator</option>
        </select>

        <button onClick={handleSummarize} disabled={loading || !text}>
            {loading ? 'Summarizing...' : 'Summarize'}
        </button>

        {summary && (
            <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
            <h3>Summary:</h3>
            <p>{summary}</p>
            </div>
        )}
        </div>
    );
}

export default SummarizerPage;