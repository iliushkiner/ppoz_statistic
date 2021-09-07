function Options() {
    let table_style = 'vertical'
    let filter_list = []
    return {
        load() {
            if (typeof (window.localStorage.plg_options_list) != "undefined" && window.localStorage.plg_options_list != null) {
                filter_list = JSON.parse(window.localStorage.plg_options_list);
            } else {
                let options_filter = Options_filter();
                //options_filter.init();
                filter_list.push(options_filter);
            }
            table_style = (typeof (window.localStorage.plg_options_table_style) != "undefined" && window.localStorage.plg_options_table_style != null) ? window.localStorage.plg_options_table_style : 'vertical';
        },
        save() {
            /*if(filter_list.length>1) {
                filter_list.splice(-1);
            }*/
            /*$.each(filter_list, function (index, filter_item) {
                if(filter_item.additional_filter_list.length>1) {
                    filter_item.additional_filter_list.splice(-1);
                }
            });*/
            window.localStorage.plg_options_table_style = table_style;
            chrome.storage.local.set({plg_options_table_style: table_style}, function () {
                console.log(table_style);
            });

            window.localStorage.plg_options_list = JSON.stringify(filter_list);
            chrome.storage.local.set({plg_options_list: JSON.stringify(filter_list)}, function () {
                console.log(JSON.stringify(filter_list));
            });
        },
        get filter_list() {
            return filter_list;
        },
        set table_style(style){
            table_style = style;
        },
        get table_style(){
            return table_style;
        },
        getFilterBlock(){
            let block = '';
            //console.dir(filter_list.length);
            block = block + '<label for="plg_filter_table_style" style="font-size: 18px">Формат вывода таблицы</label>';
            block = block + '<p><input class="plg_filter_table_style" type="radio" value="vertical" '+(table_style == "vertical" ? 'checked' : '')+' name="plg_filter_table_style" style="margin: 0;"> вертикальное    ';
            block = block + '<input class="plg_filter_table_style" type="radio" value="horizontal" '+(table_style == "horizontal" ? 'checked' : '')+' name="plg_filter_table_style" style="margin: 0;"> горизонтальное</p>';
            $.each(filter_list, function (index, filter_item) {
                //console.dir(filter_item);
                block = block + '<fieldset class="plg_filter" id="plg_filter_'+index+'" data-index="'+index+'">' +
                    '<legend style="font-size: 11px">' +
                    '<input class="plg_filter_enable" type="checkbox" '+(filter_item.enable ? 'checked="checked"' : '')+' name="plg_filter_enable" style="margin: 0;"><label for="plg_def_regs" style="font-size: 18px">'+
                    '&nbsp;&nbsp;&nbsp;<a data-toggle="collapse" data-parent="#accordion" href="#collapseFilter_'+index+'" aria-expanded="true" aria-controls="collapseOne">Параметры фильтра №' +(index+1) + '</a> '+(filter_item.enable ? '<span class="on_off on">(ON' : '<span class="on_off off">(OFF')+')</span></label><span style="float: right;font-size: 15px;"><a href="#" class="plg_filter_delete">[Х]</a></span><br><span style="font-size: 10px">' + filter_item.name + '</span></legend>' +
                    '<div id="collapseFilter_'+index+'" class="panel-collapse collapse'+(index>=filter_list.length-1 ? ' in' : '')+'" role="tabpanel" aria-labelledby="headingOne">' +
                    '<div class="row"><div class="col-sm-12"><input class="input_text_param plg_def_name" data-param_name="name" type="text" value="' + filter_item.name + '" style="width:100%"></div></div>' +
                    '<div class="row">' +
                    '  <div class="col-sm-4">' +
                    '    <label for="plg_def_objectRegions" style="font-size: 11px">Субъект объекта недвижимости</label>&nbsp;&nbsp;&nbsp;<label for="plg_def_region" style="font-size: 11px">Субъект РФ</label><br>' +
                    '    <input class="input_text_param plg_def_objectRegions" data-param_name="objectRegions" type="text" size="20" value="'+filter_item.objectRegions+'">&nbsp;&nbsp;&nbsp;<input class="input_text_param plg_def_region" data-param_name="region" type="text" size="20" value="'+filter_item.region+'"><br>' +
                    '    <label for="plg_def_podraz" style="font-size: 11px">Список кодов ЕСТО через запятую (Подразделение)</label><br>' +
                    '    <input class="input_text_param plg_def_podraz" data-param_name="podrazdelenie" type="text" size="25" value="'+filter_item.podrazdelenie+'"><br>' +
                    '  </div>' +
                    '  <div class="col-sm-3">' +
                    '    <label for="plg_def_regs" style="font-size: 11px"><input class="input_checkbox_param plg_regs_enable" data-param_name="regs_enable" type="checkbox" '+(filter_item.regs_enable ? 'checked="checked"' : '')+' name="plg_regs_enable" style="margin: 0;">Выводить только cписок интересующих регов</label><br>' +
                    '    <textarea class="input_text_param plg_def_regs" data-param_name="def_regs" cols="30" rows="3" placeholder="Список регов через запятую" style="height:72px;">'+filter_item.def_regs+'</textarea>' +
                    '  </div>' +
                    '  <div class="col-sm-5">' +
                    '    <div class="row">' +
                    '      <div class="col-sm-5">' +
                    '        <!--<label style="font-size: 11px">Выводить граф в раскладе по выбранному количеству' +
                    '          дней</label><br>' +
                    '        <input class="input_checkbox_param plg_expiried_enable" data-param_name="expiried_enable"  type="checkbox" '+(filter_item.expiried_enable ? 'checked="checked"' : '')+' name="plg_executiondate_enable">Просроченные по срокам<br>' +
                    '        <input class="input_checkbox_param plg_closed_enable" data-param_name="closed_enable" type="checkbox" '+(filter_item.closed_enable ? 'checked="checked"' : '')+' name="plg_closed_enable">Завешено по датам<br>' +
                    '        <input class="input_checkbox_param plg_inwork_enable" data-param_name="inwork_enable" type="checkbox" '+(filter_item.inwork_enable ? 'checked="checked"' : '')+' name="plg_on_inwork_enable">Вработе по срокам<br>-->' +
                    '        <label style="font-size: 11px">Срок истекает (today - сегдня, yesterday - вчера, или пусто)</label> '+
                    '        <input class="input_text_param plg_def_expires" data-param_name="expires"  type="text" size="20" value="'+filter_item.expires+'" name="plg_expires"><br>' +
                    '      </div>' +
                    '      <div class="col-sm-7">' +
                    '        <label for="plg_def_categories" style="font-size: 11px">Список стадий обработки обращения</label><br>' +
                    '        <textarea class="input_text_param plg_def_categories" data-param_name="categories" rows="2" cols="33" placeholder="Список стадий через запятую">'+filter_item.categories+'</textarea><br>' +
                    '        <label for="plg_def_status" style="font-size: 11px">Список статусов по умолчанию</label><br>' +
                    '        <textarea class="input_text_param plg_def_status" data-param_name="def_status" rows="2" cols="33" placeholder="Список статусов через запятую">'+filter_item.def_status+'</textarea><br>' +
                    '      </div>' +
                    '    </div>' +
                    '  </div>' +
                    '</div>' +
                    '<div class="row">' +
                    '  <div class="col-sm-4">' +
                    '    <label for="plg_def_requestTypes" style="font-size: 11px">Список кодов через запятую (Тип обращения)</label><br>' +
                    '    <input class="input_text_param plg_def_requestTypes" data-param_name="requestTypes" type="text" size="40" value="'+filter_item.requestTypes+'"><br>' +
                    '  </div>' +
                    '</div>' +
                    '<fieldset>' +
                    '  <legend style="font-size: 11px">Дополнительный фильтр по обращению</legend>'+
                    '  <label for="plg_regs_statistic_filter_list" style="font-size: 11px">' +
                    '  <input class="input_checkbox_param plg_regs_statistic_filter_enable" data-param_name="additional_filter_enable" type="checkbox" '+(filter_item.additional_filter_enable ? 'checked="checked"' : '')+' name="plg_regs_statistic_filter_enable" style="margin: 0;">Применять фильтр</label>' +
                    '  <div class="plg_regs_statistic_filter_list">';
                let new_filter = {
                    "enable": false,
                    "name": "",
                    "json_filter": null
                };
                filter_item.additional_filter_list.push(new_filter);
                $.each(filter_item.additional_filter_list, function (key, additional_filter_item) {
                    //console.dir(additional_filter_item.enable);
                    block = block + '<div class="filter_list_item row" id="plg_def_filter_' + key + '" data-index="' + key + '">' +
                        '   <div class="col-sm-1">' +
                        '       <label style="font-size: 11px">Включить</label><br>' +
                        '       <input class="input_checkbox_add_param plg_def_filter filter_enable" data-param_name="enable" type="checkbox" ' + (additional_filter_item.enable ? 'checked="checked"' : '') + ' name="filter_enable">' +
                        '   </div>' +
                        '   <div class="col-sm-3">' +
                        '       <label style="font-size: 11px">Наименование</label><br>' +
                        '       <textarea class="input_text_add_param plg_def_filter filter_name" data-param_name="name" rows="5" placeholder=\'Введите наименование фильтра\' style="height:100px; width:100%">' +
                        additional_filter_item.name +'</textarea>' +
                        '   </div>' +
                        '   <div class="col-sm-8">' +
                        '       <label style="font-size: 11px">JSON фильтр</label><br>' +
                        '       <textarea class="input_text_add_param plg_def_filter filter_json" data-param_name="json_filter" rows="5" placeholder=\'[{"array":{"statements":{"like":{"requestedDocument":["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]\' style="height:100px; width:100%">' +
                        (additional_filter_item.json_filter!==null ? JSON.stringify(additional_filter_item.json_filter) : '') + '</textarea>' +
                        '   </div>' +
                        '</div>';
                });
                block = block + '</div></fieldset></div></fieldset>';
            });
            return block;
        }
    }
};

//const options = Options();
//options.load();
//console.dir(options);