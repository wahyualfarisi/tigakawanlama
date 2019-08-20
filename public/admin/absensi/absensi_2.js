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

        const renderCreatedAbsensi = obj => {
            var html, no = 1, labelAbsensi, totalGaji, resultGaji;

            if(obj.length > 0 ){
                obj.forEach(function(item) {
                    if(item.status === 'success'){
                        labelAbsensi = `<a href="#/absensi?dataabsensi=${SEGMENT}/${item.nik} " class="btn btn-gradient-success btn-fw btn-sm"> Lihat Absensi </a>`;
                        
                    }else{
                        labelAbsensi = '<a href="#/uploadabsensi?nik='+item.nik+'&&tgl_penggajian='+SEGMENT+'&&id_absensi='+item.id_absensi+' " class="btn btn-gradient-primary btn-fw"> Upload Absensi </a>';
                    }
                    
                    totalGaji = parseInt(item.total_gaji);
                    isNaN(totalGaji) ? resultGaji = '-' :  resultGaji =  formatRupiah(totalGaji.toString()) ;

                    
                    html += '<tr>';
                        html += '<td><button data-idabsensi="'+item.id_absensi+'" class="btn-delete-absensi"> <i class="mdi mdi-delete-forever"> </i> </button> </td>';
                        html += '<td>'+no+++' </td>';
                        html += '<td>'+item.nik+'</td>'
                        html += '<td>'+item.nama_lengkap+'</td>';
                        html += '<td>'+item.nama_jabatan+' </td>';
                        html += '<td>'+resultGaji+' </td>';
                        html += '<td>'+item.status+' </td>';
                        html += '<td>'+labelAbsensi+' </td>';
                    html += '</tr>';
                })
            }else{
                html += '<tr>';
                     html += '<td colspan="7" class="text-center"> <img src="'+BASE_URL+'assets/img/no_data.svg'+'" width="400px" /> <br> Tidak Ada Data </td>';
                html += '</tr>';
            }
            $('#show-created-absensi').html(html);
        }

        return {
            getDOM: () => domString,
            getAbsensiCreated: data => renderCreatedAbsensi(data)
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

            $('#btn-send-to-owner').on('click', function() {
                var html = '';
            html += '<div>';
                html += '<p> Data absensi untuk penggajian '+SEGMENT+' siap di kirim ke owner ? ';
                html += '<div>';
                    html += '<button class="btn btn-primary btn-kirim" > Lanjutkan </button>'
                html += '</div>';
            html += '</div>';
                $('#content-modal').html(html)
                $('#modalNotif').modal('show')
            })

            $('#modalNotif').on('click', '.btn-kirim', function() {
                $.ajax({
                    url: BASE_URL+'master/absensi/Absensi/waiting_approved',
                    method: 'post',
                    data: {status: 'waiting', tgl: SEGMENT},
                    success: function(data){
                         var parse = JSON.parse(data)
                         if(parse.code === 200){
                             $.notify(parse.msg, 'success')
                             location.hash = '#/penggajian'
                             $('#modalNotif').modal('hide')
                         }else{
                             $.notify(parse.msg, 'error')
                         }
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

        const load_absensi_created = () => {
            $.ajax({
                url: BASE_URL+'master/absensi/Absensi/show_absensi_created/'+SEGMENT,
                method: 'get',
                dataType: 'json',
                success: function(data){
                    UI.getAbsensiCreated(data);
                    console.log(data)
                }
            })
        }

        
        return {
            init: () => {
                console.log('segment', SEGMENT)
                eventListener()
                load_absensi_created()
            }
        }
    })(AbsensiURL, AbsensiUI)

    AbsensiCTRL.init()


})()