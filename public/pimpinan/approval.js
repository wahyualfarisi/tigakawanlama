
(function() {
    "use strict"

    const approvalURL = (function() {
        const urlString = {
            fetch_data_approval: `${BASE_URL}master/penggajian/Penggajian/approval_gaji`
        }

        return {
            getURL: () => urlString
        }

    })()


    const approvalInterface = (function() {
        const domString = {
           html: {
                showListApproval: '#show__data__approval'
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
                            <td> ${formatRupiah(item.total_pengeluaran_gaji) } </td>
                            <td> 
                                <a href="#/detailinformasigaji/${item.tgl_penggajian}" class="btn btn-info" > Detail Informasi </a>
                            </td>
                        </tr>

                    `;
                })
            }

            $(domString.html.showListApproval).html(html)
        }


        return {
            getDOM: () => domString,
            retrieveApproval: data => renderApproval(data)
        }
    })()


    const approvalController = (function(URL, UI) {
        const url = URL.getURL()
        const dom = UI.getDOM()


        const eventListener = function(){

        }

        const load_approval = () => getResource(url.fetch_data_approval, undefined, data => UI.retrieveApproval(data) );




        return {
            init: () => {
                console.log('init..')
                load_approval()
            }
        }
    })(approvalURL, approvalInterface)

    $(document).ready(function() {
        approvalController.init()
    })



})()