// ADDED FIRST BY AYOUB ARBOUCHI:: DUE TO DATE 13 Aug-2020
// import interact from '//cdn.jsdelivr.net/npm/@interactjs/interactjs/index.js';
(function($) {
    const debug = false;
    // ADD BOTH DRAG & RESIZE MOVE FOR ELEMENTS USING INTERACT.JS
    // LOAD CDN INTERACT.JS 
    const resize_except_elements = [""];
    const dragMoveListener = (event) => {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
        // target.style.top = x+'px';
        // target.style.left = y+'px';
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    const resizeMoveListener = (event) => {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
        // DISABLE TARGETTING SELECTS
        // By Mehdi 
        // $(".select2-selection__rendered").addClass("no__avail");

    // ******************** LOADING TEMPLATES DATA ***************
    const init_templates = async(templates_for) => {
        var templates_path = `./assets/json/${templates_for}-templates.json`;
        var templates_arr = [];

        await $.getJSON(templates_path, function(data) {
            templates_arr = data;
        });

        localStorage.setItem(templates_for + '_templatesPreset', JSON.stringify(templates_arr));
        debug && console.log("templates_arr ready!", templates_arr);
        if (templates_for == "mobile") return;
        let html_templates = '';
        templates_arr.map((template) => {
            if (template.template_id == 6) {
                return;
            }
            html_templates += '<div class="card card-sm mb-3 overflow-hidden adv__models--item" data-id="' + template.template_id + '"><img src="' + template.background + '" alt="..." class="card-img-top" /></div>';
        });
        // REMOVE LOADER
        $(".template__load").remove();
        $("#presets").append(html_templates);
        $('#presets div:first-child').trigger('click');
    }
    localStorage.clear();
    init_templates("desktop");
    init_templates("mobile");
    // **************** END LOADING TEMPLATES DATA ***************

    // ******************* FIND TEMPLATE *************************
    const find_template = (template_id, template_for) => {
            return new Promise((resolve, reject) => {
                let templates_arr = JSON.parse(localStorage.getItem(template_for + '_templatesPreset'));
                let template_found = templates_arr.find(tmplt => tmplt.template_id == template_id);
                resolve(template_found);
            })
        }
        // ******************* END FIND TEMPLATE *********************

    // ******************* CLICK TO CHOOSE TEMPLATE *****************
    $(document).on('click', '.adv__models--item', function(e) {
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
            $("#buttonChangeTemplate").click(function() { // Click change template
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
            find_template(parseInt(template_id), "desktop").then(async(template) => {
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
    // ******************* CLICK CHOOSE TEMPLATE *****************
    // PLEASE DO NOT CHANGE CSS CLASSES ORDER IN THIS ELEMENT AS ( DeviceButton_b Device-type active);
    $(".DeviceButton_b").click(function(e) {
        var data_target = "";
        data_target = $(this).hasClass("t__vide"); // True - false
        debug && console.log(data_target);

        if (data_target == true) {
            debug && console.log("data_target", data_target);
            $("#modalNew").modal('show');
            return;
        }

        let classes = e.target.className.split(" ");
        let template_for = classes[1];
        if (template_for == "active") return;
        template_for = template_for.split("-");
        template_for = template_for[1];
        var template_id = $(this).attr("data-id");
        // Cal func() find_template:
        find_template(parseInt(template_id), template_for).then(async(template) => {
            debug && console.log(template);

            // Load html + css elements
            $('#canvas').empty().append(template.html);
            $('#canvas').css({ "width": template.width, "height": template.height });
            $('#canvas img').css({ "top": template.top, "left": template.left });

            template.css.map(class_css => {
                if (class_css.element_class == "") return;
                $("." + class_css.element_class).css(class_css);
            });

            // End load html + css elements
            // resize and draggable init
            // interact('.dr')
            //     .draggable({
            //         onmove: dragMoveListener
            //     })
            //     .resizable({
            //         preserveAspectRatio: false,
            //         edges: { left: true, right: true, bottom: true, top: true }
            //     }).on('resizemove', resizeMoveListener);
        });
    });
    // ******************** LOADING Elements DATA ****************
    const init_elements = async() => {
            var elements_path = "./assets/json/elements.json";
            var elements_arr = [];

            await $.getJSON(elements_path, function(data) {
                elements_arr = data;
            });

            debug && console.log("elements_arr ready!", elements_arr);

            let texts_html_element = '';
            let model_text_html_element = '';
            let button_html_element = '';
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
    const find_text = async(elmnt_id) => {
            return new Promise((resolve, reject) => {
                let elements_arr = JSON.parse(localStorage.getItem('elementsPreset'));
                let element_found = elements_arr.find(elmnt => elmnt.elmnt_id == parseInt(elmnt_id));
                resolve(element_found);
            })
        }
        // ******************* FIND ELEMENT END **********************

    // ******************* CLICK CHOOSE ELEMENT ******************
    $(document).on('click', '.bgu', function() {
        var elmnt_id = $(this).data("id");
        debug && console.log(elmnt_id);
        find_text(parseInt(elmnt_id)).then((element) => {
            // Load html + css elements
            // Let canvas_composed.
            $('#canvas').append(element.html);
            element.css.map(class_css => {
                if (class_css.elment_class == "") return;
                // check if canvas has already the element before append!
                let elmnt_count = $('#canvas').find("." + class_css.elment_class).length;
                if (elmnt_count > 1) {
                    let new_elmnt_class = class_css.elment_class + "" + (elmnt_count - 1);
                    $("." + class_css.elment_class).last().addClass(new_elmnt_class).css(class_css);
                    interact("." + class_css.elment_class)
                        .draggable({
                            onmove: dragMoveListener
                        })
                        .resizable({
                            preserveAspectRatio: false,
                            edges: { left: true, right: true, bottom: true, top: true }
                        }).on('resizemove', resizeMoveListener);
                }
                $("." + class_css.elment_class).css(class_css);
            });
            // End Load html + css elements
            // resize and draggable init

        });
    });
    // ******************* CLICK CHOOSE ELEMENT END **************

    // ******************* CLICK CHOOSE TEXT MDOEL  **************
    $(document).on('click', '.model__text', function() {
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
                    interact("." + class_css.elment_class)
                        .draggable({
                            onmove: dragMoveListener
                        })
                        // return;
                }
                debug && console.log(("." + class_css.elment_class));
                $("." + class_css.elment_class).css(class_css);
            });
            // end load html + css elements

            // text model should only be draggable!
        });
    });
    // ******************* CLICK CHOOSE TEXT MDOEL END ***********

    // ******************* FADE IN EFFECT BACKGROUND *************
    $('#gallery .img-fluid').trigger('click').attr('src');
    $('#gallery .img-fluid').on('click', function() {
        let $this = $(this);
        let src = $this.attr("src");
        let elmnt_count_bg = $('#canvas').find('.bg_image').length;
        if (elmnt_count_bg >= 1) {
            $(".bg_image").addClass("fade-in").attr('src', src);
            return;
        }
        $('#canvas').prepend("<img class='dr bg_image' src='" + $this.attr('src') + "' alt='bg'/>").find('.dr.bg_image').addClass('fade-in');
        // resize and draggable init
        interact('.bg_image')
            .draggable({
                onmove: dragMoveListener
            })
            .resizable({
                preserveAspectRatio: false,
                edges: { left: true, right: true, bottom: true, top: true }
            }).on('resizemove', resizeMoveListener);
    }); // ******************* FADE IN EFFECT BACKGROUND END ****

    // ******************* INSERT LOGO TO CANVAS *************
    $('.mb-3.col-8>.img-fluid').css({ "cursor": "pointer" });
    $('.mb-3.col-8>.img-fluid').on('click', function() {
        let $this = $(this);
        // Add class fadeIn to  /custom-css.css
        let src = $this.attr("src");
        let elmnt_count = $('#canvas').find(".canva_logos").length;
        if (elmnt_count >= 1) {
            // if found change src attr
            $(".canva_logos").addClass("fade-in").attr('src', src);
            return;
        }
        $("#canvas").append(`<img src="${src}" class="dr canva_logos"/>`);
        $(".canva_logos").addClass("fade-in").css({
            "position": "absolute",
            "top": "10px",
            "left": "25px",
            "width": "210px"
        });
        // resize and draggable init
        interact('.canva_logos')
            .draggable({
                onmove: dragMoveListener
            })
            .resizable({
                preserveAspectRatio: false,
                edges: { left: true, right: true, bottom: true, top: true }
            }).on('resizemove', resizeMoveListener);
    });
    // ******************* INSERT LOGO TO CANVAS ********* 

    // ************ CHANGE/ADD BUTTON TO CANVAS
    $.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($("#canvas").height() - $(this).outerHeight()) / 2) +
            $("#canvas").scrollTop()) + "px");
        this.css("left", Math.max(0, (($("#canvas").width() - $(this).outerWidth()) / 2) +
            $("#canvas").scrollLeft()) + "px");
        return this;
    }
    $(".btn__template").on('click', function() {
        let $this = $(this);
        // check if element Exist before append a second button ,,,, edit commnt!
        let elmnt_count = $('#canvas').find(".offer__link").length;
        if (elmnt_count >= 1) {
            // Change style
            // If a button have already existed we should keep the following css properties: (position,size)
            console.log("Button have existed");
            let string_style = $this.find('div').attr('style');
            let position = $('#canvas').find(".offer__link").css('position');
            let top = $('#canvas').find(".offer__link").css('top');
            let left = $('#canvas').find(".offer__link").css('left');
            let width = $('#canvas').find(".offer__link").css('width');
            let height = $('#canvas').find(".offer__link").css('height');
            let transform = $('#canvas').find(".offer__link").css('transform');

            string_style = string_style + ";position:" + position + ";left:" + left + ";top:" + top + ";transform:" + transform + ";";
            string_style = string_style + "width:" + width + ";height:" + height + ";";
            // console.log(string_style);
            $('.offer__link').attr("style", string_style);
            // resize and draggable init
            // interact('.dr')
            //     .draggable({
            //         onmove: dragMoveListener
            //     })
            //     .resizable({
            //         preserveAspectRatio: false,
            //         edges: { left: true, right: true, bottom: true, top: true }
            //     }).on('resizemove', resizeMoveListener);
        } else {
            // Append New Element
            console.log("append new element href");
            // Create Button Link
            $('#canvas').append("<a target='_self' class='dr offer__link' style='color: rgb(0, 0, 0);background-color: rgb(254, 211, 0);font-family: Montserrat;font-weight: 700;font-size: 14px;line-height: 1px;text-transform: uppercase;left: 400px;left: 100px;top: 280px;cursor: pointer;padding: 20px;'>New Button</a>");
            let string_style = $this.find('div').attr('style');
            let top = $('#canvas').find(".offer__link").css('top');
            let left = $('#canvas').find(".offer__link").css('left');
            let transform = $('#canvas').find(".offer__link").css('transform');
            string_style = string_style + ";transform:" + transform;
            console.log(string_style);
            $('.offer__link').attr("style", string_style);
            $('.offer__link').center();
            const button_background_color = Pickr.create({
                el: '#button_background_color',
                theme: 'monolith',
                swatches: [
                    'rgba(244, 67, 54, 1)',
                    'rgb(233, 30, 99)',
                    'rgb(156, 39, 176)',
                    'rgb(103, 58, 183)',
                    'rgb(63, 81, 181)',
                    'rgb(33, 150, 243)',
                    'rgb(3, 169, 244)',
                    'rgb(0, 188, 212)',
                    'rgb(0, 150, 136)',
                    'rgb(76, 175, 80)',
                    'rgb(139, 195, 74)',
                    'rgb(205, 220, 57)',
                    'rgb(255, 235, 59)',
                    'rgba(255, 193, 7, 1)'
                ],
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        input: true,
                        save: false
                    }
                }
            });
        }
        // resize and draggable init
        interact('.offer__link')
            .draggable({
                onmove: dragMoveListener
            })
            .resizable({
                preserveAspectRatio: false,
                edges: { left: true, right: true, bottom: true, top: true }
            }).on('resizemove', resizeMoveListener);
    });
    // ************ END CHANGE/ADD BUTTON TO CANVAS ***************

    ////*********** ( POPUP_SETTINGS. info: class: .edit__banner ) *********

    // ************ ACTION POPUP BUTTON:: DELETE ELEMNT WIHTIN CANVAS CLICKED. --START
    $(".delete .btn").click(function() {
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
        // console.log(event);
        $("#canvas>*").removeClass("border-select");
        $("#canvas>*").removeAttr("id");
        $('.edit__banner').css({
            "display": "none",
        });
    });
    // ************ END Ad__work Click Action: Hide popup script ************ 

    // ************ Sidebar click Action: Hide popup script ************ 
    $('.navbar.navbar-expand-md.navbar-light.d-md-flex:not(>*)').click(function(event) {
        // console.log(event);
        $("#canvas>*").removeClass("border-select");
        $("#canvas>*").removeAttr("id");
        $('.edit__banner').css({
            "display": "none",
        });
    });
    // ************ END Sidebar click Action: Hide popup script ************ 

    // ************ popup script classes actions... 
    $(".edit__banner--icon").click(function(e) {
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

    // ****** BACKGROUND CANVAS COLRO CHANGE PICKR
    const custom__background = Pickr.create({
        el: '#custom__background',
        theme: 'monolith',
        default: '#ffffff',
        // Pre-defined stops. These are the default since at least two should be defined
        // stops: [
        //     ['rgb(255,132,109)', 0],
        //     ['rgb(255,136,230)', 1]
        // ],
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgb(233, 30, 99)',
            'rgb(156, 39, 176)',
            'rgb(103, 58, 183)',
            'rgb(63, 81, 181)',
            'rgb(33, 150, 243)',
            'rgb(3, 169, 244)',
            'rgb(0, 188, 212)',
            'rgb(0, 150, 136)',
            'rgb(76, 175, 80)',
            'rgb(139, 195, 74)',
            'rgb(205, 220, 57)',
            'rgb(255, 235, 59)',
            'rgba(255, 193, 7, 1)'
        ],
        components: {

            preview: false,
            opacity: true,
            hue: true,

            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true
            }
        }
    });
    custom__background.on('change', instance => {
        // console.log('change', instance.getGradient());
        // jQuery("#canvas").css("background-image", instance.getGradient());
        var cH = custom__background.getColor().toHEXA().toString();
        jQuery("#canvas").css("background", cH);
        jQuery(".custom__background .pcr-button").css("color", cH + "!important");

    });
    // BACKGROUND CANVAS COLRO CHANGE PICKR Ends.

    // Right Canvas setting border Color
    const canva__color = Pickr.create({
        el: '#canva__color',
        theme: 'monolith',
        default: '#ffffff',
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgb(233, 30, 99)',
            'rgb(156, 39, 176)',
            'rgb(103, 58, 183)',
            'rgb(63, 81, 181)',
            'rgb(33, 150, 243)',
            'rgb(3, 169, 244)',
            'rgb(0, 188, 212)',
            'rgb(0, 150, 136)',
            'rgb(76, 175, 80)',
            'rgb(139, 195, 74)',
            'rgb(205, 220, 57)',
            'rgb(255, 235, 59)',
            'rgba(255, 193, 7, 1)'
        ],
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                hex: true,
                rgba: true,
                input: true,
                save: false
            }
        }
    });
    canva__color.on('change', (color, instance) => {
        // var cH = canva__color.getColor().toHEXA().toString();
        canva__color.setColor(color.toRGBA().toString());
        jQuery("#canvas").css("border-color", color.toHEXA().toString());
    });
    // Right Canvas setting border Color End.

    // CANVAS GENERAL BORDER CHANGE STYLE
    $("#canva__width").on("input propertychange", function() {
        $("#canvas").css("border-width", $(this).val() + "px");
        $("#canva__width__text").text($(this).val() + 'PX');
    });
    $("#canva__width").trigger('propertychange');
    $("#canva__style").on("change", function() {
        $("#canvas").css("border-style", $(this).val());
    });
    $("#canva__style").trigger('change');
    // CANVAS GENERAL BORDER CHANGE STYLE Ends.


    let shadow_canvas = {
            "x": "0",
            "y": "0",
            "blur": "0",
            "color": "#000"
        }
        // ****** BACKGROUND CANVAS COLRO CHANGE PICKR
    const color__canva = Pickr.create({
        el: '#color__canva',
        theme: 'monolith',
        default: '#000',
        // Pre-defined stops. These are the default since at least two should be defined
        // stops: [
        //     ['rgb(255,132,109)', 0],
        //     ['rgb(255,136,230)', 1]
        // ],
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgb(233, 30, 99)',
            'rgb(156, 39, 176)',
            'rgb(103, 58, 183)',
            'rgb(63, 81, 181)',
            'rgb(33, 150, 243)',
            'rgb(3, 169, 244)',
            'rgb(0, 188, 212)',
            'rgb(0, 150, 136)',
            'rgb(76, 175, 80)',
            'rgb(139, 195, 74)',
            'rgb(205, 220, 57)',
            'rgb(255, 235, 59)',
            'rgba(255, 193, 7, 1)'
        ],
        components: {

            preview: false,
            opacity: true,
            hue: true,

            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: false
            }
        }
    });

    color__canva.on('change', instance => {
        // console.log('change', instance.getGradient());
        // jQuery("#canvas").css("background-image", instance.getGradient());
        var cH = color__canva.getColor().toHEXA().toString();
        shadow_canvas.color = cH;
        generateShadow(shadow_canvas);

    });
    // BACKGROUND CANVAS COLRO CHANGE PICKR Ends.

    function generateShadow(shad) {

        $("#blur__canva_text").text(shad.blur + "px");
        $("#x__canva_text").text(shad.x + "px");
        $("#y__canva_text").text(shad.y + "px");

        return $("#canvas").css({ "box-shadow": shad.x + "px " + shad.y + "px " + shad.blur + "px " + shad.color });
    }
    generateShadow(shadow_canvas);
    debug && console.log(shadow_canvas);
    $("#blur__canva").on("input propertychange", function() {
        shadow_canvas.blur = $(this).val();
        generateShadow(shadow_canvas);
    });
    $("#x__canva").on("input propertychange", function() {
        shadow_canvas.x = $(this).val();
        generateShadow(shadow_canvas);
    });
    $("#y__canva").on("input propertychange", function() {
        shadow_canvas.y = $(this).val();
        generateShadow(shadow_canvas);
    });
    $("#color__canva").on("input propertychange", function() {
        shadow_canvas.color = $(this).val();
        generateShadow(shadow_canvas);
    });

    // CLOSE BUTTON ACTIVE
    $(".close__buttons_items").click(function() {
        $(".close__buttons_items").removeClass("active");
        $(this).addClass("active");

        debug && console.log($(this));
        if ($("#canvas").find('.close_button').hasClass('close_button') == true) {
            $("#canvas").find('.close_button').remove();
        }
        var svg__selected = "<div class='dr close_button'>" + $(this).clone().html() + "</div>";
        // svg__selected.css("position", "absolute");
        $("#canvas").prepend(svg__selected);
        // resize and draggable init
        interact('.close_button')
            .draggable({
                onmove: dragMoveListener
            })
    });

    // Initiating by hiding the elements.
    $('#schudule_subpanel').hide();
    $('#audience_subpanel').hide();
    $('#value_of_reservation').hide();
    $('#overlapping_manuel').hide();

    // Enable all schedule inputs
    $('#enable_all').on("click", function(e) {
        e.preventDefault();
        var _this = $(this);
        debug && console.log(_this.attr('data-label'));

        switch (_this.attr('data-label')) {
            case "enable":
                _this.attr('data-label', "disable");
                _this.text("Disable");
                // Show block Time
                $('#schudule_subpanel').show();
                break;
            case "disable":
                _this.attr('data-label', "enable");
                _this.text("Enable");
                // Hide block Time
                $('#schudule_subpanel').hide();
                break;

            default:
                break;
        }
    });

    // Enable Overlapping 
    $('#enable_overlapping').on("click", function(e) {
        e.preventDefault();
        var _this = $(this);
        debug && console.log(_this.attr('data-label'));

        switch (_this.attr('data-label')) {
            case "enable":
                _this.attr('data-label', "disable");
                _this.text("Smart Overlapping");
                // Show block 
                $('#overlapping_manuel').show();
                $('#overlapping_auto').hide();
                break;
            case "disable":
                _this.attr('data-label', "enable");
                _this.text("Manual Overlapping");
                // Hide block 
                $('#overlapping_manuel').hide();
                $('#overlapping_auto').show();
                break;

            default:
                break;
        }
    });

    $('#show__overlapping').on("click", function(e) {
        e.preventDefault();
        var _this = $(this);
        debug && console.log(_this.attr('data-label'));

        switch (_this.attr('data-label')) {
            case "overlapping":
                _this.attr('data-label', "disable");
                _this.text("All Elements");
                // Show block 
                $('#overlapping__ad_info').show();
                $('#all__ad_info').hide();
                break;
            case "disable":
                _this.attr('data-label', "overlapping");
                _this.text("Overlapping Elements");
                // Hide block 
                $('#overlapping__ad_info').hide();
                $('#all__ad_info').show();
                break;

            default:
                break;
        }
    });

    // Page Targetting Settings >> TAB Time >>
    $("#early_booker").on("change", function() {
        var _this = $(this);
        if (_this.is(":checked")) {
            $("#min_days").attr("disabled", false).removeClass("no__avail");
        } else {
            $("#min_days").attr("disabled", true).addClass("no__avail");
        }
    });

    $("#last_minute").on("change", function() {
        var _this = $(this);
        if (_this.is(":checked")) {
            $("#max_days").attr("disabled", false).removeClass("no__avail");
        } else {
            $("#max_days").attr("disabled", true).addClass("no__avail");
        }
    });

    $("#time_period").on("change", function() {
        var _this = $(this);
        if (_this.is(":checked")) {
            $("#arrival_date").attr("disabled", false).removeClass("no__avail");
            $("#departure_date").attr("disabled", false).removeClass("no__avail");
        } else {
            $("#arrival_date").attr("disabled", true).addClass("no__avail");
            $("#departure_date").attr("disabled", true).addClass("no__avail");
        }
    });

    $("#length_stay").on("change", function() {
        var _this = $(this);
        if (_this.is(":checked")) {
            $("#length_stay_limit").attr("disabled", false);
            $("#length_stay_limit").parent().find(".select2-selection__rendered").removeClass("no__avail");
            $("#length_stay_value").attr("disabled", false).removeClass("no__avail");
        } else {
            $("#length_stay_limit").attr("disabled", true);
            $("#length_stay_limit").parent().find(".select2-selection__rendered").addClass("no__avail");
            $("#length_stay_value").attr("disabled", true).addClass("no__avail");
        }
    });

    $("#roomAvail").on("change", function() {
        var _this = $(this);
        if (_this.is(":checked")) {
            $("#roomAvail_display").attr("disabled", false);
            $("#roomAvail_display").parent().find(".select2-selection__rendered").removeClass("no__avail");
            $("#roomAvail_limit").attr("disabled", false);
            $("#roomAvail_limit").parent().find(".select2-selection__rendered").removeClass("no__avail");
            $("#roomAvail_value").attr("disabled", false).removeClass("no__avail");
            $("#roomAvail_limit").trigger('change');
        } else {
            $("#roomAvail_display").attr("disabled", true);
            $("#roomAvail_display").parent().find(".select2-selection__rendered").addClass("no__avail");
            $("#roomAvail_limit").attr("disabled", true);
            $("#roomAvail_limit").parent().find(".select2-selection__rendered").addClass("no__avail");
            $("#roomAvail_value").attr("disabled", true).addClass("no__avail");
            $(".roomAvailBetweenCol").hide();
        }
    });
    // roomAvail select listner on change:
    $("#roomAvail_limit").on("change", function() {
        var _this = $(this);
        switch (_this.val()) {
            case "3":
                $(".roomAvailBetweenCol").show();
                $(".no_roomAvailBetweenCol").hide();
                break;
            default:
                $(".roomAvailBetweenCol").hide();
                $(".no_roomAvailBetweenCol").show();
                break;
        }
    });

    $("#time_day").on("change", function() {
        var _this = $(this);
        if (_this.is(":checked")) {
            $("#time_day_value").attr("disabled", false);
            jQuery("#time_day_value").parent().find(".select2-selection__rendered").removeClass("no__avail");
        } else {
            $("#time_day_value").attr("disabled", true);
            jQuery("#time_day_value").parent().find(".select2-selection__rendered").addClass("no__avail");
        }
    });

    // Page Targetting Setting >> TAB AUDIENCE >> 
    $('#audience_enable_all').on("click", function(e) {
        e.preventDefault();
        var _this = $(this);
        debug && console.log(_this.attr('data-label'));

        switch (_this.attr('data-label')) {
            case "enable":
                _this.attr('data-label', "disable");
                _this.text("Disable");
                // Show block Time
                $('#audience_subpanel').show();
                break;
            case "disable":
                _this.attr('data-label', "enable");
                _this.text("Enable");
                // Hide block Time
                $('#audience_subpanel').hide();
                break;

            default:
                break;
        }

    });

    // LOCATIONS EVENT LISTENER 
    $("input[name='locations']").on('change', function() {
        var _this = $(this);
        debug && console.log(_this.val());
        switch (_this.val()) {
            case "only_the_following":
                $('#elemnt_geo_location').attr('disabled', false);
                $("#elemnt_geo_location").parent().find(".select2-selection__rendered").removeClass("no__avail");
                break;

            case "all_except_the_following":
                $('#elemnt_geo_location').attr('disabled', false);
                $("#elemnt_geo_location").parent().find(".select2-selection__rendered").removeClass("no__avail");
                break;
            default:
                $("#elemnt_geo_location").attr("disabled", true);
                $("#elemnt_geo_location").val("All");
                $("#elemnt_geo_location").trigger('change');
                $("#elemnt_geo_location").parent().find(".select2-selection__rendered").addClass("no__avail");
                break;
        }
    });
    // LOCATIONS EVENT LISTENER Ends
    // SOURCES EVENT LISTENER
    $("input[name='Referrals']").on('change', function() {
        var _this = $(this);
        debug && console.log(_this.val());
        switch (_this.val()) {
            case "only_the_following":
                $('#elmnt_all_sources').attr('disabled', false);
                $('#elmnt_all_sources').tagsinput("removeAll");
                $('#elmnt_all_sources').tagsinput('add', "All");
                $("#elmnt_all_sources").parent().find(".bootstrap-tagsinput").removeClass("no__avail");
                break;

            case "all_except_the_following":
                $('#elmnt_all_sources').attr('disabled', false);
                $('#elmnt_all_sources').tagsinput("removeAll");
                $('#elmnt_all_sources').tagsinput('add', "All");
                $("#elmnt_all_sources").parent().find(".bootstrap-tagsinput").removeClass("no__avail");
                break;
            default:
                $("#elmnt_all_sources").attr("disabled", true);
                $("#elmnt_all_sources").tagsinput("removeAll");
                $('#elmnt_all_sources').tagsinput('add', "All");
                $("#elmnt_all_sources").parent().find(".bootstrap-tagsinput").addClass("no__avail");
                break;
        }
    });
    // SOURCES EVENT LISTENER Ends
    $("input[name='frequently']").on('change', function() {
        var _this = $(this);
        debug && console.log(_this.val());
        switch (_this.val()) {
            case "all_visitors_with":
                $("#elemnt_all_visitors1").attr("disabled", false);
                $("#elemnt_all_visitors1").parent().find(".select2-selection__rendered").removeClass("no__avail");
                $("#elemnt_all_visitors2").attr("disabled", false);
                $("#elemnt_all_visitors2").removeClass("no__avail");
                break;
            default:
                $("#elemnt_all_visitors1").attr("disabled", true);
                $("#elemnt_all_visitors1").parent().find(".select2-selection__rendered").addClass("no__avail");
                $("#elemnt_all_visitors2").attr("disabled", true);
                $("#elemnt_all_visitors2").addClass("no__avail");


                // $("#elemnt_all_visitors1").attr("disabled", false);
                // $("#elemnt_all_visitors1").parent().find(".select2-selection__rendered").removeClass("no__avail");
                // $("#elemnt_all_visitors2").attr("disabled", false);
                // $("#elemnt_all_visitors2").removeClass("no__avail");
                break;
        }
    });

    $("input[name='utm']").on('change', function() {
        var _this = $(this);
        debug && console.log(_this.val());
        switch (_this.val()) {
            case "only_the_following":
                $("#elemnt_all_utms").attr("disabled", false);
                $("#elemnt_all_utms").parent().find(".bootstrap-tagsinput").removeClass("no__avail");
                break;
            default:
                $("#elemnt_all_utms").attr("disabled", true);
                $("#elemnt_all_utms").tagsinput("removeAll");
                $('#elemnt_all_utms').tagsinput('add', "All");
                $("#elemnt_all_utms").parent().find(".bootstrap-tagsinput").addClass("no__avail");
                break;
        }
    });
    // Page Targetting Setting >> TAB AUDIENCE >> 

    // Page Targetting Settings >> TAB VALUE

    // Enable
    $("#enable_all_value").on("click", function(e) {
        e.preventDefault();
        var _this = $(this);
        debug && console.log(_this.attr('data-label'));

        switch (_this.attr('data-label')) {
            case "enable":
                _this.attr('data-label', "disable");
                _this.text("Disable");
                // Show block Time
                $("select[name='price_based1']").attr('disabled', false);
                $("select[name='price_based1']").parent().find(".select2-selection__rendered").removeClass("no__avail");

                $("select[name='price_based2']").attr('disabled', false);
                $("select[name='price_based2']").parent().find(".select2-selection__rendered").removeClass("no__avail");
                $("input[name='price_based_value']").attr('disabled', false).removeClass('no__avail');

                $("select[name='price_based_curr']").attr('disabled', false);
                $("select[name='price_based_curr']").parent().find(".select2-selection__rendered").removeClass("no__avail");
                $('#value_of_reservation').show();
                break;
            case "disable":
                _this.attr('data-label', "enable");
                _this.text("Enable");
                // Hide block Time
                $('#value_of_reservation').hide();
                break;

            default:
                break;
        }
    });
    // Page Targetting Settings >> TAB VALUE Ends

    // click Save & publish button class: .w-100.btn.btn-success
    $(".w-100.btn.btn-success").on("click", () => {
        debug && console.log('save');
        $('.all_tabs_form_container').find('.processing').remove();
        $('.all_tabs_form_container').find('.tab-pane.fade').prepend('<div class="glob__view--waiting processing"><label>Moment...</label><div class="spinner"></div></div>');
    });

    // SET PRESET NEW TEMPLAtE STICKY INPUTS

    // 


    // Script Enhancing by ayoub
    $(".sticky__").on("click", function() {
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

    // CLEAR CANVAS NEW CREATION
    $(".create_new_canvas").on("click", function() {
        // clear canvas
        $("#canvas").html("<img class='dr bg_image' src='' alt=''><div class='ad__overlay' style='background-image: linear-gradient(to left, transparent 0%, transparent 50%);''></div>");
        $(".canvas").removeClass("t1");
        $("#canvas").css({ "box-shadow": "" });
        $("#canvas").css({ "background-color": "" });
        // $("#canvas").css({"border-style":""});
        $("#canvas").css({ "border-width": "1px" });
        $("#canvas").css({ "border-color": "" });
        $("#canvas").css({ "border-radius": "" });
        // clear canvas

        // Set canvas ad position...
        let data_position = $("input[name='selected_position']").val();
        $(".button__position").removeClass("active");
        $(".button__position[name='" + data_position.toUpperCase() + "']").addClass("active");
        $("#canvas").attr("data-position", data_position.toUpperCase());
        // Set canvas ad position...
        let c_width = $("input[name='desktop_canvas_width']").val();
        let c_height = $("input[name='desktop_canvas_height']").val();

        $("#canvas").css({ "width": c_width + "px", "height": c_height + "px" });
        $("#modalNew").modal('hide');
        $("input[name='desktop_canvas_width']").attr("value", 0);
        // $("input[name='mobile_canvas_height']").attr("value", 0);
        // resize and draggable init
        interact('.bg_image')
            .draggable({
                onmove: dragMoveListener
            })
            .resizable({
                preserveAspectRatio: false,
                edges: { left: true, right: true, bottom: true, top: true }
            }).on('resizemove', resizeMoveListener);
    });


    $(".DeviceButton-mobile").on("click", () => {
        $('.container__position').hide();
        $('.container__position_mobile').show();
        $(".container__position_mobile .button__position.mobile").addClass("hide_m");
        // $(".container__position .button__position").removeClass("active");
    });

    $(".DeviceButton-desktop").on("click", () => {
        $('.container__position').show();
        $('.container__position_mobile').hide();
        $(".button__position.mobile").removeClass("hide_m");
    });


    // BY MEHDI

    $("#hotels_select, .our__select2").select2({
        // allowClear: true,
        // placeholder:"Select an Title"
        // placeholder: $(this).attr('placeholder')

    });

    // SCRIPT TO WRAPP BANNER TO AD VIEW
    var w_main_work = $(".ad__work").outerWidth();
    var w_canvas = $(".canvas").outerWidth();
    console.log(w_main_work, w_canvas);
    $(".create_new_canvas").on("click", () => {

    })



})(jQuery);