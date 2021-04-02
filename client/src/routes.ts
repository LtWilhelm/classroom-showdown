import Home from './pages/Home.svelte';
import Leaderboard from './pages/Leaderboard.svelte';
import NotFound from './pages/NotFound.svelte';

const routes = {
  '/': Home,
  '/leaderboard': Leaderboard,
  '*': NotFound
}

export default routes;