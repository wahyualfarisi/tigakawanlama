(function() {
    "use strict"

    const InfoGajiUrl = (function() {
        const urlString = {
            fetch_informasi_gaji: `${BASE_URL}master/penggajian/Penggajian/informasi_gaji`
        }
        return {
            getURL: () => urlString
        }
    })()


    const InfoGajiInterface = (function() {
        const domString = {
            showList: '#show__list__informasi_gaji'
        }

        const renderInformasi = data => {
            let html = '', no = 1;
            if(data.length > 0){
                data.forEach(item => {
                    html += `

                    <tr> 
                            <td> ${no++} </td>
                            <td> ${item.tgl_penggajian} </td>
                            <td> ${item.status_penggajian} </td>
                            <td> ${item.nama_admin} </td>
                            <td> ${formatRupiah(item.total_pengeluaran_gaji)} </td>
                            <td>
                            <a href="#/detailinformasigaji/${item.tgl_penggajian}" class="btn btn-info" > Detail Informasi </a>
                            </td>
                    </tr>
                    
                    `;  
                })
            }
            $(domString.showList).html(html)
        }


        return {
            getDOM: () => domString,
            retrieveInformasi: data => renderInformasi(data) 
        }
    })()


    const InfoGajiController = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){


        }

        const load_informasi_gaji = () => getResource(url.fetch_informasi_gaji, undefined , data => UI.retrieveInformasi(data) );


        return {
            init: () => {
                console.log('init ')
                load_informasi_gaji();
            }
        }
    })(InfoGajiUrl, InfoGajiInterface)

    InfoGajiController.init()


})()