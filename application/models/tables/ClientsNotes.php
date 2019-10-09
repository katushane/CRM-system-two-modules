<?php
	System::requireSystemModule('DB');

	class ClientsNotesPrivate{
		const TABLE = 'ClientsNotes';
	    public static function getAll($field)
	    {
			$query = 'SELECT
				  `hk_clients_notes`.id 			  	as id,
					id_user 		     			  	as userId,
					id_client 					 		as clientId,
					if (title is NULL, "", title) 		as title,
					text 								as text,
					`hk_clients_notes_emotions`.`img` 	as emotionImg,
					`hk_clients_notes_emotions`.`id` 	as emotion,
					date                				as date,
					first_name,
          			last_name,
          			avatar            					as img
          FROM `hk_clients_notes` 
          			LEFT JOIN `hk_clients_notes_emotions` ON `hk_clients_notes_emotions`.`id`=`hk_clients_notes`.`emotion`
          			INNER JOIN `hk_users` ON `hk_clients_notes`.id_user=`hk_users`.id
					WHERE `hk_clients_notes`.id_client=? AND `hk_clients_notes`.deleted=0';
					
					$all = DB::select($query, true, array('clientId' => $field), self::TABLE);
					return $all;
    	}
    	public static function create ($fields) {
			return DB::insert(self::TABLE, $fields);
		}
		public static function edit ($fields) {
			return DB::update(self::TABLE, $fields);
		}

		public static function getIcons()
		{
			$query = 'SELECT 
					id 								as id,
					img 							as img				
					FROM `hk_clients_notes_emotions`';
					
			$all = DB::select($query, false);
			return $all;
		}

		public static function getUserPhoto($field) {
			$query = 'SELECT 
					`hk_users`.`id`, 								
					`hk_users`.`avatar` 							as avatar				
					FROM `hk_users`
					WHERE `hk_users`.`id` = ?';
					
			$all = DB::select($query, true, array('id' => $field), self::TABLE);
			return $all;
		}

	}

		class ClientsNotes
	{
		public function getAll ($action) {
			$clientId = $action['data']['clientId'];
			$clientsNotes = ClientsNotesPrivate::getAll($clientId);

			if (Report::checkReport($clientsNotes)) return $clientsNotes;
			else return new Report (
						/*action number*/ $action['number'],
								 /*type*/ 'answer',
								 /*data*/ $clientsNotes
						);
		}

		public function create ($action) {
			$fields = $action['data'];
			$tbl = $action['tbl_name'];
			session_start();	
			$fields['userId'] = $_SESSION['user']['id'];
			$id = ClientsNotesPrivate::create($fields);
			$photo = ClientsNotesPrivate::getUserPhoto($fields['userId']);
			if (Report::checkReport($id)) return $id;
			else { 
				if (Report::checkReport($photo)) return $photo;
				else {
					$data = array('id' => $id['id'], 'userAvatar' => $photo[1]['avatar']);
					return new Report (
						/*action number*/ $action['number'],
								 /*type*/ 'answer',
								 /*data*/ $data
						);}
			}
		}

		public function edit($action) {
			$result = ClientsNotesPrivate::edit($action['data']);
			if(Report::checkReport($result)) return $result;
			else return new Report (
						/*action number*/ $action['number'],
								 /*type*/ 'success',
								 /*data*/ array(),
							   /*action*/ $action
					  /*Additional info*/
						);
		}

		public function getIcons ($action) {
			$icons = ClientsNotesPrivate::getIcons();
			if (Report::checkReport($icons)) return $icons;
			else return new Report (
						/*action number*/ $action['number'],
								 /*type*/ 'answer',
								 /*data*/ $icons
						);
		}

		/**/

	}
?>
