function handleFilter(param, value) {
    $(`#${param}`).val(value);
    refreshFilter()

}