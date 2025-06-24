import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Convert code
export const convertCode = async (originalCode, sourceLanguage, targetLanguage, sessionId) => {
  const res = await API.post('/convert', {
    sessionId,
    originalCode,
    sourceLanguage,
    targetLanguage,
    textSource: 'manual',
  });
  return res.data.convertedCode; // or full object if needed
};

// Save code conversion history
export const saveHistory = async (
    sessionId,
    originalCode,
    convertedCode,
    _unused, // placeholder for style
    metadata = {}
) => {
    const res = await API.post('/history', {
        sessionId,
        originalCode,
        convertedCode,
        ...metadata,
  });
  return res.data;
};

// Fetch code conversion history
export const getHistory = async (sessionId) => {
    const res = await API.get(`/history/${sessionId}`);
    return res.data;
};

// Delete specific code conversion from history
export const deleteHistory = async (sessionId, historyId) => {
    const res = await API.delete(`/history/${sessionId}/${historyId}`);
    return res.data;
};
