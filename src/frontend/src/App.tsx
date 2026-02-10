import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import IntroPage from './pages/IntroPage';
import ProposalPage from './pages/ProposalPage';
import FinalPage from './pages/FinalPage';
import RootLayout from './components/RootLayout';
import AppErrorBoundary from './components/AppErrorBoundary';
import BackgroundAudioProvider from './components/BackgroundAudioProvider';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const introRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IntroPage,
});

const proposalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/proposal',
  component: ProposalPage,
});

const finalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/final',
  component: FinalPage,
});

const routeTree = rootRoute.addChildren([introRoute, proposalRoute, finalRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <BackgroundAudioProvider>
        <RouterProvider router={router} />
      </BackgroundAudioProvider>
    </AppErrorBoundary>
  );
}
