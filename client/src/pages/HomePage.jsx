import React, { useState } from 'react'
import TextInputSection from '../components/TextInputSection';
import FileUploadSection from '../components/FileUploadSection';
import { Box, Tabs, Tab, Alert } from '@mui/material';
import FloatingButton from '../components/FloatingButton';

const HomePage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [showAlert, setShowAlert] = useState(true);
    
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div>
            <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                {showAlert && <Alert severity="info" sx={{ mb: 2 }} onClose={() => setShowAlert(false)}>
                    This is a limited demo. API requests are capped to prevent abuse. Text length is limited to 2000 characters.
                </Alert>}
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Text Input" />
                    <Tab label="File Upload" />
                </Tabs>

                <Box sx={{ mt: 4 }}>
                    {tabIndex === 0 && <TextInputSection />}
                    {tabIndex === 1 && <FileUploadSection />}
                </Box>
            </Box>
            <FloatingButton
                title="View History"
                to="/history"
                icon="history"
            />
        </div>
    )
}

export default HomePage
