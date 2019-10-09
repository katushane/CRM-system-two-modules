<?php
	System::requireSystemModule('DB');
	
	class ClientsPrivate {
		
		const TABLE = 'Clients';
		
	    public static function getAll() {

			$query = 'SELECT
				         hk_clients.id         						as id,
				          first_name                  				as firstName,
				          if (last_name is NULL, "", last_name)   	as lastName,
				          first_phone               				as firstPhone,
				          second_phone               				as secondPhone,
				          email                     				as email,
				          sex                     					as sex,
				          if (birthday is NULL, "", birthday)       as birthday,
				          if (note is NULL, "", note) 				as note,
				          hk_clients_loyalty.discount 				as discount,
				          address                  					as address,
				          avatar 									as avatar,
				          `hk_clients_loyalty`.`title` 				as loyalty,
				          `hk_clients_loyalty`.`id` 				as loyaltyId,
				          if (SUM(`hk_appointments`.`total`) is NULL, 0, SUM(`hk_appointments`.`total`))
																	as total

				          FROM hk_clients INNER JOIN hk_clients_loyalty ON  hk_clients.id_loyalty  = hk_clients_loyalty.id 

				          LEFT JOIN `hk_visits`
									ON `hk_visits`.`id_client` = `hk_clients`.`id`

				          LEFT JOIN `hk_appointments`
									ON `hk_visits`.`id` = `hk_appointments`.`id_visit`

						  GROUP BY `hk_clients`.`id`		

				          ORDER BY id DESC';

						$all = DB::select($query, false);
						return $all;
	    }

	    public static function getAllUsers() {

				$query = 'SELECT
                  			hk_users.id         as id,                          
                 			CONCAT(first_name, " ", if (last_name is NULL, "", last_name))  as title
                  			FROM hk_users';
						$all = DB::select($query, false);
						return $all;
	    }

	    public static function getAllServices() {

				$query = 'SELECT
				          hk_services.id         as id,
				          title               
				        	FROM hk_services';
						$all = DB::select($query, false);
						return $all;
	    }

	   //  public static function getUsersAndServices() {

				// $query = 'SELECT
				//           hk_services_users.id_service         as idService,
				//           hk_services_users.id_user            as idUser,
				//           hk_services.title 				   as titleService,
				//           CONCAT(hk_users.first_name, " ", if (hk_users.last_name is NULL, "", hk_users.last_name))	   as titleUser       
				//         	FROM hk_services_users
				//         	INNER JOIN hk_services ON hk_services.id=hk_services_users.id_service
				//         	INNER JOIN hk_users ON hk_users.id=hk_services_users.id_user';
				// 		$all = DB::select($query, false);
				// 		return $all;
	   //  }

	    public static function getLoyalty () {
	            $query = 'SELECT 
	                        `hk_clients_loyalty`.`id`,
	                        `hk_clients_loyalty`.`title`            as title,
	                        `hk_clients_loyalty`.`discount`         as discount
	                        
	                        FROM `hk_clients_loyalty`';
	                        
	            $all = DB::select($query, false);
	            return $all;            
	     }

	    public static function create ($fields) {
	    	//STR_TO_DATE($fields[0]['birhday'], "%Y, %m, %d");
	    	return DB::insert(self::TABLE, $fields);
		}

		public static function edit ($fields) {
			return DB::update(self::TABLE, $fields);
		}

		public static function getAllFilters ($fieldDateStart, $fieldDateEnd, $fieldSex, $fieldDiscountStart, $fieldDiscountEnd, $fieldCategoriesArray, $fieldAgeStart, $fieldAgeEnd, $fieldVisitsStart, $fieldVisitsEnd, $fieldTotalStart, $fieldTotalEnd, $fieldUsersArray, $fieldServicesArray) {
        	// $arrayFilters = array();
	        $query = '	
	        		SELECT 
          			y.*,
          			COUNT(y.id) AS countVisits,
          			SUM(price) AS total  
          			FROM (
            			SELECT x.*, 
            			discount 
            			FROM (
                    		SELECT 
                            hk_clients.id         					as id,
                            first_name                  			as firstName,
                   			if (last_name is NULL, "", last_name)   as lastName,
                    		first_phone               				as firstPhone,
                    		second_phone               				as secondPhone,
                    		email                     				as email,
                    		sex                       				as sex,
                    		birthday                  				as birthday,
                            start            						as date,        
                    		address                  				as address,
                            id_loyalty        						as id_loyalty,
                            total									as price
                     		FROM hk_clients LEFT JOIN hk_visits ON hk_clients.id = hk_visits.id_client
                            ) as x 
            			INNER JOIN hk_clients_loyalty ON  x.id_loyalty  = hk_clients_loyalty.id 
                        ) AS y
                    GROUP BY y.id
				      ';


        	if (!is_null($fieldDateStart))
		    {
		        $query = 'SELECT * FROM (' . $query . ')' . ' as byDateStart ' .'WHERE date > ' . $fieldDateStart . '
		        ';
		        // $arrayFilters[] =  array('type' => 'date','value' => $fieldDateStart);
		    }

        	if (!is_null($fieldDateEnd))
		    {
		        $query = 'SELECT * FROM (' . $query . ')' . ' as byDateEnd ' .'WHERE date < ' . $fieldDateEnd . '
		        ';
		        // $arrayFilters[] =  array('type' => 'date','value' => $fieldDateEnd);
		    }

		    if (!is_null($fieldSex))
		    {
		        $query = 'SELECT * FROM (' . $query . ')' . ' as bySex ' . 'WHERE sex = ' . $fieldSex . '
         		';
         		// $arrayFilters[] =  array('type' => 'str','value' => $fieldSex);
		    }

		    if (!is_null($fieldAgeStart))
            {
                $query = 'SELECT * FROM (' . $query . ')' . ' as byAgeStart ' . 'WHERE birthday < ' . $fieldAgeStart . '
                ';
                // $arrayFilters[] =  array('type' => 'date','value' => $fieldAgeStart);
            }

            if (!is_null($fieldAgeEnd))
            {
                $query = 'SELECT * FROM (' . $query . ')' . ' as byAgeEnd ' . 'WHERE birthday > ' . $fieldAgeEnd . '
                ';
                // $arrayFilters[] =  array('type' => 'date','value' => $fieldAgeEnd);
            }

		    if (!is_null($fieldDiscountStart))
		    {
		        $query = 'SELECT * FROM (' . $query . ')' . ' as byDiscountStart ' .'WHERE discount > ' . $fieldDiscountStart .'
		        ';
		        // $arrayFilters[] =  array('type' => 'int','value' => $fieldDiscountStart);
		    }

        	if (!is_null($fieldDiscountEnd))
		    {
		        $query = 'SELECT * FROM (' . $query . ')' . ' as byDiscountEnd ' .'WHERE discount < ? ' . $fieldDiscountEnd . '
		        ';
		        // $arrayFilters[] =  array('type' => 'int','value' => $fieldDiscountEnd);
		    }

		    if (!is_null($fieldCategoriesArray))
	        {
	        	$query = 'SELECT * FROM (' . $query . ')' . ' as byCategory ' . 'WHERE id_loyalty = ' . $fieldCategoriesArray[0] . ' ';
			    // $arrayFilters[] =  array('type' => 'int','value' => $fieldCategoriesArray[0]);
	        	if (count($fieldCategoriesArray) > 1) {
	        		for ($i = 1; $i < count($fieldCategoriesArray); $i++) 
			          {
			          	$query .= 'OR id_loyalty = ' . $fieldCategoriesArray[$i] . ' ';
			            // $arrayFilters[] =  array('type' => 'int','value' => $fieldCategoriesArray[$i]);
			          }			          
	        	}
	          
	        }

			    if (!is_null($fieldUsersArray))
		          {
		            $query = 'SELECT byUsers.* FROM (' . $query . ')' . ' as byUsers ' . 'LEFT JOIN hk_visits ON byUsers.id = hk_visits.id_client '. 'WHERE id_user = ' . $fieldUsersArray[0] . ' ';
		          	// $arrayFilters[] =  array('type' => 'int','value' => $fieldUsersArray[0]);
		            if (count($fieldUsersArray) > 1) {
		              for ($i = 1; $i < count($fieldUsersArray); $i++) 
		                {
		                  $query .= ' OR id_user = ' .  $fieldUsersArray[$i] . ' ';
		                  // $arrayFilters[] =  array('type' => 'int','value' => $fieldUsersArray[$i]);
		                }                
		            }            
		          }

		          if (!is_null($fieldServicesArray))
		          {
		            $query = 'SELECT byServices.* FROM (' . $query . ')' . ' as byServices ' . 'LEFT JOIN hk_visits ON byServices.id = hk_visits.id_client
		                            LEFT JOIN hk_appointments ON  hk_visits.id=hk_appointments.id_visit
		                            WHERE hk_appointments.id_service = ' . $fieldServicesArray[0] . '
		                            ';
		          // $arrayFilters[] =  array('type' => 'int','value' => $fieldServicesArray[0]);
		            if (count($fieldServicesArray) > 1) {
		              for ($i = 1; $i < count($fieldServicesArray); $i++) 
		                {
		                  $query .= ' OR hk_appointments.id_service = ' . $fieldServicesArray[$i] . ' ';
		                  // $arrayFilters[] =  array('type' => 'int','value' => $fieldServicesArray[$i]);
		                }                
		            }   
		          }

			        if (!is_null($fieldVisitsStart))
				    {
				        $query = 'SELECT * FROM (' . $query . ')' . ' as byVisitsStart ' .'WHERE countVisits >= ' . $fieldVisitsStart . '
				        ';
				        // $arrayFilters[] =  array('type' => 'int','value' => $fieldVisitsStart);
				    }

				    if (!is_null($fieldVisitsEnd))
				    {
				        $query = 'SELECT * FROM (' . $query . ')' . ' as byVisitsEnd ' .'WHERE countVisits <= ' . $fieldVisitsEnd . '
				        ';
				        // $arrayFilters[] =  array('type' => 'int','value' => $fieldVisitsEnd);
				    }

				    if (!is_null($fieldTotalStart))
				    {
				        $query = 'SELECT * FROM (' . $query . ')' . ' as byTotalStart ' .'WHERE total >= ' . $fieldTotalStart . '
				        ';
				        // $arrayFilters[] =  array('type' => 'int','value' => $fieldTotalStart);
				    }

				    if (!is_null($fieldTotalEnd))
				    {
				        $query = 'SELECT * FROM (' . $query . ')' . ' as byTotalEnd ' .'WHERE total <= ' . $fieldTotalEnd . '
				        ';
				        // $arrayFilters[] =  array('type' => 'int','value' => $fieldTotalEnd);
				    }

				    $query = $query . '
				    GROUP BY id DESC';
				    $all = DB::select($query,  false);
			        return $all;            
			     } 

		public static function getClientInfo ($field) {

	      $query = 'SELECT
	          `hk_clients`.id,         
	          first_name                				as firstName,
	          if (last_name is NULL, "", last_name)   	as lastName,
	          first_phone               				as firstPhone,
	          second_phone              				as secondPhone,
	          email                     				as email,
	          sex                     					as sex,
	          hk_clients_loyalty.discount      			as discount,
	          birthday                  				as birthday,
	          -- note,
	          address                  					as address,
	          avatar									as avatar
	          FROM hk_clients INNER JOIN hk_clients_loyalty ON  hk_clients.id_loyalty  = hk_clients_loyalty.id
	          WHERE `hk_clients`.`id`=?
	          ';
	          $fields = array(
	          	'id' => $field
	          );
	          $all = DB::select($query, false, $fields, self::TABLE);
	        return $all;
	    }

	    public static function getClientName ($idClient){

			$queryC = "SELECT 	`hk_clients`.`id`,													
								concat(`hk_clients`.`first_name`, ' ' , `hk_clients`.`last_name`) 			as clientName,
								`hk_clients`.`avatar` as avatar
								FROM `hk_clients`
								WHERE `hk_clients`.`id`= ?";

			$fields = array(
				'id' => $idClient
			);	
			$name = DB::select($queryC, false, $fields, self::TABLE);
			return $name[0]['clientName']; 
		}

	}

	class Clients {
			public function getAll ($action) {
				$clients = ClientsPrivate::getAll();
				if (Report::checkReport($clients)) return $clients;
				else return new Report (
							/*action number*/ $action['number'],
									 /*type*/ 'answer',
									 /*data*/ $clients
							);
			}

			public function getLoyalty ($action) { 
				$loyalty = ClientsPrivate::getLoyalty();
				if (Report::checkReport($loyalty)) return $loyalty;
				else return new Report (
							/*action number*/ $action['number'],
									 /*type*/ 'answer',
									 /*data*/ $loyalty
							);

			}
			public function create ($action) {
				
				$fields = $action['data'];
				$tbl = $action['tbl_name'];
				$id = ClientsPrivate::create($fields);
				if (Report::checkReport($id)) return $id;

				else return new Report (
							/*action number*/ $action['number'],
									 /*type*/ 'answer',
									 /*data*/ $id
							);
			}

			public function edit($action) {
				$result = ClientsPrivate::edit($action['data']);
				if(Report::checkReport($result)) return $result;
				else return new Report (
							/*action number*/ $action['number'],
									 /*type*/ 'success',
									 /*data*/ array(),
								   /*action*/ $action
						  /*Additional info*/
							);
			}

			public function getAllUsers($action) {
				$users = ClientsPrivate::getAllUsers();
				if (Report::checkReport($users)) return $users;
				else return new Report (
							/*action number*/ $action['number'],
									 /*type*/ 'answer',
									 /*data*/ $users
							);
			}

			public function getAllServices($action) {
				$services = ClientsPrivate::getAllServices();
				if (Report::checkReport($users)) return $services;
				else return new Report (
							/*action number*/ $action['number'],
									 /*type*/ 'answer',
									 /*data*/ $services
							);
			}

			public function getAllFilters($action) {
				$fieldSex = NULL;
				$fieldAgeStart = NULL;
				$fieldAgeEnd = NULL;
				$fieldDiscountStart = NULL;
				$fieldDiscountEnd = NULL;
				$fieldDateStart = NULL;
				$fieldDateEnd = NULL;
				$fieldCategoriesArray = NULL;
				$fieldVisitsStart = NULL;
				$fieldVisitsEnd = NULL;
				$fieldTotalStart = NULL;
				$fieldTotalEnd = NULL;
				$fieldUsersArray = NULL;
				$fieldServicesArray = NULL;				

				if (isset($action['data']['ageStart']))
                    $fieldAgeStart =  $action['data']['ageStart'];

                if (isset($action['data']['ageEnd']))
                    $fieldAgeEnd =  $action['data']['ageEnd'];

				 if (isset($action['data']['startDate']))
        			$fieldDateStart = $action['data']['startDate'];
       
      			if (isset($action['data']['endDate']))
        			$fieldDateEnd = $action['data']['endDate'];

        		if (isset($action['data']['sex']))
					$fieldSex =  $action['data']['sex'];

				if (isset($action['data']['discountStart']))
					$fieldDiscountStart =  $action['data']['discountStart'];

				if (isset($action['data']['discountEnd']))
					$fieldDiscountEnd =  $action['data']['discountEnd'];

				if (isset($action['data']['visitsStart']))
					$fieldVisitsStart =  $action['data']['visitsStart'];

				if (isset($action['data']['visitsEnd']))
					$fieldVisitsEnd =  $action['data']['visitsEnd'];

				if (isset($action['data']['totalStart']))
					$fieldTotalStart =  $action['data']['totalStart'];

				if (isset($action['data']['totalEnd']))
					$fieldTotalEnd =  $action['data']['totalEnd'];

				if (isset($action['data']['categories'])) 
		        {
		          $fieldCategoriesArray = explode(" ", $action['data']['categories']);
		          foreach ($fieldCategoriesArray as &$category) {
		              $category = $category + 0;
		          }
		        }

		        if (isset($action['data']['users'])) 
		        {
		          $fieldUsersArray = explode(" ", $action['data']['users']);
		          foreach ($fieldUsersArray as &$userId) {
		              $userId = $userId + 0;
		          }
		        }

		        if (isset($action['data']['services'])) 
	            {
	              $fieldServicesArray = explode(" ", $action['data']['services']);
	              foreach ($fieldServicesArray as &$serviceId) {
	                  $serviceId = $serviceId + 0;
	              }
	            }


				$clients = ClientsPrivate::getAllFilters($fieldDateStart, $fieldDateEnd, $fieldSex, $fieldDiscountStart, $fieldDiscountEnd, $fieldCategoriesArray, $fieldAgeStart, $fieldAgeEnd, $fieldVisitsStart, $fieldVisitsEnd, $fieldTotalStart, $fieldTotalEnd, $fieldUsersArray, $fieldServicesArray);

				if (Report::checkReport($clients)) return $clients;
				else return new Report (
					/*action number*/ $action['number'],
					/*type*/ 'answer',
					/*data*/ $clients
				);
			}

			public function getClientInfo ($action) {
		      $clientId = $action['data']['id'];
		      $client = ClientsPrivate::getClientInfo($clientId);

		      if (Report::checkReport($client)) return $client;
		      else return new Report (
		            /*action number*/ $action['number'],
		                 /*type*/ 'answer',
		                 /*data*/ $client
		            );
    		}	

    		public function getClientName ($action) {
		      $clientId = $action['data']['clientId'];
		      $client = ClientsPrivate::getClientInfo($clientId);

		      if (Report::checkReport($client)) return $client;
		      else return new Report (
		            /*action number*/ $action['number'],
		                 /*type*/ 'answer',
		                 /*data*/ $client
		            );
    		}

			// public function getUsersAndServices($action) {
			// 	$relationList = ClientsPrivate::getUsersAndServices();
			// 	if (Report::checkReport($users)) return $relationList;
			// 	else return new Report (
			// 				/*action number*/ $action['number'],
			// 						 /*type*/ 'answer',
			// 						 /*data*/ $relationList
			// 				);
			// }

	}
?>
