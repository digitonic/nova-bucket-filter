<template>
    <div class="filter-row-container">
        <div class="overlay" v-if="loading"></div>
        <select-control
                v-if="rounds"
                :id="'type'"
                :dusk="'type'"
                v-model="filter.operator"
                class="w-full form-control form-select mb-2 "
                :class="'sdf'"
                :options="[{label: 'is', value: 'is'}, {label: 'is not', value: 'is not'}]"
                :disabled="false"
        >
            <option value="" selected>{{ __('Select Operator') }}</option>
        </select-control>
        <select-control
                v-if="rounds"
                :id="'type'"
                :dusk="'type'"
                v-model="filter.resource_id"
                class="w-full form-control form-select mb-2 "
                :class="'sdf'"
                :options="rounds"
                :disabled="false"
        >
            <option value="" selected>{{ __('Choose Round') }}</option>
        </select-control>
    </div>
</template>
<style>
    .filter-row-container {
        position: relative;
    }
    .overlay {
        width: 100%;
        height: 100%;
        min-height: 50px;
        background: rgba(1, 8, 39, 0.2);;
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
<script>
    import {Minimum} from 'laravel-nova'
    export default {
        props: ['value'],

        data() {
            return {
                rounds: null,
                loading: false,
                filter: {
                    operator: null,
                    resource_id: null
                },
            }
        },

        mounted() {
            if (this.value.filter) {
                this.filter.operator = this.value.filter.operator;
                this.filter.resource_id = this.value.filter.resource_id;
            }
            this.getResources('rounds');
        },

        watch: {
            filter: {
                handler: function (val) {
                    this.value.filter = this.filter;
                },
                deep: true
            }
        },

        methods: {
            getResources(resourceName) {
                this.loading = true

                this.$nextTick(() => {
                    return Minimum(
                        Nova.request().get('/nova-api/' + resourceName),
                        500
                    ).then(({ data }) => {
                        this.rounds = this.mapFieldsSelect(data.resources);
                        this.loading = false
                    })
                })
            },

            mapFieldsSelect(records) {
                return records.map((round) => {
                    const fields = round.fields.map((field) => {
                        return {
                            [field.attribute]: field.value,
                        };
                    });

                    return Object.assign(...fields);
                }).map((record) => {
                    return {label: record.name, value: record.id}
                });
            },
        },
    }
</script>
