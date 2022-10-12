Nova.booting((Vue, router, store) => {
    Vue.component('index-bucket-filter', require('./components/IndexField'))
    Vue.component('detail-bucket-filter', require('./components/DetailField'))
    Vue.component('form-bucket-filter', require('./components/FormField'))
    Vue.component('filter-row', require('./components/FilterRow'))
    Vue.component('per-round', require('./components/FilterTypes/PerRound'))
});
