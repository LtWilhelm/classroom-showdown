import Home from './pages/Home.svelte';
import Leaderboard from './pages/Leaderboard.svelte';
import Challenges from './pages/Challenges.svelte';
import NotFound from './pages/NotFound.svelte';

const routes = {
  '/': Home,
  '/leaderboard': Leaderboard,
  '/challenges': Challenges,
  '*': NotFound
}

export default routes;