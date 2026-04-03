import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { ToastContainer } from '@/components/layout/ToastContainer';
import DashboardPage from '@/pages/DashboardPage';
import TransactionsPage from '@/pages/TransactionsPage';
import InsightsPage from '@/pages/InsightsPage';
import NotFound from '@/pages/NotFound';

const App = () => (
  <BrowserRouter>
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
