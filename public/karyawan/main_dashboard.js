(function() {
    "use strict"

    const mainDashboardURL = (function() {
        const urlString = {
            fetch_dashboard: `${BASE_URL}master/Dashboard/dashboard_karyawan`
        }
        return {
            getURL: () => urlString
        }
    })()


    const mainDashboardUI = (function() {
        const domString = {
            showAbsensi: '#show__list__absensi',
            showGaji :'#show__list__gaji'
        }

        const renderAbsensi = data => {
            let html = '';
            if(data.length > 0){
                data.forEach(item => {
                    const {id_absensi, nik, tanggal_import} = item;
                    html += `
                    <tr>
                        <td> ${id_absensi} </td>
                        <td> ${nik} </td>
                        <td> ${tanggal_import} </td>
                        <td> 
                            <a href="#/detailabsensi/${id_absensi}" class="btn btn-info" > Lihat Absensi </a>
                        </td>
                    </tr>
                    
                    `
                })
            }

            $(domString.showAbsensi).html(html)
        }




        const renderGaji = data => {
            let html = "";
            if(data.length > 0){
                data.forEach(item => {
                    const { id_penggajian, id_absensi, potongan, total_lemburan, total_gaji } = item;
                    html += `
                        <tr>
                            <td> ${id_penggajian} </td>
                            <td> ${id_absensi} </td>
                            <td> ${formatRupiah(potongan) } </td>
                            <td> ${formatRupiah(total_lemburan)} </td>
                            <td> ${ formatRupiah(total_gaji) } </td>
                        </tr>
                    `;
                })
            }

            $(domString.showGaji).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveDataDashboard: data => {
                console.log(data)
                renderAbsensi(data.absensi_karyawan)
                renderGaji(data.gaji_karyawan)
            }
        }
    })()


    const mainDashboardController = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_dashboard = () => getResource(url.fetch_dashboard+'/'+NIK, undefined, data => UI.retrieveDataDashboard(data) );


        return {
            init: () => {
                console.log('init ')
                load_dashboard()
            }
        }
    })(mainDashboardURL, mainDashboardUI)

    mainDashboardController.init()


})()