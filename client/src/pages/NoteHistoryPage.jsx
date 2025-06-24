import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getHistory, deleteHistory } from '../services/api'; // Adjust path
import FloatingButton from '../components/FloatingButton';

const NoteHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) return;

        try {
            const res = await getHistory(sessionId);
            setHistory(res);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const sessionId = localStorage.getItem('sessionId');
        await deleteHistory(sessionId, id);
        fetchHistory(); // Refresh after delete
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
            📝 Summary History ({history.length})
        </Typography>

        {history.length === 0 ? (
            <Typography>No history yet.</Typography>
        ) : (
            <Grid container spacing={3}>
            {history.map((entry) => (
                <Grid item xs={12} md={6} key={entry._id}>
                <Card sx={{ position: 'relative' }}>
                    <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip label={entry.style} color="primary" size="small" />
                        
                        <Tooltip title="Delete summary">
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(entry._id)}
                        >
                        <DeleteIcon fontSize="small" />
                        </IconButton>
                        </Tooltip>
                    </Box>

                    {entry.filename && (
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                        📄 <strong>{entry.filename}</strong> ({entry.wordCount} words)
                        </Typography>
                    )}

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {entry.summary}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        {new Date(entry.createdAt).toLocaleString()}
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>
        )}
        <FloatingButton
            title="Home Page"
            to="/"
            icon="home"
        />
        </Box>
    );
};

export default NoteHistoryPage;