import { DeityProfile } from '../../types/familyTree';

export const deityProfiles: Record<string, DeityProfile> = {
  parabrahman: {
    id: 'parabrahman',
    name: 'Parabrahman',
    aliases: ['The Supreme Reality', 'The Absolute'],
    fullLore: 'Beyond Form, Beyond Time, Beyond Space. The Infinite, Eternal Consciousness from which all creation springs and into which it dissolves.',
  },
  brahma: {
    id: 'brahma',
    name: 'Brahma',
    aliases: ['The Creator', 'Prajapati'],
    consorts: ['Saraswati'],
    fullLore: 'The creator of the physical universe, born from the lotus originating from the navel of Lord Vishnu.',
  },
  vishnu: {
    id: 'vishnu',
    name: 'Vishnu',
    aliases: ['The Preserver', 'Narayana'],
    consorts: ['Lakshmi'],
    fullLore: 'The preserver and protector of the universe, maintaining cosmic order (Dharma).',
  },
  shiva: {
    id: 'shiva',
    name: 'Shiva',
    aliases: ['The Destroyer', 'Mahadeva'],
    consorts: ['Parvati', 'Sati'],
    fullLore: 'The transformer of the universe, representing cosmic energy and the dissolution necessary for rebirth.',
  },
  // We can expand thousands of these in Phase 2
};
