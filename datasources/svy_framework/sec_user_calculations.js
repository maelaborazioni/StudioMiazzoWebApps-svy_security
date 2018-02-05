/**
 * @properties={type:12,typeid:36,uuid:"42a3a500-2012-48c0-ac07-2050decf6a4d"}
 */
function name_compound()
{
   if (name_last)
	   return (name_first_names) ? name_last + ' ' + name_first_names : name_last;
       //return (name_first_names) ? name_first_names + ' ' + name_last : name_last;
   return user_name;
}


