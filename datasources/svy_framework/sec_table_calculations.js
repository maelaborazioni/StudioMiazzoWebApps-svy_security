/**
 * @properties={type:12,typeid:36,uuid:"b0636ceb-b9ed-4e1c-b100-273f2f99e4d7"}
 */
function clc_table_name()
{
	if(table_name == '-1')
	{
		return i18n.getI18NMessage('i18n:svy.fr.lbl.all_tables')
	}
	else
	{
		return table_name
	}
}
