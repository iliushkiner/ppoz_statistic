// JavaScript Document
$(document).ready(function(){
  //var htm = $(".statement-number").html();
  //let podrazc = localStorage['podrazdelenie'];
  /*let podrazc = 'пусто';
  podrazc = chrome.storage.local.get(['podrazdelenie'], function(result){
    console.log(result.podrazdelenie);
  });*/

  //$("#statistic").html("Подразделение: ".concat(podrazc));
  $('#plg_on_hover_history_enable')[0].checked = (window.localStorage.plg_on_hover_history_enable == "true");
  $('#plg_def_region').val(window.localStorage.plg_def_region);
  $('#plg_def_podraz').val(window.localStorage.plg_def_podraz);
  $('#plg_def_regs').html(window.localStorage.plg_def_regs);
  $('#plg_regs_enable')[0].checked = (window.localStorage.plg_regs_enable == "true");
  $('#plg_expiried_enable')[0].checked = (window.localStorage.plg_expiried_enable == "true");
  $('#plg_closed_enable')[0].checked = (window.localStorage.plg_closed_enable == "true");
  $('#plg_inwork_enable')[0].checked = (window.localStorage.plg_inwork_enable == "true");
  
  $('body').on('click', '#plg_on_hover_history_enable', function(){
    let plg_on_hover_history_enable = $('#plg_on_hover_history_enable')[0].checked;
    window.localStorage.plg_on_hover_history_enable = plg_on_hover_history_enable;
    chrome.storage.local.set({plg_on_hover_history_enable: plg_on_hover_history_enable}, function(){
            console.log(plg_on_hover_history_enable);
    }); 
  });
  
  $('body').on('click', '#plg_regs_enable', function(){
    let plg_regs_enable = $('#plg_regs_enable')[0].checked;
    window.localStorage.plg_regs_enable = plg_regs_enable;
    chrome.storage.local.set({plg_regs_enable: plg_regs_enable}, function(){
            console.log(plg_regs_enable);
    }); 
  });

  $('body').on('click', '#plg_expiried_enable', function(){
    let plg_enable = $('#plg_expiried_enable')[0].checked;
    window.localStorage.plg_expiried_enable = plg_enable;
    chrome.storage.local.set({plg_expiried_enable: plg_enable}, function(){
            console.log(plg_enable);
    }); 
  });

  $('body').on('click', '#plg_closed_enable', function(){
    let plg_enable = $('#plg_closed_enable')[0].checked;
    window.localStorage.plg_closed_enable = plg_enable;
    chrome.storage.local.set({plg_closed_enable: plg_enable}, function(){
            console.log(plg_enable);
    }); 
  });

  $('body').on('click', '#plg_inwork_enable', function(){
    let plg_enable = $('#plg_inwork_enable')[0].checked;
    window.localStorage.plg_inwork_enable = plg_enable;
    chrome.storage.local.set({plg_inwork_enable: plg_enable}, function(){
            console.log(plg_enable);
    }); 
  });

  $('body').on('change past kayup select', '#plg_def_region', function(){  
    let plg_def_region = $('#plg_def_region').val();  
    window.localStorage.plg_def_region = plg_def_region;
    chrome.storage.local.set({plg_def_region: plg_def_region}, function(){
            console.log(plg_def_region);
    }); 
  });

  $('body').on('change past kayup select', '#plg_def_regs', function(){  
    let plg_def_regs = $('#plg_def_regs').val();  
    window.localStorage.plg_def_regs = plg_def_regs;
    chrome.storage.local.set({plg_def_regs: plg_def_regs}, function(){
            console.log(plg_def_regs);
    }); 
  });

  $('body').on('change past kayup select', '#plg_def_podraz', function(){  
    let plg_def_podraz = $('#plg_def_podraz').val().split(';');  
    window.localStorage.plg_def_podraz = plg_def_podraz;
    chrome.storage.local.set({plg_def_podraz: plg_def_podraz}, function(){
            console.log(plg_def_podraz);
    }); 
  });  
});