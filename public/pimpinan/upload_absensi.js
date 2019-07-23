(function() {
    "use strict"

    const uploadAbsensiURL = (function() {
        const urlString = {
            fetch_absensi_created: BASE_URL+'master/absensi/Absensi/show_absensi_created/'+SEGMENT,
            showListAdmin: BASE_URL+'master/absensi/Absensi/show_current_admin/'+SEGMENT,
            addPenggajian: BASE_URL+'master/absensi/Absensi/created_absensi'
        }

        return {
            getURL: () => urlString
        }
    })()


    const uploadAbsensiUI = (function() {

        const domString = {
            html: {
                showCreatedAbsensi: '#show-created-absensi',
                showListKaryawan: '#show-karyawan'
            },
            btn: {
                pilihKaryawan: '#btn-pilih-karyawan',
                selectNik: '.btn-pilih-karyawan'
            },
            modal: {
                modalKaryawan: '#modalKaryawan'
            },
            form: {
                formAddPenggajian: '#form-add-penggajian'
            }
        }

        const renderRetrieveAbsensi = data => {
            console.log(data)
            let html = '', no = 1, labelAbsensi, totalGaji, resultGaji;
            if(data.length > 0){
                data.forEach(item => {

                    if(item.status === "success"){
                        labelAbsensi = '<a href="#/absensi/'+item.id_absensi+'" class="btn btn-gradient-success btn-fw btn-sm"> Lihat Absensi </a>';

                    }else{
                        labelAbsensi = '<a href="#/importabsensi?nik='+item.nik+'&&tgl_penggajian='+SEGMENT+'&&id_absensi='+item.id_absensi+' " class="btn btn-gradient-primary btn-fw"> Upload Absensi </a>'
                    }

                    totalGaji = parseInt(item.total_gaji)
                    isNaN(totalGaji) ? resultGaji = '-' : resultGaji = totalGaji


                    html += `
                        <tr>
                            <td> ${no++} </td>
                            <td> ${item.nik} </td>
                            <td> ${item.nama_lengkap} </td>
                            <td> ${item.nama_jabatan} </td>
                            <td> ${resultGaji} </td>
                            <td> ${item.status} </td>
                            <td> ${labelAbsensi} </td>
                        </tr>
                    `
                })
            }

            $(domString.html.showCreatedAbsensi).html(html);
        }

        const renderOnModal = data => {
            console.log(data)
            let html = ''
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr>
                            <td> ${item.nik} </td>
                            <td> ${item.nama_depan} ${item.nama_belakang} </td>
                            <td> ${item.nama_jabatan} </td>
                            <td><button class="btn btn-gradient-primary btn-pilih-karyawan" data-nik="${item.nik}" > Pilih </button>  </td>
                        </tr>
                     `;
                })
            }
            $(domString.html.showListKaryawan).html(html)

        }

        return {
            getDOM: () => domString,
            retrieveAbsensiCreated: data => renderRetrieveAbsensi(data),
            retrieveListOnModal: data => renderOnModal(data)
        }
    })()


    const uploadAbsensiController = (function(URL, UI) {
        const url = URL.getURL()
        const dom = UI.getDOM()

        const eventListener = function(){
            
            $(dom.btn.pilihKaryawan).on('click', function() {
                getResource(url.showListAdmin, undefined, data => UI.retrieveListOnModal(data) );
                ModalAction(dom.modal.modalKaryawan,'show')
            })

            $(dom.modal.modalKaryawan).on('click',dom.btn.selectNik, function() {
                var nik = $(this).data('nik')
                $('#nik_karyawan').val(nik)
                ModalAction(dom.modal.modalKaryawan, 'hide')
            })


            $(dom.form.formAddPenggajian).validate({
                rules:
                {
                    nik_karyawan:
                    {
                        required: true 
                    },
                    tanggal_penggajian: 
                    {
                        required: true 
                    }
                },
                messages: 
                {
                    nik_karyawan: 
                    {
                        required: 'Nik Tidak Boleh Kosong'
                    },
                    tanggal_penggajian:
                    {
                        required: 'Tanggal Tidak Boleh Kosong'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertBefore(element)
                },
                submitHandler: function(form){
                    postResource(url.addPenggajian, form, data =>  {
                        load_absensi_created()
                        $('#nik_karyawan').val("")
                    });
                }
            })

        }

        const load_absensi_created = () => getResource(url.fetch_absensi_created, undefined, data => UI.retrieveAbsensiCreated(data) );

       

        return {
            init: () => {
                load_absensi_created()
                eventListener()
                console.log('init....')
            }
        }


    })(uploadAbsensiURL, uploadAbsensiUI)

    uploadAbsensiController.init()


})()