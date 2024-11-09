import { ref } from 'vue';

export const searchTerm = ref<string>('');
let debounceTimer: number | undefined = undefined;

export function setSearchTerm(query: string) {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    searchTerm.value = query;
  }, 500);
}
