var city1, city2, address1, address2, point1, point2;

// 百度地图API功能
var map = new BMap.Map("l-map");
var point = new BMap.Point(116.331398, 39.897445);
var mark;
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom(true);
map.enableDragging();
var geolocation = new BMap.Geolocation();

//disable其它的，等待定位
geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        mark = new BMap.Marker(r.point);
        map.addOverlay(mark);
        map.panTo(r.point);
        //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        $('#txtCity1,#txtCity2').val(r.address.city);
        city1 = city2 = r.address.city;
    }
    else {
        //alert('failed' + this.getStatus());
        $('#txtCity1,#txtCity2').attr('placeholder', '定位失败，请手动输入');
        $('#btnChangeCity1,btnChangeCity2').prop('disabled', false);
    }
}, { enableHighAccuracy: true })
//关于状态码
//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)

//更改城市
$('#btnChangeCity1,#btnChangeCity2').click(function () {

});

var searchingTextId;
var localSearch;
var selectPointType;
//检查输入地点是否正确
$('#txtStart,#txtEnd').change(function () {
    var idCity;
    searchingTextId = $(this).id;
    if (searchingTextId == 'txtStart')
        idCity = 'txtCity1';
    else
        idCity = 'txtCity2';
    map.centerAndZoom($('#' + idCity).val(), 12);
    localSearch = new BMap.LocalSearch(map, optionsLocalSearch);
    localSearch.search($(this).val());
});
var optionsLocalSearch = {
    renderOptions: { map: map, panel: "r-result" },
    onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            var pointsCount = results.getCurrentNumPois();
            if (pointsCount == 0)
                alert('地点“' + $('#' + searchingTextId).val() + '”定位失败,请重新输入');
            else if (pointsCount == 1) { }
            else {
                $('#mapTitle').text('请选择地点：');
                $('#divPopupMap').show();
                selectPointType = 1;
            }
            //var s = [];
            //for (var i = 0; i < results.getCurrentNumPois() ; i++) {
            //    s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
            //}
            //document.getElementById("r-result").innerHTML = s.join("<br/>");
        }
        else {
            alert('地点“' + $('#' + searchingTextId).val() + '”定位失败,请重新输入');
        }
    }
};
$('#btnSelectPoint').click(function () {
    var selectedPoint = map.getCurrentPosition();
    if (selectPointType == 1) {

    }
    else {

    }
});

//从地图选点
$('#btnSelectFromMap1,#btnSelectFromMap2').click(function () {
    $('#mapTitle').text('请选择地点：');
    $('#divPopupMap').show();
    selectPointType = 2;
    marker.enableDragging();
});

//线路搜索
var driving;
var drivingResults;
$('#btnSearchRoute').click(function () {
    driving = new BMap.DrivingRoute(map, optionsDrivingRoute);
    driving.search("天安门", "百度大厦");
});
var optionsDrivingRoute = {
    onSearchComplete: function (results) {
        if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
            drivingResults = results;
            // 获取第一条方案
            var plan = results.getPlan(0);
            // 获取方案的驾车线路
            var route = plan.getRoute(0);
            // 获取每个关键步骤,并输出到页面
            var s = [];
            for (var i = 0; i < route.getNumSteps() ; i++) {
                var step = route.getStep(i);
                s.push((i + 1) + ". " + step.getDescription());
            }
            document.getElementById("r-result").innerHTML = s.join("<br/>");
        }
    }
};
