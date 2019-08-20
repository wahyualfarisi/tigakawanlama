var detailAbsenUI = (() => {
    const domString = {
        show: '#show__detail__absensi'
    }

    const storeData = {
        total_telat_perjam: []
    }

    const renderAbsensi = data => {
        var html = '', no = 1; 
        data.forEach(item => {
            console.log(item)
            storeData.total_telat_perjam.push(item.telat_perjam);
            html += '<tr>';
                html += '<td>'+no+++'</td>';
                html += '<td>'+item.tgl_absen+' </td>';
                html += '<td>'+item.jam_masuk+'</td>';
                html += '<td>'+item.jam_keluar+'</td>';
                html += '<td>'+item.scan_masuk+'</td>';
                html += '<td>'+item.scan_keluar+'</td>';
                html += '<td>'+item.terlambat+'</td>';
                html += '<td>'+item.lemburan_perjam+'</td>';
            html += '</tr>';
        })
        $(domString.show).html(html)
    }

    



    return {
        getDOM: function(){
            return domString;
        },
        retrieveAbsensi(data){
            data.length > 0 ? renderAbsensi(data) : false;
        },
        getStore(){
            return storeData;
        }
    }
})()



var detailAbsenController = ( (UI) => {
    const DOM = UI.getDOM();

    const url = {
        fetch: BASE_URL+'master/absensi/Absensi/fetch_absensi_karyawan?id='+SEGMENT,
    }

    var eventListener = function(){

    }


    const load_absen_detail = () => {
        getData(url.fetch, data => {
            UI.retrieveAbsensi(data)
    
        });
    }


    const postData = (url, form, callback) => {
        $.ajax({
            url,
            method: 'post',
            data: new FormData(form),
            processData: false,
            contentType: false,
            async: false,
            cache: false,
            success:function(data){
                callback(data)
            }
        })
    }

    const getData = (url, callback) => {
        $.ajax({
            url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                callback(data);
            }
        })
    }

    

    return {
        init: () => {
            eventListener()
            load_absen_detail()
            console.log('initialize app ..', SEGMENT)
        }
    }
})(detailAbsenUI)


$(document).ready(function() {
    detailAbsenController.init()
})