<?php
	System::requireSystemModule('DB');

	class ClientsNoticesPrivate{
		const TABLE = 'ClientsNotices'; 
    public static function getAll($field)
    {

			$query = 'SELECT
				  `hk_clients_notices`.id 			  	as id,
					id_client 					 		as clientId,
					if (title is NULL, "", title) 		as title,
					text 						as text,
					date                		as date,
					type,
					fb,
					vk,
					inst
          FROM `hk_clients_notices`
					WHERE `hk_clients_notices`.id_client=? AND `hk_clients_notices`.deleted=0';
					$all = DB::select($query, true, array('clientId' => $field), self::TABLE);
					return $all;
    }
    	public static function create ($fields) {
			return DB::insert(self::TABLE, $fields);
		}

		public static function edit ($fields) {
			return DB::update(self::TABLE, $fields);
		}

	}

		class ClientsNotices
	{
		public function getAll ($action) {
			$clientId = $action['data']['clientId'];
			$clientsNotices = ClientsNoticesPrivate::getAll($clientId);

			if (Report::checkReport($clientsNotices)) return $clientsNotices;
			else return new Report (
						/*action number*/ $action['number'],
								 /*type*/ 'answer',
								 /*data*/ $clientsNotices
						);

		}

		public function create ($action) {
			$fields = $action['data'];
			$tbl = $action['tbl_name'];
			$id = ClientsNoticesPrivate::create($fields);
			if (Report::checkReport($id)) return $id;

			else return new Report (
						/*action number*/ $action['number'],
								 /*type*/ 'answer',
								 /*data*/ $id
						);
		}

		public function edit($action) {
			$result = ClientsNoticesPrivate::edit($action['data']);
			if(Report::checkReport($result)) return $result;
			else return new Report (
						/*action number*/ $action['number'],
								 /*type*/ 'success',
								 /*data*/ array(),
							   /*action*/ $action
					  /*Additional info*/
						);
		}

	}
?>
