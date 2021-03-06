/**
 * Created by hanke0726 on 2016/7/29.
 */
function downUpList(clockNode,selectBox,selectNode){function stopPropagation(e){var e1=e||event;if(e1.stopPropagation){e1.stopPropagation()}else{e1.cancelBubble=true}}clockNode.click(function(e){stopPropagation(e);$(".select_bj").css("display","block");$("body").css("overflow","hidden");selectBox.css("display","block");$("body").bind('touchmove',function(event){event.preventDefault()})});selectNode.click(function(e){stopPropagation(e);clockNode.val($(this).text());select_after()});$(document).click(function(){select_after()});function select_after(){$(".select_bj").css("display","none");$("body").css("overflow","visible");selectBox.css("display","none");$("body").unbind("touchmove")}}

$(function(){
    $(".page").css("min-height",$(window).height()+"px");
});

$(function(){
    downUpList($(".se-qylb"),$(".select-hangye"),$(".select-hangye ul li"));
    downUpList($(".se-yunying"),$(".select_yunying"),$(".select_yunying ul li"));
    downUpList($(".se-ztzw"),$(".select_ztzw"),$(".select_ztzw ul li"));
    downUpList($(".se-kdfg"),$(".select_kdfg"),$(".select_kdfg ul li"));
    $(".select_magistrate").css("margin-top",-($(".select_magistrate").height()/2)+"px");


    // 操作
    $('#btn_login').on('click', function(){
        var username = $.trim($('#username').val());
        var password = $.trim($('#password').val());

        if (username == '') {
            box.msg('请输入账号！');
            return false;
        }

        if (password == '') {
            box.msg('请输入密码！');
            return false;
        }

        $.ajax({
            type : 'post',
            url  : 'index.php?part=index&openid=' + request('openid') + '&appid=' + request('appid'),
            data : {
                username : username,
                password : password
            },
            beforeSend : function(){
                box.loadding('正在登陆,请稍后...');
            },
            success : function(res) {
                layer.closeAll();
                if (res.errcode == 0) {
                    window.location.href = res.href;
                } else {
                    box.msg(res.message);
                }
            }
        });
    });

    // 商铺信息录入
    $('#btn_submit').on('click', function(){
        var shop_name     = $.trim($('#shop_name').val());
        var shop_addr     = $.trim($('#shop_addr').val());
        var shop_street   = $.trim($('#shop_street').val());
        var shop_contact1 = $.trim($('#shop_contact1').val());
        var shop_contact2 = $.trim($('#shop_contact2').val());
        var shop_type     = $.trim($('#shop_type').val());
        var shop_280      = $.trim($('#shop_280').val());
        var shop_group_net = $.trim($('#shop_group_net').val());
        var shop_mem_num   = $.trim($('#shop_mem_num').val());
        var shop_209       = $.trim($('#shop_209').val());
        var shop_broadband_cover = $.trim($('#shop_broadband_cover').val());
        var shop_landline  = $.trim($('#shop_landline').val());
        var shop_operator  = $.trim($('#shop_operator').val());

        // 验证商铺名称不能为空
        if (shop_name == '') {
            box.msg('请输入商铺名称！');
            return false;
        }

        // 验证商铺地址不能为空
        if (shop_addr == '') {
            box.msg('请输入商铺地址！');
            return false;
        }

        // 验证商铺所在街道不能为空
        if (shop_street == '') {
            box.msg('请输入商铺所在街道名称！');
            return false;
        }

        // 验证商铺联系方式1不能为空
        if (shop_contact1 == '') {
            box.msg('请输入商铺联系方式1！');
            return false;
        }

        // 必须输入手机号码
        /*if (!/^1\d{10}$/.test(shop_contact1)) {
            box.msg('请输入正确手机号码！');
            return false;
        }*/
        if ( shop_contact1.length != 11 || isNaN(shop_contact1) ) {
            box.msg('商铺联系方式1的长度为11位！');
            return false;
        }

        // 如果联系方式二不为空，验证格式
        if (shop_contact2 != '') {
            if (isNaN(shop_contact2)) {
                box.msg('请输入数字！');
                return false;
            }
        }

        // 验证商铺类型必选
        if (shop_type == '') {
            box.msg('请选择商铺行业类别！');
            return false;
        }

        // 判断280代码为10位
        if (shop_280 != '') {
            if (shop_280.length != 10 || isNaN(shop_280)) {
                box.msg('请输入10位数的280代码！');
                return  false;
            }
        }

        // 验证是否完成组网
        if (shop_group_net == '') {
            box.msg('请选择是否完成集团组网！');
            return false;
        }

        // 集团成员数量
        if (shop_mem_num == '') {
            box.msg('请输入集团成员数量！');
            return false;
        }

        // 判断集团数量是否为数字或正数
        if (isNaN(shop_mem_num) || shop_mem_num < 0) {
            box.msg('请输入大于或等于0的数字！');
            return false;
        }

        // 判断209代码为11位
        if (shop_209 != '') {
            if (shop_209.length != 11 || isNaN(shop_209)) {
                box.msg('请输入11位数的209代码！');
                return  false;
            }
        }

        // 验证宽带是否覆盖
        if (shop_broadband_cover == '') {
            box.msg('请选择移动宽带资源是否覆盖！');
            return false;
        }

        // 验证是否选择运行商
        if (shop_operator == '') {
            box.msg('请选择宽带使用运营商！');
            return false;
        }





        $.ajax({
            type : 'post',
            url  : 'index.php?part=luru&appid=' + request('appid') + '&openid=' + request('openid'),
            dataType : 'json',
            async : false,
            data : {
                shop_name : shop_name,
                shop_addr : shop_addr,
                shop_street : shop_street,
                shop_contact1 : shop_contact1,
                shop_contact2 : shop_contact2,
                shop_type : shop_type,
                shop_280 : shop_280,
                shop_group_net : shop_group_net,
                shop_mem_num : shop_mem_num,
                shop_209 : shop_209,
                shop_broadband_cover : shop_broadband_cover,
                shop_landline : shop_landline,
                shop_operator : shop_operator,
                lng : $('#lng').val(),
                lat : $('#lat').val(),
                btn_type : $('#btn_type').val(),
                sid : $('#sid').val(),
            },
            beforeSend : function(){
                box.loadding('正在添加,请稍后...');
            },
            success : function(res) {
                layer.closeAll();
                if (res.errcode == 0) {
                    box.msg(res.message) // 添加成功具体操作看要求，是跳转还是提示

                    /*box.confirm(res.message, ['继续添加', '返回列表'], function(index){
                        window.location.reload();
                        layer.close(index);
                        return false;
                    }, function(){alert(1)});*/
                    setTimeout(function(){
                        window.location.href = res.url;
                    }, 2000);
                    //window.location.href="http://www.johnxu.net";
                } else {
                    box.msg(res.message);
                }
            }
        });
    });

    // 搜索
    $('#btn_search').on('click', function(){
        var search = $.trim($('#shop_name').val());
        if (search == '') {
            box.msg('请输入需要搜索的商铺名称！');
            return false;
        }

        $.ajax({
            type : 'post',
            url  : 'index.php?part=search&appid=' + request('appid') + '&openid=' + request('openid'),
            dataType : 'json',
            data : {search : search},
            beforeSend : function(){
                box.loadding('正在搜索,请稍等...');
            },
            success : function(res){
                layer.closeAll();
                if (res.errcode == 0) {
                    var list = '';
                    $.each(res.list, function(i, item){
                        var content = '<div class="search-list">';
                            content += '<h2>'+item.name+'</h2>';
                            content += '<ul>';
                            content += '<li>企业类别：<span>'+item.type+'</span></li>';
                            content += '<li>商铺所在地址：<span>'+item.address + item.street +'</span></li>';
                            content += '</ul>';
                            content += '<div class="clearfix">';
                            content += '<a href="javascript:void (0)" data-id="'+item.id+'" class="btn-ckxq">查看详情</a>';
                            content += '<a href="javascript:void (0)" data-id="'+item.id+'" class="btn-xgzl">修改资料</a>';
                            content += '</div></div>';
                        list += content;
                    });
                    $('#result').html(list);

                } else {
                    box.msg('搜索失败');
                }
            }
        });
    });

    // 查看详情
    $('#result').delegate('.btn-ckxq', 'click', function(){
        var id = $(this).data('id');
        window.location.href = 'index.php?part=xq&openid='+request('openid')+'&appid='+request('appid')+'&sid='+id;
    });

    // 修改资料
    $('#result').delegate('.btn-xgzl', 'click', function(){
        var id = $(this).data('id');
        window.location.href = 'index.php?part=change&openid='+request('openid')+'&appid='+request('appid')+'&sid='+id;
    });

});

