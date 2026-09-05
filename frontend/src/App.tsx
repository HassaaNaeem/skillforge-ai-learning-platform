import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { MarketingLayout } from './components/layout/MarketingLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { TopicsPage } from './pages/TopicsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route element={<AppShell />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="topics" element={<TopicsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
