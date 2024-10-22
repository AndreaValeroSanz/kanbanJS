function dragInit() {
    dragula([
        document.querySelector('#on-hold'),
        document.querySelector('#not-started'),
        document.querySelector('#column-3'),
    ]);
}