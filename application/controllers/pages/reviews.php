<?php
	global $outterVars;
	System::requireModel('tables', 'Reviews');
  	$reviews = ReviewsPrivate::getAll();
	$conf = System::getConf('tpl', 'reviews');
	$confs = array('review-conf' => $conf);

	$outterVars['reviews'] = $reviews;
	$outterVars['tplConfs'] = $confs;
	
	$outterVars['reviewLang'] = $GLOBALS['lang']['reviews'];
	$outterVars['clientLang'] = $GLOBALS['lang']['clients'];
	$outterVars['filtersLang'] = $GLOBALS['lang']['filters'];
?>