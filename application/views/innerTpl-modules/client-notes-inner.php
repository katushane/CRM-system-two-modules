<div class="inner-tpl-main-content-component" id = 'client_notes_inner' >    
    <div class="inner-tpl-header-wrapper">
        <div class="inner-tpl-header-component">
            <div class="inner-tpl-header-left">
                <button block='inner-tpl' action='back'><i class="icon-back"></i></button>
            </div>
            <h2 data-id='inner-tpl-header-title'> Просмотр заметки
            </h2>
            <div class="inner-tpl-header-right">
                <button block='inner-tpl' action='innerEdit' class='innerEdit'><i class="icon-edit"></i></button>
                <button block='inner-tpl' action='innerDone' class='innerDone hidden'><i class="icon-done"></i></button>
            </div>
        </div>
    </div>
                <div class="inner-tpl-main-content-component-body">
									<div class="forcenter-in">
										<form id = "f_innerNotes">
											<div class = "inner-note-emotions-edit hidden">
												<div class="inner-note-element">
													<fieldset class="form-group">
														<div class ='note-emotion-icons' id="emotion" name="emotion">
															<!--генерация иконок эмоций по массиву из базы -->
														<?php
															global $outterVars;
															if (isset ($outterVars['emotions'])) {
																$icons = $outterVars['emotions'];
																for ($i=0; $i < 5; $i++) { 
																	$id = $icons[$i]['id'];
																	$url = Config::BASE_URL.$icons[$i]['img'];
																	echo "<img class='note-block_client-emotion note-emotion-icon' data-icon=$id src=$url alt=''>";
																}
																echo "</div>";
																if (count($icons)>5) {
																	for ($i=5; $i < count($icons); $i=$i+5) { 
																		echo "<div class='note-emotion-icons hidden-emotions'>";
																		for ($a=$i; $a < $i+5 && $a<count($icons); $a++) { 
																			$id = $icons[$a]['id'];
																			$url = Config::BASE_URL.$icons[$a]['img'];
																			echo "<img class='note-block_client-emotion note-emotion-icon' data-icon=$id src=$url alt=''>";
																		}
																		echo "</div>";
																	}
																}
															}	
														?> 
													</fieldset>
												</div>
												<div class="inner-note-element wrap-button">
													<i class="icon-wrap" data-id = "emotions-button" style="cursor: pointer"></i>
											    </div>
											</div>
											<div class = "inner-note-emotions-view ">
												<img class="note-block_chosen-emotion" data-id="emotion" data-icon="" src="" isChange="true" alt="">
											</div>
											<div class="inner-note-element note-title">
												<fieldset class="form-group">
													<input type="text" class="form-control" data-id="title" name="title" placeholder="Заголовок (необязательно)" readonly="true" />
												</fieldset>
											</div>
											<div class="inner-note-element">
												<fieldset class="form-group">
													<textarea type="text" data-id='text' name="textNote" rows='10' class="form-control required" readonly="true" placeholder="Текст заметки (обязательно)"></textarea>
												</fieldset>
											</div>
										</form>
									</div>
                </div>
</div> 

<!-- <div class="inner-tpl-main-content-component" id = "client_notes_inner">
                <div class="inner-tpl-main-content-component-header">
                    <button block="inner-tpl" id="backBottom" action="back"><i class="fas fa-long-arrow-alt-left"></i></button>
                    <h2 id="innerNotesTitle">Просмотр заметки</h2>
                    <div class='inner-tpl-header-right'>
                    <button block='inner-tpl' class='innerDone' action='innerDone'><i class="fas fa-check"></i></button>
                    <button block='inner-tpl' class = 'innerEdit hidden' action='innerEdit'><i class="fas fa-pencil-alt"></i></button>
                  </div>
                </div> 
                <div class="inner-tpl-main-content-component-body">
									<div class="forcenter-in">
										<form id = "f_innerNotes">
											<div class="inner-note-element">
												<fieldset class="form-group">
													<div class ='note-emotion-icons' id="emotion" name="emotion">
														 <div class="note-emotion-icon" emotion="good" style="color: #46c35f;">
															<i class="font-icon font-icon-circle-lined-smile"></i>
														</div>
														<div class="note-emotion-icon" emotion="medium" style="color: orange;">
															<i class="font-icon font-icon-circle-lined-smile"></i>
														</div>
														<div class="note-emotion-icon" emotion="bad" style="color: red;">
															<i class="font-icon font-icon-circle-lined-smile"></i>
														</div> 
														<div id='emotionLock'></div> 
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-confused.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-crying-1.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-cute.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-angry.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-in-love.png" alt="">
														<div id='emotionLock'></div>
													</div>
													<div class="note-emotion-icons hidden-emotions" state="hide">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-nerd.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-sad-1.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-shocked.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-sick.png" alt="">
														<img class="note-block_client-photo" src="http://localhost/hook/assets/img/051-suspicious.png" alt="">
													</div>
												</fieldset>
											</div>
											<div class="inner-note-element wrap-button">
												<i class="icon-wrap" style="cursor: pointer"></i>
										    </div>
											<div class="inner-note-element note-title">
												<fieldset class="form-group">
													<input type="text" class="form-control" id="title" name="title" placeholder="Заголовок (необязательно)"/>
												</fieldset>
											</div>
											<div class="inner-note-element">
												<fieldset class="form-group">
													<textarea type="text" id='textNote' name="textNote" rows='10' class="form-control required" placeholder="Текст заметки (обязательно)"></textarea>
												</fieldset>
											</div>
										</form>
									</div>
                </div>
            </div> -->