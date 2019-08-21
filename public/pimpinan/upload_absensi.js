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
                        labelAbsensi = `<a href="#/absensi?dataabsensi=${SEGMENT}/${item.nik} " class="btn btn-gradient-success btn-fw btn-sm"> Lihat Absensi </a>`;

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
                // getResource(url.showListAdmin, undefined, data => UI.retrieveListOnModal(data) );
                // ModalAction(dom.modal.modalKaryawan,'show')
                $('#modalUploadAbsensi').modal('show')
            })

            $('#form-add-absensi').validate({
                rules: {
                    file: {
                        required: true 
                    }
                },
                messages: {
                    file: {
                        required: 'File Tidak Boleh Kosong'
                    }
                },
                errorPlacement(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler(form){
                    $.ajax({
                        url: BASE_URL+'master/absensi/Absensi2/upload_absensi',
                        method: 'post',
                        data: new FormData(form),
                        contentType: false,
                        cache: false,
                        processData: false,
                        dataType: 'JSON',
                        success: function(data){
                            const { output, nik } = data;
                            const { data_absensi, jabatan } = output;
                            
                            const result = []
                            if(data_absensi.length > 0){
                                for(var i = 0; i<nik.length; i++)
                                {
                                    const filteredAbsensi = data_absensi.filter(item => item.nik === nik[i]);
                                    const filteredJabatan = jabatan.filter(item => item.nik === nik[i] )
                                    const totalTelat      = hitungTotalTelat(filteredAbsensi)
                                    const totalLemburan   = hitungTotalLembur(filteredAbsensi)
                                    const totalGaji       = hitungTotalGaji(totalTelat, totalLemburan, filteredJabatan)
               
                                    result.push({totalGaji, filteredAbsensi, filteredJabatan, nik: nik[i]  })
                                }
                               
                                let html = '', html2 = '';
                                
                                result.forEach(item => {
                                   
                                    html += `
                                        <tr>
                                           <td><input type="text" name="nik[]" class="form-control" value="${item.nik}" />  </td>
                                           <td><input type="text" name="totallembur[]" class="form-control" value="${item.totalGaji.totalLembur}" />  </td>
                                           <td><input type="text" name="totaltelat[]" class="form-control" value="${item.totalGaji.totalTelat}" />  </td>
                                           <td><input type="text" name="totalgaji[]" class="form-control" value="${item.totalGaji.totalGaji}" />  </td> 
                                       </tr>
                                    `;
                                    console.log(item.filteredAbsensi)
                                    item.filteredAbsensi.forEach(item2 => {
                                     
                                      html2 += `
                                             <input type="hidden" name="tgl_penggajian" value="${SEGMENT}" />
                                             <input type="hidden" name="nik_absensi[]" value="${item2.nik}" />
                                             <input type="hidden" name="tgl_absen[]" value="${item2.tgl_absen}" />
                                             <input type="hidden" name="jam_masuk[]" value="${item2.jam_masuk}" />
                                             <input type="hidden" name="jam_keluar[]" value="${item2.jam_keluar}" />
                                             <input type="hidden" name="scan_masuk[]" value="${item2.scan_masuk}" />
                                             <input type="hidden" name="scan_keluar[]" value="${item2.scan_keluar}" />
                                      `
                                    })
                                    
                                })
                               
                                $('#preview_list').html(html)
                                $('#preview_list_absen').html(html2)

                                $('#modalUploadAbsensi').modal('hide')
                                $('#modalPreviewUpload').modal('show')


                            }else{
                                alert('terjadi kesahalahan')
                            }

                        }
                    })
                }
            })

            $('#form-gajian').on('submit', function(e) {
                e.preventDefault()
                $.ajax({
                    url: BASE_URL+'master/absensi/Absensi2/simpan_penggajian',
                    method: 'post',
                    data: $(this).serialize(),
                    dataType: 'JSON',
                    beforeSend: function(){
                        $('#btn__simpan__absensi').attr('disabled', true).html('loading')
                    },
                    success: function(data){
                        console.log(data)
                        if(data.status === 200){
                            load_absensi_created()
                            $('#modalPreviewUpload').modal('hide')
                        }
                    },
                    complete: function(){
                        $('#btn__simpan__absensi').attr('disabled', false).html('SIMPANNN')
                        load_absensi_created()
                        $('#modalPreviewUpload').modal('hide')

                    }
                })
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

        const hitungTotalTelat = (filtering) => {
            return filtering.map(item => item.telat_perjam)
                             .reduce((a, b) => a + b , 0)
        }

        const hitungTotalLembur = (filtering) => {
            return filtering.map(item => item.lemburan_perjam)
                             .reduce((a, b) => a + b , 0)
        }

        const hitungTotalGaji = (telat, lembur, arrJabatan) => {
            var totalTelat, totalLembur, totalGaji;
            arrJabatan.forEach(item => {
                const { jabatan } = item
                const { gaji, potongan, lemburan  } = jabatan[0]
                totalTelat  = parseInt(telat) * parseInt(potongan);
                totalLembur = parseInt(lembur) * parseInt(lemburan);
                totalGaji   = (gaji - totalTelat) + totalLembur; 
            })
            return { totalTelat, totalLembur, totalGaji } ;
        }

       

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