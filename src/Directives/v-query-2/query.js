const Query = class {

    constructor(binding, navigate) {
        this.binding = binding;

        localStorage.removeItem(binding.arg)

        this.updateParameters()

        this.eventListener = (e) => {
            this.update(e, navigate)
        }
    }

    bind(element) {
        this.fill(element)

        element.addEventListener(
            this.getEventType(element),
            this.eventListener
        )
    }

    unbind(element,) {
        element.removeEventListener(
            this.getEventType(element),
            this.eventListener
        )
    }

    get(key) {
        if(!key) {
            return ''
        }

        if(key.includes('[]')) {
            return this.parameters.getAll(key)
        }

        return this.parameters.get(key);
    }

    fill(element) {
        let tagname = element.tagName.toLowerCase();

        if(tagname === 'button') {
            this.fillButton(element)
        } else if(['checkbox', 'radio', 'button'].includes(element.type)) {
            element['checked'] = this
                .arrayWrap(this.get(element.name))
                .includes(element.value)
        } else if (tagname === 'select') {
            this.fillSelect(element)
        } else {
            element['value'] = this.get(element.name) ?? '';
        }

        return this;
    }

    fillButton(element) {
        let active = this
            .arrayWrap(this.get(element.name))
            .includes(element.value)

        document
            .querySelectorAll(`[name="${element.name}"]`)
            .forEach(el => {
                if (el.value === element.value && active || !active && !el.value) {
                    el.classList.add('active')
                } else {
                    el.classList.remove('active')
                }
            })
    }

    fillSelect(element) {
        let lastIndex = element.options.length - 1;

        if (element.options[lastIndex] && element.options[lastIndex].dataset.name) {

            Array.prototype.forEach.call(element.options, (option, index) => {
                if (option.dataset.name) {
                    let urlValue = this.get(option.dataset.name);
                    option.selected = false;
                    if (urlValue && urlValue === option.value) {
                        element.name = option.dataset.name;
                        element.value = option.value
                        option.selected = true;
                    }
                }
            })
        } else {
            element['value'] = this.get(element.name) ?? '';
        }
    }

    arrayWrap(value) {
        if(! value) {
            return []
        }

        if(value instanceof Array) {
            return value;
        }

        return [value];
    }

    getEventType(element) {
        if(element.tagName.toLowerCase() === 'button') {
            return 'click';
        } else if(['checkbox', 'radio', 'select-one', 'select-multiple'].includes(element.type)) {
            return 'change';
        } else {
            return 'input';
        }
    }

    update(event, navigate) {

        let shouldDelete;
        let payload = this.payload();
        let key = event.target.name.replace('[]', '');
        let isMultiple = event.target.name.includes('[]');

        if (event.target.tagName.toLowerCase() === 'select'
            && event.target.options[event.target.selectedIndex].dataset.name) {
            key = event.target.options[event.target.selectedIndex].dataset.name
            event.target.name = key;
            Array.prototype.forEach.call(event.target.options, (option, index) => {
                delete payload[option.dataset.name]
            })
        }

        if(['checkbox', 'radio'].includes(event.target.type)) {
            shouldDelete = ! event.target['checked'];
        } else {
            shouldDelete = ! event.target.value;
        }

        if(shouldDelete && isMultiple) { // delete (multiple)
            payload[key].splice(payload[key].indexOf(event.target.value), 1)
        } else if(shouldDelete) { // delete (single)
            delete payload[event.target.name]
        } else if(isMultiple && payload.hasOwnProperty(key)) { // add (multiple / existing)
            payload[key].push(event.target.value);
        } else if(isMultiple) { // add (multiple / first)
            payload[key] = [event.target.value];
        } else { // add (single)
            payload[key] = event.target.value;
        }

        payload = this.removeChildren(event.target, payload);

        if(this.binding.arg) {
            localStorage.setItem(
                this.binding.arg,
                new URLSearchParams(payload).toString()
            )
        }

        if(this.binding.value) {
            this.binding.value(payload, navigate);
        } else {
            navigate(payload);
        }
    }

    updateParameters() {
        if(this.binding.arg) {
            this.parameters = (new URLSearchParams(localStorage.getItem(this.binding.arg)))
        } else {
            this.parameters = (new URLSearchParams(window.location.search))
        }
    }

    payload() {
        let payload = {};

        this.updateParameters()

        this.parameters.forEach((value, key) => {
            // was causing {null: ''} in localstorage
            if(key === 'null') {
                return
            }

            let notMultiple = ! key.includes('[]');

            key = key.replace('[]', '');

            if(notMultiple) {
                payload[key] = value;
            } else if(payload.hasOwnProperty(key)) {
                payload[key].push(value)
            } else {
                payload[key] = [value];
            }
        })

        if(this.binding.arg) {
            localStorage.setItem(
                this.binding.arg,
                new URLSearchParams(payload).toString()
            )
        }

        return payload;
    }

    removeChildren(element, payload) {
        if(!element.dataset.children) {
            return payload;
        }

        element.dataset.children.split(',').forEach(child => {
            delete payload[child.trim()]
        })

        return payload
    }
}

export default Query;
