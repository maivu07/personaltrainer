import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 3 }}>Personal Trainer</Typography>
          <Button color="inherit" component={Link} to="/">Customers</Button>
          <Button color="inherit" component={Link} to="/trainings">Trainings</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App