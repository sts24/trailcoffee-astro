import Alpine from 'alpinejs';
import focus from '@alpinejs/focus'

Alpine.plugin(focus);
 
Alpine.data('search', () => {
  return {
    searchTerm: '',
    searchIndex: [],
    searchResults: [],
    init() {

      // get place data for search
      fetch('/data/places.json')
				.then(response => response.json())
				.then(res => {
					this.searchIndex = res;
				});

      this.$watch('searchTerm', (value) => {
        this.onSearch(value);
      });
    },
    searchInput: {
      'x-model': 'searchTerm',
    },
    onSearch(value){
      if(value.length > 3){
        const searchData = JSON.parse(JSON.stringify(this.searchIndex));
        this.searchResults = searchData.filter((item) => {
          return item.fullname.toLowerCase().includes(value) == true;
        });
      }
    },
    searchResultsContainer: {
      'x-if'(){ return this.searchResults.length > 0; },
    }
  }
});
