(function() {
    "use strict"

    const detailKaryawanURL = (function() {
        const urlString = {
            fetch_detail_karyawan: BASE_URL+'master/karyawan/Karyawan/get_where_karyawan/'+PARAMS,
            fetch_jabatan: BASE_URL+'master/karyawan/Gaji/show_jabatan',
            updateKaryawan: BASE_URL+'master/karyawan/Karyawan/update',
            delete: BASE_URL+'master/karyawan/Karyawan/delete'
        }

        return {
            getURL: () => urlString
        }
    })()


    const detailKaryawanInterface = (function() {
        const domString = {
            field: {
                nik: '#nik',
                email: '#email',
                nama_depan: '#nama_depan',
                nama_belakang: '#nama_belakang',
                jenis_kelamin: '#jenis_kelamin',
                tanggal_lahir: '#tanggal_lahir',
                alamat: '#alamat',
                tanggal_gabung: '#tanggal_gabung',
                no_telp: '#no_telp',
                agama: '#agama',
                no_rekening: '#no_rekening',
                nama_bank: '#nama_bank',
                atas_nama: '#atas_nama',
                kode_jabatan: '#kode_jabatan'
            },
            btn: {
                editKaryawan: '#edit__data__karyawan',
                hapusKaryawan: '.btn__hapus__karyawan'
            },
            form: {
                edit: '#form-edit-karyawan'
            }
        }

        const renderDetailKaryawan = data => {
            let html = ''

            console.log(data)
            if(data.length > 0){
               data.forEach(item => {
                   $(domString.field.nik).val(item.nik)
                   $(domString.field.email).val(item.email)
                   $(domString.field.nama_depan).val(item.nama_depan)
                   $(domString.field.nama_belakang).val(item.nama_belakang)
                   $(domString.field.jenis_kelamin).val(item.jk)
                   $(domString.field.tanggal_lahir).val(item.tgl_lahir)
                   $(domString.field.alamat).val(item.alamat)
                   $(domString.field.tanggal_gabung).val(item.tgl_gabung)
                   $(domString.field.no_telp).val(item.no_telp)
                   $(domString.field.agama).val(item.agama)
                   $(domString.field.no_rekening).val(item.no_rekening)
                   $(domString.field.nama_bank).val(item.nama_bank)
                   $(domString.field.atas_nama).val(item.atas_nama)
                   $(domString.field.kode_jabatan).val(item.kode_jabatan)
               })
            }
            

        }

        return {
            getDOM: () => domString,
            retrieveDetailKaryawan: data => renderDetailKaryawan(data)
        }
    })()


    const detailKaryawanController = (function(URL, UI) {
        const dom = UI.getDOM()
        const url = URL.getURL()

        const eventListener = function() {

           $(dom.form.edit).validate({
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
                error.css('color','red')
                error.insertAfter(element)
            },
            submitHandler: function(form){
                postResource(url.updateKaryawan, form, data => {
                    var parse = JSON.parse(data);
                    if(parse.code === 200){
                        $.notify('success', parse.msg)
                        load_fetch_detail()
                    }else{
                        $.notify('info', parse.msg)
                    }
                } );
            }
           })

           $(dom.btn.hapusKaryawan).click(function() {
               var nik = $(this).data('nik')
               $('#idTarget').val(nik)
               $('#modalDelete').modal('show')
           })

           $('#form-delete').on('submit', function(e) {
               e.preventDefault()
               var valueConfirm = $('#confirm').val();
               if(valueConfirm !== 'confirm') return $.notify('Konfirmasi Salah', 'info');

               postResource(url.delete, this, data => {
                   var parse = JSON.parse(data)
                   if(parse.code === 200){
                       $.notify(parse.msg, 'success')
                       location.hash = '#/listkaryawan'
                       $('#modalDelete').modal('hide')
                   }else{
                       $.notify(parse.msg, 'error')
                   }
               } )
           })

        }
        

    
        const showFieldJabatan = function(){
            $.ajax({
                url: url.fetch_jabatan,
                method: 'get',
                success: function(data){
                    $('#kode_jabatan').html(data)
                }
            })
        }

        const load_fetch_detail = () => getResource(url.fetch_detail_karyawan, undefined, data => UI.retrieveDetailKaryawan(data) );

        return {
            init: () => {
                eventListener()
                showFieldJabatan()
                load_fetch_detail()   
            }
        }

    })(detailKaryawanURL, detailKaryawanInterface)

    detailKaryawanController.init()


})()