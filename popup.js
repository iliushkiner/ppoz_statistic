// JavaScript Document
let ready = false
let statistic_run = false;
//let global_count_nums = 0;
let nums_ajax_threads = new Map();

$(document).ready(function () {
    /*let count_date = $('#countdate');
    count_date.on('change past kayup select', function () {
        let plg_count_date = count_date.val();
        window.localStorage.plg_countdate = plg_count_date;
        chrome.storage.local.set({plg_count_date: plg_count_date}, function () {
            console.log(plg_count_date);
        });
    });*/

    $('#refresh').on('click', function () {
        $(this).attr('disabled', true);
        let current_request = window.localStorage.curent_request;
        $("#statistic").html("<div style='text-align: center;'><img src='loading.gif' alt='loading'></div>");
        if(!statistic_run) {
            load_inf_statistic(JSON.parse(current_request));
        }
    });

    //count_date.val(window.localStorage.plg_countdate);
    $("#now").html("<span style='color:red;'>сведения на</span>: <strong style='font-size: 11px'>" + Date() + "</strong>");
    let date_to = new Date();
    let str_date_to = date_to.getFullYear() + '-' + ((date_to.getMonth() + 1) < 10 ? '0' : '') + (date_to.getMonth() + 1) + '-' + ((date_to.getDate()) < 10 ? '0' : '') + date_to.getDate();
    $("#filtrdate").val(str_date_to);
    ready = true;
});

let current_request = 0;

/*function getAjaxDataUnAsync(url, json){
  var result = "";
  $.ajax({
    url: url,
    dataType: "json",
    data: JSON.stringify(json),
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    async: false,
    success: function(data) {
      //console.log(data);
      result = data;
    } 
  });
  return result
}*/
function getByIdAjaxData(url, root_selector, selector, json_filter_list) {
    $.ajax({
        url: url,
        dataType: "json",
        method: "GET",
        contentType: "application/json;charset=UTF-8",
        async: true,
        success: function (data) {
            //console.log(data);
            //let output_data = $(root_selector + selector).html();
            /*let select_nums = $('#reg_nums_' + root_selector + selector);
            let output_data = (select_nums.html() !== '<img src="loading.gif" alt="loading" class="loading">' ? $('#reg_nums_' + root_selector + selector).html() : '');*/

            let select_nums = $('#appealnumbers_' + root_selector + selector + '_appealnumbers');
            let output_data = (select_nums.html() !== '<img src="loading.gif" alt="loading" class="loading">' ? $('#appealnumbers_' + root_selector + selector  + '_appealnumbers').html() : '');

            let select_count = $('#' + root_selector + selector);

            $.each(json_filter_list, function(index, list_item) {
                if(list_item.enable) {
                    if (check_JSON_Filter(list_item.json_filter, data)) {
                        output_data += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/#/administration/details/' + data.appealNumber + '/data" target="_blank">' + data.appealNumber + '</a>';
                        output_data += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=' + data.appealNumber + '" target="_blank" class="json">[JSON]</a>; ';
                        //let count_nums = (select_count.html() !== '<img src="loading.gif" alt="loading" class="loading">' ? $('#' + root_selector + selector + " .count").html() : '0');
                        select_count.html("<span class='count'>" + (nums_ajax_threads.get(root_selector).get(selector).count_nums++) + "</span><img src='loading.gif' alt='loading' class='loading'>");
                        return false;
                    }
                }
            });
            nums_ajax_threads.get(root_selector).get(selector).threads.delete(data.appealNumber);
            if(nums_ajax_threads.get(root_selector).get(selector).threads.size < 1) {
                select_count.html("<span class='count'>" + (nums_ajax_threads.get(root_selector).get(selector).count_nums) + "</span>");
            }

            //$(root_selector + selector).html("<span class='nums'>" + output_data + "</span><img src='loading.gif' alt='loading' class='loading'>");
            select_nums.html(output_data);
            //select_nums.html("<span class='nums'>" + output_nums + "</count><img src='loading.gif' alt='loading' class='loading'>");
        }
    });
}

function getAjaxData(url, root_selector, selector, json, additional_filter) {
    $.ajax({
        url: url,
        dataType: "json",
        data: JSON.stringify(json),
        method: "POST",
        contentType: "application/json;charset=UTF-8",
        async: true,
        success: function (data) {
            //console.log(data);
            //result = data;
            let select_count = $('#' + root_selector + selector);
            let count_nums = (select_count.html() !== '<img src="loading.gif" alt="loading" class="loading">' ? $('#' + root_selector + selector + " .count").html() : '0');
            let select_nums = $('#appealnumbers_' + root_selector + selector + '_appealnumbers');
            let output_nums = (select_nums.html() !== '<img src="loading.gif" alt="loading" class="loading">' ? select_nums.html() : '');
            count_nums = parseInt(count_nums);

            if (data.requests.length > 0) {
                count_nums = (count_nums + data.requests.length);
                //let plg_regs_statistic_filter_list = [];

                data.requests.forEach(function (item) {
                    if (additional_filter.additional_filter_enable/* && additional_filter_list[0].enable*/) {
                        let request_url = 'http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=' + item.appealNumber;
                        nums_ajax_threads.get(root_selector).get(selector).threads.set(item.appealNumber, 'on');
                        getByIdAjaxData(request_url, root_selector, selector, additional_filter.additional_filter_list);
                    } else {
                        //output_nums += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=' + item.appealNumber + '" target="_blank">' + item.appealNumber + '</a>; ';
                        output_nums += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/#/administration/details/' + item.appealNumber + '/data" target="_blank">' + item.appealNumber + '</a>';
                        output_nums += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=' + item.appealNumber + '" target="_blank" class="json">[JSON]</a>; ';
                    }

                })

                if (!additional_filter.additional_filter_enable/*|| !(additional_filter_list.length>0 && additional_filter_list[0].enable)*/) {
                    select_nums.html(output_nums);
                    select_count.html("<span class='count'>" + count_nums + "</span><img src='loading.gif' alt='loading' class='loading'>");
                }

                json.pageNumber++;
                getAjaxData(url, root_selector, selector, json, additional_filter)
            } else {
                if (!additional_filter.additional_filter_enable) {
                    $('#' + root_selector + selector).html("<span class='count'>" + count_nums + "</span>");
                } else {
                    if(nums_ajax_threads.get(root_selector).get(selector).threads.size === 0) {
                        $('#' + root_selector + selector).html("<span class='count'>" + (nums_ajax_threads.get(root_selector).get(selector).count_nums) + "</span>");
                    }
                }
                select_nums.html(output_nums);
            }
        }
    });
}

/**
 * Проверяет фильтр и возвращает true если условия подходят
 */
function check_filter(index, value, reqbyiditem, like){
    let result = true;
    if (index !== 'array' && index !== 'like'){
        /**
         * Проверка на массив. В некоторых случаях value определяется как объект вместо Array
         */
        let is_array = false;
        $.each(value, function(vindex,vvalue){
            is_array = (vindex === 0);
            return false;
        });

        if(/*Array.isArray(value)*/is_array){
            if(!like){
                $.each(value, function(vindex,vvalue){
                    value[vindex] = vvalue.replace(/\s+/g,"");
                });
                result = (value.indexOf(reqbyiditem[index].replace(/\s+/g,""))>=0);
            } else {
                for(let likeval of value){
                    /**
                     * Ищем вхождение подстроки likeval в reqbyiditem[index]
                     */
                    if(typeof (reqbyiditem[index]) !== "undefined" && reqbyiditem[index] !== "" && reqbyiditem[index] !== null){
                        let patern = new RegExp(likeval,'g');
                        let match = reqbyiditem[index].match(patern);
                        result = (typeof(match) != "undefined" &&  match != null && match.length>0);
                        if (result) break;
                    } else {
                        result = false;
                        break;
                    }

                }
            }
        } else if(typeof(value) === 'object'){
            $.each(value, function(vindex,vvalue){
                result = check_filter(vindex, vvalue, reqbyiditem[vindex], false);
                return result;
            });
        }
    }else if(index === 'like'){
        console.log("UPS LIKE!");
        $.each(value, function(vindex,vvalue){
            result = (result && check_filter(vindex, vvalue, reqbyiditem, true));
            return !result;
            /*if (!result) {
                break;
            }*/
        });
    } else {
        //for(let filter of value.array){
        $.each(value, function(vindex,vvalue){
            if (reqbyiditem[vindex].length > 0){
                for(let reqbyid_arrayitem of reqbyiditem[vindex]){
                    result = true;
                    $.each(vvalue, function(vvindex,vvvalue){
                        result = (result && check_filter(vvindex, vvalue[vvindex], reqbyid_arrayitem, false));
                        return result;
                    });
                    if (result) {
                        break;
                    }
                }
            } else {
                result = false;
                return result;
            }
        });
    }
    return result;
}

function check_JSON_Filter(json_filter, reqbyid){
    //console.log("json_filter",json_filter);
    //console.log("reqbyid",reqbyid);
    let filterstatus = true;
    for(let filter of json_filter){
        filterstatus = true;
        $.each(filter, function(index,value){
            filterstatus = (filterstatus && check_filter(index, value, reqbyid, false));//(value.indexOf(reqbyid[index])>=0);
            /**
             * выход если параметр фильтра не соответствует обращению.
             * выход из $.each return false;
             */
            return filterstatus;
        });
        if (filterstatus) {
            break;
        }
    }
    return filterstatus;
}

/*function getCountAppealNumber(url, selector, json){
    let count = 0;
    let data = null;
    do{         
        data = getAjaxDataUnAsync(url, json);
        count = count + data.requests.length;
        json.pageNumber++;
    } while (data.requests.length>0);
    $(selector).html(count);
}*/

function load_inf_statistic(request) {
    statistic_run = true;
    nums_ajax_threads = new Map();
    let statistic = $("#statistic");
    statistic.html("");
    console.log("Получено:");
    console.log(request);

    /**
     *
     * @type {{getFilterBlock(): "center" | "end" | "nearest" | "start", load(): void, readonly filter_list: [], save(): void}}
     */
    const options = Options();
    options.load();
    console.dir(options);

    let statistic_html_block = "";
    /*statistic_html_block = "<div><span><b>Регион:</b> " + options_filter.region + "</span>   <span><b>Подразделение:</b> " + options_filter.podrazdelenie + "</span></div>";
	statistic_html_block += "<div><b>Статусы:</b> " + options_filter.def_status + "</div>";*/
    statistic_html_block += "<div class='stat'>";
    statistic_html_block += "<table class='table table-striped' style='font-size: 12px;'>"
    let statistic_html_block_row_1 = "";
    let statistic_html_block_row_2 = "";
    if(options.table_style == "horizontal"){
        statistic_html_block += "<theader><tr><th></th>";
        $.each(options.filter_list, function (key,options_filter) {
            if (options_filter.enable) {
                statistic_html_block += "<th>" + options_filter.name + "</th>";
            }
        });
        statistic_html_block += "</tr></theader>";
        if(options.table_style == "horizontal"){
            statistic_html_block_row_1 += "<tr class='horisontal_tr'><td>Количество</td>";
            statistic_html_block_row_2 += "<tr class='horisontal_tr'><td></td>";
        }

    } else {
        statistic_html_block += "<theader><tr><th>Нименование статфильтра</th><!--<th>Параметры фильтра</th>--><th>Количество</th></tr></theader>";
    }

    $.each(options.filter_list, function (key,options_filter) {
        if(options_filter.enable) {
            //console.dir(options_filter);
            /*statistic_html_block = "<div><span><b>Регион:</b> " + options_filter.region + "</span>   <span><b>Подразделение:</b> " + options_filter.podrazdelenie + "</span></div>";
			statistic_html_block += "<div><b>Статусы:</b> " + options_filter.def_status + "</div>";*/

            if(options.table_style == "vertical") {
                statistic_html_block_row_1 = "";
                statistic_html_block_row_2 = "";
            }

            statistic_html_block_row_1 += (options.table_style == "vertical" ? "<tr" : "<td") + " id='filter_" + key + "' data-toggle='collapse' data-target='#appealnumbers_filter_" + key + "'>";

            if(options.table_style == "vertical") {
                statistic_html_block_row_1 += "<td>" + options_filter.name + "</td>";
            }

            //statistic_html_block_row_1 += "<!--<td>" + "Список фильтров по обращению options_filter.getJSON()<br>(*почему то не видит метод getJSON())"/*JSON.stringify(options_filter.getJSON())/*options.filter_list[key].getJSON()*/ + "</td>-->";

            statistic_html_block_row_1 += (options.table_style == "vertical" ? "<td" : "<div") + " class='col_count'>";
            statistic_html_block_row_1 += "<img src='loading.gif' alt='loading' class='loading'>";
            statistic_html_block_row_1 += "</" + (options.table_style == "vertical" ? "td" : "div") + ">";
            statistic_html_block_row_1 += "</" + (options.table_style == "vertical" ? "tr" : "td") + ">";

            statistic_html_block_row_2 += (options.table_style == "vertical" ? "<tr" : "<td><div ") + " id='appealnumbers_filter_" + key + "' class='collapse'>";
            statistic_html_block_row_2 += (options.table_style == "vertical" ? "<td" : "<div") + " class='col_count_appealnumbers' " + (options.table_style == "vertical" ? "colspan='2'" : "") + ">";
            statistic_html_block_row_2 += "<img src='loading.gif' alt='loading' class='loading'>";
            statistic_html_block_row_2 += "</" + (options.table_style == "vertical" ? "td" : "div") + ">";
            statistic_html_block_row_2 += (options.table_style == "vertical" ? "</tr" : "</div></td") + ">";

            if(options.table_style == "vertical") {
                statistic_html_block += statistic_html_block_row_1 + statistic_html_block_row_2;
            }

            let requrl = "http://ppoz-service-bal-01.prod.egrn:9001/manager/requests";
            //{"pageNumber":0,"pageSize":1000,"statuses":["reg_validations"],"subjectRF":["12"],"executorDepartments":["12.146"],"executors":["ibkolesnikova"],"byActiveExecutor":true}

            let json = {
                pageNumber: 0,
                pageSize: 1000,
                objectRegions: (Array.isArray(request.objectRegions) && request.objectRegions.length > 0 ? request.objectRegions : (options_filter.objectRegions != "" ? String(options_filter.objectRegions).split(',') : [])),
                categories: (Array.isArray(request.categories) && request.categories.length > 0 ? request.categories : (options_filter.categories != "" ? options_filter.categories.split(',') : [])),
                //statuses: [(regrole === 2 ? "find_object_to_extractions" : (regrole === 1 ? "reg_validations" : "initial_examinations"))],
                statuses: (Array.isArray(request.statuses) && request.statuses.length > 0 ? request.statuses : (options_filter.def_status != "" ? options_filter.def_status.split(',') : [])),
                subjectRF: (Array.isArray(request.subjectRF) && request.subjectRF.length > 0 ? request.subjectRF : (String(options_filter.region) != "" ? String(options_filter.region).split(',') : [])),
                executorDepartments: (Array.isArray(request.executorDepartments) && request.executorDepartments.length > 0 ? request.executorDepartments : (options_filter.podrazdelenie != "" ? options_filter.podrazdelenie.split(',') : [])),
                executors: (Array.isArray(request.executors) && request.executors.length > 0 ? request.executors : (options_filter.regs_enable && options_filter.def_regs != "" ? options_filter.def_regs.split(',') : [])),
                requestTypes: (Array.isArray(request.requestTypes) && request.requestTypes.length > 0 ? request.requestTypes : (options_filter.requestTypes && options_filter.requestTypes != "" ? options_filter.requestTypes.split(',') : [])),
                senderTypes: (Array.isArray(request.senderTypes) && request.senderTypes.length > 0 ? request.senderTypes : []),
                byActiveExecutor: request.byActiveExecutor
            };

            $.each(json, function (json_key, json_element) {
                if (json_element === "" || (Array.isArray(json_element) && json_element.length <= 0)) {
                    delete json[json_key];
                }
            })

            if(request.acceptDate['dateFrom'] != null || request.acceptDate['dateTo'] != null){
                json.acceptDate = {
                    dateFrom: request.acceptDate['dateFrom'] != null ? format_date(request.acceptDate['dateFrom']) : null,
                    dateTo: request.acceptDate['dateTo'] != null ? format_date(request.acceptDate['dateTo']) : null
                };
            }

            if(request.executionDate['dateFrom'] != null || request.executionDate['dateTo'] != null){
                json.executionDate = {
                    dateFrom: request.executionDate['dateFrom'] != null ? format_date(request.executionDate['dateFrom']) : null,
                    dateTo: request.executionDate['dateTo'] != null ? format_date(request.executionDate['dateTo']) : null
                };
            }

            if(typeof (options_filter.expires) != "undefined" && options_filter.expires != ""){
                json.executionDate = {
                    dateFrom: null,
                    dateTo: null
                };
                //today - сегдня, yesterday - вчера
                if(options_filter.expires == "today"){
                    let date_to = new Date();
                    let str_date_to = date_to.getFullYear() + '-' + ((date_to.getMonth()+1)<10 ? '0' : '') + (date_to.getMonth()+1) + '-' + date_to.getDate();
                    json.executionDate.dateTo = str_date_to;
                } else if(options_filter.expires == "yesterday"){
                    let date_to = new Date();
                    date_to = date_to.setDate(date_to.getDate() - 1);
                    date_to = new Date(date_to);
                    let str_date_to = date_to.getFullYear() + '-' + ((date_to.getMonth()+1)<10 ? '0' : '') + (date_to.getMonth()+1) + '-' + date_to.getDate();
                    json.executionDate.dateTo = str_date_to;
                }
            }

            getAjaxData(requrl, "filter_" + key, " .col_count", json, options_filter);
            //nums_ajax_threads.get("filter_" + key).set(" .col_count", {count_nums : 0, threads: new Map()});
            let type_selector = new Map();
            type_selector.set(" .col_count", {count_nums: 0, threads: new Map()});
            nums_ajax_threads.set("filter_" + key, type_selector);

            //options_filter
        }
    });
    if(options.table_style == "horizontal") {
        statistic_html_block += statistic_html_block_row_1 + statistic_html_block_row_2;
    }
    statistic_html_block += "</table></div></div>";
    statistic_html_block = statistic.html() + statistic_html_block;
    statistic.html(statistic_html_block);

    statistic_run = false;
    $('#refresh').attr('disabled', false);
}

function format_date(from_date) {
    let date_split = from_date.split(".");
    let req_date = new Date(date_split[2], date_split[1] - 1, date_split[0]);
    req_date = req_date.getFullYear() + '-' + ((req_date.getMonth() + 1) < 10 ? '0' : '') + (req_date.getMonth() + 1) + '-' + ((req_date.getDate()) < 10 ? '0' : '') + req_date.getDate();
    return req_date;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //console.log(sender.tab ? "from content script:"+sender.tab.url : "from extension");
        //console.log(request);
        //sendResponse({farewell: "goodbye"});
        //if (curentpodr!=request.podrazdelenie){
        //  curentpodr = request.podrazdelenie;
        if (current_request !== JSON.stringify(request) && ready && !statistic_run) {
            //console.log(request);
            current_request = JSON.stringify(request);


            /*request = {
                region: (typeof (request.region) != "undefined") ? request.region : (typeof (window.localStorage.plg_def_region) != "undefined" && window.localStorage.plg_def_region != null) ? window.localStorage.plg_def_region : "",
                podrazdelenie: (request.podrazdelenie.length !== 0) ? request.podrazdelenie : (typeof (window.localStorage.plg_def_podraz) != "undefined" && window.localStorage.plg_def_podraz != null) ? (window.localStorage.plg_def_podraz).split(',') : "",
                statuses: (request.statuses.length !== 0) ? request.statuses : (typeof (window.localStorage.plg_def_status) != "undefined" && window.localStorage.plg_def_status != null) ? (window.localStorage.plg_def_status).split(',') : []
            };*/


            window.localStorage.curent_request = JSON.stringify(request);
            chrome.storage.local.set({curent_request: JSON.stringify(request)}, function () {
                console.log(JSON.stringify(request));
            });

            load_inf_statistic(request);
        }
    });

//format_date('01.01.2020');