<div class="inner-tpl-main-content-component" id = 'client_info_inner' >    
    <div class="inner-tpl-main-content-component-header">
                    <button block="inner-tpl" id="backBottom" action="back"><i class="fas fa-long-arrow-alt-left"></i></button>
                    <h2 id="innerClientTitle"></h2>
                    <div class='innerTpl-header-right'>
                    <button block='inner-tpl' class='innerDone' action='innerDone'><i class="fa fa-check"></i></button>
                    <button block='inner-tpl' class = 'innerEdit hidden' action='innerEdit'><i class="fa fa-pencil"></i></button>
                  </div>
                </div>
                <div class="inner-tpl-main-content-component-body">
									<div class="forcenter-in">
										<?php System::requireView('modules', 'client-info-form');?>
									</div>
                </div>
</div>