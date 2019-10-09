<?php	
	session_start();
	$_SESSION['user']['id'] = 1;
	echo 'SUCCESS';
	exit;
?>