function Options_filter() {
	let name = 'Наименование фильтра'
	let enable = false//true
	let objectRegions =12
	let region = 12
	let podrazdelenie = ''
	let regs_enable = false
	let def_regs = ''//'ivnurzhauova,nnbolotova'
	let closed_enable = false//true
	let expiried_enable = false
	let inwork_enable = false//true
	let expires = '' //не использовать в фильтре, today - сегдня, yesterday - вчера
	let categories = ''
	let def_status = ''
	let additional_filter_enable = false//true
	let additional_filter_list = [/*{
		"enable": false,
		"name": "Выписки",
		"json_filter": [{"array": {"statements": {"like": {"requestedDocument": ["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]
	}, {
		"enable": false,
		"name": "выписки 2",
		"json_filter": [{"array": {"statements": {"like": {"requestedDocument": ["Выписка из Единого государственного реестра недвижимости о переходе прав на объект недвижимости"]}}}}]
	}, {
		"enable": false,
		"name": "Выписка  о содержании правоустанавливающих документов",
		"json_filter": [{"array": {"statements": {"like": {"requestedDocument": ["Выписка о содержании правоустанавливающих документов"]}}}}]
	}, {
		"enable": true,
		"name": "Ипотека СБЕР",
		"json_filter": [{"array": {"statements": {"array": {"documents": {"like": {"name": ["СБЕРБАНК"]}}}}}}]
	}, {
		"enable": false,
		"name": "ВТБ",
		"json_filter": [{"array": {"statements": {"array": {"documents": {"like": {"name": ["ВТБ"]}}}}}}]
	}*/]
	let requestTypes = ''

	return {
		getJSON() {
			return /*"Ha-ha";*/{
				'objectRegions': objectRegions,
				'region': region,
				'podrazdelenie': podrazdelenie,
				'regs_enable': regs_enable,
				'def_regs': def_regs,
				'closed_enable': closed_enable,
				'expiried_enable': expiried_enable,
				'inwork_enable': inwork_enable,
				'def_status': def_status,
				'categories': categories,
				'expires' : expires,
				'requestTypes': requestTypes,
				'additional_filter_enable': additional_filter_enable,
				'additional_filter_list': JSON.stringify(additional_filter_list)
			}
		},
		set name(filter_name){
			name = filter_name;
		},
		get name(){
			return name;
		},
		set enable(bool) {
			enable = bool;
		},
		get enable() {
			return enable;
		},
		set objectRegions(code){
			objectRegions = code;
		},
		get objectRegions(){
			return objectRegions;
		},
		set region(code) {
			region = code;
		},
		get region() {
			return region;
		},
		set podrazdelenie(esto_code) {
			podrazdelenie = esto_code;
		},
		get podrazdelenie() {
			return podrazdelenie;
		},
		set def_regs(regs) {
			def_regs = regs;
		},
		get def_regs() {
			return def_regs;
		},
		set regs_enable(bool) {
			regs_enable = bool;
		},
		get regs_enable() {
			return regs_enable;
		},
		set closed_enable(bool) {
			closed_enable = bool;
		},
		get closed_enable() {
			return closed_enable;
		},
		set expiried_enable(bool) {
			expiried_enable = bool;
		},
		get expiried_enable() {
			return expiried_enable;
		},
		set inwork_enable(bool) {
			inwork_enable = bool;
		},
		get inwork_enable() {
			return inwork_enable;
		},
		set categories(categ) {
			categories = categ;
		},
		get categories(){
			return categories;
		},
		set def_status(status) {
			def_status = status;
		},
		get expires(){
			return expires;
		},
		set expires(day){
			expires = day;
		},
		get def_status() {
			return def_status;
		},
		set requestTypes(types){
			requestTypes = types;
		},
		get requestTypes(){
			return requestTypes;
		},
		set additional_filter_enable(bool) {
			additional_filter_enable = bool;
		},
		get additional_filter_enable() {
			return additional_filter_enable;
		},
		set additional_filter_list(filter_list) {
			additional_filter_list = filter_list
		},
		get additional_filter_list() {
			return additional_filter_list
		}/*,
		getAdditionalFilterBlock(key) {
			let block = '';
			block = block + '<div class="row" id="plg_def_filter_' + key + '">' +
				'   <div class="col-sm-1">' +
				'       <label style="font-size: 11px">Включить</label><br>' +
				'       <input class="plg_def_filter filter_enable" data-index="' + key + '" type="checkbox" ' + (enable ? 'checked="checked"' : '') + ' name="filter_enable">' +
				'   </div>' +
				'   <div class="col-sm-3">' +
				'       <label style="font-size: 11px">Наименование</label><br>' +
				'       <textarea class="plg_def_filter filter_name" data-index="' + key + '" rows="5" placeholder=\'Введите наименование фильтра\' style="height:100px; width:100%">' +
				name +
				'       </textarea>' +
				'   </div>' +
				'   <div class="col-sm-8">' +
				'       <label style="font-size: 11px">JSON фильтр</label><br>' +
				'       <textarea class="plg_def_filter filter_json" data-index="' + key + '" rows="5" placeholder=\'[{"array":{"statements":{"like":{"requestedDocument":["Выписка из Единого государственного реестра недвижимости о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости."]}}}}]\' style="height:100px; width:100%">' +
				JSON.stringify(additional_filter_item.json_filter) +
				'       </textarea>' +
				'   </div>' +
				'</div>';
			return block;
		}*/
	}
};

/*let filter = Options_filter();
//filter.load();
//filter.additional_filter_list=[{'fu': 'fu1'}]
filter.region = 13;
console.dir(filter);
console.dir(filter.getJSON());
//console.log(filter);*/