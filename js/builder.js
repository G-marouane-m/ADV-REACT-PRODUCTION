jQuery("body").on("click", "#is__sticky", function () {
    console.log("stickyyy");
    var _this = jQuery(this).is(":checked");

    if (_this == false) {
        $('.container__sticky').slideUp();
    } else {
        $('.container__sticky').slideDown()
    }


});


jQuery("body").on("click", ".sticky__", function () {
    var _this = $(this);
    $(".sticky__").removeClass("blue-highlight");
    _this.addClass("blue-highlight");
    var data_width = _this.data("width");
    var data_height = _this.data("height");
    var data_position = _this.data("position");

    // set input values:
    $("input[name='desktop_canvas_width']").val(parseInt(data_width));
    $("input[name='desktop_canvas_height']").val(parseInt(data_height));
    // Preserve the value of selected postion for form subiting....
    $("#selected_position").val(data_position);
});

$(document).on('click', '.adv__models--item', function (e) {
    let template_id = $(this).data("id");

    var data_target = "";
    data_target = $(this).hasClass("t__vide"); // true - false
    debug && console.log(data_target);

    if (data_target == true) {
        debug && console.log("data_target", data_target)
        $("#modalNew").modal('show');
        return;
    }

    if (e.screenX && e.screenX != 0 && e.screenY && e.screenY != 0) {
        $('#changeTemplate').modal('show');
        $("#buttonChangeTemplate").click(function () { // Click change template
            $('#changeTemplate').modal('hide');
            find_template(parseInt(template_id), "desktop").then((template) => {
                debug && console.log(template);
                if (template == undefined) return;
                // Load html + Css Elements.
                $('#canvas').empty().append(template.html);
                $('#canvas').css({
                    "width": template.width,
                    "height": template.height,
                    "border": template.border,
                    "border-radius": template.radius,
                    "box-shadow": template.shadow,
                    "background-color": template.backgroundColor
                });
                $('#canvas img').css({ "top": template.top, "left": template.left });
                $('#canvas .ad__overlay').css({ "background-image": template.overlay });
                $('.wrapper__canvas').attr("data-width", template.width);
                $('.wrapper__canvas').attr("data-height", template.height);
                template.css.map(class_css => {
                    if (class_css.element_class == "") return;
                    $("." + class_css.element_class).css(class_css);
                    // addrule
                });
                // end load html + css elements
            });
        });
    } else {
        // Last canvas template for mobile
        find_template(parseInt(template_id), "desktop").then(async (template) => {
            debug && console.log(template);
            // Load html + css elements 
            $('#canvas').append(template.html);
            // $('#canvas').append(html);
            $('#canvas').css({ "width": template.width, "height": template.height });
            $('#canvas img').css({ "top": template.top, "left": template.left });
            template.css.map(class_css => {
                if (class_css.element_class == "") return;
                $("." + class_css.element_class).css(class_css);
            });
            // end load html + css elements
            // $('.dr').draggable();
        });
    }

    // Update device button info for selected selected device...
    $(".DeviceButton-desktop").attr('data-id', template_id);
    $(".DeviceButton-mobile").attr('data-id', template_id);
    $('.DeviceButton_b').removeClass("active");
    $(".DeviceButton-desktop").addClass('active');
    // Resize and draggable init
    interact('.dr')
        .draggable({
            onmove: dragMoveListener
        })
        .resizable({
            preserveAspectRatio: false,
            edges: { left: true, right: true, bottom: true, top: true }
        }).on('resizemove', resizeMoveListener);
});


// RADUIS

jQuery(".container__borderRadius button").click(function () {
    jQuery(".container__borderRadius button").removeClass("active");
    jQuery(this).addClass("active");
});



// BACKGROUND OVERLAY

jQuery("#opacity__bg_overlay").on("input propertychange", function () {
    jQuery(".bg__overlay").css("opacity", jQuery(this).val() + "%");
    jQuery("#opacity__bg_overlay_text").text(jQuery(this).val() + '%');
});


jQuery("#Blur__bg_overlay").on("input propertychange", function () {

    jQuery(".bg__overlay").css("backdrop-filter", "blur(" + jQuery(this).val() + "px)");
    jQuery("#Blur__bg_overlay_text").text(jQuery(this).val() + 'px');
});


// PREVIEW CLICK

jQuery("#preview").click(function () {
    localStorage.removeItem('view');
    localStorage.removeItem('overlay');
    localStorage.removeItem('link');
    // animation calass: ()
    var theClass = jQuery('#canvas').attr("class").match(/animate__[\w-]*\b/);
    // alert(theClass);
    localStorage.setItem("animation", theClass);
    jQuery('#canvas').removeClass(theClass);

    var view_html = jQuery('<div>').append(jQuery("#canvas").clone()).html();
    var overlay_html = jQuery('<div>').append(jQuery(".bg__overlay").clone()).html();
    var link_ad = jQuery("#link__adv").val();
    console.log(link_ad);
    // console.log(view_html);

    localStorage.setItem("view", view_html);
    localStorage.setItem("link", link_ad);
    localStorage.setItem("overlay", overlay_html);
});
// SHOW RULES SETTINGS
jQuery("#cta__rules").click(function () {
    jQuery(".display__rules").addClass("show");
})

jQuery(".main__work .nav-item:not(.cta__rules)").click(function () {
    jQuery(".display__rules").removeClass("show");
});

jQuery(".collaps__left").click(function () {
    jQuery(this).toggleClass("rotate");
    jQuery(".colla__btn_l").toggleClass("toggle_");
    jQuery(".main__work").toggleClass("collapse__left");
});

jQuery(".collaps__right").click(function () {
    jQuery(this).toggleClass("rotate");
    jQuery(".colla__btn_r").toggleClass("toggle_");
    jQuery(".stg__adv").toggleClass("collapse__right");
});

jQuery(".main__work .nav-link").click(function () {

    var content = jQuery("#myTabContent");

    if (content.hasClass("collapse__left")) {

        jQuery("#myTabContent").removeClass("collapse__left");

    }
});

// jQuery("#name__adv").click(function() {

// });

jQuery("body").on('click', '#adv__label .fe', function () {

    let rr_input = jQuery("#name__adv");

    if (rr_input.prop('readonly')) {
        rr_input.prop('readonly', false).select();
    } else {
        rr_input.prop('readonly', true);
    }

    jQuery("#adv__label .fe").toggleClass('fe-check');

});


jQuery('#name__adv').bind('input propertychange', function () {
    jQuery('.current__ad').html(jQuery(this).val());
});

jQuery(".how_current").click(function () {

    jQuery(this).parent("tr").find(".how_current").removeClass("bg-primary-soft");
    jQuery(this).addClass("bg-primary-soft");
    console.log("tesssssssst");
});




