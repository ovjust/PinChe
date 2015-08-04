var oTable;
$(function () {
    initTable();

});

function initTable() {
    oTable = $('#list').dataTable({
        "sDom": 'rtip',
        "bProcessing": true,
        "bServerSide": false,
        "bFilter": true,
        'bAutoWidth': true,
        "sScrollY": "315px",
        'aaSorting': [[4, "desc"]],
        "sPaginationType": "full_numbers",
        "sAjaxSource": "/api/mypoint",
        //"sAjaxDataProp": "Results",//保存列表的字段
        //"fnServerData": DataTablesOption.fnServerData_fillEmpty,
        //"fnRowCallback": function (nRow, aData, iDisplayIndex) {
        //    for (var i = 0; i < tdColTitles.length; i++) {
        //        PageCommon.generateTdTitle(nRow, tdColTitles[i]);
        //    }
        //},
        "fnServerParams": function (aoData) {
            //aoData.push({ name: 'StatusId', value: StatusId });
        },
        'fnInitComplete': function (oSettings, json) {
            //if (bCreate)
            $('div.dataTables_wrapper').prepend('<div class="dataTables_filter"><span class="add-new"><a href="/Vendor/Add">新增</a></span><span class="multi-upload"><a id="aUpload" href="javascript:" >数据上传</a></span> <span class="add-new"><a href="/Vendor/Search">查询/修改</a></span> <span class="add-new"><a href="/Vendor/Extend">扩展</a></span> <span class="add-new"><a href="/Vendor/Freeze">冻结/解冻</a></span></div>');
            //$('a.first').html('<img alt="" src="/Images/first.png" />');
            //$('a.previous').html('<img alt="" src="/Images/prev.png" />');
            //$('a.next').html('<img alt="" src="/Images/next.png" />');
            //$('a.last').html('<img alt="" src="/Images/last.png" />');
        },
        "fnDrawCallback": function (oSettings) {
            //$('div.dataTables_scrollHeadInner').css('width', '100%').css('padding-right', '0px');
            //$('table.dataTable').css('width', '100%');
            //var pageIndex = oSettings._iDisplayStart / oSettings._iDisplayLength + 1;
            //$('div.dataTables_paginate > span').html('第 <input id="txtSetPage" type="text" value="' + pageIndex + '" style="width:3em; text-align:center;"> 页');
            //$('#txtSetPage').keypress(function () {
            //    if (event.keyCode == 13) {
            //        var newPage = parseInt($('#txtSetPage').val());
            //        if (newPage > 0)
            //            oTable.fnPageChange(newPage - 1);
            //    }
            //});
            //PageCommon.setPageHeight();
        },
        "aoColumns": [
                        { "mData": "Name", 'sDefaultContent': '', 'sClass': '', 'sWidth': '' },
                        { "mData": "Address", 'sDefaultContent': '', 'sClass': 'left', 'sWidth': ''},
                        {
                            "mData": "City", 'sDefaultContent': '', 'sClass': 'left', 'sWidth': ''},
                         {
                             "mData": "CreatedTime", 'sDefaultContent': '', //'sWidth': '20%', 
                             "fnRender": function (obj) {
                                 return PageCommon.formatTime(obj.aData.CreatedTime);
                             }
                         },

                        {
                            "mData": null, 'sDefaultContent': '',// 'sWidth': '5%',
                            "fnRender": function (obj) {
                                var link = '';
                                link += '<a name="modify" href="javascript:">修改</a>';
                                link += '<a name="delete" href="javascript:">删除</a>';
                                return link;
                            }
                        },
        ],
        "oLanguage": {
            "sUrl": StaticValues.DataTablesLanguageCn
        }
    });


    //修改
    $('#list tbody').on('click', 'a[name="modify"]', function (event) {
        DialogInit.openEditRole();
        var aData = RoleInit.getTableRowData(this);
        RoleInit.bindRowData(aData);
    });
    //删除
    $('#list tbody').on('click', 'a[name="delete"]', function (event) {
        if (!confirm("确认要删除吗？"))
            return;

        var aData = RoleInit.getTableRowData(this);

        //RoleInit.oTable.fnDeleteRow(curRoleIndex);
    });
}