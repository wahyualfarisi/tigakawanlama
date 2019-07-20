console.log(GLOBAL_NIK)

var UploadabsensiDOM = {
    formUploaded: '#form-upload-absensi',
    preview: '#preview-absensi-karyawan',
    sectionUpload: '#section-upload',
    sectionCalcGaji: '#section-calc-gaji',
    showKaryawan: '#show-current-karyawan',
    labelMsg: '#messages',
    btnSaveAbsensi: '#btn-save-absensi',
    btnReupload: '#btn-reupload'
}
var perJamTelat = [];
var perJamLembur = [];


var UploadabsensiUI = (function() {
        return {
            previewAbsensi: function(obj){
                console.log(obj)
                var html = '' , i = 0, label;
                if(obj.length > 0)
                {
                    obj.forEach(function(item) {
                        console.log(item.lemburan_perjam)
                        item.telat_perjam !== 0 ? perJamTelat.push(item.telat_perjam) : false;
                        item.lemburan_perjam !== 0 ? perJamLembur.push(item.lemburan_perjam) : false;

                        if(item.nik.toString() !== GLOBAL_NIK){
                            label = 'bg-gradient-danger';
                        }else{
                            label = '';
                        }
                        html += '<tr>';
                                html += '<td class="'+label+'" ><input type="text" name="nik[]" class="form-control" value="'+item.nik+'"  readonly  /> </td>';
                                html += '<td><input type="text" name="tgl_absen[]" class="form-control" value="'+item.tgl_absen+'"  readonly  /> </td>';
                                html += '<td><input type="text" name="jam_masuk[]" class="form-control" value="'+item.jam_masuk+'"  readonly  /></td>';
                                html += '<td><input type="text" name="jam_keluar[]" class="form-control" value="'+item.jam_keluar+'"  readonly  /></td>';
                                html += '<td><input type="text" name="scan_masuk[]" class="form-control" value="'+item.scan_masuk+'"  readonly  /></td>';
                                html += '<td><input type="text" name="scan_keluar[]" class="form-control" value="'+item.scan_keluar+'"  readonly  /></td>';
                                html += '<td><input type="text" name="terlambat[]" class="form-control" value="'+item.terlambat+'"  readonly  /></td>';
                                html += '<td><input type="text" name="total_jam_kerja[]" class="form-control" value="'+item.total_jam_kerja+'"  readonly  /></td>';
                        html += '</tr>';
                    });
                }

                if(obj[0].nik.toString() !== GLOBAL_NIK.toString() ){
                    $(UploadabsensiDOM.labelMsg).css('display','block');
                    var html2 = '';
                    html2 += '<div style="margin-top: 20px;" >';
                        html2 += '<p class="text-center" style="color: red; font-weight: bold; font-size: 15px;"> Nik Tidak Sesuai, Silahkan Pilih file sesuai nik karyawan </p>';
                        html2 += '<div style="margin-top: 20px; margin-bottom: 20px;" class="text-center" >';
                            html2 += '<button class="btn btn-gradient-primary" id="btn-reupload"> Upload Ulang </button>';
                        html2 += '</div>';
                    html2 += '</div>';

                    $(UploadabsensiDOM.labelMsg).html(html2);
                    $(UploadabsensiDOM.btnSaveAbsensi).css('display','none');
                    $(UploadabsensiDOM.sectionCalcGaji).css('display','none');
                }else{
                    $(UploadabsensiDOM.btnSaveAbsensi).css('display','block');
                    $(UploadabsensiDOM.sectionCalcGaji).css('display','block');

                    //load perhitungan gaji
                    var getDataGaji   = localStorage.getItem('datagaji');
                    var parseJson     = JSON.parse(getDataGaji);
                    var totalTelat    = perJamTelat.reduce((a,b) => a + b, 0);
                    var totalLembur   = perJamLembur.reduce((a, b) => a + b, 0);

                    var lemburan;
                    lemburan = parseInt(parseJson[0].lemburan) * parseInt(totalLembur);

                    var totalPotongan = totalTelat * parseInt(parseJson[0].potongan) ;
                    $('#gaji').val(parseJson[0].gaji);
                    $('#potongan').val(totalPotongan);
                    $('#total_gaji').val((parseInt(parseJson[0].gaji - parseInt(totalPotongan)) + lemburan  )); 
                    $('#total_lembur').val(lemburan);
                    console.log(parseJson[0].lemburan)
                    console.log(totalLembur)
                }

                $(UploadabsensiDOM.preview).html(html);
            },
            showKaryawan: function(data){
                localStorage.setItem('datagaji', JSON.stringify(data) );
                var html = '';
                if(data.length > 0){
                    data.forEach(function(item) {
                        html += '<tr>';
                            html += '<td>'+item.nik+'</td>';
                            html += '<td>'+item.nama_depan+' '+item.nama_belakang+'</td>';
                            html += '<td>'+item.kode_jabatan+' </td>';
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
                        url: BASE_URL+'master/absensi/Absensi/upload_absensi',
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
                    var parse = JSON.parse(data);
                    if(parse.code === 200){
                        $.notify(parse.msg, 'success');
                        location.hash = '#/importabsensi/'+GLOBAL_TGL_PENGGAJIAN;
                    }
                }
            })
        });

        $(document).on('click', UploadabsensiDOM.btnReupload, function() {
            $(UploadabsensiDOM.preview).html("");
            $(UploadabsensiDOM.sectionUpload).css('display','block').addClass("animaed fadeInLeft");
            $(UploadabsensiDOM.labelMsg).css('display','none');
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
            $(UploadabsensiDOM.sectionCalcGaji).css('display','none')
            setupImportListener();
            load_karyawannik();
        }
    }
})(UploadabsensiUI)


$(document).ready(function() {
    $('#section-form-simpan-absensi').css('display','none');
    UploadabsensiController.init()
})

