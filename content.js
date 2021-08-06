//$(document).ready(function(){

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