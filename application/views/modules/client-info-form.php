<?php
  global $lang;
  $pageLang = $lang['clients'];
?>

        <form id="client-info">
            <!-- <form action="upload-images.php" method="post" enctype="multipart/form-data"  id="formupload">
                <input type="file" name="file" id="fileupload" />
                <button>Загрузить</button>
            </form> -->
            <div class="col-sm-12 col-md-6 forimg" align="center">
                <div class="master-info__avatar master-info__avatar_show">

                    <img id="avatar" data-id="avatar" src="<?php echo Config::BASE_URL?>assets/img/photo-92-3.jpg" isChange="true">
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="firstName"><?php echo $pageLang['firstName'];?></label>
                    <input type="text" class="form-control required border-danger" data-id = "firstName" id="firstName" name="firstName" placeholder="" required>
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-6">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="lastName"><?php echo $pageLang['lastName'];?></label>
                    <input type="text" class="form-control required " data-id="lastName" id="lastName" name="lastName" placeholder="">
                </fieldset>
            </div>
             <div class="col-sm-12 col-md-6">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="date-mask-input">
                        <?php echo $pageLang['birthday'];?>
                    </label>
                    <input type="text" required  pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" class="form-control " data-id="birthday" id="birthday" valid = "date" style="" placeholder="yyyy-mm-dd">
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-6" id="check">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="sex"><?php echo $pageLang['sex'];?></label>
                    <select class="bootstrap-select bootstrap-select-arrow  " data-id="sex" id="sex" name="sex"  >
                        <option data-content='<span class="font-icon fa fa-mars"></span><?php echo $pageLang['male'];?>' value='man'></option>
                        <option data-content='<span class="font-icon fa fa-venus"></span><?php echo $pageLang['female'];?>' value='woman'></option>
                    </select>
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-6">
                <fieldset class="form-group">
                    <label class="form-label semibold " for="firstPhone"><?php echo $pageLang['phone'];?></label>
                    <input type="text" class="form-control required  " data-id="firstPhone" id="firstPhone" name="firstPhone" placeholder="+78888888888"  valid="num"  >
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-6">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="secondPhone"><?php echo $pageLang['secondPhone'];?></label>
                    <input type="text" class="form-control  " data-id="secondPhone" id="secondPhone" name="secondPhone" placeholder="+78888888888" valid="num"  >
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-6">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="email"><?php echo $pageLang['email'];?></label>
                    <input type="text" class="form-control required "  type="email"  data-id="email" id="email" name="email" placeholder="example@email.com" valid="email" required>

                </fieldset>
            </div>
            <!-- <div class="col-sm-12 col-md-6 discount-block">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="position"><?php echo $pageLang['discount'];?></label>
                    <input type="text" class="form-control" data-id="discount" id="discount" name="discount" placeholder="Discount %" title="Выберите скидку"  valid="str" >
                </fieldset>
            </div> -->
            <div class="col-sm-12 col-md-6">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="loyaltyId"><?php echo $pageLang['loyalty'];?></label>
                    <select class="bootstrap-select bootstrap-select-arrow" data-id="loyaltyId" id="loyaltyId" name="loyalty">
                    </select>
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-12">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="address"><?php echo $pageLang['address'];?></label>
                    <input type="text" class="form-control required " data-id="address" id="address" name="address"  placeholder="" required  >
                </fieldset>
            </div>
            <div class="col-sm-12 col-md-12">
                <fieldset class="form-group">
                    <label class="form-label semibold" for="note"><?php echo $pageLang['note'];?></label>
                    <input type="text" class="form-control required " data-id="note" id="note" name="note"  placeholder="" required  >
                </fieldset>
            </div>
        </form>