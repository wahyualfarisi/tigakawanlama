console.log(GLOBAL_NIK)

var UploadabsensiDOM = {
    formUploaded: '#form-upload-absensi',
    preview: '#preview-absensi-karyawan',
    sectionUpload: '#section-upload',
    showKaryawan: '#show-current-karyawan'

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
                                html += '<td><input type="text" name="tgl_absen[]" class="form-control" value="'+item.tgl_absen+'"  readonly  /> </td>';
                                html += '<td><input type="text" name="jam_masuk[]" class="form-control" value="'+item.jam_masuk+'"  readonly  /></td>';
                                html += '<td><input type="text" name="jam_keluar[]" class="form-control" value="'+item.jam_keluar+'"  readonly  /></td>';
                                html += '<td><input type="text" name="scan_masuk[]" class="form-control" value="'+item.scan_masuk+'"  readonly  /></td>';
                                html += '<td><input type="text" name="scan_keluar[]" class="form-control" value="'+item.scan_keluar+'"  readonly  /></td>';
                                html += '<td><input type="text" name="terlambat[]" class="form-control" value="'+item.terlambat+'"  readonly  /></td>';
                                html += '<td><input type="text" name="total_jam_kerja[]" class="form-control" value="'+item.total_jam_kerja+'"  readonly  /></td>';
                        html += '</tr>';
                    })
                }
                $(UploadabsensiDOM.preview).html(html);
            },
            showKaryawan: function(data){
                var html = '';
                if(data.length > 0){
                    data.forEach(function(item) {
                        html += '<tr>';
                            html += '<td>'+item.nik+'</td>';
                            html += '<td>'+item.nama_depan+' '+item.nama_belakang+'</td>';
                            html += '<td>'+item.nama_jabatan+' </td>';
                            html += '<td>'+GLOBAL_TGL_PENGGAJIAN+'</td>';
                        html += '</tr>';
                    })
                }
                $(UploadabsensiDOM.showKaryawan).html(html);
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
                             UIupload.previewAbsensi(parse);
                             $(UploadabsensiDOM.sectionUpload).css('display','none')
                             $('#section-form-simpan-absensi').css('display','block');
                        }
                    })
                }
            }
        );

        $('#form-save-karyawan').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: BASE_URL+'master/absensi/Absensi/simpanabsensi',
                method: 'post',
                data: new FormData(this),
                processData: false,
                contentType: false,
                cache: false,
                async: false,
                success: function(data){
                    console.log(data);
                }
            })
        })
    }



    var load_karyawannik = function(){
        $.ajax({
            url: BASE_URL+'master/absensi/Absensi/show_karyawan_nik/'+GLOBAL_NIK,
            method: 'post',
            dataType: 'json',
            success: function(data){
                UIupload.showKaryawan(data);
            }
        })
    }


    return {
        init: function(){
            console.log('initalize app upload absensi')
           
            setupImportListener();
            load_karyawannik();
        }
    }
})(UploadabsensiUI)


$(document).ready(function() {
    $('#section-form-simpan-absensi').css('display','none');
    UploadabsensiController.init()
})

