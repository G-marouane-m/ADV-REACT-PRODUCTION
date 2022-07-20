// ADDED FIRST BY AYOUB ARBOUCHI:: DUE TO DATE 13 Aug-2020
(function async($) {
    const debug = true;

    // ******************** LOADING TEMPLATES DATA ***************
    const init_templates = async () => {
        var templates_path = "./assets/json/templates.json";
        var templates_arr = [];

        await $.getJSON(templates_path, function (data) {
            templates_arr = data;
        });

        debug && console.log("templates_arr ready!", templates_arr);

        html_templates = '';
        templates_arr.map((template) => {
            html_templates += '<div class="card card-sm mb-3 overflow-hidden adv__models--item" data-id="' + template.template_id + '"><img src="' + template.background + '" alt="..." class="card-img-top" /></div>';
        });
        $("#presets").append(html_templates);
        localStorage.setItem('templatesPreset', JSON.stringify(templates_arr));

        $('#presets div:first-child').trigger('click');
    }
    localStorage.clear();
    init_templates();
    // **************** END LOADING TEMPLATES DATA ***************

    // ******************* FIND TEMPLATE ******************
    const find_template = (template_id) => {
        return new Promise((resolve, reject) => {
            let templates_arr = JSON.parse(localStorage.getItem('templatesPreset'));
            let template_found = templates_arr.find(tmplt => tmplt.template_id == template_id);
            resolve(template_found);
        })
    }
    // ******************* END FIND TEMPLATE *********************


    // ******************* CLICK CHOOSE TEMPLATE ******************
    $(document).on('click', '.adv__models--item', function (e) {
        var data_target = "";
        data_target = $(this).hasClass("t__vide");// true - false
        debug && console.log(data_target);

        if (data_target == true) {
            debug && console.log("data_target", data_target)
            $("#modalNew").modal('show');
            // $("#canvas").html("");
            // $(".canvas").removeClass("t1");
            return;
        }

        var template_id = $(this).data("id");
        if (e.screenX && e.screenX != 0 && e.screenY && e.screenY != 0) {
            $('#changeTemplate').modal('show');
            $("#buttonChangeTemplate").click(function () { // click change template
                $('#changeTemplate').modal('hide');

                find_template(parseInt(template_id)).then((template) => {
                    debug && console.log(template);
                    // Load html + css elements 
                    $('#canvas').empty().append(template.html);
                    $('#canvas').css({ "width": template.width, "height": template.height });
                    $('#canvas img').css({ "top": template.top, "left": template.left });

                    template.css.map(class_css => {
                        if (class_css.element_class == "") return;
                        $("." + class_css.element_class).css(class_css);
                        // addrule
                    });
                    // end load html + css elements
                    $('.dr').draggable();
                });
            });
        } else {
            find_template(parseInt(template_id)).then(async (template) => {
                debug && console.log(template);
                // *** Code below need to be here  ****
                //   = await $.load( "./assets/html_assets/popup_banner.html");
                // let html = await $.get("./assets/html_assets/popup_banner.html", function (my_var) {
                //     // my_var contains whatever that request returned
                //     return my_var;
                // }, 'html');  // or 'text', 'xml', 'more'
                // $('.ad__work').append(html);
                // return;
                // console.log(dd);
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
                $('.dr').draggable();
            });
        }
    });
    // ******************* CLICK CHOOSE TEMPLATE *****************

    // ******************** LOADING Elements DATA ****************
    const init_elements = async () => {
        var elements_path = "./assets/json/elements.json";
        var elements_arr = [];

        await $.getJSON(elements_path, function (data) {
            elements_arr = data;
        });

        debug && console.log("elements_arr ready!", elements_arr);

        texts_html_element = '';
        model_text_html_element = '';
        button_html_element = '';
        elements_arr.map((elmnt) => {
            if (elmnt.type == "title_text") {
                texts_html_element += elmnt.preview;
            }
            if (elmnt.type == "model_text") {
                model_text_html_element += elmnt.preview;
            }
            if (elmnt.type == "button") {
                button_html_element += elmnt.preview;
            }
            // html_elements += '<div class="card card-sm mb-3 overflow-hidden adv__models--item" data-id="' + template.template_id + '"><img src="' + template.background + '" alt="..." class="card-img-top" /></div>';
        });
        debug && console.log(texts_html_element);
        $("#texts_presets").empty().append(texts_html_element);
        $("#models_presets").empty().append(model_text_html_element);
        localStorage.setItem('elementsPreset', JSON.stringify(elements_arr));
        // localStorage.setItem('elements_model_texts_Preset', JSON.stringify(elements_arr));
    }
    // ******************** LOADING Elements DATA ****************
    init_elements();

    // ******************* FIND ELEMENT **************************
    const find_text = async (elmnt_id) => {
        return new Promise((resolve, reject) => {
            let elements_arr = JSON.parse(localStorage.getItem('elementsPreset'));
            let element_found = elements_arr.find(elmnt => elmnt.elmnt_id == parseInt(elmnt_id));
            resolve(element_found);
        })
    }
    // ******************* END FIND ELEMENT **********************

    // ******************* CLICK CHOOSE ELEMENT ******************
    $(document).on('click', '.bgu', function () {
        var elmnt_id = $(this).data("id");
        debug && console.log(elmnt_id);
        find_text(parseInt(elmnt_id)).then((element) => {
            // load html + css elements
            // let canvas_composed = 
            $('#canvas').append(element.html);
            element.css.map(class_css => {
                if (class_css.elment_class == "") return;
                // check if canvas has already the element before append!
                let elmnt_count = $('#canvas').find("." + class_css.elment_class).length;
                if (elmnt_count > 1) {
                    let new_elmnt_class = class_css.elment_class + "" + (elmnt_count - 1);
                    $("." + class_css.elment_class).last().addClass(new_elmnt_class).css(class_css);
                    return;
                }
                $("." + class_css.elment_class).css(class_css);
            });
            // end load html + css elements
            $('.dr').draggable();
        });
    });
    // ******************* CLICK CHOOSE ELEMENT ******************
    $(document).on('click', '.model__text', function () {
        // debug && console.log(localStorage.getItem('elementsPreset'));
        var elmnt_id = $(this).data("id");
        if (elmnt_id == undefined) return;
        debug && console.log(elmnt_id);
        find_text(elmnt_id).then(({ elmnt_id, html, css, } = element) => {
            // load html + css elements
            debug && console.log("Element found: ", html);
            // $('#canvas').append(element.html);
            $(html).appendTo("#canvas");
            css.map(class_css => {
                if (class_css.elment_class == "") return;
                // change class name if canvas has the element before append!
                let elmnt_count = $('#canvas').find("." + class_css.elment_class).length;
                debug && console.log(elmnt_count);
                if (elmnt_count > 1) {
                    let new_elmnt_class = class_css.elment_class + "" + (elmnt_count - 1);
                    $("." + class_css.elment_class).last().addClass(new_elmnt_class).css(class_css);
                    return;
                }
                debug && console.log(("." + class_css.elment_class));
                $("." + class_css.elment_class).css(class_css);
            });
            // end load html + css elements
            $('.dr').draggable();
        });
    });
    // ************ FADE IN EFFECT BACKGROUND
    $('#gallery .img-fluid').trigger('click').attr('src');
    $('#gallery .img-fluid').on('click', function () {
        let $this = $(this); 
        // Add class fadeIn to  /custom-css.css
        $("#canvas img").addClass("fade-in").attr('src', $this.attr('src'));
        setTimeout(() => {
            $("#canvas img").removeClass("fade-in");
        }, 6000);
    });
    // ************ END FADE IN EFFECT BACKGROUND
    
    // ************ CHANGE/ADD BUTTON TO CANVAS
    $(".btn__template").on('click', function () {
        let $this = $(this);
        // check if element exist before append a second button ,,,, edit commnt!
        let elmnt_count = $('#canvas').find(".offer__link").length;
        if (elmnt_count >= 1) {
            // Change style
            debug && console.log("Change style");
            let string_style = $this.find('div').attr('style');
            let position = $('#canvas').find(".offer__link").css('position');
            let top = $('#canvas').find(".offer__link").css('top');
            let left = $('#canvas').find(".offer__link").css('left');
            string_style = string_style + '; position:' + position + '; top:' + top + '; left:' + left;
            debug && console.log(string_style);
            $('.offer__link').attr("style", string_style);
        } else {
            // append new element
            debug && console.log("append new element href");
            // Create button link
            $('#canvas').append("<a target='_self' class='dr offer__link' style='position: absolute;color: rgb(0, 0, 0);background-color: rgb(254, 211, 0);font-family: Montserrat;font-weight: 700;font-size: 14px;line-height: 1px;text-transform: uppercase;left: 400px;top: 280px;cursor: pointer;padding: 20px;'>BOOKNOW</a>");
            let string_style = $this.find('div').attr('style');
            string_style = string_style + '; position:' + position + '; top:' + top + '; left:' + left;
            debug && console.log(string_style);
            $('.offer__link').attr("style", string_style);
        }
    });
    // ************ END CHANGE/ADD BUTTON TO CANVAS



    // ( POPUP_SETTINGS. info: class: .edit__banner ) ********* 

    // ************ ACTION POPUP BUTTON:: DELETE ELEMNT WIHTIN CANVAS CLICKED. --START
    $(".delete .btn").click(function () {
        let classtobedeleted = $(this).attr("data-classid");
        // debug && console.log(classtobedeleted);
        let tobedeleted_class = classtobedeleted.replace(/\s/g, ".");
        debug && console.log("." + tobedeleted_class);
        $("." + tobedeleted_class).remove();
        $(this).attr('data-classid', '');
        $(".edit__banner").addClass('hide').css({ 'display': 'none' });
    });
    // ************ ACTION POPUP BUTTON:: DELETE ELEMNT FROM CANVAS. --END

    // ************ Ad__work Click Action: Hide popup script ************ 
    $('.h-100:not(>*)').click(function(event) {
        console.log(event);
        $("#canvas>*").removeClass("border-select");
        $("#canvas>*").removeAttr("id");
        $('.edit__banner').css({
            "opacity": 0,
        });
    });
    // ************ END Ad__work Click Action: Hide popup script ************ 
    
    // ************ Sidebar click Action: Hide popup script ************ 
    $('.navbar.navbar-expand-md.navbar-light.d-md-flex:not(>*)').click(function(event) {
        // console.log(event);
        $("#canvas>*").removeClass("border-select");
        $("#canvas>*").removeAttr("id");
        $('.edit__banner').css({
            "opacity": 0,
        });
    });
    // ************ END Sidebar click Action: Hide popup script ************ 

    // ************ popup script..
    $(".edit__banner--icon").click(function (e) {
        var _this = $(this);
        debug && console.log(_this.attr('data-classid'));
        if (_this.attr('data-classid') != undefined) return;
        
        var parent = _this.parent(".edit__banner--item");
        var check = _this.hasClass('active') ? false : true;

        $(".edit__banner--container").removeClass("active");
        $(".edit__banner--icon").removeClass("active");

        if (check) {
            parent.find(".edit__banner--container").addClass("active");
            _this.addClass("active");
        }
    });
    // ************ popup script

})(jQuery);