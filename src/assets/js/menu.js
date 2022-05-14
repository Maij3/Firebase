import $ from 'jquery';

export const Menu = () => {
    $(document).ready(function() {
        $("#btn-nav").click((e) => {
            e.stopPropagation();
            $(".collapse").slideToggle("fast");
        })
        $("a.nav-link").click((e) => {
            e.stopPropagation();
            $(".collapse").slideToggle("fast");
        })
        $(".navbar-brand").click((e) => {
            e.stopPropagation();
            $(".collapse").slideToggle("fast");
        })

    })
}

Menu();
