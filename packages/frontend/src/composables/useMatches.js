import { ref, onMounted } from 'vue';
export function useMatches() {
    const matches = ref([]);
    const loading = ref(true);
    const error = ref(null);
    async function fetchMatches() {
        try {
            loading.value = true;
            const apiUrl = import.meta.env.VITE_API_URL || '/api';
            const res = await fetch(`${apiUrl}/matches`);
            if (!res.ok)
                throw new Error(`HTTP ${res.status}`);
            matches.value = await res.json();
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'Failed to load matches';
        }
        finally {
            loading.value = false;
        }
    }
    onMounted(fetchMatches);
    return { matches, loading, error, refetch: fetchMatches };
}
