const UserUI = (function() {
    var domString = {
        show: '#show__user',
        modalAddUser: '#modalAddUser',
        modalDelete: '#modalDelete',
        modalEditUser: '#modalEditUser',
        btnAdd: '#btn__add__user',
        btnDelete: '.btn__delete',
        btnEdit: '.btn__edit',
        form: {
            addUser: '#form__add__user',
            editUser: '#form__edit__user',
            delete: '#form-delete'
        }
    }

    const showUser = object => {
        
        var html = '';
        object.forEach(item => {
            html += '<tr>'
            html += '<td>'+item.email+' </td>';
            html += '<td>'+item.nama_depan+' '+item.nama_belakang+' </td>';
            html += '<td>'+item.akses+' </td>';
            html += '<td>'+item.login_terakhir+'</td>';
            html += '<td><button class="btn btn-gradient-danger btn__delete" data-id="'+item.kode_admin+'" > Hapus </button> </td>';
            html += '<td><button data-id="'+item.kode_admin+'" data-nama_depan="'+item.nama_depan+'" data-nama_belakang="'+item.nama_belakang+'" data-password="'+item.password+'" data-akses="'+item.akses+'" data-email="'+item.email+'" class="btn btn-gradient-primary btn__edit" > Edit </button> </td>';
            html += '</tr>';   
        });
        $(domString.show).html(html)
    }

    return {
        getDOM: () => {
            return domString;
        },
        retrieveUser: object => {
            if(object.length > 0) {
                showUser(object);
            }
        }
    }
})()


const UserController = (function(UI) {
    var DOM = UI.getDOM()
    const url = {
        getUser: BASE_URL+'master/user/User/fetch',
        addUser: BASE_URL+'master/user/User/add',
        delete: BASE_URL+'master/user/User/delete',
        update: BASE_URL+'master/user/User/update'
    }

    const setupEventListener = () => {

        /**
         * show modal user
         */
        $(DOM.btnAdd).on('click', () =>  ModalAction(DOM.modalAddUser, 'show'))

        /**
         * submit add user  
         */
        $(DOM.form.addUser).validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                nama_depan:
                {
                    required: true
                },
                password:
                {
                    required: true
                },
                akses: 
                {
                    required: true
                }
            },
            messages: {
                email: {
                    required: 'Email Harus Diisi',
                    email: 'Email Tidak Valid'
                },
                nama_depan: {
                    required: 'Nama Depan Tidak Boleh Kosong'
                },
                password: {
                    required: 'Password Harus Diisi'
                },
                akses: {
                    required: 'Akses Tidak Boleh Kosong'
                }
            },
            errorPlacement(error, element){
                error.css('color','red')
                error.insertAfter(element)
            },
            submitHandler(form){
                postData(url.addUser, form, (data) => {
                    var parse = JSON.parse(data);
                    if(parse.code === 404) return $.notify(parse.msg, 'info')
                    if(parse.code === 400) return $.notify(parse.msg, 'info')

                    $.notify(parse.msg, 'success')
                    ModalAction(DOM.modalAddUser, 'hide')
                    load_user()
                    clearFORM(DOM.form.addUser)  
                });
            }
        })

        /**
         * event modal delete show
         */
        $(DOM.show).on('click', DOM.btnDelete, function() {
            var id = $(this).data('id')
            $('#idTarget').val(id)
            ModalAction(DOM.modalDelete, 'show') 
        });

        /**
         * event form delete
         */
        $(DOM.form.delete).on('submit', function(e) {
            e.preventDefault()
            var confirm = $('#confirm').val() 
            if(confirm !== 'confirm') return $.notify('Konfirmasi Salah', 'info')

            postData(url.delete, this, (data) => {
                var parse = JSON.parse(data);
                if(parse.code === 400) return $.notify(parse.msg, 'info')

                ModalAction(DOM.modalDelete, 'hide') 
                $.notify(parse.msg, 'success')
                clearFORM(DOM.form.delete)
                load_user()
            })
        });

        /**
         * event modal edit show
         */
        $(DOM.show).on('click', DOM.btnEdit, function() {
            $('#kode_admin_edit').val($(this).data('id'))
            $('#nama_depan_edit').val($(this).data('nama_depan') )
            $('#nama_belakang_edit').val($(this).data('nama_belakang') )
            $('#password_edit').val($(this).data('password') )
            $('#akses_edit').val($(this).data('akses'))
            $('#email_edit').val($(this).data('email') )
            ModalAction(DOM.modalEditUser, 'show')
            
        })

        $(DOM.form.editUser).validate({
            rules: {
                email_edit: {
                    required: true,
                    email: true
                },
                nama_depan_edit : {
                    required: true
                },
                password_edit: {
                    required: true
                },
                akses_edit: {
                    required: true
                }
            },
            messages: {
                email_edit: {
                    required: 'Email Tidak Boleh Kosong',
                    email: 'Email Tidak Valid'
                },
                nama_depan_edit : {
                    required: 'Nama Depan Harus Diisi'
                },
                password_edit : {
                    required: 'Password tidak Boleh Kosong'
                },
                akses_edit: {
                    required: 'Password Tidak boleh Kosong'
                }
            },
            errorPlacement(error, element){
                error.css('color', 'red') 
                error.insertAfter(element)
            },
            submitHandler(form) {
                postData(url.update, form, data => {
                    var parse = JSON.parse(data);
                    if(parse.code !== 200) return $.notify(parse.msg, 'info')

                    ModalAction(DOM.modalEditUser, 'hide')
                    $.notify(parse.msg, 'success')
                    load_user()
                });
            }
        })
        

    }

    const load_user = () => fetch(url.getUser, data => UI.retrieveUser(data) )
    
    //------ MY FUNC ---//
    const fetch = (url, callback) => {
        $.ajax({
            url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                callback(data);
            }
        })
    }

    const postData = (url, form, callback) => {
        $.ajax({
            url,
            method: 'post',
            data: new FormData(form),
            processData: false,
            contentType: false,
            async: false,
            cache: false,
            success: function(data){
                callback(data)
            }
        })
    }

    const clearFORM = (form) => {
        $(form)[0].reset()
    }
    //------ MY FUNC ---//

    const ModalAction = (modalName, method) => $(modalName).modal(method)
    


    return {
        init: () => {
            console.log('initlize app.. ')
            setupEventListener()
            load_user()
        }
    }
})(UserUI)

$(document).ready(function() {
    UserController.init()
})