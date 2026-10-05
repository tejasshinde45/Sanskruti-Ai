import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { Loader2 } from 'lucide-react';

// Eagerly load core layout
import Layout from './components/layout/Layout';

// Lazy load all pages for extreme code splitting and SEO performance boost
const Index = lazy(() => import('./pages/Index'));
const ScriptureExplainer = lazy(() => import('./pages/ScriptureExplainer'));
const FestivalEngine = lazy(() => import('./pages/FestivalEngine'));
const CulturalRecommender = lazy(() => import('./pages/CulturalRecommender'));
const KnowledgeCapsule = lazy(() => import('./pages/KnowledgeCapsule'));
const VoiceQA = lazy(() => import('./pages/VoiceQA'));
const Quizzes = lazy(() => import('./pages/Quizzes'));
const CulturalMap = lazy(() => import('./pages/CulturalMap'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Storyverse = lazy(() => import('./pages/Storyverse'));
const Reels = lazy(() => import('./pages/Reels'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const FamilyTree = lazy(() => import('./pages/FamilyTree'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-10 h-10 text-primary animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/reels" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Index />} />
              <Route path="scripture" element={<ScriptureExplainer />} />
              <Route path="festivals" element={<FestivalEngine />} />
              <Route path="recommender" element={<CulturalRecommender />} />
              <Route path="knowledge" element={<KnowledgeCapsule />} />
              <Route path="voice-qa" element={<VoiceQA />} />
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="map" element={<CulturalMap />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="profile" element={<Profile />} />
              <Route path="family-tree" element={<FamilyTree />} />
              <Route path="storyverse" element={<Storyverse />} />
              <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
