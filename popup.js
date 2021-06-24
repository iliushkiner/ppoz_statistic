// JavaScript Document
let ready = false
let statistic_run = false;
//let global_count_nums = 0;
let nums_ajax_threads = new Map();

$(document).ready(function () {
    //var htm = $(".statement-number").html();
    //let podrazc = localStorage['podrazdelenie'];
    /*let podrazc = 'пусто';
    podrazc = chrome.storage.local.get(['podrazdelenie'], function(result){
      console.log(result.podrazdelenie);
    });*/

    //$("#statistic").html("Подразделение: ".concat(podrazc));
    /*let request = {
      region: window.localStorage.plg_def_region,
      podrazdelenie: window.localStorage.plg_def_podraz.split(';')
    };
    load_inf_statistic(request);*/
    let count_date = $('#countdate');
    count_date.on('change past kayup select', function () {
        let plg_count_date = count_date.val();
        window.localStorage.plg_countdate = plg_count_date;
        chrome.storage.local.set({plg_count_date: plg_count_date}, function () {
            console.log(plg_count_date);
        });
    });

    $('#refresh').on('click', function () {
        $(this).attr('disabled', true);
        let current_request = window.localStorage.curent_request;
        $("#statistic").html("<div style='text-align: center;'><img src='loading.gif' alt='loading'></div>");
        if(!statistic_run) {
            load_inf_statistic(JSON.parse(current_request));
        }
    });
    /*$('#filtrdate').on('change past kayup select', function () {
        let current_request = window.localStorage.curent_request;
        if(!statistic_run) {
            load_inf_statistic(JSON.parse(current_request));
        }
    });*/

    /*count_date.on('change past kayup select', function () {
        let current_request = window.localStorage.curent_request;
        $("#statistic").html("<div style='text-align: center;'><img src='loading.gif' alt='loading'></div>");
        if(!statistic_run) {
            load_inf_statistic(JSON.parse(current_request));
        }
    });*/

    count_date.val(window.localStorage.plg_countdate);
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
            let select_nums = $('#reg_nums_' + root_selector + selector);
            let output_data = (select_nums.html() !== '<img src="loading.gif" alt="loading" class="loading">' ? $('#reg_nums_' + root_selector + selector).html() : '');
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

function getAjaxData(url, root_selector, selector, json, on_filters = false) {
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
            let select_nums = $('#reg_nums_' + root_selector + selector);
            let output_nums = (select_nums.html() !== '<img src="loading.gif" alt="loading" class="loading">' ? select_nums.html() : '');
            count_nums = parseInt(count_nums);

            if (data.requests.length > 0) {
                count_nums = (count_nums + data.requests.length);
                let plg_regs_statistic_filter_list = [];
                if (on_filters) {
                    plg_regs_statistic_filter_list = (typeof (window.localStorage.plg_regs_statistic_filter_list) != "undefined" && window.localStorage.plg_regs_statistic_filter_list != null) ? JSON.parse(window.localStorage.plg_regs_statistic_filter_list) : [];
                    console.log("plg_regs_statistic_filter_list:", plg_regs_statistic_filter_list);
                }

                data.requests.forEach(function (item) {
                    if (on_filters) {
                        let request_url = 'http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=' + item.appealNumber;
                        nums_ajax_threads.get(root_selector).get(selector).threads.set(item.appealNumber, 'on');
                        getByIdAjaxData(request_url, root_selector, selector, plg_regs_statistic_filter_list);
                    } else {
                        //output_nums += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=' + item.appealNumber + '" target="_blank">' + item.appealNumber + '</a>; ';
                        output_nums += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/#/administration/details/' + item.appealNumber + '/data" target="_blank">' + item.appealNumber + '</a>';
                        output_nums += '<a href="http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=' + item.appealNumber + '" target="_blank" class="json">[JSON]</a>; ';
                    }

                })

                if (!on_filters) {
                    select_nums.html(output_nums);
                    select_count.html("<span class='count'>" + count_nums + "</span><img src='loading.gif' alt='loading' class='loading'>");
                }

                json.pageNumber++;
                getAjaxData(url, root_selector, selector, json, on_filters)
            } else {
                if (!on_filters) {
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
                    if(reqbyiditem[index] !== ""){
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
    /*console.log("Получено:");
    console.log(request);*/
    let htm = "";
    statistic.html((typeof (request.podrazdelenie) == "undefined" || request.podrazdelenie == null || request.podrazdelenie === "") ? "<div style='color: red; text-align: center;'><br>Необходимо выбрать не мене одного подразделения или внести код ЕСТО в параметрах рпсширения.</div>" : "<div style='text-align: center;'><img src='loading.gif' alt='loading' class='loading'></div>");
    $.each(request.podrazdelenie, function (index, value) {
        /*console.log(value);*/
        let podrazdc = value;

        //htm = "<h5>"+Date()+"</h5>";
        statistic.html(htm);
        /** вывод статистики по регам отдела.
         * http://ppoz-service-bal-01.prod.egrn:9001/manager/assign/users/byEstoOrRegionAndRole?region=12&esto=12.062&withBlocked=true
         **/
        let url = "http://ppoz-service-bal-01.prod.egrn:9001/manager/assign/users/byEstoOrRegionAndRole?region=" + request.region + "&esto=" + podrazdc + "&withBlocked=true";
        console.log(url);

        //$("#statistic").html("<div><span>Регион: </span>"+request.region+"</div><div><span>Подразделение: </span>"+podrazdc+"</div>");
        $.ajax({
            url: url,
            /*dataType: "json",*/
            method: "GET",
            success: function (data) {
                console.log(data);
                htm = "<div><span><b>Регион:</b> " + request.region + "</span>   <span><b>Подразделение:</b> " + podrazdc + "</span></div>";
                htm += "<div><b>Статусы:</b> " + request.statuses.join(',') + "</div>";
                htm += "<div class='stat'>";

                let table = "";
                let str_select_date = $("#filtrdate").val();
                console.log(str_select_date);
                //let select_date = Date.parse(str_select_date.replace("-","/").replace("-","/"));
                //console.log(select_date);
                let dsplit = str_select_date.split("-");
                console.log(dsplit);
                let select_date = new Date(dsplit[0], dsplit[1] - 1, dsplit[2]);
                console.log(select_date);
                /*let date_yesterday = new Date(select_date);
                date_yesterday = new Date(date_yesterday.setDate(date_yesterday.getDate() - 1));
                //console.log(date_yesterday);
                let str_date_yesterday = "";
                str_date_yesterday = ""+ date_yesterday.getFullYear() + '-' + ((date_yesterday.getMonth()+1)<10 ? '0' : '') + (date_yesterday.getMonth()+1) + '-' + ((date_yesterday.getDate())<10 ? '0' : '') + date_yesterday.getDate();*/

                let regs = (typeof (window.localStorage.plg_def_regs) != "undefined" && window.localStorage.plg_def_regs != null) ? (window.localStorage.plg_def_regs).split(',') : [];
                console.log("regs:",regs);

                let plg_regs_enable = (typeof (window.localStorage.plg_def_regs) != "undefined" || window.localStorage.plg_def_regs != null);
                console.log("plg_regs_enable:",plg_regs_enable);

                for (let i in data) {
                    if (data.hasOwnProperty(i)) {
                        if ($.inArray(data[i].login, regs) >= 0 || plg_regs_enable === false || window.localStorage.plg_regs_enable === "false") {
                            /**
                             * Не исползуется
                             */
                            /*let regrole = 0;
                            for (let j in data[i].roles) {
                                if (data[i].roles.hasOwnProperty(j)) {
                                    if (data[i].roles[j].mnemonic === "PKURP_REG") {
                                        regrole = 1;
                                        break;
                                    }
                                    if (data[i].roles[j].mnemonic === "PKURP_INFO") {
                                        regrole = 2;
                                        break;
                                    }
                                }
                            }*/
                            let reg = data[i].lastName + " " + data[i].firstName[0] + "." + data[i].patronymic[0] + ".<br><span style='font-size: 9px;'>" + data[i].login + "<span/>";
                            let statistic_filter_enable = (window.localStorage.plg_regs_statistic_filter_enable === "true");
                            let type_selector = new Map();
                            type_selector.set(" .in_work", {count_nums : 0, threads: new Map()});
                            nums_ajax_threads.set(data[i].login, type_selector);


                            table += "<tr id='" + data[i].login + "' data-toggle='collapse' data-target='#reg_nums_" + data[i].login + "'><td width='300'>" + reg + "</td>";

                            /**
                             *В работе на текущий момент
                             *формат "2020-12-09"
                             **/
                            /*let date_to = new Date();
                            let str_date_to = date_to.getFullYear() + '-' + ((date_to.getMonth()+1)<10 ? '0' : '') + (date_to.getMonth()+1) + '-' + date_to.getDate();*/
                            let requrl = "http://ppoz-service-bal-01.prod.egrn:9001/manager/requests";
                            //{"pageNumber":0,"pageSize":1000,"statuses":["reg_validations"],"subjectRF":["12"],"executorDepartments":["12.146"],"executors":["ibkolesnikova"],"byActiveExecutor":true}
                            let json = {
                                pageNumber: 0,
                                pageSize: 1000,
                                //statuses: [(regrole === 2 ? "find_object_to_extractions" : (regrole === 1 ? "reg_validations" : "initial_examinations"))],
                                statuses: request.statuses,
                                subjectRF: [request.region],
                                executorDepartments: [podrazdc],
                                executors: [data[i].login],
                                byActiveExecutor: true
                            };
                            getAjaxData(requrl, data[i].login, " .in_work", json, statistic_filter_enable);
                            //getCountAppealNumber(requrl,"#"+data[i].login+" .in_work", json);
                            table += "<td class='in_work'><img src='loading.gif' alt='loading' class='loading'></td>";

                            /**
                             *Дата исполнения по регламенту
                             **/
                            if (window.localStorage.plg_inwork_enable === "true") {
                                for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                                    let req_date = new Date(select_date);
                                    req_date = req_date.setDate(req_date.getDate() + j);
                                    req_date = new Date(req_date);
                                    req_date = req_date.getFullYear() + '-' + ((req_date.getMonth() + 1) < 10 ? '0' : '') + (req_date.getMonth() + 1) + '-' + ((req_date.getDate()) < 10 ? '0' : '') + req_date.getDate();
                                    json = {
                                        pageNumber: 0,
                                        pageSize: 1000,
                                        //statuses: [(regrole === 2 ? "find_object_to_extractions" : (regrole === 1 ? "reg_validations" : "initial_examinations"))],
                                        statuses: request.statuses,
                                        executionDate: {dateFrom: req_date, dateTo: req_date},
                                        subjectRF: [request.region],
                                        executorDepartments: [podrazdc],
                                        executors: [data[i].login],
                                        byActiveExecutor: true
                                    };
                                    getAjaxData(requrl, data[i].login, " .today_" + j, json, statistic_filter_enable);
                                    nums_ajax_threads.get(data[i].login).set(" .today_" + j, {count_nums : 0, threads: new Map()});
                                    table += "<td class='today_" + j + "'><img src='loading.gif' alt='loading' class='loading'></td>";
                                }
                            }

                            /**
                             *Завершено за выбранную дату
                             **/
                            if (window.localStorage.plg_closed_enable === "true") {
                                for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                                    let req_date = new Date(select_date);
                                    req_date = req_date.setDate(req_date.getDate() - j);
                                    req_date = new Date(req_date);
                                    req_date = req_date.getFullYear() + '-' + ((req_date.getMonth() + 1) < 10 ? '0' : '') + (req_date.getMonth() + 1) + '-' + req_date.getDate();
                                    //     {"pageNumber":0,"pageSize":10,"subjectRF":["12"],"executorDepartments":["12.060"],"executors":["ialoskutov"],"completionDate":{"dateFrom":"2020-12-09","dateTo":"2020-12-09"}}
                                    //     {"pageNumber":0,"pageSize":10,"subjectRF":["12"],"executorDepartments":["12.146"],"executors":["samamaev"],"completionDate":{"dateFrom":"2020-12-22","dateTo":"2020-12-22"}}
                                    json = {
                                        pageNumber: 0,
                                        pageSize: 1000,
                                        //statuses: request.statuses,
                                        subjectRF: [request.region],
                                        executorDepartments: [podrazdc],
                                        executors: [data[i].login],
                                        completionDate: {dateFrom: req_date, dateTo: req_date}
                                    };
                                    getAjaxData(requrl, data[i].login, " .closed_today_" + j, json, statistic_filter_enable);
                                    nums_ajax_threads.get(data[i].login).set(" .closed_today_" + j, {count_nums : 0, threads: new Map()});
                                    table += "<td class='closed_today_" + j + "'><img src='loading.gif' alt='loading' class='loading'></td>";
                                }
                            }

                            /**
                             *Завершено за предыдущую выбранной дате
                             **/
                            /*     //{"pageNumber":0,"pageSize":10,"subjectRF":["12"],"executorDepartments":["12.060"],"executors":["ialoskutov"],"completionDate":{"dateFrom":"2020-12-09","dateTo":"2020-12-09"}}
                            json = {pageNumber:0,pageSize:1000,subjectRF:[request.region],executorDepartments:[podrazdc],executors:[data[i].login],completionDate:{dateFrom:str_date_yesterday,dateTo:str_date_yesterday}};
                            getAjaxData(requrl,"#"+data[i].login+" .closed_tomorrow", json);
                            table += "<td class='closed_tomorrow'><img src='loading.gif' alt='loading' class='loading'></td>";*/

                            /**
                             *В просрочках на выбранную дату
                             **/
                            if (window.localStorage.plg_expiried_enable === "true") {
                                for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                                    let req_date = new Date(select_date);
                                    req_date = req_date.setDate(req_date.getDate() - j - 1);
                                    req_date = new Date(req_date);
                                    req_date = req_date.getFullYear() + '-' + ((req_date.getMonth() + 1) < 10 ? '0' : '') + (req_date.getMonth() + 1) + '-' + ((req_date.getDate()) < 10 ? '0' : '') + req_date.getDate();
                                    //     {"pageNumber":0,"pageSize":10,"subjectRF":["12"],"executorDepartments":["12.060"],"executors":["ialoskutov"],"completionDate":{"dateFrom":"2020-12-09","dateTo":"2020-12-09"}}
                                    //     {"pageNumber":0,"pageSize":10,"categories":["2_in_work"],"executionDate":{"dateFrom":null,"dateTo":"2020-12-10"},"subjectRF":["12"],"executorDepartments":["12.060"],"executors":["ialoskutov"]}
                                    json = {
                                        pageNumber: 0,
                                        pageSize: 1000,
                                        categories: ["2_in_work"],
                                        executionDate: {dateFrom: null, dateTo: req_date},
                                        subjectRF: [request.region],
                                        executorDepartments: [podrazdc],
                                        executors: [data[i].login],
                                        byActiveExecutor: true
                                    };
                                    getAjaxData(requrl, data[i].login, " .delay_" + j, json, statistic_filter_enable);
                                    nums_ajax_threads.get(data[i].login).set(" .delay_" + j, {count_nums : 0, threads: new Map()});
                                    table += "<td class='delay_" + j + "'><img src='loading.gif' alt='loading' class='loading'></td>";
                                }
                            }

                            table += "</tr>";
                            /*if(statistic_filter_enable) {*/
                                table += "<tr id='reg_nums_" + data[i].login + "' class='collapse'>";
                                table += "<td class='in_work' colspan='2'><img src='loading.gif' alt='loading' class='loading'></td>";
                                for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                                    table += (window.localStorage.plg_inwork_enable === "true" ? "<td class='today_" + j + "'><img src='loading.gif' alt='loading' class='loading'></td>" : "");
                                }
                                for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                                    table += (window.localStorage.plg_closed_enable === "true" ? "<td class='closed_today_" + j + "'><img src='loading.gif' alt='loading' class='loading'></td>" : "");
                                }
                                for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                                    table += (window.localStorage.plg_expiried_enable === "true" ? "<td class='delay_" + j + "'><img src='loading.gif' alt='loading' class='loading'></td>" : "");
                                }
                                table += "</tr>";
                            /*}*/
                        }
                    }
                }
                if (table !== "") {
                    htm += "<table class='table table-striped' style='font-size: 12px;'><theader><tr><th>Регистратор</th><th>В работе на текущий момент</th>";

                    if (window.localStorage.plg_inwork_enable === "true") {
                        for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                            let req_date = new Date(select_date);
                            req_date = req_date.setDate(req_date.getDate() + j);
                            req_date = new Date(req_date);
                            //console.log(req_date);
                            let str_req_date = "" + req_date.getFullYear() + '-' + ((req_date.getMonth() + 1) < 10 ? '0' : '') + (req_date.getMonth() + 1) + '-' + ((req_date.getDate()) < 10 ? '0' : '') + req_date.getDate();
                            htm += "<th" + ((req_date.getUTCDay() === 5 || req_date.getUTCDay() === 6) ? " style='color:red;'" : "") + ">Дата исполнения по регл-у " + str_req_date + "</th>";
                        }
                    }

                    if (window.localStorage.plg_closed_enable === "true") {
                        for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                            let req_date = new Date(select_date);
                            req_date = req_date.setDate(req_date.getDate() - j);
                            req_date = new Date(req_date);
                            //console.log(req_date);
                            let str_req_date = "" + req_date.getFullYear() + '-' + ((req_date.getMonth() + 1) < 10 ? '0' : '') + (req_date.getMonth() + 1) + '-' + ((req_date.getDate()) < 10 ? '0' : '') + req_date.getDate();
                            htm += "<th" + ((req_date.getUTCDay() === 5 || req_date.getUTCDay() === 6) ? " style='color:red;'" : "") + ">Завершено " + str_req_date + "</th>";
                        }
                    }

                    if (window.localStorage.plg_expiried_enable === "true") {
                        for (let j = 0; j <= parseInt(window.localStorage.plg_countdate); j++) {
                            let req_date = new Date(select_date);
                            req_date = req_date.setDate(req_date.getDate() - j - 1);
                            req_date = new Date(req_date);
                            //console.log(req_date);
                            let str_req_date = "" + req_date.getFullYear() + '-' + ((req_date.getMonth() + 1) < 10 ? '0' : '') + (req_date.getMonth() + 1) + '-' + ((req_date.getDate()) < 10 ? '0' : '') + req_date.getDate();
                            htm += "<th" + ((req_date.getUTCDay() === 5 || req_date.getUTCDay() === 6) ? " style='color:red;'" : "") + ">Просроченные на " + str_req_date + "</th>";
                        }
                    }
                    htm += "</tr><theader><tbody>";
                    htm += table;
                    htm += "</tbody></table>";
                } else {
                    htm += "<div style='color: red; text-align: center;'><br>В отделе не числятся указанные сотрудники в параметрах расширения. Снимите галочку 'Выводить только cписок интересующих регов' или измените список.</div><br>";
                }
                htm += "</div>";
                let statistic = $("#statistic");
                htm = statistic.html() + htm;
                statistic.html(htm);
                //htm += "</div>";
            }
        });
    });
    statistic_run = false;
    $('#refresh').attr('disabled', false);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //console.log(sender.tab ? "from content script:"+sender.tab.url : "from extension");
        //console.log(request);
        //sendResponse({farewell: "goodbye"});
        /*if (curentpodr!=request.podrazdelenie){
          curentpodr = request.podrazdelenie;*/
        if (current_request !== JSON.stringify(request) && ready && !statistic_run) {
            //console.log(request);
            current_request = JSON.stringify(request);
            request = {
                region: (typeof (request.region) != "undefined") ? request.region : (typeof (window.localStorage.plg_def_region) != "undefined" && window.localStorage.plg_def_region != null) ? window.localStorage.plg_def_region : "",
                podrazdelenie: (request.podrazdelenie.length !== 0) ? request.podrazdelenie : (typeof (window.localStorage.plg_def_podraz) != "undefined" && window.localStorage.plg_def_podraz != null) ? (window.localStorage.plg_def_podraz).split(',') : "",
                statuses: (request.statuses.length !== 0) ? request.statuses : (typeof (window.localStorage.plg_def_status) != "undefined" && window.localStorage.plg_def_status != null) ? (window.localStorage.plg_def_status).split(',') : []
            };

            window.localStorage.curent_request = JSON.stringify(request);
            chrome.storage.local.set({curent_request: JSON.stringify(request)}, function () {
                console.log(JSON.stringify(request));
            });

            load_inf_statistic(request);
        }
    });
