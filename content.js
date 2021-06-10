//$(document).ready(function(){
/** Обработчик событий на наведение мыши по элементу с классом node-product-display **/
$('.statement-number').hover(
    function () {
        /** Область видимости переменной let – блок {...}. **/
            //console.log($(this).offset());
        let num = $(this).html();
        console.log(num);
        if (typeof (curentnum) == "undefined" || num !== curentnum) {
            curentnum = num;
            (async () => {
                    async function getLocalStorageValue(name) {
                        return new Promise(resolve => {
                            chrome.storage.local.get(name, data => {
                                resolve(data);
                            });
                        });
                    }

                    let plg_ohhe = await getLocalStorageValue('plg_on_hover_history_enable');
                    if (plg_ohhe.plg_on_hover_history_enable === true) {
                        let top = $(this).offset().top /*+ $(this).height()*/;
                        let left = $(this).offset().left + $(this).width();
                        let statement_number = $(this).html()/*$(this).data('modal-text').'<p>ТЕСТ</p>'*/;
                        let url = "http://ppoz-service-bal-01.prod.egrn:9001/manager/assign/users/history?requestId=".concat(statement_number);
                        console.log(url);

                        $.ajax({
                            url: url,
                            /*dataType: "json",*/
                            method: "GET",
                            /*data: {"requestId" : "Vedomstvo-2020-11-30-458682"},*/
                            success: function (data) {
                                //console.log(data);
                                let div = document.createElement('div');

                                div.id = "modal";

                                $(div).css('top', top);
                                $(div).css('left', left);

                                /** адрес получения данных истории
                                 *http://ppoz-service-bal-01.prod.egrn:9001/manager/assign/users/history?requestId=Vedomstvo-2020-11-30-458682
                                 **/
                                    //console.log(statement_number);
                                let htm = "<div class='modal-header'>";
                                htm += "<button type='button' class='close' data-dismiss='modal' aria-label='Закрыть'><span aria-hidden='true'>&times;</span></button>";
                                htm += "<h4><a href='http://pkurp-app-balancer-01.prod.egrn/12/requests/" + statement_number + "' target='_blank'>".concat(statement_number, "</a></h4>");
                                htm += "</div>";
                                //htm += "<div class='modal-body'>";
                                htm += "<div class='history'>";
                                htm += "<table class='table table-striped'><theader><tr><th>Инициатор</th><th>Дата назначения</th><th>Роль</th><th>Исполнитель</th><th>Дата окончания работы</th><th>Продолжительность</th></tr><theader><tbody>";
                                let table = "";
                                let prev_assignDate = 0;
                                for (let i in data) {
                                    if (data.hasOwnProperty(i)) {
                                        let regtime = (data[i]['completionDate'] == null ? prev_assignDate : Date.parse(data[i]['completionDate'])) - Date.parse(data[i]['assignDate']);
                                        let textregtime = regtime >= 86400000 ? parseInt(regtime / 86400000) + "д." + parseInt((regtime % 86400000) / 3600000) + "час." :
                                            regtime >= 3600000 ? parseInt(regtime / 3600000) + "час." + parseInt((regtime % 3600000) / 60000) + "мин." :
                                                regtime >= 60000 ? parseInt(regtime / 60000) + "мин." + parseInt((regtime % 60000) / 1000) + "сек." :
                                                    regtime >= 1000 ? parseInt(regtime / 1000) + "сек." + regtime % 1000 + "мсек." : regtime + "мсек.";
                                        table += "<tr><td>" + data[i]['initiator'] + "</td><td>" + data[i]['assignDate'] + "</td><td>" + data[i]['role'] + "</td><td>" + data[i]['executor'] + "</td><td>" + data[i]['completionDate'] + "</td><td>" +/*regtime+"мсек => "+*/textregtime + "</td></tr>";
                                        prev_assignDate = Date.parse(data[i]['assignDate']);
                                        //htm += data[i];
                                    }
                                }
                                htm += table;
                                htm += "</tbody></table>";
                                //htm += "</div>";
                                htm += "</div>";
                                $(div).html(htm);
                                if (table !== "") {
                                    $('body').append(div);
                                }
                            }
                        });
                    }
                }
            )();
        }
    },
    function () {
        $('#modal').remove();
        /*$('#modal').remove();*/
    }
);

// close modal
$('body').on('click', '.close', function () {
    $('#modal').remove();
});

//});

//var curentpodr = 0;

setInterval(function () {
    if (document.webkitVisibilityState === 'visible') {
        //console.log(curentpodr);
        let status_block = $("div.filter-label:contains('Статус:')").parent();
        let status_codes = [];
        let status = status_block.find(".clear-selected-value");
        $.each(status, function (key, el) {
            status_codes.push($(status[key]).data('value'));
        });

        let podrazf = $("div.filter-label:contains('Подразделение:')").parent();
        //var podraz = podrazf.find(".clear-selected-value");
        //var podrazc = podrazf.find(".clear-selected-value").data('value');
        let podrazc = [];
        let podraz = podrazf.find(".clear-selected-value")
        $.each(podraz, function (i, el) {
            podrazc.push($(podraz[i]).data('value'));
        });
        //console.log(podrazc);
        //if (curentpodr!=JSON.stringify(podrazc)){
        //console.log(curentpodr);
        //console.log(podrazc);
        //curentpodr = JSON.stringify(podrazc);

        let regionf = $("div.filter-label:contains(' Субъект РФ:')").parent();
        let regionc = regionf.find(".clear-selected-value").data('value');

        //if(podrazc.length>0){
        //console.log(podrazc);
        chrome.runtime.sendMessage({region: regionc, podrazdelenie: podrazc, statuses: status_codes}/*, function(response){
          console.log(response.farewell);
        }*/);
        //}
        //console.log("Регион: "+regionc+"  Подразделение: "+podrazc);
        //}
    }
}, 1000);    