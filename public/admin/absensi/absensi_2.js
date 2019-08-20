(function() {
    "use strict"

    const AbsensiURL = (function() {
        const urlString = {

        }
        return {
            getURL: () => urlString
        }
    })()


    const AbsensiUI = (function() {
        const domString = {
            html : {

            },
            field: {

            },
            btn: {
                uploadAbsensi: '#btn-upload-absensi'
            },
            form: {
                uploadAbsensi: '#form-add-absensi'
            }
        }

        return {
            getDOM: () => domString
        }
    })()


    const AbsensiCTRL = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.btn.uploadAbsensi).on('click', function() {
                $('#modalUploadAbsensi').modal('show')
            })

            $(dom.form.uploadAbsensi).validate({
                rules: {
                    file: {
                        required: true
                     }
                },
                messages: 
                {
                    file: {
                        required: 'Silahkan Pilih file Absensi'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element);
                },
                submitHandler: function(form){
                    $.ajax({
                        url: BASE_URL+'master/absensi/Absensi2/upload_absensi',
                        method: 'post',
                        data: new FormData(form),
                        dataType: 'JSON',
                        contentType: false,
                        cache: false,
                        processData: false,
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
                                console.log(result)
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
                    // dataType: 'JSON',
                    beforeSend: function(){
                        console.log('before send ')
                    },
                    success: function(data){
                        console.log(data)
                    },
                    complete: function(){
                        console.log('complete')
                    }
                })
            })

        }

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
                console.log('segment', SEGMENT)
                eventListener()
            }
        }
    })(AbsensiURL, AbsensiUI)

    AbsensiCTRL.init()


})()