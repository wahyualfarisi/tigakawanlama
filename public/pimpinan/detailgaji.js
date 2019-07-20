(function() {
    "use strict"


     const detailGajiURL = (function() {
        const urlString = {
            fetch_detail: `${BASE_URL}master/penggajian/Penggajian/detail_penggajian/${TGL_PENGGAJIAN}`,
            
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
                            <td> ${item.total_gaji} </td>
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
            if(data.status_penggajian === 'waiting'){
                var status = 'Menunggu verifikasi anda';
            }
            let html = `
                <h5>Tanggal Penggajian</h5>
                <p>${data.tgl_penggajian}</p>
                <h5>Status</h5>
                <p>${status}</p>
            `;

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