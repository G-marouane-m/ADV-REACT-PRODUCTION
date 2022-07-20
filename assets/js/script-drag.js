(function ($) {
    $(document).ready(function () {
        const debug = true;

        jQuery('#save_publish').on('click', function (e) {

            console.log("testtttt");
            var s = $(window).scrollTop();
            e.preventDefault();

            html2canvas($("#canvas")[0], {
                allowTaint: true,
                useCORS: true,
                logging: false,
                height: window.outerHeight + window.innerHeight,
                windowHeight: window.outerHeight + window.innerHeight,
                onrendered: function (canvas) {
                    console.log(canvas.toDataURL("image/jpeg", 1.0))
                    // $("#preview").attr("href", canvas.toDataURL("image/jpeg", 1.0));
                    $(window).scrollTop(s);
                    // $("#banner_download").show();
                    var a = document.createElement('a');
                    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                    a.download = 'adv.jpg';
                    a.click();

                }
            });

        });

        // ********** Init title color
        const title_color = Pickr.create({
            el: '#title_color',
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
        const button_border_color = Pickr.create({
            el: '#button_border_color',
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

        // ********** Init POPUP 
        // init_popup_style(event.target.className, colorFinal, sizeFinal,lineHeight,letterSpacing,fontFinal);
        const init_popup_style = (target, color, size, lineHeight, letterSpacing, fontFamily, bgColor, textShadow, text_align, text_transform, text_decoration, button_border_color) => {
            debug && console.log("color: ", color);
            debug && console.log("size: ", size);
            debug && console.log("lineHeight: ", lineHeight);
            debug && console.log("letterSpacing: ", letterSpacing);
            debug && console.log("fontFamily: ", fontFamily);
            debug && console.log("bgColor: ", bgColor);
            debug && console.log("textShadow: ", textShadow);
            debug && console.log("textShadow: ", text_align);
            debug && console.log("textShadow: ", text_transform);
            debug && console.log("textShadow: ", text_decoration);
            debug && console.log("target: ", target);
            // return;

            // if background img selected end
            if (target == "dr offer__link" || target == "dr close_button") {
                debug && console.log("button clicked");
                $('.button_background').removeClass('hide').addClass('show').css({ "display": "flex" });
                $('.button_border').removeClass('hide').addClass('show').css({ "display": "flex" });
                button_background_color.setColor(bgColor);
                $('.button_shadow').removeClass('show').addClass('hide').css({ "display": "none" });
                $('.vertical_shadow').removeClass('show').addClass('hide').css({ "display": "none" });
                $('.horizontal_shadow').removeClass('show').addClass('hide').css({ "display": "none" });
                $('.blur_shadow').removeClass('show').addClass('hide').css({ "display": "none" });
            } else {
                $('.button_background').removeClass('show').addClass('hide').css({ "display": "none" });
                $('.button_border').removeClass('show').addClass('hide').css({ "display": "none" });
                $('.button_shadow').removeClass('hide').addClass('show').css({ "display": "flex" });
                $('.vertical_shadow').removeClass('hide').addClass('show').css({ "display": "flex" });
                $('.horizontal_shadow').removeClass('hide').addClass('show').css({ "display": "flex" });
                $('.blur_shadow').removeClass('hide').addClass('show').css({ "display": "flex" });
            };
            if (target == "dr close_button") {
                $('.typeface_widget').removeClass('show').addClass('hide').css("display", "none");
                $('.text_editor_widget').removeClass('show').addClass('hide').css("display", "none");
            } else {
                $('.typeface_widget').removeClass('hide').addClass('show').css({ "display": "flex" });
                $('.text_editor_widget').removeClass('hide').addClass('show').css({ "display": "flex" });
            }
            // alert(target);
            if (target.includes("text_model")) {
                $('.line_height_widget').removeClass('show').addClass('hide').css("display", "none");
                $('.letter_spacing_widget').removeClass('show').addClass('hide').css("display", "none");
                $('#text__size_input').addClass('hide').css("display", "none");
                $('#text__size_input2').removeClass("hide").addClass('show').css("display", "flex");
            } else {
                $('#text__size_input').removeClass('hide');
                $('#text__size_input2').removeClass("show").addClass('hide').css("display", "none");
                $('.line_height_widget').removeClass('hide').addClass('show').css("display", "flex");
                $('.letter_spacing_widget').removeClass('hide').addClass('show').css("display", "flex");
            }

            // INIT COLOR PICKR SELECTED 
            title_color.setColor(color);
            $("#text__size_input").val(size.replace("px", ""));
            $("#text__size").text(size);
            $("#line__height_input").val(lineHeight.replace("px", ""));
            $("#line__height").text(lineHeight);


            $("#lettre__spacing_input").val(letterSpacing.replace("px", ""));
            $("#lettre__spacing").text(letterSpacing);

            fontFamily = fontFamily.replace(" ", "_");
            fontFamily = fontFamily.replace('"', '');
            fontFamily = fontFamily.replace('"', '');
            $("#fontFamily").val(fontFamily);

            $('.align_left').css({ "background-color": "" });
            $('.align_right').css({ "background-color": "" });
            $('.align_center').css({ "background-color": "" });
            $('.transform_uppercase').css({ "background-color": "" });
            $('.transform_lowercase').css({ "background-color": "" });
            $('.decoration_underline').css({ "background-color": "" });

            if (text_align != '') {
                $('.align_' + text_align).css({ "background-color": "whitesmoke" });
            }
            if (text_transform != '') {
                $('.transform_' + text_transform).css({ "background-color": "whitesmoke" });
            }
            if (text_decoration != '' && text_decoration == "underline") {
                $('.decoration_underline').css({ "background-color": "whitesmoke" });
            }

            // Text shadow: if button return;
            if (target != "dr offer__link" && textShadow != undefined && textShadow != "none") {
                let text_shadow_arr = textShadow.split(')');
                text_shadow_color.setColor(text_shadow_arr[0] + ')'); // fetch color from text-shadow
                let split_position_blur = text_shadow_arr[1].split(" ");
                debug && console.log(split_position_blur);
                $("#vertical__shadow__input").val(split_position_blur[1].replace("px", ""));
                $("#vertical__shadow").text(split_position_blur[1]);
                $("#horizontal__shadow__input").val(split_position_blur[2].replace("px", ""));
                $("#horizontal__shadow").text(split_position_blur[2]);
                $("#text__blur__input").val(split_position_blur[3].replace("px", ""));
                $("#text__blur").text(split_position_blur[3]);
            }
        }
        // ********** Init POPUP end.
        // ************* BLOCK EDITING  TEXT: ALING, TRANSFORM, DECORATION Ends
        $('.align_left').css({ "cursor": "pointer" });
        $('.align_left').on('click', function () {
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $("." + element_selected).css({ "text-align": "left" });
            $('.align_left').css({ "background-color": "whitesmoke" });
            $('.align_right').css({ "background-color": "" });
            $('.align_center').css({ "background-color": "" });
        });
        $('.align_right').css({ "cursor": "pointer" });
        $('.align_right').on('click', function () {
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $("." + element_selected).css({ "text-align": "right" });
            $('.align_right').css({ "background-color": "whitesmoke" });
            $('.align_left').css({ "background-color": "" });
            $('.align_center').css({ "background-color": "" });
        });
        $('.align_center').css({ "cursor": "pointer" });
        $('.align_center').on('click', function () {
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $("." + element_selected).css({ "text-align": "center" });
            $('.align_center').css({ "background-color": "whitesmoke" });
            $('.align_left').css({ "background-color": "" });
            $('.align_right').css({ "background-color": "" });
        });
        $('.transform_uppercase').css({ "cursor": "pointer" });
        $('.transform_uppercase').on('click', function () {
            let $this = $(this);
            let styles = $this.css(['background-color']);
            let bgColror = styles["background-color"];

            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");

            if ("rgba(0, 0, 0, 0)" == bgColror) {
                $("." + element_selected).css({ "text-transform": "uppercase" });
                $('.transform_uppercase').css({ "background-color": "whitesmoke" });
                $('.transform_lowercase').css({ "background-color": "" });
            } else {
                $("." + element_selected).css({ "text-transform": "" });
                $('.transform_uppercase').css({ "background-color": "" });
                $('.transform_lowercase').css({ "background-color": "" });
            }
        });

        $('.transform_lowercase').css({ "cursor": "pointer" });
        $('.transform_lowercase').on('click', function () {
            let $this = $(this);
            let styles = $this.css(['background-color']);
            let bgColror = styles["background-color"];

            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            if ("rgba(0, 0, 0, 0)" == bgColror) {
                $("." + element_selected).css({ "text-transform": "lowercase" });
                $('.transform_lowercase').css({ "background-color": "whitesmoke" });
                $('.transform_uppercase').css({ "background-color": "", "font-weight": "" });
            } else {
                $("." + element_selected).css({ "text-transform": "" });
                $('.transform_lowercase').css({ "background-color": "" });
                $('.transform_uppercase').css({ "background-color": "" });
            }
        });

        $('.decoration_underline').css({ "cursor": "pointer" });
        $('.decoration_underline').on('click', function () {
            let $this = $(this);
            let styles = $this.css(['background-color']);
            let bgColror = styles["background-color"];
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            if ("rgba(0, 0, 0, 0)" == bgColror) {
                $("." + element_selected).css({ "text-decoration": "underline" });
                $('.decoration_underline').css({ "background-color": "whitesmoke" });
            } else {
                $("." + element_selected).css({ "text-decoration": "" });
                $('.decoration_underline').css({ "background-color": "" });
            }
        });


        // ************* BLOCK EDITING  TEXT: ALING, TRANSFORM, DECORATION Ends 
        // Title color pickr
        title_color.on('change', (color, instance) => {
            // debug && console.log('cahnge: ', color.toRGBA().toString(), instance)
            title_color.setColor(color.toRGBA().toString());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            if (selector == "dr.ui-draggable.ui-draggable-handle.border-select") return;
            $("." + element_selected).css({ "color": color.toRGBA().toString() });
        });
        // button background color change 
        button_background_color.on('change', (color, instance) => {
            // debug && console.log('cahnge: ', color.toRGBA().toString(), instance)
            button_background_color.setColor(color.toRGBA().toString());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            if (selector == "dr.ui-draggable.ui-draggable-handle.border-select") return;
            $("." + element_selected).css({ "background-color": color.toRGBA().toString() });
        });
        button_border_color.on('change', (color, instance) => {
            // debug && console.log('cahnge: ', color.toRGBA().toString(), instance)
            button_border_color.setColor(color.toRGBA().toString());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            if (selector == "dr.ui-draggable.ui-draggable-handle.border-select") return;
            $("." + element_selected).css({ "border-color": color.toRGBA().toString() });
        });
        // Text size
        $("#text__size_input").on("change", function () {
            // element.css("font-size", $(this).val() + "px");

            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $("." + element_selected).css({ "font-size": $(this).val() + "px" });
            $("#text__size").text($(this).val() + "px");


        });
        $("#text__size_input2").on("change", function () {

            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $(".text_model").css({ "transform": "scale(" + $(this).val() + ")" })
            // $("." + element_selected).css({ "font-size": $(this).val() + "px" });
            $("#text__size").text($(this).val());
        })


        // Line__height
        $("#line__height_input").on("change", function () {
            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $("." + element_selected).css({ "line-height": $(this).val() + 'px' });
            $("#line__height").text($(this).val() + 'px');
        });
        // lettre__spacing
        $("#lettre__spacing_input").on("change", function () {
            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $("." + element_selected).css({ "letter-spacing": $(this).val() + "px" });
            $("#lettre__spacing").text($(this).val() + 'px');
        });

        // FONT FAMILY
        $("#fontFamily").on("change", function () {
            // element.css("font-family", $(this).val());
            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            $("." + element_selected).css({ "font-family": $(this).val() });
            // $("#lettre__spacing").text($(this).val());
        });

        // ELEMENT TEXT
        $("#title_text").on("input propertychange", function () {
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            console.log("elmnt to bechanged: ", "." + element_selected);
            $("." + element_selected).html($(this).val().replace(/\r\n|\r|\n/g, "<br />"));
            // $("#title").html($(this).val());
        });
        const text_shadow_color = Pickr.create({
            el: '#shadow_color',
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

        text_shadow_color.on('change', function (color, instance) {
            text_shadow_color.setColor(color.toRGBA().toString());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");
            if (selector == "dr.ui-draggable.ui-draggable-handle.border-select") return;
            // 
            let text_shadow = $("." + element_selected).css(["text-shadow"]);
            text_shadow = text_shadow['text-shadow'];
            let composed_text_shadow = "";
            if (text_shadow == undefined || text_shadow == "none") {
                composed_text_shadow = color.toRGBA().toString() + "1px 0 10px";
                $("." + element_selected).css({ "text-shadow": composed_text_shadow });
                return;
            }
            let text_shadow_arr = text_shadow.split(')');
            let split_position_blur = text_shadow_arr[1].split(" ");
            composed_text_shadow = color.toRGBA().toString() + " " + split_position_blur[1] + " " + split_position_blur[2] + " " + split_position_blur[3];
            debug && console.log(composed_text_shadow);

            $("." + element_selected).css({ "text-shadow": composed_text_shadow });
        });
        // ******* VERTICAL SHADOW TEXT CHANGE
        $("#vertical__shadow__input").on("change", function () {
            // element.css("font-size", $(this).val() + "px");
            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");

            let text_shadow = $("." + element_selected).css(["text-shadow"]);
            text_shadow = text_shadow['text-shadow'];
            let text_shadow_arr = text_shadow.split(')');
            let split_position_blur = text_shadow_arr[1].split(" ");
            let composed_text_shadow = text_shadow_arr[0] + ") " + $(this).val() + "px " + split_position_blur[2] + " " + split_position_blur[3];

            debug && console.log(composed_text_shadow);
            $("." + element_selected).css({ "text-shadow": composed_text_shadow });
            $("#vertical__shadow").text($(this).val() + "px");
        });
        // ******* VERTICAL SHADOW TEXT CHANGE end

        // ******* HORIZONTAL SHADOW TEXT CHANGE
        $("#horizontal__shadow__input").on("change", function () {
            // element.css("font-size", $(this).val() + "px");
            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");

            let text_shadow = $("." + element_selected).css(["text-shadow"]);
            text_shadow = text_shadow['text-shadow'];
            let text_shadow_arr = text_shadow.split(')');
            let split_position_blur = text_shadow_arr[1].split(" ");
            let composed_text_shadow = text_shadow_arr[0] + ") " + split_position_blur[1] + " " + $(this).val() + "px " + split_position_blur[3];

            debug && console.log(composed_text_shadow);
            $("." + element_selected).css({ "text-shadow": composed_text_shadow });
            $("#horizontal__shadow").text($(this).val() + "px");
        });
        // ******* HORIZONTAL SHADOW TEXT CHANGE ends

        // ******* BLUR SHADOW TEXT CHANGE
        $("#text__blur__input").on("change", function () {
            // element.css("font-size", $(this).val() + "px");
            debug && console.log($(this).val());
            var selector = $('.edit__banner').attr('data-classid');
            let element_selected = selector.replace(/\s/g, ".");

            let text_shadow = $("." + element_selected).css(["text-shadow"]);
            text_shadow = text_shadow['text-shadow'];
            let text_shadow_arr = text_shadow.split(')');
            let split_position_blur = text_shadow_arr[1].split(" ");
            let composed_text_shadow = text_shadow_arr[0] + ") " + split_position_blur[1] + " " + split_position_blur[2] + " " + $(this).val() + "px";

            debug && console.log(composed_text_shadow);
            $("." + element_selected).css({ "text-shadow": composed_text_shadow });
            $("#text__blur").text($(this).val() + "px");
        });
        // ******* BLUR SHADOW TEXT CHANGE ends

        $("#title_alignment").on("change", function () {
            $("#title").css("text-align", $(this).val());
        });

        $("#title_lh").on("input propertychange", function () {
            $("#title").css("line-height", $(this).val());
        });

        $("#title_padding").on("input propertychange", function () {
            $("#title").css("padding", $(this).val());
        });

        $("#title_border_width").on("input propertychange", function () {
            $("#title").css("border-width", $(this).val());
        });

        $("#title_border_color").on("change", function () {
            $("#title").css("border-color", $(this).val());
        });

        $("#title_bg_color").on("change", function () {
            if ($("#title_bg_transparent").is(":checked"))
                $("#title").css("background", "none");
            else
                $("#title").css("background-color", $(this).val());
        });

        $("#title_bg_transparent").on("change", function () {
            if ($(this).is(":checked"))
                $("#title").css("background", "none");
            else
                $("#title").css("background-color", $("#title_bg_color").val());
        });

        $("#title_font").on("input propertychange", function () {
            $("#title").css("font-family", $(this).val());
        });

        $("#paragraph_text").on("input propertychange", function () {
            $("#para").html($(this).val());
        });

        $("#paragraph_width").on("input propertychange", function () {
            $("#para").width($(this).val());
        });

        $("#paragraph_height").on("input propertychange", function () {
            $("#para").height($(this).val());
        });

        $("#paragraph_fontsize").on("input propertychange", function () {
            $("#para").css("font-size", $(this).val());
        });

        $("#paragraph_alignment").on("change", function () {
            $("#para").css("text-align", $(this).val());
        });
        // font family change
        $("#fontFamily").on("change", function () {
            $("#title").css("font-family", $(this).val());
        });

        $("#title_fontsize").on("input propertychange", function () {
            $("#title").css("font-size", $(this).val() + "px");
        });

        $("#title_lineHeight").on("input propertychange", function () {
            $("#title").css("line-height", $(this).val());
        });

        $("#title_letterSpacing").on("input propertychange", function () {
            $("#title").css("letter-spacing", $(this).val() + "px");
        });

        $("#title_color").on("change", function () {
            $("#title").css("color", $(this).val());
        });

        // 

        $("#paragraph_lh").on("input propertychange", function () {
            $("#para").css("line-height", $(this).val());
        });

        $("#paragraph_padding").on("input propertychange", function () {
            $("#para").css("padding", $(this).val());
        });

        $("#paragraph_border_width").on("input propertychange", function () {
            $("#para").css("border-width", $(this).val());
        });
        $("#paragraph_border_color").on("change", function () {
            $("#para").css("border-color", $(this).val());
        });

        $("#paragraph_color").on("change", function () {
            $("#para").css("color", $(this).val());
        });

        $("#paragraph_bg_color").on("change", function () {
            if ($("#paragraph_bg_transparent").is(":checked"))
                $("#para").css("background", "none");
            else
                $("#para").css("background-color", $(this).val());
        });

        $("#paragraph_bg_transparent").on("change", function () {
            if ($(this).is(":checked"))
                $("#para").css("background", "none");
            else
                $("#para").css("background-color", $("#paragraph_bg_color").val());
        });

        $("#paragraph_font").on("input propertychange", function () {
            $("#para").css("font-family", $(this).val());
        });


        $("#canvas_width").on("input propertychange", function () {
            $("#canvas").width($(this).val());
        });

        $("#canvas_height").on("input propertychange", function () {
            $("#canvas").height($(this).val());
        });

        $("#canvas_src").on("input propertychange", function () {
            var imageurl = $(this).val().replace(/http[s]?:\/\//gi, "/images/");

            $("#canvas").css("background", "url(" + imageurl + ")");
            $("#canvas").css("background-size", "cover");
        });

        $("#icon_width").on("input propertychange", function () {
            $("#icon").width($(this).val());
        });

        $("#icon_height").on("input propertychange", function () {
            $("#icon").height($(this).val());
        });

        $("#icon_src").on("input propertychange", function () {
            var iconsrc = $(this).val().replace(/http[s]?:\/\//gi, "/images/");
            $("#icon").attr("src", iconsrc);
        });

        $("#hide_icon").on("click", function () {
            $("#icon").toggle();
        });

        $("#overlay_color").on("input propertychange", function () {
            $(".overlay").css("background-color", $(this).val());
        });

        $("#overlay_opacity").on("input propertychange", function () {
            $(".overlay").css("opacity", $(this).val());
        });

        $("input, select").on("input propertychange", function () {
            $("#banner_download").hide();
        });

        // Click background color
        $(".bg__color").click(function () {

            var _this = jQuery(this);
            var colorCode = _this.attr("data-color");
            // console.log(colorCode);
            // jQuery("#canvas img").remove();
            jQuery("#canvas").css("background-image", "none");
            jQuery("#canvas").css("background-color", colorCode);

        });

        // ********** EVENT LISTENER ON EVERY ELEMENT CLICKED WITHIN THE CANVAS
        $(document).on("click", "#canvas>*", function (event) {
            var $this = $(this);
            if ($this.hasClass('text_model')) return;

            let target = event.target.className;
            debug && console.log($this.closest('div').attr('class'));
            debug && console.log(target.indexOf("offer__link"));
            
            if (target.indexOf("offer__link")<=-1) {
                $("#canvas>*").removeClass("border-select");
                $("#canvas>*>*").removeClass("border-select");
            }

            if ($this.closest('div').attr('class') == "dr close_button") {
                target = "dr close_button";
                debug && console.log("target closest ", target);
                class_selector = target.replace(/\s/g, ".");
                $('.' + class_selector).addClass("border-select");
                // return;
            } else {
                $this.addClass("border-select");
            }
            // ********* Add the element clicked class to the data attribute of the quick edit widget
            $('.delete .btn').attr('data-classid', target);
            $('.edit__banner').attr('data-classid', '');
            $('.edit__banner').attr('data-classid', target);
            // ********* Add the element clicked class to the data attribute of the quick edit widget ends.

            // ********* INIT QUICK EDIT OPTIONS 

            // ********* point cursor on the element clicked styles attributes below
            var styleProps = $this.css([
                "font-family", "font-weight", "line-height", "text-shadow", "font-size", "color", "background-color",
                "letter-spacing", "text-align", "text-transform", "text-decoration", "border-color"
            ]);
            var fontfamilyCustom = styleProps["font-family"],
                fontFinal = fontfamilyCustom,
                sizeFinal = styleProps["font-size"],
                colorFinal = styleProps["color"],
                backgroundColorFinal = styleProps["background-color"],
                lineHeight = styleProps["line-height"],
                textshadowFinal = styleProps["text-shadow"],
                letterSpacing = styleProps["letter-spacing"],
                text_align = styleProps["text-align"],
                text_transform = styleProps["text-transform"],
                text_decoration = styleProps["text-decoration"],
                button_border_color = styleProps["border-color"];
            // ********* point cursor on the element clicked styles attributes ends. ends

            if (event.target.className.includes("model__") !== false) {
                target = $(this).parent().attr("class");
            }

            init_popup_style(target, colorFinal, sizeFinal, lineHeight, letterSpacing, fontFinal, backgroundColorFinal, textshadowFinal, text_align, text_transform, text_decoration, button_border_color);
            $('#title_text').val($this.text());
            // ********* INIT QUICK EDIT OPTIONS Ends.
            // ********* SET QUICK EDIT POSITION
            $(".edit__banner").css({
                position: "absolute",
                "pointer-events": "inherit",
                opacity: 1,
                display: 'block',
            });
            // if logo selected 
            if (target == "dr canva_logos fade-in") {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').hide();
                $(".edit__banner").position({
                    my: "left+3 bottom-3",
                    at: "right top+3",
                    of: $this,
                    collision: "fit"
                });
                $('.edit__banner--container.active').position({
                    my: "left+3 bottom+3",
                    at: "right center",
                    of: $('.edit__banner'),
                });
                return;
            } else {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').show();
            }

            // if background img selected:
            if (target == "dr bg_image fade-in") {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').hide();
                // ********* SET QUICK EDIT POSITION
                $(".edit__banner").position({
                    my: "left+3 bottom-3",
                    at: "right top",
                    of: $('#canvas'),
                    collision: "fit"
                });

                $('.edit__banner--container.active').position({
                    my: "left+3 bottom+3",
                    at: "right center",
                    of: $('.edit__banner'),
                });
                // ********* SET QUICK EDIT POSITION Ends.
                return;
            } else {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').show();
            };

            $(".edit__banner").position({
                my: "left+3 bottom-3",
                at: "right top+3",
                of: $this,
                collision: "fit"
            });

            $('.edit__banner--container.active').position({
                my: "left+3 bottom+3",
                at: "right center",
                of: $('.edit__banner'),
            });
            // ********* SET QUICK EDIT POSITION Ends.
        });

        // Element imbriqué: elmnt>elmnts
        $(document).on("click", "#canvas>*>*", function (event) {
            var $this = $(this);
            $("#canvas>*>*").removeClass("border-select");

            let target = $this.parent("div")[0].className;
            console.log("targte1: ",$this.parent("div")[0].className);
            console.log("target: ",target);
            
            if (target == "dr close_button" || target=="dr close_button") {
                target = $this.parent("div")[0].className;
            } else {
                target = event.target.className;
            };
            // console.log(!target.includes("offer__link"));
            if (target.indexOf("offer__link")<=-1) {
                $("#canvas>*").removeClass("border-select");
                $("#canvas>*>*").removeClass("border-select");
            }

            debug && console.log($this.closest('div').attr('class'));

            if ($this.closest('div').attr('class') == "dr close_button") {
                target = "dr close_button";
                debug && console.log("target closest ", target);
                class_selector = target.replace(/\s/g, ".");
                $('.' + class_selector).addClass("border-select");
                // return;
            } else {
                $this.addClass("border-select");
            }

            // ********* Add the element clicked class to the data attribute of the quick edit widget
            $('.delete .btn').attr('data-classid', target);
            $('.edit__banner').attr('data-classid', '');
            $('.edit__banner').attr('data-classid', target);
            // ********* Add the element clicked class to the data attribute of the quick edit widget ends.

            // ********* INIT QUICK EDIT OPTIONS 

            // ********* point cursor on the element clicked styles attributes below
            var styleProps = $this.css([
                "font-family", "font-weight", "line-height", "text-shadow", "font-size", "color", "background-color", "letter-spacing", "border-color"
            ]);
            var fontfamilyCustom = styleProps["font-family"],
                fontFinal = fontfamilyCustom,
                sizeFinal = styleProps["font-size"],
                colorFinal = styleProps["color"],
                backgroundColorFinal = styleProps["background-color"],
                lineHeight = styleProps["line-height"],
                textshadowFinal = styleProps["text-shadow"],
                letterSpacing = styleProps["letter-spacing"],
                text_align = styleProps["text-align"],
                text_transform = styleProps["text-transform"],
                text_decoration = styleProps["text-decoration"],
                button_border_color = styleProps["border-color"];

            if (target.includes("model__") !== false) {
                target = $(this).parent().attr("class");
            }

            // ********* point cursor on the element clicked styles attributes ends. ends
            init_popup_style(target, colorFinal, sizeFinal, lineHeight, letterSpacing, fontFinal, backgroundColorFinal, textshadowFinal, text_align, text_transform, text_decoration, button_border_color);
            $('#title_text').val($this.text());
            // ********* INIT QUICK EDIT OPTIONS Ends.
            // ********* SET QUICK EDIT POSITION
            $(".edit__banner").css({
                position: "absolute",
                "pointer-events": "inherit",
                opacity: 1,
                display: 'block',
            });
            // if logo selected 
            if (target == "dr canva_logos fade-in") {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').hide();
                $(".edit__banner").position({
                    my: "left+3 bottom-3",
                    at: "right top+3",
                    of: $this,
                    collision: "fit"
                });
                $('.edit__banner--container.active').position({
                    my: "left+3 bottom+3",
                    at: "right center",
                    of: $('.edit__banner'),
                });
                return;
            } else {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').show();
            }


            // if background img selected:
            if (target == "dr bg_image fade-in") {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').hide();
                // ********* SET QUICK EDIT POSITION
                // ********* SET QUICK EDIT POSITION
                $(".edit__banner").position({
                    my: "left+3 bottom-3",
                    at: "right center",
                    of: $('#canvas img.bg_image'),
                    collision: "fit"
                });

                $('.edit__banner--container.active').position({
                    my: "left+3 bottom+3",
                    at: "right center",
                    of: $('.edit__banner'),
                });
                // ********* SET QUICK EDIT POSITION Ends.
                return;
            } else {
                $('.edit__banner').find('div.edit__banner--item:not(:last)').show();
            };
            $(".edit__banner").position({
                my: "left+3 bottom-3",
                at: "right top+3",
                of: $this,
                collision: "fit"
            });
            $('.edit__banner--container.active').position({
                my: "left+3 bottom+3",
                at: "right center",
                of: $('.edit__banner'),
            });
            // ********* SET QUICK EDIT POSITION Ends.
        });
        // Element imbriqué: elmnt>elmnts
        // ********** EVENT LISTENER ON EVERY ELEMENT CLICKED WITHIN THE CANVAS

    });
})(jQuery);