import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // proxy in dev
});

export const summarizeText = async (text, style = 'default') => {
    const res = await API.post('/summarize', { text, style });
    return res.data.summary;
};

export const saveHistory = async (sessionId, text, result, style = 'default', metadata = {}) => {
    const res = await API.post('/history', { 
        sessionId, 
        originalText: text,
        summary: result,
        style,
        ...metadata,
    });
    return res.data;
};

export const getHistory = async (sessionId) => {
  const res = await API.get(`/history/${sessionId}`);
  return res.data;
};

export const deleteHistory = async (sessionId, historyId) => {
    const res = await API.delete(`/history/${sessionId}/${historyId}`);
    return res.data;
};