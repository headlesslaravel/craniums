let str_capitalize = (label) => {
    return label.replaceAll('_', ' ')
        .split(' ')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(' ')
}

export {
    str_capitalize
}
