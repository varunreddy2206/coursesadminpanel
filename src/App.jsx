import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardScreen from './features/dashboard/screens/DashboardScreen';
import StudentsScreen from './features/students/screens/StudentsScreen';
import CourseListScreen from './features/courses/screens/CourseListScreen';
import AddCourseScreen from './features/courses/screens/AddCourseScreen';
import PaymentsScreen from './features/payments/screens/PaymentsScreen';
import RegistrationsScreen from './features/registrations/screens/RegistrationsScreen';
import LoginScreen from './features/auth/screens/LoginScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="students" element={<StudentsScreen />} />
          <Route path="courses">
            <Route path="list" element={<CourseListScreen />} />
            <Route path="add" element={<AddCourseScreen />} />
            <Route index element={<Navigate to="list" replace />} />
          </Route>
          <Route path="payments" element={<PaymentsScreen />} />
          <Route path="registrations" element={<RegistrationsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
