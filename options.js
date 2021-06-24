// JavaScript Document
$(document).ready(function(){
  //var htm = $(".statement-number").html();
  //let podrazc = localStorage['podrazdelenie'];
  /*let podrazc = 'пусто';
  podrazc = chrome.storage.local.get(['podrazdelenie'], function(result){
    console.log(result.podrazdelenie);
  });*/

  //$("#statistic").html("Подразделение: ".concat(podrazc));
  $('#plg_on_hover_history_enable')[0].checked = (window.localStorage.plg_on_hover_history_enable === "true");
  $('#plg_def_region').val(window.localStorage.plg_def_region);
  $('#plg_def_podraz').val(window.localStorage.plg_def_podraz);
  $('#plg_def_regs').html(window.localStorage.plg_def_regs);
  $('#plg_regs_enable')[0].checked = (window.localStorage.plg_regs_enable === "true");
  $('#plg_expiried_enable')[0].checked = (window.localStorage.plg_expiried_enable === "true");
  $('#plg_closed_enable')[0].checked = (window.localStorage.plg_closed_enable === "true");
  $('#plg_inwork_enable')[0].checked = (window.localStorage.plg_inwork_enable === "true");
  $('#plg_regs_statistic_filter_enable')[0].checked = (window.localStorage.plg_regs_statistic_filter_enable === "true");
  $('#plg_def_status').html(window.localStorage.plg_def_status);

  let body = $('body');
  body.on('click', '#plg_on_hover_history_enable', function(){
    let plg_on_hover_history_enable = $('#plg_on_hover_history_enable')[0].checked;
    window.localStorage.plg_on_hover_history_enable = plg_on_hover_history_enable;
    chrome.storage.local.set({plg_on_hover_history_enable: plg_on_hover_history_enable}, function(){
            console.log(plg_on_hover_history_enable);
    }); 
  });
  
  body.on('click', '#plg_regs_enable', function(){
    let plg_regs_enable = $('#plg_regs_enable')[0].checked;
    window.localStorage.plg_regs_enable = plg_regs_enable;
    chrome.storage.local.set({plg_regs_enable: plg_regs_enable}, function(){
            console.log(plg_regs_enable);
    }); 
  });

  body.on('click', '#plg_expiried_enable', function(){
    let plg_enable = $('#plg_expiried_enable')[0].checked;
    window.localStorage.plg_expiried_enable = plg_enable;
    chrome.storage.local.set({plg_expiried_enable: plg_enable}, function(){
            console.log(plg_enable);
    }); 
  });

  body.on('click', '#plg_closed_enable', function(){
    let plg_enable = $('#plg_closed_enable')[0].checked;
    window.localStorage.plg_closed_enable = plg_enable;
    chrome.storage.local.set({plg_closed_enable: plg_enable}, function(){
            console.log(plg_enable);
    }); 
  });

  body.on('click', '#plg_inwork_enable', function(){
    let plg_enable = $('#plg_inwork_enable')[0].checked;
    window.localStorage.plg_inwork_enable = plg_enable;
    chrome.storage.local.set({plg_inwork_enable: plg_enable}, function(){
            console.log(plg_enable);
    }); 
  });

  body.on('click', '#plg_regs_statistic_filter_enable', function(){
    let plg_enable = $('#plg_regs_statistic_filter_enable')[0].checked;
    window.localStorage.plg_regs_statistic_filter_enable = plg_enable;
    chrome.storage.local.set({plg_regs_statistic_filter_enable: plg_enable}, function(){
      console.log(plg_enable);
    });
  });

  body.on('change past kayup select', '#plg_def_region', function(){
    let plg_def_region = $('#plg_def_region').val();  
    window.localStorage.plg_def_region = plg_def_region;
    chrome.storage.local.set({plg_def_region: plg_def_region}, function(){
            console.log(plg_def_region);
    }); 
  });

  body.on('change past kayup select', '#plg_def_regs', function(){
    let plg_def_regs = $('#plg_def_regs').val();  
    window.localStorage.plg_def_regs = plg_def_regs;
    chrome.storage.local.set({plg_def_regs: plg_def_regs}, function(){
            console.log(plg_def_regs);
    }); 
  });

  body.on('change past kayup select', '#plg_def_status', function(){
    let plg_def_status = $('#plg_def_status').val();
    window.localStorage.plg_def_status = plg_def_status;
    chrome.storage.local.set({plg_def_status: plg_def_status}, function(){
      console.log(plg_def_status);
    });
  });


  body.on('change past kayup select', '#plg_def_podraz', function(){
    let plg_def_podraz = $('#plg_def_podraz').val().split(';');  
    window.localStorage.plg_def_podraz = plg_def_podraz;
    chrome.storage.local.set({plg_def_podraz: plg_def_podraz}, function(){
            console.log(plg_def_podraz);
    }); 
  });

  let htm = '';
  let filter_item = 0;
  if (typeof(window.localStorage.plg_regs_statistic_filter_list) != "undefined" && window.localStorage.plg_regs_statistic_filter_list != null){
    let plg_regs_statistic_filter_list = JSON.parse(window.localStorage.plg_regs_statistic_filter_list);
    $.each(plg_regs_statistic_filter_list, function(index,value){
      htm += '<div class="row" id="plg_def_filter_'+index+'">'+
          '<div class="col-sm-1">'+
          '<label style="font-size: 11px">Включить</label><br>'+
          '<input class="plg_def_filter filter_enable" data-index="'+index+'" type="checkbox" ' + (value.enable ? 'checked="checked"' : '') + ' name="filter_enable">'+
          '</div>'+
          '<div class="col-sm-3">'+
          '<label style="font-size: 11px">Наименование</label><br>'+
          '<textarea class="plg_def_filter filter_name" data-index="'+index+'" rows="5" placeholder=\'Введите наименование фильтра\' style="height:100px; width:100%">'+
          value.name+
          '</textarea>'+
          '</div>'+
          '<div class="col-sm-8">'+
          '<label style="font-size: 11px">JSON фильтр</label><br>'+
          '<textarea class="plg_def_filter filter_json" data-index="'+index+'" rows="5" placeholder=\'[{"array":{"statements":{"like":{"requestedDocument":["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]\' style="height:100px; width:100%">'+
          JSON.stringify(value.json_filter)+
          '</textarea>'+
          '</div>'+
          '</div>';
      filter_item = index+1;
    });
  }

  htm += '<div class="row" id="plg_def_filter_'+filter_item+'">'+
      '<div class="col-sm-1">'+
      '<label style="font-size: 11px">Включить</label><br>'+
      '<input class="plg_def_filter filter_enable" data-index="' + filter_item + '" type="checkbox" name="filter_enable">'+
      '</div>'+
      '<div class="col-sm-3">'+
      '<label style="font-size: 11px">Наименование</label><br>'+
      '<textarea class="plg_def_filter filter_name" data-index="'+filter_item+'" rows="5" placeholder=\'Введите наименование фильтра\' style="height:100px; width:100%"></textarea>'+
      '</div>'+
      '<div class="col-sm-8">'+
      '<label style="font-size: 11px">JSON фильтр</label><br>'+
      '<textarea class="plg_def_filter filter_json" data-index="'+filter_item+'" rows="5" placeholder=\'[{"array":{"statements":{"like":{"requestedDocument":["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]\' style="height:100px; width:100%"></textarea>'+
      '</div>'+
      '</div>';
  $('#plg_regs_statistic_filter_list').html(htm);

  $('body').on('change past kayup select', '.plg_def_filter', function(){
    let plg_regs_statistic_filter_list = (typeof(window.localStorage.plg_regs_statistic_filter_list) != "undefined" && window.localStorage.plg_regs_statistic_filter_list != null) ? JSON.parse(window.localStorage.plg_regs_statistic_filter_list) : [];

    let index = $(this).data('index');
    if ($('.plg_def_filter.filter_name[data-index="'+index+'"]').val() !== "" || $('.plg_def_filter.filter_json[data-index="'+index+'"]').val() !== "" /*|| $('.plg_def_filter.filter_values[data-index="'+index+'"]').val() != ""*/){
      try {
        plg_regs_statistic_filter_list[$(this).data('index')] = {
          'enable' : $('.plg_def_filter.filter_enable[data-index="'+index+'"]')[0].checked,
          'name' : ($('.plg_def_filter.filter_name[data-index="'+index+'"]').val() !== "") ? $('.plg_def_filter.filter_name[data-index="'+index+'"]').val() : "",
          'json_filter': ($('.plg_def_filter.filter_json[data-index="'+index+'"]').val() !=="") ? JSON.parse($('.plg_def_filter.filter_json[data-index="'+index+'"]').val()) : ""
        };

        if (($("div [id^='plg_def_filter_']").length - 1) === index) {
          $('#plg_def_filter_' + index).after('<div class="row" id="plg_def_filter_' + (index + 1) + '">' +
              '<div class="col-sm-1">'+
              '<label style="font-size: 11px">Включить</label><br>'+
              '<input class="plg_def_filter filter_enable" data-index="' + (index + 1) + '" type="checkbox" name="filter_enable">'+
              '</div>'+
              '<div class="col-sm-3">' +
              '<label style="font-size: 11px">Наименование</label><br>' +
              '<textarea class="plg_def_filter filter_regs" data-index="' + (index + 1) + '" rows="5" placeholder=\'Введите наименование фильтра\' style="height:100px; width:100%"></textarea>' +
              '</div>' +
              '<div class="col-sm-8">' +
              '<label style="font-size: 11px">JSON фильтр</label><br>' +
              '<textarea class="plg_def_filter filter_json" data-index="' + (index + 1) + '" rows="5" placeholder=\'[{"array":{"statements":{"like":{"requestedDocument":["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]\' style="height:100px; width:100%"></textarea>' +
              '</div>' +
              '</div>');
        }
      } catch (e){
        alert('Ошибка ввода в формате JSON фильтра!');
      }
    } else {
      plg_regs_statistic_filter_list.splice([index], 1);
      if (index>0) {
        $('#plg_def_filter_' + (index)).remove();
        for (var j = index + 1; j <= $("div [id^='plg_def_filter_']").length; j++) {
          $("#plg_def_filter_" + (j) + " .plg_def_filter").attr('data-index', j - 1);
          $("#plg_def_filter_" + (j)).attr('id', 'plg_def_filter_' + (j - 1));
        }
      }
      /*if(($("div [id^='plg_def_filter_']").length-2) === index){
          $('#plg_def_filter_'+(index+1)).remove();
      }*/
    }
    window.localStorage.plg_regs_statistic_filter_list = JSON.stringify(plg_regs_statistic_filter_list);
    chrome.storage.local.set({plg_regs_statistic_filter_list: JSON.stringify(plg_regs_statistic_filter_list)}, function(){
      console.log(JSON.stringify(plg_regs_statistic_filter_list));
    });
  });
});