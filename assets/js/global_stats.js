(function() {
    const debug = true;
    // $("#filters_header").load("filters.html");
    // $("select.form-control, select.custom-control").select2();

    // $("#main_options").select2({

    // });
    function formatState(opt) {
        if (!opt.id) {
            return opt.text;
        }
        var optimage = $(opt.element).attr('data-image');

        var baseUrl = "https://purecatamphetamine.github.io/country-flag-icons/1x1";

        if (!optimage) {
            return opt.text;
        } else {
            var $opt = $(
                '<span class="avatar-img"><img class="mr-2" src="' + baseUrl + '/' + optimage + '.svg" class="img-flag" /> ' + opt.text + '</span>'
            );
            return $opt;
        }
    };

    $("#elemnt_geo_location, #origin1, #origin2, #situation_geo").select2({
        templateResult: formatState,
        templateSelection: formatState
    });

    jQuery("#search__filter").on("click", function() {
        $('#main_options').select2('open');
    });

    jQuery("#search__compare").on("click", function() {
        $('#compare_options').select2('open');
    });

    jQuery("#search__situation").on("click", function() {
        $('#situation_options').select2('open');
    });



    $('#result__filter').tagsinput({
        maxTags: 6
    });

    // COMPARE


    $('#result__compare').tagsinput({
        maxTags: 1
    });

    // SITUATION

    $('#result__situation').tagsinput({
        maxTags: 1
    });




    // 
    // 

    $('#main_options').on('change', function() {
        var data = $("#main_options option:selected").val();
        console.log(data);
        var left = $("#search__filter").offset().left;
        var top = $("#search__filter").offset().top;
        // var x = $("#search__filter").position();

        var w__ = $('#main_options').width();

        $("#" + data).css({
            "top": top,
            "left": left
        })

        console.log(top, "left : " + left);
        $("#" + data).show();
    });


    $('#compare_options').on('change', function() {
        var data = $("#compare_options option:selected").val();
        console.log(data);
        var left = $("#search__compare").offset().left;
        var top = $("#search__compare").offset().top;
        // var w__ = $('#compare_options').width();

        $(".w__compare").css({
            "top": top,
            "left": left
        });

        if (data == "c__timeframe") {
            $("#picker__compare").hide();
        } else {
            $("#picker__compare").show();
        }

        $("#" + data).show();
    });


    $('#situation_options').on('change', function() {
        var data = $("#situation_options option:selected").val();
        console.log(data);
        var x = $("#search__situation").offset().left;
        var y = $("#search__situation").offset().top;
        var w__ = $('#situation_options').width();

        $(".w__filter").css({
            "top": y,
            "left": x
        })

        console.log(x, y, w__);
        $("#" + data).show();
    });



    // COMPARE ORIGIN
    $("#btn__c__origin").click(function() {

        var selected = [];
        var selected2 = [];
        for (var option of document.getElementById('origin1').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        for (var option2 of document.getElementById('origin2').options) {
            if (option2.selected) {
                selected2.push(option2.value);
            }
        }
        console.log(selected, selected2);
        var string_arry = "Origin : " + selected + " vs " + selected2;
        console.log(string_arry);

        $("#result__compare").tagsinput("add", string_arry);
        $(".w__filter, .w__compare").hide();
    });

    // COMPARE TIME FRAME

    $("#btn__c__timeframe").click(function() {

        // var selected = [];
        // for (var option of document.getElementById('cc__timeframe').options) {
        //     if (option.selected) {
        //         selected.push(option.value);
        //     }
        // }
        // console.log(selected);
        // var string_arry = "Time : " + selected
        // console.log(string_arry);

        // $("#result__compare").tagsinput("add", string_arry);
        // $(".w__filter, .w__compare").hide();
    });


    $("#cc__timeframe").change(function() {

        var _this = $("#cc__timeframe option:selected").text();

        switch (_this) {
            case "Month":

                $(".selectToCompare").hide();
                $("#month1").show();
                break;

            case "Quarter":
                $(".selectToCompare").hide();
                $("#quarter1").show();
                break;

            case "Semester":
                $(".selectToCompare").hide();
                $("#semester1").show();
                break;

            case "Year":
                $(".selectToCompare").hide();
                $("#year1").show();
                break;

            default:
                $(".selectToCompare").hide();
                break;
        }
        if (_this == "Month") {
            // $("#Filter").show();
            // $("#Compare").hide();

        } else {
            $("#Filter").hide();
            $("#Compare").show();
        }
    });

    // COMPARE ADS
    $("#btn__c__ad").click(function() {

        var selected = [];
        var selected2 = [];
        for (var option of document.getElementById('cc__ad1').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        for (var option2 of document.getElementById('cc__ad2').options) {
            if (option2.selected) {
                selected2.push(option2.value);
            }
        }
        console.log(selected, selected2);
        var string_arry = "Ads : " + selected + " vs " + selected2;
        console.log(string_arry);

        $("#result__compare").tagsinput("add", string_arry);
        $(".w__filter, .w__compare").hide();
    });



    // COMPARE SOURCES
    $("#btn__c__source").click(function() {

        var selected = [];
        var selected2 = [];
        for (var option of document.getElementById('cc__source1').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        for (var option2 of document.getElementById('cc__source2').options) {
            if (option2.selected) {
                selected2.push(option2.value);
            }
        }
        console.log(selected, selected2);
        var string_arry = "Source : " + selected + " vs " + selected2;
        console.log(string_arry);

        $("#result__compare").tagsinput("add", string_arry);
        $(".w__filter, .w__compare").hide();
    });


    // COMPARE SOURCES
    $("#btn__c__tracking").click(function() {

        var selected = [];
        var selected2 = [];
        for (var option of document.getElementById('cc__tracking1').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        for (var option2 of document.getElementById('cc__tracking2').options) {
            if (option2.selected) {
                selected2.push(option2.value);
            }
        }
        console.log(selected, selected2);
        var string_arry = "Tracking Variables : " + selected + " vs " + selected2;
        console.log(string_arry);

        $("#result__compare").tagsinput("add", string_arry);
        $(".w__filter, .w__compare").hide();
    });


    // COMPARE TIME
    $("#btn__c__time").click(function() {

        var selected = [];
        var selected2 = [];
        for (var option of document.getElementById('cc__time1').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        for (var option2 of document.getElementById('cc__time2').options) {
            if (option2.selected) {
                selected2.push(option2.value);
            }
        }
        console.log(selected, selected2);
        var string_arry = "Time of Day : " + selected + " vs " + selected2;
        console.log(string_arry);

        $("#result__compare").tagsinput("add", string_arry);
        $(".w__filter, .w__compare").hide();
    });


    // COMPARE PAGES
    $("#btn__c__page").click(function() {

        var selected = [];
        var selected2 = [];
        for (var option of document.getElementById('cc__page1').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        for (var option2 of document.getElementById('cc__page2').options) {
            if (option2.selected) {
                selected2.push(option2.value);
            }
        }
        console.log(selected, selected2);
        var string_arry = "Pages : " + selected + " vs " + selected2;
        console.log(string_arry);

        $("#result__compare").tagsinput("add", string_arry);
        $(".w__filter, .w__compare").hide();
    });

    // COMPARE PAGES
    $("#btn__c__hotel").click(function() {

        var selected = [];
        var selected2 = [];
        for (var option of document.getElementById('cc__hotel1').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        for (var option2 of document.getElementById('cc__hotel2').options) {
            if (option2.selected) {
                selected2.push(option2.value);
            }
        }
        console.log(selected, selected2);
        var string_arry = "Hotels : " + selected + " vs " + selected2;
        console.log(string_arry);

        $("#result__compare").tagsinput("add", string_arry);
        $(".w__filter, .w__compare").hide();
    });



    //######## END COMPARE ##########

    //######## START SITUATION ##########


    // SITUATION BRAND
    $("#apply__situation__brand").click(function() {
        var favorite = [];
        $.each($("input[name='s__brand']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Brand : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION SUB BRAND
    $("#apply__situation__subbrand").click(function() {
        var favorite = [];
        $.each($("input[name='s__sub_brand']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Sub Brand : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION HOTEL
    $("#apply__situation__hotel").click(function() {
        var favorite = [];
        $.each($("input[name='s__hotel']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Hotel : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION CLASSE
    $("#apply__situation__classe").click(function() {
        var favorite = [];
        $.each($("input[name='s__classe']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Classe : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION TRACKING
    $("#apply__situation__tracking").click(function() {
        var favorite = $("#s__tracking").val();


        var string_arry = "Tracking Variables : " + favorite;
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });


    // SITUATION DEVICES
    $("#apply__situation__device").click(function() {
        var favorite = [];
        $.each($("input[name='s__devices']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Devices : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });


    // SITUATION STATU
    $("#apply__situation__statu").click(function() {
        var favorite = [];
        $.each($("input[name='s__statu']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Statu  : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION ORIGIN
    $("#apply__situation__origin").click(function() {

        var selected = [];
        for (var option of document.getElementById('situation_geo').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Origin : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION ADS
    $("#apply__situation__ads").click(function() {

        var selected = [];
        for (var option of document.getElementById('s__ads').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Ad : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION TIME OF DAY
    $("#apply__situation__timeofday").click(function() {

        var selected = [];
        for (var option of document.getElementById('s__timeofday').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Time of Day : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });


    // SITUATION PAGES
    $("#apply__situation__pages").click(function() {

        var selected = [];
        for (var option of document.getElementById('s__pages').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Pages : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION TIME FRAME
    $("#situation__timeframe").click(function() {

        var selected = [];
        for (var option of document.getElementById('s__timeframe').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Timeframe : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SITUATION SOURCE
    $("#situation__source").click(function() {

        var selected = [];
        for (var option of document.getElementById('s__source').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Source : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__situation").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });




    //######## END SITUATION ##########



    // BRANDS
    $("#apply__brands").click(function() {
        var favorite = [];
        $.each($("input[name='f__brand']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Brands : <span style='color:#09acc1'>" + favorite.join("</span> & ");
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SUB BRANDS
    $("#apply__subbrands").click(function() {
        var favorite = [];
        $.each($("input[name='f__subbrand']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Sub Brands : " + favorite.join(" & ");

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // BRANDS
    $("#apply__hotels").click(function() {
        var favorite = [];
        $.each($("input[name='f__hotels']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Hotels : " + favorite.join(" & ");

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // CLASSES
    $("#apply__classes").click(function() {
        var favorite = [];
        $.each($("input[name='f__classes']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Classes : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // DEVICES
    $("#apply__devices").click(function() {
        var favorite = [];
        $.each($("input[name='f__devices']:checked"), function() {
            favorite.push($(this).val());
        });

        var string_arry = "Devices : " + favorite.join(" & ");
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // STATUS
    $("#apply__status").click(function() {
        // var favorite = [];
        // $.each($("input[name='f__status']:checked"), function() {
        //     favorite.push($(this).val());
        // });
        var selected = [];
        for (var option of document.getElementById('f__status').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        var string_arry = "Status : " + selected.join(" & ");
        console.log(selected);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // ORIGIN
    $("#apply__origin").click(function() {

        var selected = [];
        for (var option of document.getElementById('elemnt_geo_location').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Origin : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // PAGES
    $("#apply__pages").click(function() {

        var selected = [];
        for (var option of document.getElementById('f__pages').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Pages : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });


    // TIME
    $("#apply__time").click(function() {

        var selected = [];
        for (var option of document.getElementById('f__time').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        console.log(selected);
        var string_arry = "Time of Day : " + selected.join(" & ");
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // NAME
    $("#apply__name").click(function() {

        var selected = $("#f__name").val();

        var string_arry = "Ad name contains : " + selected;
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });


    // NAME
    $("#apply__tracking").click(function() {

        var selected = $("#f__tracking").val();

        var string_arry = "Tracking Variables : " + selected;
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // SOURCE
    $("#apply__source").click(function() {

        var selected = $("#f__source").val();

        var string_arry = "Source : " + selected;
        console.log(string_arry);

        $("#result__filter").tagsinput("add", string_arry);
        $(".w__filter").hide();
    });

    // CLEAR

    $(".clear__filter").click(function(e) {
        e.preventDefault();
        $('#result__filter').tagsinput('removeAll');
        $('#result__compare').tagsinput('removeAll');

    })

    $(".cancel__filter").click(function() {
        $(".w__filter, .w__compare").hide();
    });

    // listner on inputs change functions
    // each change applied on filters should be stored in localstorage

    const getDaysInMonth = (date) => {
        var daysInMonth = [];
        var monthDate = moment(date); // change to a date in the month of interest

        _.times(monthDate.daysInMonth(), function(n) {
            daysInMonth.push(monthDate.format('DD')); // your format
            monthDate.add(1, 'day');
        });
        return daysInMonth;
    }


    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const linechart_chart = (xAxis_chart, data_serie, chartClass, frame_time_selected) => {
        debug && console.log(data_serie);
        $('#' + chartClass).remove(); // This is my <canvas> element...
        $('#orderschart_container').append('<canvas id="' + chartClass + '"><canvas>');
        var Mycanvas = $('#' + chartClass);
        // var MONTHS = xAxis_chart;
        window.config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: data_serie,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: frame_time_selected
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                // hover: {
                //     mode: 'nearest',
                //     intersect: true
                // },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
            }
        };
        xAxis_chart.map((data) => {
            config.data.labels.push(data);
        });
        var ctxContext = Mycanvas[0].getContext('2d');
        window.myLine = new Chart(ctxContext, config);
    };

    // ********** FILTER FORM SUBMIT 
    $('form').on('submit', function(e) {
        e.preventDefault();
        $('.chart_card').prepend('<div class="glob__view--waiting"><div class="spinner"></div></div>');
        let form_inputs = $(this).serialize();
        var search = form_inputs;
        let params_synched = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        let dynamic_breadcrump = '<ol class="breadcrumb">' +
            '<li class="breadcrumb-item">' + params_synched.brand_name + '</li>' +
            '<li class="breadcrumb-item">' + params_synched.sub_brand_name + '</li>' +
            '<li class="breadcrumb-item">' + params_synched.hotel_name + '</li>' +
            '<li class="breadcrumb-item">' + params_synched.class_name + '</li>' +
            '<li class="breadcrumb-item">' + params_synched.device_name + '</li>' +
            '<li class="breadcrumb-item">' + params_synched.origin_name + '</li>' +
            '<li class="breadcrumb-item">' + params_synched.page_name + '</li>' +
            '<li class="breadcrumb-item active" aria-current="page">' + params_synched.time_frame + '</li>' +
            '</ol>';
        $('.dynamic_breadcrump').empty().append(dynamic_breadcrump);
        debug && console.log(params_synched);
        // Prepare chart of 1 month serie data.
        let days_Axis = getDaysInMonth(moment().startOf("month"));
        // This month days labels for xAxis.
        if (params_synched.time_frame == "Current month") {
            // days_Axis = getDaysInMonth(moment().startOf("month").format("YYYYMMDD"));
            let startOf_month = moment().startOf("month").format("YYYYMMDD");
            while (moment(startOf_month).isBefore(today_date)) {
                chart_xAxis.push(moment(startOf_month).format("MMM"));
                startOf_month = moment(startOf_month).add(1, "month");
            };
            days_Axis = chart_xAxis;
        }

        // Last month days labels for xAxis.
        if (params_synched.time_frame == "Last month") {
            let dateFrom_lastmonth = moment().subtract(1, 'months').startOf("month").format('YYYYMMDD');
            days_Axis = getDaysInMonth(dateFrom_lastmonth);
        }
        // Prepare year labels for chart xAxis. if this year range selected it means the range of dates from the begining of the year to date.

        let today_date = moment().format("MM/DD/YYYY"); // Today date...
        var startOf_year = moment().startOf('year').format('MM/DD/YYYY'); // the start of year date. 01/01/YYYY
        let endOf_year = moment().endOf('year').format("YYYY-MM-DD"); // last day of year


        let chart_xAxis = [];
        let chart_xAxis_projection = [];

        if (params_synched.time_frame == "Year to date") {
            while (moment(startOf_year).isBefore(today_date)) {
                chart_xAxis.push(moment(startOf_year).format("MMM"));
                startOf_year = moment(startOf_year).add(1, "month");
            };
            days_Axis = chart_xAxis;
            while (moment(today_date).isBefore(endOf_year)) {
                chart_xAxis_projection.push(moment(today_date).format("MMM"));
                today_date = moment(today_date).add(1, "month");
            };
            days_Axis2 = chart_xAxis_projection;
        } else if (params_synched.time_frame == "Last Year") {
            while (moment(startOf_year).isBefore(endOf_year)) {
                chart_xAxis_projection.push(moment(startOf_year).format("MMM"));
                startOf_year = moment(startOf_year).add(1, "month");
            };
            days_Axis = chart_xAxis_projection;
        }

        let quarters = [3, 2, 1, 0].map(i => moment().subtract(i, 'Q').startOf('month').format('MM/DD/YYYY'))

        quarters = [3, 2, 1, 0].map(i => moment().endOf("year").subtract(i, 'Q').endOf('month').format('MM/DD/YYYY'))
            // ["03/01/2020", "06/01/2020", "09/01/2020", "12/01/2020"]

        if (params_synched.time_frame == "Quarter 1") {
            while (moment(startOf_year).isBefore(quarters[0])) {
                debug && console.log(moment(startOf_year).format("MMM"));
                chart_xAxis.push(moment(startOf_year).format("MMM"));
                startOf_year = moment(startOf_year).add(1, "month");
            };
            days_Axis = chart_xAxis;
        }

        if (params_synched.time_frame == "Quarter 2") {
            while (moment(quarters[0]).isBefore(quarters[1])) {
                debug && console.log(moment(quarters[0]).format("MMM"));
                chart_xAxis.push(moment(quarters[0]).format("MMM"));
                quarters[0] = moment(quarters[0]).add(1, "month");
            };
            days_Axis = chart_xAxis;
        }

        if (params_synched.time_frame == "Quarter 3") {
            while (moment(quarters[1]).isBefore(quarters[2])) {
                debug && console.log(moment(quarters[1]).format("MMM"));
                chart_xAxis.push(moment(quarters[1]).format("MMM"));
                quarters[1] = moment(quarters[1]).add(1, "month");
            };
            days_Axis = chart_xAxis;
        }

        if (params_synched.time_frame == "Quarter 4") {
            while (moment(quarters[2]).isBefore(quarters[3])) {
                debug && console.log(moment(quarters[2]).format("MMM"));
                chart_xAxis.push(moment(quarters[2]).format("MMM"));
                quarters[2] = moment(quarters[2]).add(1, "month");
            };
            days_Axis = chart_xAxis;
        }

        if (params_synched.time_frame == "Semester S1") {
            // Half 1
            while (moment(startOf_year).isBefore(quarters[1])) {
                chart_xAxis.push(moment(startOf_year).format("MMM"));
                startOf_year = moment(startOf_year).add(1, "month");
            };
            days_Axis = chart_xAxis;
        }

        if (params_synched.time_frame == "Semester S2") {
            // Half 2
            while (moment(quarters[1]).isBefore(endOf_year)) {
                debug && console.log(moment(quarters[1]).format("MMM"));
                chart_xAxis.push(moment(quarters[1]).format("MMM"));
                quarters[1] = moment(quarters[1]).add(1, "month");
            };
            days_Axis = chart_xAxis;
        }

        // Prepare year labels for chart xAxis. if this year range selected it means the range of dates from the begining of the year to date.

        // if quarter or start of quarter
        // moment().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am  

        let serie_hotel1 = [];
        let serie_hotel2 = [];

        switch (params_synched.hotel_name) {
            case "All Hotels":
                $('#chart_global_header').css("display", "flex");
                let hotels_nbr = $('select[name="hotel_name"] option').length - 1;

                window.myLine.clear();
                window.myLine.reset();

                debug && console.log(config.data.datasets);
                config.data.datasets = [];
                let series = [];
                for (let index = 0; index < hotels_nbr; index++) {
                    // Create data serie
                    serie_hotel2 = [];
                    for (let index = 0; index < days_Axis.length; index++) {
                        serie_hotel2.push(randomScalingFactor());
                    }
                    series.push(serie_hotel2);
                }
                // Console.log(series);
                series.map((arr, i) => {
                    var colorNames = Object.keys(window.chartColors);
                    var colorName = colorNames[config.data.datasets.length % colorNames.length];
                    var newColor = window.chartColors[colorName];
                    var newDataset = {
                        label: 'Dataset ' + i + ' ' + config.data.datasets.length,
                        backgroundColor: newColor,
                        borderColor: newColor,
                        data: arr,
                        fill: false
                    };
                    config.data.datasets.push(newDataset);
                });
                setTimeout(function() {
                    window.myLine.update();
                }, 1500);
                break;
            default:
                $('#chart_global_header').hide();
                // Year to date data serie
                // debug && console.log(days_Axis2);
                for (let index = 0; index < days_Axis.length; index++) {
                    serie_hotel1.push(randomScalingFactor());
                }
                linechart_chart(days_Axis, serie_hotel1, 'ordersChart', params_synched.time_frame);
                break;
        }
        switch (params_synched.class_name) {
            case "Welcome Message":
                $('#global_card_revenue').hide();
                $("#sidebar_topAdverts").empty();
                $("#sidebar_topAdverts").load('top_adverts_welcome_message.html', null, function() {
                    $(".frame_time_selected").text(params_synched.time_frame);
                });
                break;
            case "Email collecting":
                $('#global_card_revenue').hide();
                break;
            default:
                $('#global_card_revenue').show();
                $("#sidebar_topAdverts").empty();
                $("#sidebar_topAdverts").load('top_adverts_all.html', null, function() {
                    $(".frame_time_selected").text(params_synched.time_frame);
                });
                break;
        }
        e.preventDefault();
        return
    });
    // ********** FILTER FORM SUBMIT Ends

    // ********** INITIAL SUBMIT
    $('#basic_filters_form').submit();
    // ********** INITIAL SUBMIT Ends

    // ********** SWITCH INDIVIDUAL / Overall
    $("#cardToggle").change(function() {
        debug && console.log($(this).is(':checked'));
        if ($(this).is(':checked')) {
            config.data.datasets.splice(0, 2);
            window.myLine.update();
        } else {
            $('#basic_filters_form').submit();
        }
    });
    // ********** INITIAL SUBMIT

    // ********** Crads click change: labels and titles & rend new dataset for charts based on the prev datasets *********
    $(".cards_click").click(function(e) {
        e.preventDefault();
        let label = $(this).data("target");
        $('#chart_title_label').text(label);
        $('.map_header_title').text(label);
        $('.chart_card').prepend('<div class="glob__view--waiting"><div class="spinner"></div></div>');
        $('.card.pb-4').prepend('<div class="glob__view--waiting"><div class="spinner"></div></div>');
        $('.cards_click').find('div.bg-light').removeClass("bg-light");
        $('#sidebar_topAdverts').children().first().prepend('<div class="glob__view--waiting"><div class="spinner"></div></div>');
        $(this).children().first().addClass("bg-light");

        // change map header label

        // $(this).find("div").first().addClass("bg-light");
        // window.myLine.clear();
        // window.myLine.reset();
    });

})();