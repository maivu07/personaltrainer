import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'
import Calendar from './Calendar'
import Statistics from './Statistics'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ mr: 3 }}>Personal Trainer</Typography>
            <Button color="inherit" component={Link} to="/">Customers</Button>
            <Button color="inherit" component={Link} to="/trainings">Trainings</Button>
            <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
            <Button color="inherit" component={Link} to="/statistics">Statistics</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App