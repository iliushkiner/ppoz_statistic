/*chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(tab.id, {
    code: "(" + refreshPopaup.toString() + ")();"
  });  
});

var refreshPopaup = function(){
  let podrazc = 'пусто';
  podrazc = chrome.storage.local.get(['podrazdelenie'], function(result){
    console.log(result.podrazdelenie);
  });

  $("#statistic").html("Подразделение: ".concat(podrazc));
}*/
