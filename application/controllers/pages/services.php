<?php
	global $outterVars;
	System::requireModel('tables', 'Services');
	System::requireModel('tables', 'Services_users');
	System::requireModel('tables', 'Services_measurements');
	System::requireModel('tables', 'Services_categories');
	System::requireModel('tables', 'Users');

	
	$services = ServicesPrivate::getAll();
	$workTime = ServicesPrivate::getWorkTime();
	//$measur = Services_measurementsModelPrivate::getAll();
	$times = Services_measurementsPrivate::getTimes();
	$currencies = Services_measurementsPrivate::getCurrency();
	$usersforservices = UsersPrivate::getUsersforServices();
	$masters = Services_usersPrivate::getAll();
	$categories = Services_categoriesPrivate::getAll();
	$categories_serv = ServicesPrivate::getServicesCategories();

	$conf = System::getConf('tpl', 'services');
	$confs = array('services-conf' => $conf);	

	$conf = System::getConf('tpl', 'services_creation');
	$confs['services-cr-conf'] = $conf;
 
	$outterVars['services'] = $services;
	//$outterVars['measur'] = $measur;
	$outterVars['usersforservices'] = $usersforservices;
	$outterVars['times'] = $times;
	$outterVars['currencies'] = $currencies;
	$outterVars['masters'] = $masters;
	$outterVars['categories'] = $categories;
	$outterVars['categories_serv'] = $categories_serv;
	$outterVars['tplConfs'] = $confs;
	$outterVars['workTime'] = $workTime;
	$outterVars['noAvatar'] = 'assets/img/single-service-icon.svg';
?>