<div class="inner-tpl-main-content-component" id = 'client_notices_inner' >    
    <div class="inner-tpl-header-wrapper">
        <div class="inner-tpl-header-component">
            <div class="inner-tpl-header-left">
                <button block='inner-tpl' action='back'><i class="icon-back"></i></button>
            </div>
            <h2 data-id='inner-tpl-header-title'> Просмотр отзыва
            </h2>
            <div class="inner-tpl-header-right">
                <button block='inner-tpl' action='innerEdit' class='innerEdit hidden'><i class="icon-edit"></i></button>
                <button block='inner-tpl' action='innerDone' class='innerDone hidden'><i class="icon-done"></i></button>
            </div>
        </div>
    </div>
                <div class="inner-tpl-main-content-component-body">
                                    <div class="forcenter-in">
                                       <form id = "f_innerNotes">
                                            <div class="col-sm-12 col-md-12">
                                                <fieldset class="form-group">
                                                        <div class="row-field">
                                                            <label class="form-label semibold" for="fio">Клиент</label>
                                                            <div class ='fio'>
                                                            </div>
                                                        </div>
                                                </fieldset>
                                            </div>
                                            <div class="col-sm-12 col-md-12 data">
                                                <fieldset class="form-group">
                                                        <div class="row-field">
                                                            <label class="form-label semibold" for="date">Дата</label>
                                                            <div class ='date'>
                                                            </div>
                                                        </div>
                                                </fieldset>
                                            </div>
                                            <div class="col-sm-12 col-md-12">
                                                    <fieldset class="form-group">
                                                        <div class="row-field">
                                                            <label class="form-label semibold" for="noticesblueBlink">Каналы связи</label>
                                                            <div class ='notices-blueBlink-icons' id="noticesblueBlink" name="noticesblueBlink">
                                                                <div class="notices-blueBlink-icon" channel="fb" style="color: #d6dbdf;">
                                                                    <i class="icon-fb" id="fb"></i>
                                                                </div>
                                                                <div class="notices-blueBlink-icon" channel="vk" style="color: #d6dbdf;">
                                                                    <i class="icon-email" id="vk"></i>
                                                                </div>
                                                                <div class="notices-blueBlink-icon" channel="inst" style="color: #d6dbdf;">
                                                                    <i class="icon-inst" id="inst"></i>
                                                                </div>
                                                                <div id='blueBlinkLock'></div>
                                                            </div>
                                                        </div>
                                                </fieldset>
                                            </div>
                                            <div class="col-sm-12 col-md-12">
                                                <fieldset class="form-group">
                                                    <label class="form-label semibold" for="title">Заголовок</label>
                                                    <input type="text" class="form-control" id="title" name="title" placeholder="Заголовок (необязательно)"/>
                                                </fieldset>
                                            </div>
                                            <div class="col-sm-12 col-md-12">
                                                <fieldset class="form-group">
                                                    <label class="form-label semibold" for="textNotice">Текст уведомления</label>
                                                    <textarea type="text" id='textNotice' name="textNotice" rows='10' class="form-control required" placeholder="Здесь текст уведомления (обязательно)"></textarea>
                                                </fieldset>
                                            </div>
                                        </form> 
                                    </div>
                </div>
</div>