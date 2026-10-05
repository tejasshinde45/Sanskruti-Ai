import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { masterQuizzes } from '../lib/quizData';

interface UserProfile {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
  role: string;
  token?: string;
  points: number; 
  shlokasRead: number;
  quizzesCompleted: number;
  quizzesMastered: string[]; // store IDs of specific epics mastered
  mapLocationsExplored: number;
  storiesCompleted: number;
  reelsWatched: number;
  reelsSaved: string[];
  streak: number;
  exploredModules: {
    scripture: number;
    festivals: number;
    stories: number;
    quizzes: number;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  updateProfileSync: () => Promise<void>;
  setGuestMode: () => void;
  logout: () => void;
  updatePoints: (points: number) => void;
  incrementShlokasRead: () => void;
  incrementQuizzesCompleted: () => void;
  masterQuiz: (quizId: string, karmaPoints: number) => void; // Unlocks the badge and adds Karma
  incrementMapExplored: () => void;
  incrementStoriesCompleted: () => void;
  incrementReelsWatched: () => void;
  saveReel: (reelId: string) => void;
  addXP: (amount: number) => void; // Represents Karma Points now
  getSacredTitle: () => { title: string; currentLevel: number; nextLevelPoints: number; badgeColor: string; levelName: string };
  getEarnedBadges: () => { id: string, name: string, icon: string, description: string, date: string, color: string }[];
}

// Logic for calculating sacred title
const calculateTitle = (totalKarma: number) => {
  if (totalKarma >= 700) return { title: 'Maharishi (Great Sage)', levelName: 'Sage', currentLevel: 4, nextLevelPoints: 0, badgeColor: 'from-amber-400 to-yellow-600' };
  if (totalKarma >= 300) return { title: 'Rishi (Sage)', levelName: 'Bhakt', currentLevel: 3, nextLevelPoints: 700, badgeColor: 'from-purple-400 to-indigo-600' };
  if (totalKarma >= 100) return { title: 'Jigyasu (Seeker)', levelName: 'Seeker', currentLevel: 2, nextLevelPoints: 300, badgeColor: 'from-emerald-400 to-teal-600' };
  return { title: 'Vidyarthi (Novice)', levelName: 'Beginner', currentLevel: 1, nextLevelPoints: 100, badgeColor: 'from-slate-400 to-gray-600' };
};

// Background API Sync helper
const syncProgress = async (payload: any, token: string) => {
  try {
    await fetch('/api/v1/users/progress', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to sync progress", err);
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isGuest: false,
      user: null,

      login: (userData) =>
        set({
          isAuthenticated: true,
          isGuest: false,
          user: userData
        }),

      updateProfileSync: async () => {
        const user = get().user;
        if (!user || get().isGuest || !user.token) return;
        try {
          const res = await fetch('/api/v1/users/profile', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          if (res.ok) {
            const data = await res.json();
            set({ user: { ...data, token: user.token } });
          }
        } catch (err) {
          console.error("Failed to sync profile on load", err);
        }
      },

      setGuestMode: () =>
        set({
          isAuthenticated: true,
          isGuest: true,
          user: { 
            _id: 'guest', name: 'Seeker', role: 'user', points: 0, shlokasRead: 0, quizzesCompleted: 0, quizzesMastered: [], mapLocationsExplored: 0, storiesCompleted: 0, reelsWatched: 0, reelsSaved: [], streak: 1,
            exploredModules: { scripture: 0, festivals: 0, stories: 0, quizzes: 0 } 
          }
        }),

      logout: () =>
        set({ isAuthenticated: false, isGuest: false, user: null }),

      updatePoints: (points) =>
        set((state) => {
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ pointsToAdd: points }, state.user.token);
          }
          return { user: state.user ? { ...state.user, points: state.user.points + points } : null };
        }),

      addXP: (amount) => 
        set((state) => {
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ pointsToAdd: amount }, state.user.token);
          }
          return { user: state.user ? { ...state.user, points: state.user.points + amount } : null };
        }),

      incrementShlokasRead: () =>
        set((state) => {
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ shlokasReadAdd: 1, pointsToAdd: 10 }, state.user.token);
          }
          return {
            user: state.user ? { 
              ...state.user, 
              shlokasRead: state.user.shlokasRead + 1, 
              points: state.user.points + 10,
              exploredModules: { ...state.user.exploredModules, scripture: (state.user.exploredModules?.scripture || 0) + 1 }
            } : null
          };
        }),

      incrementQuizzesCompleted: () =>
        set((state) => {
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ pointsToAdd: 50 }, state.user.token);
          }
          return {
            user: state.user ? { 
              ...state.user, 
              quizzesCompleted: state.user.quizzesCompleted + 1, 
              points: state.user.points + 50,
              exploredModules: { ...state.user.exploredModules, quizzes: (state.user.exploredModules?.quizzes || 0) + 1 }
            } : null
          };
        }),

      masterQuiz: (quizId, karmaPoints) => 
        set((state) => {
          if (!state.user) return state;
          const currentMastered = state.user.quizzesMastered || [];
          const isFirstTime = !currentMastered.includes(quizId);
          if (state.user && !state.isGuest && state.user.token && isFirstTime) {
             syncProgress({ masterQuizId: quizId, pointsToAdd: karmaPoints }, state.user.token);
          }
          return {
            user: {
              ...state.user,
              quizzesMastered: isFirstTime ? [...currentMastered, quizId] : currentMastered,
              quizzesCompleted: state.user.quizzesCompleted + 1,
              points: state.user.points + karmaPoints,
              exploredModules: { ...state.user.exploredModules, quizzes: (state.user.exploredModules?.quizzes || 0) + 1 }
            }
          };
        }),

      incrementMapExplored: () =>
        set((state) => {
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ pointsToAdd: 20 }, state.user.token);
          }
          return { user: state.user ? { ...state.user, mapLocationsExplored: state.user.mapLocationsExplored + 1, points: state.user.points + 20 } : null };
        }),

      incrementStoriesCompleted: () =>
        set((state) => {
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ storiesCompletedAdd: 1, pointsToAdd: 20 }, state.user.token);
          }
          return {
            user: state.user ? { 
              ...state.user, 
              storiesCompleted: (state.user.storiesCompleted || 0) + 1, 
              points: state.user.points + 20,
              exploredModules: { ...state.user.exploredModules, stories: (state.user.exploredModules?.stories || 0) + 1 }
            } : null
          };
        }),

      incrementReelsWatched: () =>
        set((state) => {
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ reelsWatchedAdd: 1, pointsToAdd: 5 }, state.user.token);
          }
          return {
            user: state.user ? { 
              ...state.user, 
              reelsWatched: (state.user.reelsWatched || 0) + 1, 
              points: state.user.points + 5
            } : null
          };
        }),

      saveReel: (reelId) =>
        set((state) => {
          if (!state.user) return state;
          const currentSaved = state.user.reelsSaved || [];
          if (currentSaved.includes(reelId)) return state; // Already saved
          if (state.user && !state.isGuest && state.user.token) {
             syncProgress({ saveReelId: reelId, pointsToAdd: 10 }, state.user.token);
          }
          return {
            user: { 
              ...state.user, 
              reelsSaved: [...currentSaved, reelId],
              points: state.user.points + 10 // small reward for engaging deeply
            }
          };
        }),

      getSacredTitle: () => {
        const user = get().user;
        if (!user) return { title: 'Wanderer', levelName: 'Vagrant', currentLevel: 0, nextLevelPoints: 100, badgeColor: 'from-gray-500 to-gray-700' };
        return calculateTitle(user.points);
      },

      getEarnedBadges: () => {
        const user = get().user;
        if (!user) return [];

        const badges = [];
        const date = new Date().toLocaleDateString();

        // Base badge
        badges.push({ id: 'b1', name: 'Awakening', icon: 'Sparkles', description: 'Began the spiritual journey.', date, color: 'from-primary to-orange-500' });

        // Shlokas
        if (user.shlokasRead >= 1) badges.push({ id: 'b2', name: 'Sanskrit Initiate', icon: 'BookOpen', description: 'Explored the first Shloka.', date, color: 'from-blue-400 to-cyan-500' });
        if (user.shlokasRead >= 10) badges.push({ id: 'b3', name: 'Gita Scholar', icon: 'Award', description: 'Deep dived into 10+ Shlokas.', date, color: 'from-yellow-400 to-amber-600' });
        if (user.shlokasRead >= 50) badges.push({ id: 'b_shloka_50', name: 'Vedic Master', icon: 'BookOpen', description: 'Mastered 50+ Shlokas.', date, color: 'from-red-500 to-orange-600' });

        // Epics / Quizzes
        if (user.quizzesMastered && user.quizzesMastered.length > 0) {
            user.quizzesMastered.forEach((quizId) => {
                const quizData = masterQuizzes.find(q => q.id === quizId);
                if (quizData) {
                    badges.push({ 
                        id: `quiz_master_${quizId}`, 
                        name: quizData.badgeReward.name, 
                        icon: quizData.badgeReward.icon, 
                        description: `Mastered the ${quizData.title} Epic.`, 
                        date, 
                        color: quizData.badgeReward.color 
                    });
                }
            });
        } else if (user.quizzesCompleted >= 1) {
             badges.push({ id: 'b4', name: 'Knowledge Tester', icon: 'Brain', description: 'Passed a Dharma Quiz.', date, color: 'from-purple-400 to-fuchsia-600' });
        }

        if (user.quizzesMastered && user.quizzesMastered.length >= 5) {
             badges.push({ id: 'b5', name: 'Mahakavya Master', icon: 'Trophy', description: 'Mastered all 5 classical epics.', date, color: 'from-rose-400 to-red-600' });
        }

        // Map
        if (user.mapLocationsExplored >= 1) badges.push({ id: 'b6', name: 'Pilgrim', icon: 'Map', description: 'Discovered a sacred site.', date, color: 'from-emerald-400 to-green-600' });
        if (user.mapLocationsExplored >= 10) badges.push({ id: 'b_map_10', name: 'Tirth Yatri', icon: 'Map', description: 'Explored 10 sacred sites.', date, color: 'from-teal-400 to-emerald-600' });

        // Stories
        const storiesCount = user.exploredModules?.stories || user.storiesCompleted || 0;
        if (storiesCount >= 1) badges.push({ id: 'b_story_1', name: 'Storyteller', icon: 'ScrollText', description: 'Read a Vedic story.', date, color: 'from-amber-400 to-orange-500' });
        if (storiesCount >= 10) badges.push({ id: 'b_story_10', name: 'Mythologist', icon: 'ScrollText', description: 'Completed 10 Vedic stories.', date, color: 'from-orange-500 to-red-600' });

        // Festivals
        const festCount = user.exploredModules?.festivals || 0;
        if (festCount >= 1) badges.push({ id: 'b_fest_1', name: 'Cultural Explorer', icon: 'Calendar', description: 'Explored a festival.', date, color: 'from-pink-400 to-rose-500' });

        // Reels
        if ((user.reelsWatched || 0) >= 10) badges.push({ id: 'b_reels_10', name: 'Visual Seeker', icon: 'PlaySquare', description: 'Watched 10+ Cultural Reels.', date, color: 'from-violet-400 to-purple-600' });
        if ((user.reelsSaved?.length || 0) >= 5) badges.push({ id: 'b_reels_saved_5', name: 'Wisdom Collector', icon: 'Bookmark', description: 'Saved 5+ pieces of wisdom.', date, color: 'from-sky-400 to-blue-600' });

        // Karma & Streak
        if (user.points >= 500) badges.push({ id: 'b_karma_500', name: 'Karma Yogi', icon: 'Flame', description: 'Earned 500 Karma Points.', date, color: 'from-orange-400 to-red-500' });
        if (user.streak >= 7) badges.push({ id: 'b_streak_7', name: 'Devoted Seeker', icon: 'Flame', description: 'Maintained a 7-day streak.', date, color: 'from-red-400 to-rose-600' });

        return badges;
      }
    }),
    {
      name: 'sanskruti-auth-storage', // saves to local storage
    }
  )
);
