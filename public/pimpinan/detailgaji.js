(function() {
    "use strict"


     const detailGajiURL = (function() {
        const urlString = {
            fetch_detail: `${BASE_URL}master/penggajian/Penggajian/detail_penggajian/${TGL_PENGGAJIAN}`,
            approvedGaji: `${BASE_URL}master/penggajian/Penggajian/approved_penggajian`,
            rejectGaji: `${BASE_URL}master/penggajian/Penggajian/reject_penggajian`
            
        }

        return {
            getURL: () => urlString
        }
     })()   



     const detailGajiUI = (function() {
        const domString = {
            html: {
                listPenerimaGaji: '#list__penerima__gaji',
                dataPenggajian: '#data__penggajian',
                listAbsensi: '#show__list__absensi'
            },
            btn: {
                btnApproved: '.btn__approved__gaji',
                btnReject: '.btn__reject__gaji'
            },
            modal: {
                modalApprovedGaji: '#modalApprovedGaji',
                modalRejectGaji: '#modalRejectGaji'
            },
            form: {
                formApproved: '#form-approved-gaji',
                formReject: '#form-reject-gaji'
            }
        }

        const renderPenerimaGaji = data => {
            let html = '', no = 1;
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr>
                            <td> ${no++} </td>
                            <td> ${item.nik} </td>
                            <td> ${item.nama_karyawan} </td>
                            <td> ${item.jk} </td>
                            <td> ${item.nama_jabatan} </td>
                            <td> ${formatRupiah(item.total_gaji)} </td>
                        </tr>
                    
                    `;
                })
            }
            $(domString.html.listPenerimaGaji).html(html);
        }

        const renderAbsensi = data => {
            let html = ''
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr>
                            <td><a class="btn btn-info" style="color: white" >${item.id_absensi} </a>  </td>
                            <td>${item.nik} </td>
                            <td>${item.nama_karyawan} </td>
                            <td>${item.nama_jabatan} </td>
                            <td>${formatRupiah(item.gaji)} </td>
                            <td>${formatRupiah(item.potongan) } </td>
                            <td>${formatRupiah(item.lemburan) } </td>
                            <td>${formatRupiah(item.total_potongan) } </td>
                            <td>${formatRupiah(item.total_lemburan) } </td>
                            <td>${formatRupiah(item.total_gaji) } </td>
                        </tr>
                    `
                })
            }

            $(domString.html.listAbsensi).html(html)
        }

        const renderCardPenggajian = data => {
            let html = ""
            if(data.status_penggajian === 'waiting'){
                
                var status = 'Menunggu verifikasi anda';
                html = `
                    <h5>Tanggal Penggajian</h5>
                    <p>${data.tgl_penggajian}</p>
                    <h5>Status</h5>
                    <p>${status}</p>

                    <div class="row">
                        <div class="col-md-6">
                                <button class="btn btn-info btn__approved__gaji" data-tgl_penggajian="${data.tgl_penggajian}" >APPROVED</button>
                        </div>
                        <div class="col-md-6">
                                <button class="btn btn-danger btn__reject__gaji" data-tgl_penggajian="${data.tgl_penggajian}" >REJECT</button>
                        </div>
                    </div>
            `;

            
            }else{
                html = ""
                $('.btn__upload__gaji__admin').css('display','none')
            }
            $(domString.html.dataPenggajian).html(html)
            
        }


        return {
            getDOM: () => domString,
            retrieveDetail: data => {
                renderPenerimaGaji(data.detail_penggajian);
                renderAbsensi(data.detail_penggajian);
                renderCardPenggajian(data.data_penggajian);
            }
        }

     })()


     const detailGajiController = (function(URL, UI) {

        const url = URL.getURL()
        const dom = UI.getDOM()

        const eventListener = function(){


            $(dom.html.dataPenggajian).on('click',dom.btn.btnApproved, function() {
                var tgl_penggajian = $(this).data('tgl_penggajian')
                $('#tgl_penggajian').val(tgl_penggajian)
                ModalAction(dom.modal.modalApprovedGaji,'show')
            })



            $(dom.html.dataPenggajian).on('click', dom.btn.btnReject, function() {
                var tgl_penggajian = $(this).data('tgl_penggajian')
                $('#tgl_penggajian2').val(tgl_penggajian)
                ModalAction(dom.modal.modalRejectGaji,'show')
            })


            
            $(dom.form.formApproved).on('submit', function(e) {
                e.preventDefault()
                postResource(url.approvedGaji, this, data => {
                    var parse = JSON.parse(data);
                    if(parse.code === 200){
                        $.notify(parse.msg, 'success' )
                        location.hash = '#/approvalgaji'
                        ModalAction(dom.modal.modalApprovedGaji, 'hide')
                    }else{
                        $.notify('danger', parse.msg)
                        location.hash = '#/approvalgaji'
                    }
                })
            })

            $(dom.form.formReject).on('submit', function(e) {
                e.preventDefault()
                postResource(url.rejectGaji, this, data => console.log(data) )
            })

            


        }

        const load_detail = () => getResource(url.fetch_detail, undefined, data => UI.retrieveDetail(data) );

        



        return {
            init: () => {
                eventListener()
                load_detail()
            }
        }
     })(detailGajiURL, detailGajiUI)

     $(document).ready(function() {

         detailGajiController.init()
     })

})()