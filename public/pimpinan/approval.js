
(function() {
    "use strict"

    const approvalURL = (function() {
        const urlString = {
            fetch_data_approval: `${BASE_URL}master/penggajian/Penggajian/approval_gaji`,
            fetch_informasi: `${BASE_URL}master/penggajian/Penggajian/informasi_gaji`
        }

        return {
            getURL: () => urlString
        }

    })()


    const approvalInterface = (function() {
        const domString = {
           html: {
                showListApproval: '#show__data__approval',
                showInformasiPenggajian: '#show__informasi__penggajian'
           }
        }

        

        const renderApproval = data => {
            let html = '', no = 1;
            if(data.length > 0){
                data.forEach(item => {

                    html += `
                        <tr>
                            <td>${no++}</td>
                            <td>${item.tgl_penggajian} </td>
                            <td>${item.status_penggajian} </td>
                            <td>${item.nama_admin}</td>
                            <td>${item.jumlah_absensi} </td>
                            <td> ${item.total_pengeluaran_gaji} </td>
                            <td> 
                                <a href="#/detailinformasigaji/${item.tgl_penggajian}" class="btn btn-info" > Detail Informasi </a>
                            </td>
                        </tr>
                    `;
                })
            }
            $(domString.html.showListApproval).html(html)
        }


        const renderInformasi = data => {
            console.log(data);
            let html = "", no = 1;
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr>
                            <td> ${no++} </td>
                            <td> ${item.tgl_penggajian} </td>
                            <td> ${item.status_penggajian} </td>
                            <td> ${item.nama_admin} </td>
                            <td> ${item.jumlah_absensi} </td>
                            <td> ${formatRupiah(item.total_pengeluaran_gaji) } </td>
                            <td> 
                            <a href="#/detailinformasigaji/${item.tgl_penggajian}" class="btn btn-info" > Detail Informasi </a>
                            </td>
                        </tr>
                    
                    `;
                })
            }

            $(domString.html.showInformasiPenggajian).html(html)

        }


        return {
            getDOM: () => domString,
            retrieveApproval: data => renderApproval(data),
            retrieveDataInformasi: data => renderInformasi(data)
        }
    })()


    const approvalController = (function(URL, UI) {
        const url = URL.getURL()
        const dom = UI.getDOM()


        const eventListener = function(){


        }

        const load_approval = () => getResource(url.fetch_data_approval, undefined, data => UI.retrieveApproval(data) );

        const load_informasi_penggajian = () => getResource(url.fetch_informasi, undefined, data => UI.retrieveDataInformasi(data) );




        return {
            init: () => {
                console.log('init..')
                load_approval()
                load_informasi_penggajian()
            }
        }
    })(approvalURL, approvalInterface)

    $(document).ready(function() {
        approvalController.init()
    })



})()