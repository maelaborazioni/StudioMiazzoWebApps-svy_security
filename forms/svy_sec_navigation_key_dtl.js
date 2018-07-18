/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F4BB329B-80C2-44B7-BAFA-60883927D85C",variableType:4}
 */
var vDidTreeViewInit = 0;

/**
 * @properties={typeid:24,uuid:"65F8A3D5-7E66-4075-BA44-9FF70E7B9DEB"}
 * @AllowToRunInFind
 */
function loadTree() {
	if (vDidTreeViewInit == 0)
	{
			
		//create a dataset for the tree
		var _ds_tree = databaseManager.createEmptyDataSet(0,['id', 'name', 'parent_id', 'code', 'pk', 'program_name'])
	
		_ds_tree.addRow([1, 'Programs', null, null, null, null])
	
		/** @type {JSFoundSet<db:/svy_framework/nav_program>} */
		var _fs_programs = databaseManager.getFoundSet(globals.nav_db_framework,'nav_program')
		_fs_programs.loadAllRecords()
		var _id, _id_buttons, _id_popmenus, _id_button, _id_popmenu, _fs_popmenu, _rec_popmenu
		/** @type {JSRecord} */
		var _rec_program
		
		var _buttons = ['btn_method','btn_print','btn_search','btn_search_prop','btn_sort','btn_all_records', 'btn_rec_nav', 'btn_new', 'btn_delete', 'btn_edit', 'btn_duplicate', 'btn_export','btn_resettblheader','btn_help','btn_record_information']
		
		for (var i = 1; i <= _fs_programs.getSize(); i++) {
			_rec_program = _fs_programs.getRecord(i)
			_id = _ds_tree.getMaxRowIndex() + 1
			_ds_tree.addRow([_id, _rec_program.program_name, 1, 'program', _rec_program.program_name, _rec_program.program_name])
			
			_id_buttons = _ds_tree.getMaxRowIndex() + 1	
			_ds_tree.addRow([_id_buttons, 'buttons', _id, null, _rec_program.program_name, _rec_program.program_name])
			
			for (var j = 0; j <= _buttons.length; j++) {
				_id_button =  _ds_tree.getMaxRowIndex() + 1	
				_ds_tree.addRow([_id_button, _buttons[j], _id_buttons, _buttons[j], _rec_program.program_name, _rec_program.program_name])
			}
			
			/** @type {JSRelationItem<nav_program_to_nav_popmenu>} */
			_fs_popmenu = _rec_program.nav_program_to_nav_popmenu
			_id_popmenus = _ds_tree.getMaxRowIndex() + 1
			_ds_tree.addRow([_id_popmenus, 'popmenus', _id, null, _rec_program.program_name, _rec_program.program_name])
			for (var k = 1; k <= _fs_popmenu.getSize(); k++) {
				_rec_popmenu = _fs_popmenu.getRecord(k)
				_id_popmenu = _ds_tree.getMaxRowIndex() + 1
				_ds_tree.addRow([_id_popmenu, 'popmenus', _id_popmenus, _rec_popmenu.menu_type, _rec_popmenu.nav_popmenu_id, _rec_program.program_name])
				
			}
			
		}
	
		var _datasource = _ds_tree.createDataSource('data_tree',[JSColumn.INTEGER, JSColumn.TEXT, JSColumn.INTEGER, JSColumn.TEXT, JSColumn.TEXT, JSColumn.TEXT])
		var _form = solutionModel.getForm(controller.getName())
		_form.dataSource = _datasource
		controller.recreateUI()
		var _relation = solutionModel.newRelation('rel_security_true',_datasource,_datasource,JSRelation.INNER_JOIN)
		_relation.newRelationItem('id','=','parent_id')
	
		
		var _binding = elements.tree.createBinding(_datasource)
//		_binding.setImageURLDataprovider('tree_image');
//		_binding.setChildSortDataprovider('sort_calc');
		_binding.setNRelationName('rel_security_true');
		_binding.setTextDataprovider('name');
		_binding.setCallBackInfo(globals['svy_nav_tree_node_selected'], 'id');	
	
		if(foundset.find())
		{
			foundset['parent_id'] = '^'
			foundset.search()
			
		}
		
		elements.tree.addRoots(foundset);
		
		
		vDidTreeViewInit = 1
	}


}
