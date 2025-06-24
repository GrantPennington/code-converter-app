import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteHistory, getHistory } from '../services/api';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            const sessionId = localStorage.getItem('sessionId');
            
            if (!sessionId) return;

            try {
                const noteHistory = await getHistory(sessionId);
                console.log(noteHistory);
                setHistory(noteHistory);
            } catch (err) {
                console.error('Failed to fetch history:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [flag]);

    const handleDelete = async (historyId) => {
      const sessionId = localStorage.getItem('sessionId');
      await deleteHistory(sessionId, historyId);
      setFlag(!flag)
    }

  if (loading) return <p>Loading history...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📜 Summary History</h2>
      {history.length === 0 ? (
        <p>No summaries found.</p>
      ) : (
        history.map((entry) => (
          <div key={entry._id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            background: '#f9f9f9'
          }}>
            <p><strong>Style:</strong> {entry.style}</p>
            {entry.filename && (
              <p><strong>File:</strong> {entry.filename} ({entry.filetype})</p>
            )}
            {entry.wordCount && (
              <p><strong>Word Count:</strong> {entry.wordCount}</p>
            )}
            <p><strong>Summary:</strong> {entry.summary}</p>
            <small><strong>Date:</strong> {new Date(entry.createdAt).toLocaleString()}</small>
            <button onClick={() => handleDelete(entry._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryPage;