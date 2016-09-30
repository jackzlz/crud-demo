(function(window, $) {
    var Main = function() {
        this.addDialog = null;
    };

    Main.prototype = {
        constructor: Main,
        init: function() {
            this.initDatas();
            this.initValidates();
            this.initEvents();
        },
        initDatas: function() {
            $.getJSON('/list', function(data) {
                $('#list').html(JSON.stringify(data));
            });
        },
        initValidates: function() {
            this.validate = $("#addForm").validate({
                rules: {
                    username: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    desc: "required"
                },
                messages: {
                    username: {
                        required: "请输入用户名",
                        minlength: "用户名最小长度是两位"
                    },
                    email: "请输入邮箱地址",
                    desc: "请输入描述信息"
                }
            });
        },
        initEvents: function() {
            var that = this;
            $('#addBtn').on('click', function() {
                var addForm = document.getElementById('addFormDiv');
                var d = dialog({
                    title: '新增',
                    width: 460,
                    height: 400,
                    content: addForm
                });
                d.showModal();

                that.addDialog = d;
            });
            $('#saveBtn').on('click', function() {
                if ($('#addForm').valid()) {
                    $.post('/add', $('#addForm').serialize(), function(ret) {
                        console.log(ret);
                        if (ret && ret.statusCode) {
                            that.addDialog.close();
                        } else {

                        }
                    }, 'json');
                }
            });
        }
    };
    window.main = new Main();
})(window, jQuery);
