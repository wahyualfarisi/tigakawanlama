(function() {

    const printSliURL = (function() {
        const urlString = {
            fetch_slip: BASE_URL+'master/karyawan/Karyawan/print_slip/'+SEGMENT
        }

        return {
            getURL: () => urlString
        }
    })()


    const printInterface = (function() {
        const domString = {
            namaKaryawan: '#nama__karyawan',
            emailKaryawan: '#email__karyawan',
            tanggalLahir: '#tanggal__lahir__karyawan',
            jk: '#jk__karyawan',
            noRek: '#no__rek__karyawan',
            namaBank: '#nama__bank__karyawan',
            atasName: '#atas__nama__karyawan',
            jabatan: '#jabatan__karyawan',
            gajiJabatan: '#gaji__jabatan',
            potongan: '#potongan__karyawan',
            lemburan: '#lemburan__karyawan',
            tglPenggajian: '#tanggal__penggajian',
            totalGaji : '#total__gaji__yang__diterima',
            totalPotongan: '#total__potongan',
            totalLemburan: '#total__lemburan',
            printArea: '#slip__gaji',
            btnPrint: '#btn_print'
        }


        const renderPrintSlip = data => {
            console.log(data)
            if(data.length > 0){
                data.forEach(item => {
                    $(domString.namaKaryawan).html(item.nama_lengkap)
                    $(domString.emailKaryawan).html(item.email)
                    $(domString.tanggalLahir).html(item.tgl_lahir)
                    $(domString.jk).html(item.jk)
                    $(domString.noRek).html(item.no_rekening)
                    $(domString.namaBank).html(item.nama_bank)
                    $(domString.atasName).html(item.atas_nama)
                    $(domString.jabatan).html(item.nama_bank)
                    $(domString.gajiJabatan).html(formatRupiah(item.gaji) )
                    $(domString.potongan).html(formatRupiah(item.potongan) )
                    $(domString.lemburan).html(formatRupiah(item.lemburan) )
                    $(domString.tglPenggajian).html(item.tgl_penggajian)
                    $(domString.totalGaji).html( formatRupiah(item.total_gaji) )
                    $(domString.totalPotongan).html( formatRupiah(item.total_potongan) )
                    $(domString.totalLemburan).html( formatRupiah(item.total_lemburan) )
                })
            }
        }


        return {
            getDOM: () => domString,
            retrievePrintSlip: data => renderPrintSlip(data)
        }

    })()


    const printController = (function(URL, UI) {
        const dom = UI.getDOM()
        const url = URL.getURL()


        const eventListener = function(){

            $(dom.btnPrint).on('click', function() {
                var mode = 'iframe';
                var close = mode == "popup";
                var options = {
                    mode: mode,
                    popClose: close
                }
                $(dom.printArea).printArea(options)


            })


        }


        const load_print_slip = () => getResource(url.fetch_slip, undefined, data => UI.retrievePrintSlip(data) );


        return {
            init: () => {
                console.log('init...')
                eventListener()
                load_print_slip()
            }
        }

    })(printSliURL, printInterface)


    printController.init()

})()