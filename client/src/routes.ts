import Home from './pages/Home.svelte';
import Leaderboard from './pages/Leaderboard.svelte';
import Challenges from './pages/Challenges.svelte';
import NotFound from './pages/NotFound.svelte';
import User from './pages/SignUp.svelte';
import Invite from './pages/Invite.svelte';

const routes = {
  '/': Home,
  '/leaderboard': Leaderboard,
  '/challenges': Challenges,
  '/signup': User,
  '/invite': Invite,
  '*': NotFound
}

export default routes;