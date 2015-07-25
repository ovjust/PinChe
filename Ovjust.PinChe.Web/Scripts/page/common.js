//常用显示语言
var CultureLang = {
    errorApplicant: '申请人没有权限。',
    errorServer: '服务器错误。',

    pleaseSelect: "请选择",
    pleaseSelectAll: "全部",
};

var StaticValues = {
    DataTablesLanguageCn: '~/Scripts/DataTablesLanguage/dataTables.zh-CN.txt'
};


var PageCommon = {
    //封装的ajax请求,例如：ajaxRequest('get','url',null,function(data){})
    ajaxRequest: function (type, url, postData, callback,errorCallback) {
        $.ajax({
            cache: false,
            contentType: "application/json",
            type: type,
            async: false,
            url: url,
            data: postData,
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error:errorCallback|| function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "\n" + XMLHttpRequest.readyState + "\n" + textStatus);
                DialogAlert.alert(DataTablesOption.opSystemError);
            }
        });
    },
    //根据控件的data-apiName或name属性，获取数据查询的apiName
    getApiName: function (self) {
        var apiName;
        if (self.attr('data-apiName'))
            apiName = self.attr('data-apiName');
        else
            apiName = self.attr("name").slice(0, -2);
        return apiName;
    },
    //将日期格式化成 yyyy-mm-dd
    formatDate: function (dateString) {
        if (dateString) {
            var date1 = $.datepicker.parseDate("yy-mm-dd", dateString.split('T')[0]);
            if (date1) {
                var s = $.datepicker.formatDate("yy-mm-dd", date1); //jquery datePicker
                return s;
            }
        }
        return '';
    },
    formatTime: function (dateString) {
        if (dateString) {
            return dateString.replace('T', ' ').split('.')[0];
        }
        return '';
    },
    //初始化日期区间控件
    dateOption: { dateFormat: "yy-mm-dd", changeMonth: true, changeYear: true, showMonthAfterYear: true, yearRange: "c-5:c+5", constrainInput: true },
    initDateRangePicker: function (date1id, date2id) {
        //my97
        //$(document).on('click', '#' + date1id, function () {
        //    var option = { maxDate: '#F{$dp.$D(\'' + date2id + '\')}' };
        //    WdatePicker(option);
        //});
        //$(document).on('click', '#' + date2id, function () {
        //    var option = { minDate: '#F{$dp.$D(\'' + date1id + '\')}' };
        //    WdatePicker(option);
        //});
        //jquerydatepicker

        $('#' + date1id).datepicker(this.dateOption);
        $('#' + date2id).datepicker(this.dateOption);
    },
    //日期时间控件初始化
    initDatepicker: function (inputId) {
        //my97
        //$(document).on('click', '#' + inputId, function () {
        //    WdatePicker();
        //});
        //jqueryDatepicker
        this.initDatepickers('#' + inputId);
    },
    initDatepickers: function (selector) {
        //my97
        //$(document).on('click', '#' + inputId, function () {
        //    WdatePicker();
        //});
        //jqueryDatepicker
        $(selector).datepicker(this.dateOption);
    },

    //重设iframe中子页的高度
    setPageHeight: function () {
        window.parent.$('#mainFrame').height($('#myFooter').offset().top);
    },
    //获取顶页的scrollTop
    getParentTop: function () {
        var scrollTop = top.document.documentElement.scrollTop;
        if (scrollTop == 0) {
            scrollTop = top.document.body.scrollTop;
        }
        return scrollTop;
    },
    //设置dialog对话框的位置 并显示
    setDialogPosition: function (divId, divWidth, topAdjust) {
        var scrollTop = PageCommon.getParentTop();
        var left = (window.innerWidth - divWidth) / 2;
        $(divId).dialog("option", { position: [left, scrollTop + topAdjust] }).dialog("open");
    },
    //设置dialog对话框的标题
    setDialogTitle: function (divId, title) {
        $(divId).dialog("option", { title: title });
    },
    //获取ddl的数据
    bindDropDownList: function (id, url, bNotAddDefault,callback) {
        var self = $(id);
        if (bNotAddDefault || self.attr('data-notAddDefault')) { }
        else {
            var text;
            if (self.attr('data-placeHold'))
                text = self.attr('data-placeHold');
            else
                text = "请选择";
            self.html("<option value=''>" + text + "</option>");
        }

        if (!url) {
            var apiName;
            if (self.attr('data-apiName'))
                apiName = self.attr('data-apiName');
            else
                apiName=self.attr("name").slice(0, -2)
            //url = '/api/' + apiName;
            url = '/api/KeyValueData?tname=' + apiName;
        }

        PageCommon.ajaxRequest('get', url, null, function (dataAll) {
            if (!dataAll) {
                DialogAlert.alert(DataTablesOption.opSystemError);
                return;
            }
            var data;
            if (dataAll.Results)
                data = dataAll.Results;
            else
                data = dataAll;
            var Description;
            if (self.attr('data-fieldDesc')) {
                Description = self.attr('data-fieldDesc');
            }
            else {
                Description = 'Description';
            }

            if (self.attr('data-showCode'))
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Code == null)
                        data[i].Code = '';
                    self.append("<option value='" + data[i].Id + "' Description='" + data[i][Description] + "'>" + data[i].Code + "</option>");
                }
            else
                for (var i = 0; i < data.length; i++) {
                    if (data[i][Description] == null)
                        data[i][Description] = '';
                    self.append("<option value='" + data[i].Id + "' dataCode='" + data[i].Code + "'>" + data[i][Description] + "</option>");
                }
            if (callback) {
                callback();
            }
        });
        //$.ajax({
        //    type: "get",
        //    url: url,
        //    dataType: "json",
        //    contentType: "application/json",
        //    success: function (dataAll) {
              
        //    },
        //    error: function () {
        //        DialogAlert.alert(DataTablesOption.opSystemError);
        //    }
        //});
    },

    //获取ddl的数据 并启动ko绑定
    bindDropDownList_AndStartVM: function (id, url, bNotAddDefault) {
        PageCommon.bindDropDownList(id, url, bNotAddDefault, function () {
                    PageInit.iDllLoaded++;
                    if (PageInit.iDllLoaded == PageInit.iDllNeedLoad) {
                        if (PageInit.loadFixedValues)
                            PageInit.loadFixedValues();
                      if( PageInit.bNeedLoadVm ) vm.load();
                    }
        });
    },
    //koSelect2自定义绑定的初始化

  //datatables单元格字数超过多少时，加省略和tooltip
    generateTdTooltip: function (nRow, tdIndex, maxLength) {
        var td = $('td:eq(' + tdIndex + ')', $(nRow));
        var str = td.text();
        if (this.countCharacters(str) > maxLength) {
            td.text(this.getSubCharacters(str, maxLength) + "...");
            td.attr('title', str);
        }
    },
    //datatables为第几列的单元格，加tooltip
    generateTdTitle: function (nRow, tdIndex) {
        var td = $('td:eq(' + tdIndex + ')', $(nRow));
        var str = td.text();
        td.attr('title', str);
    },
    //攻取指定字节长度的子字符串
    getSubCharacters: function (str, maxLength) {
        var result = '';
        var totalCount = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                totalCount++;
            }
            else {
                totalCount += 2;
            }
            result += str.substr(i, 1);
            if (totalCount >= maxLength) {
                break;
            }
        }
        return result;
    },
    //计算字符串的字节长度
    countCharacters: function (str) {
        var totalCount = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                totalCount++;
            }
            else {
                totalCount += 2;
            }
        }
        return totalCount;
    },
    //add页面，table详情的点击时变收缩/展开
    initTableExtend: function () {
        $(document).on('click', 'a[name="aExtend"]', function () {
            var table = $(this).parents('table');
            var span = $(this).parent();
            span.toggleClass('extend deExtend');
            $('tbody', table).toggleClass('hidden');
            PageCommon.setPageHeight();
        });
    },
    //searchHelper表简单模型
    DdlModel: function () { this.Code = "", this.Description = "" },
    //弹出窗查询
    popupSearchClick: function (btn) {
        var tableId = '#listPopup';
        var curSelectElement = $('> :text:first,> select:first', btn.parents('div.input-group'));
        var title = btn.parents('td').prev().text().split('：')[0];
        PageCommon.setDialogTitle('#dialogPopup', title);
        var apiName;
        if (curSelectElement.attr('data-apiController')) {
            apiName = curSelectElement.attr('data-apiController');
            if (curSelectElement.attr('data-parentField')) {
                var id;
                var input = $('#' + curSelectElement.attr('data-parentInput'));
                if (input.attr('dataId'))
                    id = input.attr('dataId');
                else
                    id = input.val();
                if (apiName.indexOf('?') >= 0)
                    apiName += '&';
                else
                    apiName += '?';
                apiName +=  curSelectElement.attr('data-parentField') + '='+id;
            }
        }
        else {
            if (curSelectElement.attr('data-apiname'))
                apiName = curSelectElement.attr('data-apiname');
            else
                apiName = curSelectElement[0].name.slice(0, -2);
            apiName = 'KeyValueData?tname=' + apiName;
            if (curSelectElement.attr('data-fieldDesc'))
                apiName += '&fieldDesc=' + curSelectElement.attr('data-fieldDesc');
            if (curSelectElement.attr('data-fieldCode'))
                apiName += '&fieldCode=' + curSelectElement.attr('data-fieldCode');
            if (curSelectElement.attr('data-parentField')) {
                var id;
                var input = $('#' + curSelectElement.attr('data-parentInput'));
                if (input.attr('dataId'))
                    id = input.attr('dataId');
                else
                    id = input.val();
                apiName += '&pfield=' + curSelectElement.attr('data-parentField') + '&pid=' + id;
            }
        }
        DialogInit.openPopup();
        var sDom;
        if (curSelectElement.attr('data-notShowSearch'))
            sDom = 'rtip';
        else
            sDom = 'frtip';
       var otablePopup= $('#listPopup').dataTable({
           "sDom": sDom,
            "bProcessing": true,
            "bServerSide": true,
            "bFilter": true,
            'bSort': false,
            "bPaginate": true,
            "bScrollCollapse": true,
            "sScrollY": '200px',
            'aaSorting': [[0, "asc"]],
            "bDestroy": true,//允许多次初始化
            "sPaginationType": "full_numbers",
            "sAjaxDataProp": "Results",//保存列表的字段
            "sAjaxSource": '/api/' + apiName,
            'fnInitComplete': function (oSettings, json) {
                $('a.first').html('<img alt="" src="/Images/first.png" />');
                $('a.previous').html('<img alt="" src="/Images/prev.png" />');
                $('a.next').html('<img alt="" src="/Images/next.png" />');
                $('a.last').html('<img alt="" src="/Images/last.png" />');
                $(tableId + '_wrapper div.dataTables_filter input').unbind().bind('keyup',function (e) {
                    if (e.keyCode == 13) {
                        otablePopup.fnFilter(this.value);
                    }
                });
            },
            "fnDrawCallback": function (oSettings) {
                $(tableId + '_wrapper div.dataTables_scrollHeadInner').css('width', '100%').css('padding-right', '0px');
                $(tableId + '_wrapper table.dataTable').css('width', '100%');
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                $(nRow).click(function () {
                    var Id = aData.Id;
                    var code = aData.Code;
                    var text = aData.Description;
                    $('#dialogPopup').dialog("close");
                    if (curSelectElement.hasClass('cssPopup')) {
                        curSelectElement.select2('val', Id);
                        curSelectElement.change();
                    }
                    else {
                        curSelectElement.attr('fromJs', true).attr('dataId', Id).attr('Description', text).val(code).change();
                    }
                    if (curSelectElement.attr('data-controller2')) {
                        $('#' + curSelectElement.attr('data-controller2')).text(text).change();
                    }
                });
            },
            "aoColumns": [
                            { "mData": "Code", 'sDefaultContent': '' },
                            { "mData": "Description", 'sDefaultContent': '' }],
            "oLanguage": {
                "sUrl": "/Scripts/DataTables-1.9.4/media/language/dataTables.zh-CN.txt"
            },
       });
    
    },
}

var DialogAlert = {
    //使用方法 DialogAlert.alert("aaa");
    //使用方法 DialogAlert.confirm("aaa", function () { alert("bbb");});
    alert: function (message) {
        if ($("#dialogalert").length == 0) {
            $("body").append('<div id="dialogalert"></div>');
            $("#dialogalert").dialog({
                autoOpen: false,
                title: '提示',
                modal: true,
                resizable: false,
                overlay: {
                    opacity: 0.5,
                    background: "black"
                },
                buttons: {
                    "确定": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }

        $("#dialogalert").html(message);
        $("#dialogalert").dialog("open");
    },
    confirm: function (message, callback) {
        if ($("#dialogconfirm").length == 0) {
            $("body").append('<div id="dialogconfirm"></div>');
            $("#dialogconfirm").dialog({
                autoOpen: false,
                title: '提示',
                modal: true,
                resizable: false,
                overlay: {
                    opacity: 0.5,
                    background: "black"
                },
                buttons: {
                    "确定": function () {
                        callback();
                        $(this).dialog("close");
                    },
                    "取消": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        $("#dialogconfirm").html(message);
        $("#dialogconfirm").dialog("open");
    }
};

//使用方法，在datatables初始化时加参数  "fnServerData": DataTablesOption.fnServerData_fillEmpty,
var DataTablesOption = {
    opSystemError: '系统错误，请联系管理员。',
    fnServerData: function (sSource, aoData, fnCallback, oSettings) {
        oSettings.jqXHR = $.ajax({
            "dataType": 'json',
            "type": "get",
            "url": sSource,
            "data": aoData,
            "success": function (data) {
                if (data)
                    fnCallback(data);
                else
                    DialogAlert.alert(DataTablesOption.opSystemError);
            },
            "error": function (data) {
                DialogAlert.alert(DataTablesOption.opSystemError);
            },
        });
    },
    fnServerData_addRowIndex: function (sSource, aoData, fnCallback, oSettings) {
        oSettings.jqXHR = $.ajax({
            "dataType": 'json',
            "type": "get",
            "url": sSource,
            "data": aoData,
            "success": function (data) {
                if (data) {
                    var iDataLength = data.Results.length;
                    for (var i = 0; i < iDataLength; i++) {
                        data.Results[i].RowIndex = i + 1 + oSettings._iDisplayStart;
                    }
                    fnCallback(data);
                }
                else
                    DialogAlert.alert(DataTablesOption.opSystemError);
            },
            "error": function (data) {
                DialogAlert.alert(DataTablesOption.opSystemError);
            },
        });
    },
    fnServerData_fillEmpty: function (sSource, aoData, fnCallback, oSettings) {
        oSettings.jqXHR = $.ajax({
            "dataType": 'json',
            "type": "get",
            "url": sSource,
            "data": aoData,
            "success": function (data) {
                if (!data) {
                    DialogAlert.alert(DataTablesOption.opSystemError);
                    return;
                }
                var iDataLength = data.Results.length;

                if (iDataLength % oSettings._iDisplayLength != 0) {
                    for (var i = iDataLength % oSettings._iDisplayLength; i < oSettings._iDisplayLength; i++) {
                        data.Results.push({});
                    }
                }
                fnCallback(data);
            },
            //"error": function (data) {
            //    DialogAlert.alert(opSystemError);
            //},
        });
    },
};




var KoCommon = {
    //使用select2控件的数据绑定，ie8下绑定的数据只能使用一次mapping绑定
    initKoSelect2: function () {
        ko.bindingHandlers.koSelect2 = {
            init: function (element, valueAccessor) {
                $(element).attr('multiple', 'multiple').select2({ maximumSelectionSize: 1, allowClear: true });//在外部初始化  造成ie8兼容问题
                var value = valueAccessor();
                var data = ko.utils.unwrapObservable(value);
                $(element).select2('val', data);
                $(element).change(function () {
                    var value = valueAccessor();
                    var selectedVal = $(element).select2('val');//数组
                    if (selectedVal.length == 0)
                        value(null);
                    else if (selectedVal.length == 1)
                        value(selectedVal[0]);
                    else
                        value(selectedVal[1]);
                });
            },
            update: function (element, valueAccessor) {

            }
        };
    },
    //文本框显示Code，dataId属性绑定Id，同步更新Description
    initKoSetId: function () {
        ko.bindingHandlers.mySetId = {
            init: function (element, valueAccessor) {
                $(element).change(function () {
                    var self = $(element);
                    var data = valueAccessor();

                    if (self.attr('fromJs')) {
                        data.code.Code($(element).val());
                        data.id($(element).attr('dataId'));
                        data.code.Description(self.attr('Description'));
                        self.attr('fromJs', "");
                        KoCommon.reletiveChangeCheck($(element));
                        return;
                    }

                    self.attr('fromJs', true);
                    data.id("");
                    data.code.Description("");
                    self.attr('dataId', '');
                    self.attr('fromJs', "");
                    if (!self.val()) {
                        KoCommon.reletiveChangeCheck($(element));
                        return;
                    }

                    //查询服务器，更新子类的id
                    var apiName = PageCommon.getApiName(self);
                    var url = '/api/KeyValueData';
                    var dataPost = {};
                    dataPost.code = self.val();
                    dataPost.tname = apiName;
                    if (self.attr('data-parentField')) {
                        var parentInput = $('#' + self.attr('data-parentInput'));
                        dataPost.pfield = self.attr('data-parentField');
                        dataPost.pid = parentInput.hasClass('cssPopup') ? parentInput.val() : parentInput.attr('dataId');
                    }
                    if (self.attr('data-fieldDesc')) {
                        dataPost.fieldDesc = self.attr('data-fieldDesc');
                    }
                    if (self.attr('data-fieldCode')) {
                        dataPost.fieldCode = self.attr('data-fieldCode');
                    }
                    PageCommon.ajaxRequest('Post', url, JSON.stringify(dataPost), function (dataAll) {
                        if (dataAll && dataAll.Id) {
                            self.attr('fromJs', true);
                            data.code.Code(self.val());
                            data.id(dataAll.Id);
                            self.attr('dataId', dataAll.Id);
                            data.code.Description(dataAll.Description);
                            self.attr('fromJs', "");
                            KoCommon.reletiveChangeCheck($(element));
                        }
                        else {
                            self.val('');
                            KoCommon.reletiveChangeCheck($(element));
                        }
                    });
                });
            },
            update: function (element, valueAccessor) {
                if ($(element).attr('fromJs'))
                    return;
                try {
                    var value = valueAccessor();
                    $(element).attr('dataId', value.id());
                    $(element).val(value.code.Code());
                }
                catch (err) { }
            }
        };
    },
    //普通下拉列表变化时，改变关联的描述值变化
    initKoSetDesc: function () {
        ko.bindingHandlers.mySetDesc = {
            init: function (element, valueAccessor) {
                $(element).change(function () {
                    var self = $(element);
                    if (self.attr('data-controller2')) {
                        $('#' + self.attr('data-controller2')).text($('option:selected', self).attr("Description"));
                    }
                   else {
                        var data = valueAccessor();
                        data.Description($('option:selected', self).attr("Description"));
                    }
                
                });
            },
            update: function (element, valueAccessor) {
                var self = $(element);
                if (self.attr('data-controller2')) {
                    $('#' + self.attr('data-controller2')).text($('option:selected', self).attr("Description"));
                }
                else {
                    var data = valueAccessor();
                    data.Description($('option:selected', self).attr("Description"));
                }
            }
        };
    },
    //没有数据绑定的弹出框选择
    initKoSetIdNoBind: function () {
        ko.bindingHandlers.mySetIdNoBind = {
            init: function (element, valueAccessor) {
                $(element).change(function () {
                    var self = $(element);
                    if (self.attr('fromJs')) {
                        self.attr('fromJs', '');
                        return;
                    }

                    //先清空关联的显示名称
                    self.attr('dataId', '');
                    if (self.attr('data-controller2')) {
                        $('#' + self.attr('data-controller2')).text('');
                    }
                    if (!self.val()) {
                        return;
                    }

                    //查询输入的code是否有效
                    var data = valueAccessor();
                    var apiName = PageCommon.getApiName(self);
                    var url = '/api/KeyValueData';
                    var dataPost = {};
                    dataPost.code = self.val();
                    dataPost.tname = apiName;
                    if (self.attr('data-parentField')) {
                        var parentInput = $('#' + self.attr('data-parentInput'));
                        dataPost.pfield = self.attr('data-parentField');
                        dataPost.pid = parentInput.hasClass('cssPopup') ? parentInput.val() : parentInput.attr('dataId');
                    }
                    PageCommon.ajaxRequest('Post', url, JSON.stringify(dataPost), function (dataAll) {
                        if (dataAll && dataAll.Id) {
                            self.attr('dataId', dataAll.Id);
                            if (self.attr('data-controller2')) {
                                $('#' + self.attr('data-controller2')).text(dataAll.Description);
                            }
                        }
                        else {
                            self.val('');
                        }
                    });
                });
            },
            update: function (element, valueAccessor) {
            }
        };
    },

    reletiveChangeCheck: function (jqElem) {
        if (jqElem.attr('data-subInput')) {
            var subElemIds = jqElem.attr('data-subInput').split(',');
            for (var i = 0; i < subElemIds.length; i++) {
                var subElem = $('#' + subElemIds[i]);
                if (subElem.hasClass('cssPopup')) {
                    subElem.select2('val', null);
                    subElem.change();
                }
                else {
                    subElem.attr('dataId', "").val("").attr('fromJs', true).attr('Description', '').change();
                }
            }
        }
    },

};