export default {
    install: (app, options) => {
        app.directive('click-outside', {
            beforeMount: (el, binding) => {
                el.classList.add('click-outside');
                el.clickOutsideEvent = (event) => {
                    if (
                        event.target.classList.contains('click-outside') &&
                        event.target != el
                    ) {
                        binding.value();
                    } else if (!(el == event.target || el.contains(event.target))) {
                        binding.value();
                    }
                };

                document.body.addEventListener('click', el.clickOutsideEvent);
            },
            unmounted: (el) => {
                document.body.removeEventListener('click', el.clickOutsideEvent);
            },
        });
    },
};
