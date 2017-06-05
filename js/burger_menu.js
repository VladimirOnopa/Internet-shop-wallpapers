//click outside the menu
$(document).on("click", "#layer_not_active", function() {
    burgerMenuButtonClose();
    filterMenuButtonOpenMenuButtonClose();
});

function burgerMenuButtonOpen() {
    mob_device_side_menu.classList.add("slide_menu");
    mobile_top_panel.classList.add("close_menu");
    page.classList.add("close_menu");
    document.querySelector("#layer_not_active").style.display = "block";
    document.body.style.overflow = "hidden";
}
function burgerMenuButtonClose() {
    mob_device_side_menu.classList.remove("slide_menu");
    mobile_top_panel.classList.remove("close_menu");
    page.classList.remove("close_menu");
    document.querySelector("#layer_not_active").style.display = "none";
    document.body.style.overflow = "visible";
}
function filterMenuButtonOpen() {
    mob_device_side_menu_filter.classList.add("slide_menu");
    mobile_top_panel.classList.add("close_menu");
    page.classList.add("close_menu");
    document.querySelector("#layer_not_active").style.display = "block";
    document.body.style.overflow = "hidden";
}
function filterMenuButtonOpenMenuButtonClose() {
    mob_device_side_menu_filter.classList.remove("slide_menu");
    mobile_top_panel.classList.remove("close_menu");
    page.classList.remove("close_menu");
    document.querySelector("#layer_not_active").style.display = "none";
    document.body.style.overflow = "visible";
}




