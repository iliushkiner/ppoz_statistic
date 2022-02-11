//$(document).ready(function(){

setInterval(function () {
    if (document.webkitVisibilityState === 'visible' && document.URL === "http://ppoz-service-bal-01.prod.egrn:9001/#/administration") {
        //console.log(curentpodr);

        //console.log(podrazc);
        //if (curentpodr!=JSON.stringify(podrazc)){
        //console.log(curentpodr);
        //console.log(podrazc);
        //curentpodr = JSON.stringify(podrazc);
        let objectRegionsFBlock = $("div.filter-label:contains(' Субъект объекта недвижимости:')").parent();
        let objectRegionsBlock = objectRegionsFBlock.find("input.main-input");
        let objectRegions = $(objectRegionsBlock)["0"].defaultValue;
        objectRegions = (objectRegions != "" ? objectRegions.split(',') : []);
        /*let objectRegions = [];
        $.each(objectRegionsBlock, function (key, el) {
            if (typeof ($(objectRegionsBlock[key]).data('value')) != "undefined") {
                objectRegions.push($(objectRegionsBlock[key]).data('value'));
            }
        });*/


        let categoriesFBlock = $("div.filter-label:contains('Стадия обработки обращения:')").parent();
        let categoriesBlock = categoriesFBlock.find("input.main-input");
        let categories = [];
        if (categoriesBlock.length>0) {
            categories = $(categoriesBlock)["0"].defaultValue;
            categories = (categories != "" ? categories.split(',') : []);
        }

        /*let categoriesBlock = categoriesFBlock.find(".clear-selected-value");
        $.each(categoriesBlock, function (key, el) {
            categories.push($(el).data('value'));
        });*/

        let acceptDatesFBlock = $("div.filter-label:contains('Дата приема:')").parent();
		let acceptDates = acceptDatesFBlock.find("input");
        let acceptDatesS = (acceptDates.length>0 && typeof (acceptDates[0]) !== "undefined" && $(acceptDates[0]).val() != '' ? $(acceptDates[0]).val() : null);
        let acceptDatesE = (acceptDates.length>1 && typeof (acceptDates[1]) !== "undefined" && $(acceptDates[1]).val() != '' ? $(acceptDates[1]).val() : null);

        let executionDateFBlock = $("div.filter-label:contains('Дата исполнения по регламенту:')").parent();
        let executionDate = executionDateFBlock.find("input");
        let executionDateS = (executionDate.length>0 && typeof (executionDate[0]) !== "undefined" && $(executionDate[0]).val() != '' ? $(executionDate[0]).val() : null);
        let executionDateE = (executionDate.length>1 && typeof (executionDate[1]) !== "undefined" && $(executionDate[1]).val() != '' ? $(executionDate[1]).val() : null);

        let statusesFBlock = $("div.filter-label:contains('Статус:')").parent();
        let statuses = [];
        let statusesBlock = statusesFBlock.find(".clear-selected-value");
        $.each(statusesBlock, function (key, el) {
            statuses.push($(statusesBlock[key]).data('value'));
        });

        let subjectRF = [];
        let subjectRFFBlock = $("div.filter-label:contains(' Субъект РФ:')").parent();
        let subjectRFBlock = subjectRFFBlock.find("input.main-input");
        if (subjectRFBlock.length>0) {
            subjectRF = $(subjectRFBlock)["0"].defaultValue;
            subjectRF = (subjectRF != "" ? subjectRF.split(',') : []);
        }

        /*let subjectRFBlock = subjectRFFBlock.find(".clear-selected-value").data('value');
        $.each(subjectRFBlock, function (i, el) {
            subjectRF.push($(subjectRFBlock[i]).data('value'));
        });*/

        let executorDepartments = [];
        let executorDepartmentsFBlock = $("div.filter-label:contains('Подразделение:')").parent();
        let executorDepartmentsBlock = executorDepartmentsFBlock.find("input.main-input");
        if (executorDepartmentsBlock.length>0) {
            executorDepartments = $(executorDepartmentsBlock)["0"].defaultValue;
            executorDepartments = (executorDepartments != "" ? executorDepartments.split(',') : []);
        }
        //var podraz = podrazf.find(".clear-selected-value");
        //var podrazc = podrazf.find(".clear-selected-value").data('value');
        /*let executorDepartments = [];
        let executorDepartmentsBlock = executorDepartmentsFBlock.find(".clear-selected-value")
        $.each(executorDepartmentsBlock, function (i, el) {
            executorDepartments.push($(executorDepartmentsBlock[i]).data('value'));
        });*/

        let executors = [];
        let executorsFBlock = $("div.filter-label:contains('Текущий исполнитель:')").parent();
        let executorsBlock = executorsFBlock.find("input.main-input");
        if (executorsBlock.length>0) {
            executors = $(executorsBlock)["0"].defaultValue;
            executors = (executors != "" ? executors.split(',') : []);
        }

        let requestTypes = [];
        let requestTypesFBlock = $("div.filter-label:contains('Тип обращения:')").parent();
        let requestTypesBlock = requestTypesFBlock.find("input.main-input");
        if (requestTypesBlock.length>0) {
            requestTypes = $(requestTypesBlock)["0"].defaultValue;
            requestTypes = (requestTypes != "" ? requestTypes.split(',') : []);
        }

        let senderTypes = [];
        let senderTypesFBlock = $("div.filter-label:contains('Тип ИС (источник):')").parent();
        let senderTypesBlock = senderTypesFBlock.find("input.main-input");
        if (senderTypesBlock.length>0) {
            senderTypes = $(senderTypesBlock)["0"].defaultValue;
            senderTypes = (senderTypes != "" ? senderTypes.split(',') : []);
        }

        let byActiveExecutor = true;
        let byActiveExecutorBlockHtml = $(".tab-switch.active").html();
        byActiveExecutor = (byActiveExecutorBlockHtml ===  "Поиск по текущему исполнителю" ? true : false);

        //if(podrazc.length>0){
        //console.log(podrazc);
        chrome.runtime.sendMessage(
            {
                objectRegions: objectRegions,
                categories: categories,
                acceptDate: {dateFrom: acceptDatesS, dateTo: acceptDatesE},
                executionDate: {dateFrom: executionDateS, dateTo: executionDateE},
                subjectRF: subjectRF,
                executorDepartments: executorDepartments,
                statuses: statuses,
                executors: executors,
                requestTypes: requestTypes,
                senderTypes: senderTypes,
                byActiveExecutor: byActiveExecutor
            });
        //}
        //console.log("Регион: "+regionc+"  Подразделение: "+podrazc);
        //}
    }
}, 1000);