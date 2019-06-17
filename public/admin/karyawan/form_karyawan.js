var formKaryawanDOM = {
    formAdd: '#form-add-karyawan',
    onlyNumber: '.onlynumber',
    showFieldJabatan: '#kode_jabatan',
    fieldEmail: '#email',
    fieldNik: '#nik'
}


var setupFormKaryawanUtils = (function() {

    return {

         checkNikAndEmail : function(handleData){
            return $.ajax({
                url: BASE_URL+'master/karyawan/Karyawan/check_nik_and_email',
                method: 'post',
                data: { email: $(formKaryawanDOM.fieldEmail).val(), nik: $(formKaryawanDOM.fieldNik).val() },
                success: function(data){
                    handleData(JSON.parse(data));
                }
            })
            
        },
        test: function(data){
            console.log('from utils test', data);
        }
        
    }
})();

var setupFormKaryawanController = (function(Utils) {

    var eventListener = function() {

        $(formKaryawanDOM.formAdd).validate(
            {
                rules:
                {
                    email:
                    {
                        required: true,
                        email: true
                    },
                    nik:
                    {
                        required: true,
                        minlength: 10
                    },
                    nama_depan:
                    {
                        required: true
                    },
                    jenis_kelamin:
                    {
                        required: true
                    },
                    tanggal_lahir: 
                    {
                        required: true
                    },
                    no_telp:
                    {
                        required: true
                    },
                    agama:
                    {
                        required: true
                    },
                    no_rekening:
                    {
                        required: true
                    },
                    nama_bank: 
                    {
                        required: true
                    },
                    atas_nama:
                    {
                        required: true
                    },
                    jabatan:
                    {
                        required: true
                    }
                },
                messages:
                {
                    email:
                    {
                        required: 'Email Tidak Boleh Kosong',
                        email: 'Email Tidak Valid'
                    },
                    nik:
                    {
                        required: 'Nik Tidak Boleh Kosong',
                        minlength: 'Minimal Nik 10 Karakter '
                    },
                    nama_depan:
                    {
                        required: 'Nama Depan Tidak Boleh Kosong'
                    },
                    jenis_kelamin: 
                    {
                        required: 'Jenis Kelamin Tidak Boleh Kosong'
                    },
                    tanggal_lahir:
                    {
                        required: 'Tanggal Lahir Tidak Boleh Kosong'
                    },
                    no_telp:
                    {
                        required: 'No Telp Tidak Boleh Kosong'
                    },
                    agama:
                    {
                        required: 'Agama Harus Diisi'
                    },
                    no_rekening:
                    {
                        required: 'No Rekening Tidak Boleh Kosong'
                    },
                    nama_bank:
                    {
                        required: 'Nama Bank Tidak Boleh Kosong'
                    },
                    atas_nama:
                    {
                        required: 'Atas Nama Tidak Boleh kosong'
                    },
                    jabatan:
                    {
                        required: 'Jabatan Harus Diisi'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red');
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    
                     Utils.checkNikAndEmail(function(data) {
                       if(data.code === 200){
                            $.ajax({
                                url: BASE_URL+'master/karyawan/Karyawan/add',
                                method: 'post',
                                data: new FormData(form),
                                processData: false, contentType: false, cache: false, async: false,
                                success:function(data){
                                    var parse = JSON.parse(data);
                                    if(parse.code === 200){
                                        $.notify(parse.msg, 'success');
                                        location.hash = '#/listkaryawan';
                                    }else{
                                        $.notify(parse.msg, 'info');
                                    }
                                }
                            })
                       }else{
                           $.notify(data.msg, 'info');
                       }
                    })
                    
                    
                }
            }
        );

        $(formKaryawanDOM.formAdd).on('keypress', formKaryawanDOM.onlyNumber, function(e) {
            if(e.which != 8 && e.which !=0 && (e.which < 48 || e.which > 57) ){
                return false;
            }
        });

        

    }

    var showFieldJabatan = function(){
        $.ajax({
            url: BASE_URL+'master/karyawan/Gaji/show_jabatan',
            method: 'get',
            success: function(data){
                $(formKaryawanDOM.showFieldJabatan).html(data)
            }
        })
    }

     

    return {
        init: function(){
            eventListener();
            showFieldJabatan();
        }
    }


})(setupFormKaryawanUtils)

$(document).ready(function() {
    setupFormKaryawanController.init();
})

