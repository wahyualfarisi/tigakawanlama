(function() {
    "use strict"

    const slipGajiURL = (function() {
        const urlString = {
            fetch_informasi_slip: BASE_URL+'master/karyawan/Karyawan/fetch_slipi/'+NIK
        }

        return {
            getURL: () => urlString
        }
    })()


    const slipInterface = (function() {
        const domString = {
            html: {
                totalSlip: '#total__jumlah__absensi',
                showSlipGaji: '#show__informasi__slip'
            }
        }

        const renderInformasiSlip = data => {
            let html = ""
            console.log(data);
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                            <tr>
                                <td> ${item.id_absensi} </td>
                                <td> ${item.tgl_penggajian} </td>
                                <td> ${item.nik} </td>
                                <td> ${item.nama_lengkap} </td>
                                <td> ${formatRupiah(item.total_gaji)} </td>
                                <td> <a href="#/detailabsensi/${item.id_absensi}" class="btn btn-info" > Lihat Absensi </a> </td>
                            </tr>
                    `;
                })
            }

            $(domString.html.showSlipGaji).html(html);
        }

        const renderTotalSlip = data => {
            $(domString.html.totalSlip).html(data.rows[0])
        }

        return {
            getDOM: () => domString,
            retrieveInformasiSlip: res => {
                renderInformasiSlip(res.data)
                renderTotalSlip(res)
            }
        }
    })()

    const slipController = (function(URL, UI) {
        const dom = UI.getDOM()
        const url = URL.getURL()

        const eventListener = function(){

        }

        const load_informasi_slip = () => getResource(url.fetch_informasi_slip, undefined, data => UI.retrieveInformasiSlip(data) );



        return {
            init: () => {
                console.log('init...')
                eventListener()
                load_informasi_slip()
            }
        }



    })(slipGajiURL, slipInterface)



    slipController.init()

})()