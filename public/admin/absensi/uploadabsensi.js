var UploadabsensiDOM = {
    formUploaded: '#form-upload-absensi',
    preview: '#preview-absensi-karyawan'

}


var UploadabsensiUI = (function() {
        return {
            previewAbsensi: function(obj){
                console.log(obj)
                var html = '' , i = 0;
                if(obj.length > 0)
                {
                    obj.forEach(function(item) {
                        html += '<tr>';
                                html += '<td>'+item.tgl_absen+'</td>';
                                html += '<td>'+item.jam_masuk+'</td>';
                                html += '<td>'+item.jam_keluar+'</td>';
                                html += '<td>'+item.scan_masuk+'</td>';
                                html += '<td>'+item.scan_keluar+'</td>';
                                html += '<td>'+item.terlambat+'</td>';
                                html += '<td>'+item.total_jam_kerja+'</td>';
                        html += '</tr>';
                    })
                }
                $(UploadabsensiDOM.preview).html(html);
            }
        }
})();


var UploadabsensiController = (function(UIupload) {


    var setupImportListener = function(){

        $(UploadabsensiDOM.formUploaded).validate(
            {
                rules: 
                {
                    file: 
                    {
                        required: true
                    }
                },
                messages: 
                {
                    file:
                    {
                        required: 'Silahkan Pilih File Absensi'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    $.ajax({
                        url: BASE_URL+'master/Absensi/absensi/upload_absensi',
                        method: 'post',
                        data: new FormData(form),
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function(data){
                            $('#file').val('')
                             localStorage.setItem('absensi', JSON.stringify(data))
                            var parse = JSON.parse(data);
                            UIupload.previewAbsensi(parse)
                        }
                    })
                }
            }
        )


    }


    return {
        init: function(){
            console.log('initalize app upload absensi')
            setupImportListener();
        }
    }
})(UploadabsensiUI)


$(document).ready(function() {
    UploadabsensiController.init()
})

