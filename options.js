// JavaScript Document
$(document).ready(function () {
	const options = Options();
	options.load();
	options.filter_list.push(Options_filter());
	let htm1 = options.getFilterBlock();

	$('#options').html(htm1);

	let body = $('body');

	function change_property(index){
		if (index >= options.filter_list.length-1){
			options.save();
		} else {
			options.filter_list.splice(-1);
			/**
			 * Удаляем пустые допфильтры
			 */
			$.each(options.filter_list, function (index, filter_item) {
				let key = 0;
				while(typeof (filter_item.additional_filter_list[key]) !== "undefined"){
					if ((filter_item.additional_filter_list[key].json_filter === null || filter_item.additional_filter_list[key].json_filter.length <= 0)
						&& (filter_item.additional_filter_list[key].name === null || filter_item.additional_filter_list[key].name === '')) {
						filter_item.additional_filter_list.splice(key, 1);
					} else {
						key++;
					}
				}
			});
			//options.filter_list.splice(-1);
			options.save();
			options.filter_list.push(Options_filter());
		}
	}

	body.on('click', '.plg_filter_enable', function () {
		let index = $(this).parents(".plg_filter").data('index');
		options.filter_list[index].enable = $(this)[0].checked;
		$("#plg_filter_" + index + " .on_off").removeClass($(this)[0].checked ? 'off' : 'on');
		$("#plg_filter_" + index + " .on_off").addClass($(this)[0].checked ? 'on' : 'off');
		$("#plg_filter_" + index + " .on_off").html($(this)[0].checked ? '(ON)' : '(OFF)');
		change_property(index);
		//console.dir(options);
		//options.filter_list.push(Options_filter());
		//console.dir(options);
	});

	body.on('click', '.plg_filter_delete', function () {
		let index = $(this).parents(".plg_filter").data('index');
		//console.dir(options);
		if (index >= options.filter_list.length-1){
			//options.save();
		} else {
			options.filter_list.splice(index,1);
			options.filter_list.splice(-1);
			options.save();
			options.filter_list.push(Options_filter());
			$("#plg_filter_" + index).remove();
		}
		//options.filter_list.push(Options_filter());
		//console.dir(options);
	});

	body.on('change past kayup select', '.input_text_param', function () {
		let index = $(this).parents(".plg_filter").data('index');
		let param_name = $(this).data('param_name');
		options.filter_list[index][param_name] = $(this).val();
		change_property(index);
	});

	body.on('click', '.input_checkbox_param', function () {
		let index = $(this).parents(".plg_filter").data('index');
		let param_name = $(this).data('param_name');
		options.filter_list[index][param_name] = $(this)[0].checked;
		change_property(index);
		//console.dir(options);
		//options.filter_list.push(Options_filter());
		//console.dir(options);
	});

	body.on('click', '.plg_filter_table_style', function () {
		options.table_style = $(this)[0].value;
		options.save();
		//console.dir(options);
	});

	body.on('change past kayup select', '.filter_list_item .input_text_add_param', function () {
		let index = $(this).parents(".plg_filter").data('index');
		let list_index = $(this).parents(".filter_list_item").data('index');
		let param_name = $(this).data('param_name');
		/*if (list_index >= options.filter_list.length-1){

		}*/
		if(typeof (options.filter_list[index].additional_filter_list[list_index]) !== "undefined") {
			options.filter_list[index].additional_filter_list[list_index][param_name] = (param_name === 'json_filter' ? ($(this).val() !== null && $(this).val() !='' ? JSON.parse($(this).val()) : []) : $(this).val());
		}
		change_property(index);
	});
	body.on('click', '.filter_list_item .input_checkbox_add_param', function () {
		let index = $(this).parents(".plg_filter").data('index');
		let list_index = $(this).parents(".filter_list_item").data('index');
		let param_name = $(this).data('param_name');
		options.filter_list[index].additional_filter_list[list_index][param_name] = $(this)[0].checked;
		change_property(index);
	});
	/*body.on('click', '.input_checkbox_param', function () {
		let plg_regs_enable = $('#plg_regs_enable')[0].checked;
		window.localStorage.plg_regs_enable = plg_regs_enable;
		chrome.storage.local.set({plg_regs_enable: plg_regs_enable}, function () {
			console.log(plg_regs_enable);
		});
	});

	body.on('click', '#plg_expiried_enable', function () {
		let plg_enable = $('#plg_expiried_enable')[0].checked;
		window.localStorage.plg_expiried_enable = plg_enable;
		chrome.storage.local.set({plg_expiried_enable: plg_enable}, function () {
			console.log(plg_enable);
		});
	});

	body.on('click', '#plg_closed_enable', function () {
		let plg_enable = $('#plg_closed_enable')[0].checked;
		window.localStorage.plg_closed_enable = plg_enable;
		chrome.storage.local.set({plg_closed_enable: plg_enable}, function () {
			console.log(plg_enable);
		});
	});

	body.on('click', '#plg_inwork_enable', function () {
		let plg_enable = $('#plg_inwork_enable')[0].checked;
		window.localStorage.plg_inwork_enable = plg_enable;
		chrome.storage.local.set({plg_inwork_enable: plg_enable}, function () {
			console.log(plg_enable);
		});
	});

	body.on('click', '#plg_regs_statistic_filter_enable', function () {
		let plg_enable = $('#plg_regs_statistic_filter_enable')[0].checked;
		window.localStorage.plg_regs_statistic_filter_enable = plg_enable;
		chrome.storage.local.set({plg_regs_statistic_filter_enable: plg_enable}, function () {
			console.log(plg_enable);
		});
	});

	body.on('change past kayup select', '#plg_def_region', function () {
		let plg_def_region = $('#plg_def_region').val();
		window.localStorage.plg_def_region = plg_def_region;
		chrome.storage.local.set({plg_def_region: plg_def_region}, function () {
			console.log(plg_def_region);
		});
	});

	body.on('change past kayup select', '#plg_def_regs', function () {
		let plg_def_regs = $('#plg_def_regs').val();
		window.localStorage.plg_def_regs = plg_def_regs;
		chrome.storage.local.set({plg_def_regs: plg_def_regs}, function () {
			console.log(plg_def_regs);
		});
	});

	body.on('change past kayup select', '#plg_def_status', function () {
		let plg_def_status = $('#plg_def_status').val();
		window.localStorage.plg_def_status = plg_def_status;
		chrome.storage.local.set({plg_def_status: plg_def_status}, function () {
			console.log(plg_def_status);
		});
	});


	body.on('change past kayup select', '#plg_def_podraz', function () {
		let plg_def_podraz = $('#plg_def_podraz').val().split(';');
		window.localStorage.plg_def_podraz = plg_def_podraz;
		chrome.storage.local.set({plg_def_podraz: plg_def_podraz}, function () {
			console.log(plg_def_podraz);
		});
	});*/

	/*let htm = '';
	let filter_item = 0;
	if (typeof (window.localStorage.plg_regs_statistic_filter_list) != "undefined" && window.localStorage.plg_regs_statistic_filter_list != null) {
		let plg_regs_statistic_filter_list = JSON.parse(window.localStorage.plg_regs_statistic_filter_list);
		$.each(plg_regs_statistic_filter_list, function (index, value) {
			htm += '<div class="row" id="plg_def_filter_' + index + '">' +
				'<div class="col-sm-1">' +
				'<label style="font-size: 11px">Включить</label><br>' +
				'<input class="plg_def_filter filter_enable" data-index="' + index + '" type="checkbox" ' + (value.enable ? 'checked="checked"' : '') + ' name="filter_enable">' +
				'</div>' +
				'<div class="col-sm-3">' +
				'<label style="font-size: 11px">Наименование</label><br>' +
				'<textarea class="plg_def_filter filter_name" data-index="' + index + '" rows="5" placeholder=\'Введите наименование фильтра\' style="height:100px; width:100%">' +
				value.name +
				'</textarea>' +
				'</div>' +
				'<div class="col-sm-8">' +
				'<label style="font-size: 11px">JSON фильтр</label><br>' +
				'<textarea class="plg_def_filter filter_json" data-index="' + index + '" rows="5" placeholder=\'[{"array":{"statements":{"like":{"requestedDocument":["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]\' style="height:100px; width:100%">' +
				JSON.stringify(value.json_filter) +
				'</textarea>' +
				'</div>' +
				'</div>';
			filter_item = index + 1;
		});
	}

	htm += '<div class="row" id="plg_def_filter_' + filter_item + '">' +
		'<div class="col-sm-1">' +
		'<label style="font-size: 11px">Включить</label><br>' +
		'<input class="plg_def_filter filter_enable" data-index="' + filter_item + '" type="checkbox" name="filter_enable">' +
		'</div>' +
		'<div class="col-sm-3">' +
		'<label style="font-size: 11px">Наименование</label><br>' +
		'<textarea class="plg_def_filter filter_name" data-index="' + filter_item + '" rows="5" placeholder=\'Введите наименование фильтра\' style="height:100px; width:100%"></textarea>' +
		'</div>' +
		'<div class="col-sm-8">' +
		'<label style="font-size: 11px">JSON фильтр</label><br>' +
		'<textarea class="plg_def_filter filter_json" data-index="' + filter_item + '" rows="5" placeholder=\'[{"array":{"statements":{"like":{"requestedDocument":["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]\' style="height:100px; width:100%"></textarea>' +
		'</div>' +
		'</div>';
	$('#plg_regs_statistic_filter_list').html(htm);

	$('body').on('change past kayup select', '.plg_def_filter', function () {
		let plg_regs_statistic_filter_list = (typeof (window.localStorage.plg_regs_statistic_filter_list) != "undefined" && window.localStorage.plg_regs_statistic_filter_list != null) ? JSON.parse(window.localStorage.plg_regs_statistic_filter_list) : [];

		let index = $(this).data('index');
		if ($('.plg_def_filter.filter_name[data-index="' + index + '"]').val() !== "" || $('.plg_def_filter.filter_json[data-index="' + index + '"]').val() !== "" ) {
			try {
				plg_regs_statistic_filter_list[$(this).data('index')] = {
					'enable': $('.plg_def_filter.filter_enable[data-index="' + index + '"]')[0].checked,
					'name': ($('.plg_def_filter.filter_name[data-index="' + index + '"]').val() !== "") ? $('.plg_def_filter.filter_name[data-index="' + index + '"]').val() : "",
					'json_filter': ($('.plg_def_filter.filter_json[data-index="' + index + '"]').val() !== "") ? JSON.parse($('.plg_def_filter.filter_json[data-index="' + index + '"]').val()) : ""
				};

				if (($("div [id^='plg_def_filter_']").length - 1) === index) {
					$('#plg_def_filter_' + index).after('<div class="row" id="plg_def_filter_' + (index + 1) + '">' +
						'<div class="col-sm-1">' +
						'<label style="font-size: 11px">Включить</label><br>' +
						'<input class="plg_def_filter filter_enable" data-index="' + (index + 1) + '" type="checkbox" name="filter_enable">' +
						'</div>' +
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
			} catch (e) {
				alert('Ошибка ввода в формате JSON фильтра!');
			}
		} else {
			plg_regs_statistic_filter_list.splice([index], 1);
			if (index > 0) {
				$('#plg_def_filter_' + (index)).remove();
				for (var j = index + 1; j <= $("div [id^='plg_def_filter_']").length; j++) {
					$("#plg_def_filter_" + (j) + " .plg_def_filter").attr('data-index', j - 1);
					$("#plg_def_filter_" + (j)).attr('id', 'plg_def_filter_' + (j - 1));
				}
			}
		}
		window.localStorage.plg_regs_statistic_filter_list = JSON.stringify(plg_regs_statistic_filter_list);
		chrome.storage.local.set({plg_regs_statistic_filter_list: JSON.stringify(plg_regs_statistic_filter_list)}, function () {
			console.log(JSON.stringify(plg_regs_statistic_filter_list));
		});
	});*/
});