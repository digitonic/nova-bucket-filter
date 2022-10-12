<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <filter-row
                    v-for="(filter, index) in filterRows"
                    :key="filter.id"
                    :index="index"
                    v-on:removeFilterRow="removeFilter"
                    :value="filterRows[index]"
            ></filter-row>
            <div class="flex" v-if="filterRows && filterRows.length < 1">
                <button
                    class="btn btn-default btn-primary flex justify-center mr-2"
                    @click.prevent="addRow()"
                >
                    Add
                </button>
            </div>
            <div class="flex"  v-if="filterRows && filterRows.length > 0">
                <button
                    class="btn btn-default btn-primary flex justify-center mr-2"
                    @click.prevent="addRow('and')"
                >
                    And
                </button>
                <button
                    class="btn btn-default btn-primary flex justify-center"
                    @click.prevent="addRow('or')"
                >
                    Or
                </button>
            </div>
        </template>
    </default-field>
</template>
<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data() {
        return {
            typeOptions: [{value: 'round', label: 'round'}, {value: 'attribute', label: 'attribute'}],
            rounds: null,
            filterRows: [{ id: this.generateUuid(), operator: null, type: null, filter: null}],
            componentKey: 0,
        }
    },

    mounted() {
        if (this.value) {
            this.filterRows = JSON.parse(this.value);
        }
    },

    watch: {
        filterRows: {
            handler(val) {
                this.value = JSON.stringify(this.filterRows);
                this.nullOperatorIfOnlyOneFilter();
            },
            deep: true
        }
    },

    methods: {
        generateUuid() {
            return Math.random().toString(36).substr(2, 10);
        },

        addRow(operator) {
            this.filterRows.push({id: this.generateUuid(), operator: operator, type: null, filter: null});
        },

        removeFilter(val) {
            this.filterRows.splice(val.index, 1);
        },

        nullOperatorIfOnlyOneFilter() {
            this.filterRows.forEach((item, index) => {
                if (index === 0) {
                    item.operator = null;
                }
            });
        },
        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, this.value || JSON.stringify(this.filterRows))
        },

        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            this.value = value
        },
    },
}
</script>
