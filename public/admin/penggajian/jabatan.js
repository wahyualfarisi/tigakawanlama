var jabatanUI = (function() {

    var jabatanDOM = {
        show: '#show__data__gaji',
        btnAdd: '#btn__add__jabatan',
        btnDelete: '.btn-delete',
        btnEdit: '.btn-edit',
        modal: [
            {
                modalJabatan: '#modalJabatan',
                modalEdit: '#modalEdit',
                modalHapus: '#modalHapus'
            }
        ],
        form:['#form__add__jabatan','#form__hapus__jabatan','#form__edit__jabatan'],
        fieldTarget: '#kode_jabatan',
        fieldConfirm: '#confirm',
        fieldEdit: ['#kode_jabatan_edit','#nama_jabatan_edit','#jumlah_gaji_edit','#potongan_edit','#lemburan_edit']
    }


    var formatRupiah = function(angka, prefix){
        var numberString = angka.replace(/[^,\d]/g, '').toString();
        var split        = numberString.split(',');
        var sisa         = split[0].length % 3;
        var rupiah       = split[0].substr(0, sisa);
        var ribuan       = split[0].substr(sisa).match(/\d{3}/gi);

        // test
        if(ribuan){
            var seperator = sisa ? '.' : '';
            rupiah += seperator + ribuan.join('.')
        }
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '' )
    }



    return {
        getDOM: function(){
            return jabatanDOM;
        },
        retrieveDataJabatan: function(object){
            var html = '', no = 1;
            if(object.length > 0){
                object.forEach(function(item) {
                    html += '<tr>';
                         html += '<td>'+no+++' </td>';
                         html += '<td> '+item.nama_jabatan+' </td>';
                         html += '<td> '+formatRupiah(item.gaji)+' </td>';
                         html += '<td> '+formatRupiah(item.potongan)+' </td>';
                         html += '<td> '+formatRupiah(item.lemburan)+' </td>';
                         html += '<td><button type="button" class="btn btn-primary btn-delete" data-id="'+item.kode_jabatan+'" > Hapus </button></td>';
                         html += '<td><button type="button" class="btn btn-primary btn-edit" data-id="'+item.kode_jabatan+'" data-nama="'+item.nama_jabatan+'" data-gaji="'+item.gaji+'" data-potongan="'+item.potongan+'" data-lemburan="'+item.lemburan+'" > Edit </button></td>';
                    html += '</tr>';
                })
            }
            $(jabatanDOM.show).html(html);
        }
    }
})()



var jabatanController = (function(UI) {
    var DOM = UI.getDOM();

    var urlAPI = {
        fetch_jabatan: BASE_URL+'master/karyawan/Gaji/fetch_json',
        add: BASE_URL+'master/karyawan/Gaji/add',
        delete: BASE_URL+'master/karyawan/Gaji/delete',
        update: BASE_URL+'master/karyawan/Gaji/update'
    }

    var setupEventListener = function(){
        
        //show modal add jabatan
        $(DOM.btnAdd).on('click', () => ModalAction(DOM.modal[0].modalJabatan, 'show'));

        //form add
        $(DOM.form[0]).validate({
            rules:
            {
                nama_jabatan:
                {
                    required: true
                },
                jumlah_gaji:
                {
                    required: true
                },
                potongan:
                {
                    required: true
                },
                lemburan:
                {
                    required: true
                }
            },
            messages: {
                nama_jabatan:
                {
                    required: 'Nama Jabatan Tidak Boleh Kosong'
                },
                jumlah_gaji:
                {
                    required: 'Jumlah Gaji Harus Diisi'
                },
                potongan:
                {
                    required: 'Jumlah Potongan Harus Diisi'
                },
                lemburan:
                {
                    required: 'Jumlah Lemburan harus diisi'
                }
            },
            errorPlacement(error, element)
            {
                error.css('color','red')
                error.insertAfter(element)
            },
            submitHandler(form){
                postData(urlAPI.add, form, data => {
                    var parse = JSON.parse(data);
                    parse.code === 200 ? $.notify(parse.msg, 'success') : $.notify(parse.msg, 'danger')
                    $(DOM.form[0])[0].reset()
                    fetch_jabatan()
                    ModalAction(DOM.modal[0].modalJabatan, 'hide') 
                });
            }
        });

        //btn delete
        $(DOM.show).on('click', DOM.btnDelete, function(){
           $(DOM.fieldTarget).val($(this).data('id') );
           ModalAction(DOM.modal[0].modalHapus, 'show')
        });

        //btn edit
        $(DOM.show).on('click', DOM.btnEdit, function() {
            $(DOM.fieldEdit[0]).val($(this).data('id'));
            $(DOM.fieldEdit[1]).val($(this).data('nama'));
            $(DOM.fieldEdit[2]).val($(this).data('gaji'));
            $(DOM.fieldEdit[3]).val($(this).data('potongan'));
            $(DOM.fieldEdit[4]).val($(this).data('lemburan'));
            ModalAction(DOM.modal[0].modalEdit, 'show')
        });

        //form submit delete 
        $(DOM.form[1]).on('submit', function(e) {
            e.preventDefault()
            var confirm  = $(DOM.fieldConfirm).val()
            if(confirm === 'confirm'){
                postData(urlAPI.delete, this , data => {
                    var parse = JSON.parse(data);
                    parse.code === 200 ? $.notify(parse.msg, 'success') : $.notify(parse.msg, 'danger');
                    $(DOM.form[1])[0].reset()
                    fetch_jabatan()
                    ModalAction(DOM.modal[0].modalHapus, 'hide')
                })
            }else{
                $.notify('failed', 'danget')
            }
        });


        //form submit edit
        $(DOM.form[2]).on('submit', function(e) {
            e.preventDefault()
            postData(urlAPI.update, this , data => {
                var parse = JSON.parse(data);
                parse.code === 200 ? $.notify(parse.msg, 'success') : $.notify(parse.msg, 'danger')
                ModalAction(DOM.modal[0].modalEdit, 'hide')
                fetch_jabatan()
            })
        })

        $('#nama_jabatan').keyup(function() {
            $(this).val($(this).val().toUpperCase())
        })
    }

    var fetch_jabatan = function(){
        load(urlAPI.fetch_jabatan, function(data) {
           UI.retrieveDataJabatan(data);
        });
    }

    var postData = function(url, form, callback){
        $.ajax({
            url: url,
            method: 'post',
            data: new FormData(form),
            processData: false,
            contentType: false,
            cache: false,
            async: false,
            success: function(data){
                callback(data);
            }
        })
    }

   
    var ModalAction = function(modalName,method){
        $(modalName).modal(method);
    }

    var load = function(url, callback){
        $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                callback(data);
            }
        });
    }



    return {
        init: function(){
            fetch_jabatan()
            setupEventListener(); 
        }
        
    }
})(jabatanUI)


$(document).ready(function() {
    jabatanController.init()
})