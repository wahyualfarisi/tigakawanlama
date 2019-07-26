(function() {
    "use strict"

    const laporanURL = (function() {

        const urlString = {
            fetch_laporan: BASE_URL+'master/penggajian/Penggajian/laporan'
        }

        return {
            getURL: () => urlString
        }
    })()


    const laporanInterface = (function() {
        const domString = {
            form: {
                laporan: '#form-lihat-laporan'
            },
            field: {
                bulan1: '#dari_bulan',
                bulan2: '#sampai_bulan'

            },
            html: {
                showLaporan: '#show__laporan',
                areaprint: '#areaprint',
                showbuttonlaporan: '.showbuttonlaporan'
            },
            btn: {
                print: '#btn_print_laporan'
            }
        }


        const renderLaporan = data => {
            let storeTOTAL = []
            let html = "", no = 1;
            console.log(data);
            if(data.length > 0){
                $(domString.html.showbuttonlaporan).css('display','block')
                data.forEach(item => {
                    storeTOTAL.push(parseInt(item.total_gaji) )
                    html += `
                        <tr>
                            <td> ${no++} </td>
                            <td> ${item.id_penggajian} </td>
                            <td> ${item.nik} </td>
                            <td> ${item.nama_karyawan} </td>
                            <td> ${item.tgl_penggajian} </td>
                            <td> ${item.nama_jabatan} </td>
                            <td> ${item.total_potongan} </td>
                            <td> ${item.total_lemburan} </td>
                            <td> ${item.total_gaji} </td>
                        </tr>
                    `;
                })
                const total = storeTOTAL.reduce((a,b) => a + b, 0)

                html += `
                        <tr class="bg-gradient-info">
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td style="font-size: 20px;">TOTAL </td>
                            <td style="font-size: 20px;"> ${formatRupiah(total.toString()) } </td>
                        </tr>
                `;
            }
            
            $(domString.html.showLaporan).html(html)
        }

        return {
            getDOM: () => domString,
            retrieveLaporan: data => renderLaporan(data)
        }
    })()


    const laporanController = (function(URL, UI) {


        const dom = UI.getDOM()
        const url = URL.getURL()
        
        const eventListener = function(){

            $(dom.form.laporan).on('submit', function(e) {
                e.preventDefault()
                var bulan1 = $(dom.field.bulan1).val()
                var bulan2 = $(dom.field.bulan2).val()

                if(bulan1 !== "" && bulan2 !== ""){
                    postResource(url.fetch_laporan, this, data => UI.retrieveLaporan(JSON.parse(data)) )
                }else{
                    return false;
                }

            })

            $(dom.btn.print).on('click', function() {
                var mode = 'iframe';
                var close = mode == "popup";
                var options = {
                    mode: mode,
                    popClose: close
                }
                $(dom.html.areaprint).printArea(options)
            })
            


        }

        return {
            init: () => {
                console.log('init..')
                eventListener()
                $(dom.html.showbuttonlaporan).css('display','none')
            }
        }


    })(laporanURL, laporanInterface)

    laporanController.init();

})()