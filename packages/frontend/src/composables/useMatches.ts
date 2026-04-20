import { ref, onMounted } from 'vue';
import type { ParsedMatch } from '@sc-test/shared';
import { useSocket } from './useSocket';

export function useMatches() {
  const matches = ref<ParsedMatch[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const { socket, connected } = useSocket();

  async function fetchMatches() {
    try {
      loading.value = true;
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${apiUrl}/matches`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      matches.value = await res.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load matches';
    } finally {
      loading.value = false;
    }
  }

  socket.on('score:update', (updated: ParsedMatch) => {
    const idx = matches.value.findIndex((m) => m.id === updated.id);
    if (idx !== -1) {
      matches.value[idx] = updated;
    } else {
      matches.value.push(updated);
    }
  });

  onMounted(fetchMatches);

  return { matches, loading, error, connected, socket, refetch: fetchMatches };
}
