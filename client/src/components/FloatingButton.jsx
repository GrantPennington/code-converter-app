// In your HomePage.jsx or MainLayout.jsx
import { Fab, Tooltip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const FloatingButton = ({ title, to, icon='history' }) => {
    return (
        <Tooltip title={title || "View History"}>
            <Fab
                color="primary"
                component={Link}
                to={to || "/history"}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                }}
            >
                {icon==='history' ? <HistoryIcon /> : <HomeIcon />}
            </Fab>
        </Tooltip>
    )
};

export default FloatingButton;