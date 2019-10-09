 <?php
  System::requireSystemModule('DB');
  /*System::requireModel('tables','');*/

  class ReviewsPrivate{

    const TABLE = 'Reviews';
      
      public static function getAll() {

        $query = 'SELECT * FROM (SELECT 
            `hk_reviews`.id                 AS id, 
          `hk_reviews`.id_client          AS clientId,
           if (title is NULL, "", title)  AS titleComment,
           date                           AS dateComment,
           text                           AS textComment,
           rating                         AS countStars,
           display                        AS display,
           COUNT(`hk_clients_likes`.id)   AS likes
            FROM `hk_reviews`
                     LEFT JOIN `hk_clients_likes` ON `hk_clients_likes`.id_review = `hk_reviews`.id
                   WHERE `hk_reviews`.deleted=0 
                   GROUP By `hk_reviews`.id) AS x
                   INNER JOIN (SELECT 
                   `hk_clients`.id AS idCl,
                   `hk_clients`.first_name         AS firstName,
                   `hk_clients`.last_name          AS lastName
                   FROM `hk_clients`) AS y 
                   ON x.clientId=y.idCl;  
                  ';
          
        $all = DB::select($query, false);
        return $all;
      } 

      public static function edit ($fields) {
      return DB::update(self::TABLE, $fields);
    }     

    public static function getAllReviews ($field) {

      $query = 'SELECT 
          `hk_reviews`.id                AS id, 
          `hk_reviews`.id_client         AS clientId,
           if (title is NULL, "", title) AS titleComment,
           date                          AS dateComment,
           text                          AS textComment,
           rating                        AS countStars,
           display                       AS display,
           COUNT(`hk_clients_likes`.id)  AS likes
                     FROM `hk_reviews`
                     LEFT JOIN `hk_clients_likes`   ON `hk_clients_likes`.id_review = `hk_reviews`.id
                   WHERE `hk_reviews`.id_client=? AND `hk_reviews`.deleted=0 
                   GROUP By `hk_reviews`.id;  
                  ';
          
        $all = DB::select($query, true, array('clientId' => $field), self::TABLE);
        return $all;
    }

    public static function getClientInfo ($field) {

      $query = 'SELECT
          `hk_clients`.id         as id,
          first_name                as firstName,
          if (last_name is NULL, "", last_name)   as lastName,
          first_phone               as firstPhone,
          second_phone              as secondPhone,
          email                     as email,
          sex                     as sex,
          hk_clients_loyalty.discount      as discount,
          birthday                  as birthday,
          -- note,
          address                  as address
          FROM hk_clients LEFT JOIN hk_clients_loyalty ON  hk_clients.id_loyalty  = hk_clients_loyalty.id
          WHERE `hk_clients`.id=' . $field;
           $all = DB::select($query, false);
        return $all;
    }

    public static function getAllFilters($fieldStars, $fieldClientId, $fieldOrder, $orderBy, $fieldPointStart, $fieldPointEnd)
      {

        $query = 'SELECT * FROM 
        (SELECT 
          `hk_reviews`.id                 AS id, 
          `hk_reviews`.id_client          AS clientId,
          if (title is NULL, "", title) AS titleComment,
          date                          AS dateComment,
          text                          AS textComment,
          rating                          AS countStars,
          display                         AS display,
          COUNT(`hk_clients_likes`.id)      AS likes
          FROM hk_reviews LEFT JOIN hk_clients_likes 
          ON `hk_clients_likes`.id_review = `hk_reviews`.id
          WHERE `hk_reviews`.deleted=0 
          GROUP By `hk_reviews`.id
        ) AS x
        INNER JOIN 
        (
          SELECT 
          `hk_clients`.id AS idCl,
          `hk_clients`.first_name         AS firstName,
          `hk_clients`.last_name          AS lastName
          FROM hk_clients
        ) AS y 
        ON x.clientId=y.idCl
        ';

        if (!is_null($fieldStars)) 
        {
          $query = 'SELECT * FROM (' . $query . ')' . ' as byStars ' .'WHERE countStars = ' . $fieldStars . '
        ';
        }

        if (!is_null($fieldPointStart))
        {
         $query = 'SELECT * FROM (' . $query . ')' . ' as byDateStart ' .'WHERE dateComment > ' . $fieldPointStart . '
        ';
        }

        if (!is_null($fieldPointEnd))
        {
         $query = 'SELECT * FROM (' . $query . ')' . ' as byDateEnd ' .'WHERE dateComment < ' . $fieldPointEnd . '
        ';
        }

         if (!is_null($fieldClientId)) 
        {
          $query = 'SELECT * FROM (' . $query . ')' . ' as byClient ' . 'WHERE clientId = ' . $fieldClientId . ' ';
        }

        $query = $query . 'ORDER BY ' . $fieldOrder . ' ' .$orderBy;
        $all = DB::select($query,  false);        

        return $all;
      } 
  }

  class Reviews
  {
    public function getAll ($action) {
      $reviews = ReviewsPrivate::getAll();

      if (Report::checkReport($reviews)) return $reviews;
      else return new Report (
            /*action number*/ $action['number'],
                 /*type*/ 'answer',
                 /*data*/ $reviews
            );
    }

    public function getAllReviews ($action) {
      $clientId = $action['data']['clientId'];
      $reviews = ReviewsPrivate::getAllReviews($clientId);

      if (Report::checkReport($reviews)) return $reviews;
      else return new Report (
            /*action number*/ $action['number'],
                 /*type*/ 'answer',
                 /*data*/ $reviews
            );

    }

    public function getClientInfo ($action) {
      $clientId = $action['data']['clientId'];
      $reviews = ReviewsPrivate::getClientInfo($clientId);

      if (Report::checkReport($reviews)) return $reviews;
      else return new Report (
            /*action number*/ $action['number'],
                 /*type*/ 'answer',
                 /*data*/ $reviews
            );

    }

    public function edit($action) {
      $result = ReviewsPrivate::edit($action['data']);
      if(Report::checkReport($result)) return $result;
      else return new Report (
            /*action number*/ $action['number'],
                 /*type*/ 'success',
                 /*data*/ array(),
                 /*action*/ $action
            /*Additional info*/
            );
    }

    public function getAllFilters($action) {

      $fieldStars = NULL;
      $fieldClientId = NULL;
      $fieldPointEnd = NULL;
      $fieldPointStart = NULL;
      $fieldOrder = "dateComment";
      $orderBy = "ASC";

      if (isset($action['data']['rating']))
        $fieldStars = $action['data']['rating'];

      if (isset($action['data']['startDate']))
        $fieldPointStart = $action['data']['startDate'];
       
      if (isset($action['data']['endDate']))
        $fieldPointEnd = $action['data']['endDate'];

      if (isset($action['data']['clientId']))
        $fieldClientId = $action['data']['clientId'];

      if (isset($action['data']['likesUp']))
        $fieldOrder = "likes";

      if (isset($action['data']['likesDown']))
      {
        $fieldOrder = "likes";
        $orderBy = "DESC";
      }

      if (isset($action['data']['calendarUp']))
        $fieldOrder = "dateComment";

      if (isset($action['data']['calendarDown']))
      {
        $fieldOrder = "dateComment";
        $orderBy = "DESC";
      };     
      
      $reviews = ReviewsPrivate::getAllFilters ($fieldStars, $fieldClientId, $fieldOrder, $orderBy, $fieldPointStart, $fieldPointEnd);
          
      if (Report::checkReport($reviews)) return $reviews;
      else return new Report (
            /*action number*/ $action['number'],
                 /*type*/ 'answer',
                 /*data*/ $reviews
            );
    }
  }
?>
