<template>
    <div class="row filter-row pb-4 mb-4 border-b border-blue-100">
        <p class="text-60 font-bold mb-2">{{value.operator}}</p>
        <select-control
            :id="'type'"
            :dusk="'type'"
            v-model="value.type"
            class="w-full form-control form-select mb-2 "
            :class="'sdf'"
            :options="typeOptions"
            :disabled="false"
        >
            <option value="" selected>{{ __('Choose Type of filter') }}</option>
        </select-control>
        <per-round
            v-if="value.type === 'round'"
            :value="value"
        ></per-round>
        <button
            class="btn btn-default btn-danger flex items-center justify-center mt-2"
            @click.prevent="removeRow(id)"
        >
            <icon type="delete" class="text-white" />
        </button>
    </div>
</template>
<script>
    export default {
        props: ['id', 'index', 'value'],

        data() {
            return {
                typeOptions: [
                    {value: 'round', label: 'round'},
                    // {value: 'attribute', label: 'attribute'}, // @Todo
                    // {value: 'prediction', label: 'prediction'}, // @Todo
                    // {value: 'team', label: 'team'}, // @Todo
                ],
                rounds: null,
            }
        },

        watch: {
            'value.type'() {
               this.value.filter = null;
            }
        },

        methods: {
            removeRow() {
                this.$emit('removeFilterRow', {index: this.index});
            },
        },
    }
</script>
