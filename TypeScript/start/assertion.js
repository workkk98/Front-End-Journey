function isFish(animal) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
