export default {
    name: 'media-app',
    template: '#media-app',
    methods: {
        /* Set the full height on the app container */
        setFullHeight() {
            this.fullHeight = window.innerHeight - this.$el.offsetTop + 'px';
        },
    },
    data() {
        return {
            // The full height of the app in px
            fullHeight: '',
        };
    },
    mounted() {
        // Initial load the data
        this.$store.dispatch('getContents', this.$store.state.selectedDirectory);

        // Set the full height and add event listener when dom is updated
        this.$nextTick(() => {
            this.setFullHeight();
            // Add the global resize event listener
            window.addEventListener('resize', this.setFullHeight)
        });
    },
    beforeDestroy() {
        // Add the global resize event listener
        window.removeEventListener('resize', this.setFullHeight)
    },
}
