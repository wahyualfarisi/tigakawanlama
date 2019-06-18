console.log('absensi is running', SEGMENT);
var createdAbsensiProgress = {
    value: 0
}


var createdAbsensiDOM = {
    labelShowCreatedAbsensi: '#show-created-absensi',
    labelProgress: '#labelProgress',
    labelWidgetAbsensi: '#labelWidgetAbsensi',
    btnPilihKaryawan: '#btn-pilih-karyawan',
    modalKaryawan: '#modalKaryawan',
    labelShowOnModalKaryawan: '#show-karyawan',
    nik_karyawan: '#nik_karyawan',
    formSearchKaryawan: '#form-search-on-modal',
    formAddPenggajian: '#form-add-penggajian'
}


var createdAbsensiUI = (function() {
    return {
        getAbsensiCreated: function(obj){
            console.log(obj)
            var html, no = 1, labelAbsensi;

            if(obj.length > 0 ){
                obj.forEach(function(item) {
                    if(item.status === 'success'){
                        labelAbsensi = '<button type="button" class="btn btn-gradient-success btn-fw"> Lihat Absensi </button>';
                    }else{
                        labelAbsensi = '<button class="btn btn-gradient-primary btn-fw"> Upload Absensi </button>';
                    }
                    html += '<tr>';
                        html += '<td>'+no+++' </td>';
                        html += '<td>'+item.nik+'</td>'
                        html += '<td>'+item.nama_lengkap+'</td>';
                        html += '<td>'+item.nama_jabatan+' </td>';
                        html += '<td>'+item.status+' </td>';
                        html += '<td>'+labelAbsensi+' </td>';
                    html += '</tr>';
                })
            }else{
                html += '<tr>';
                     html += '<td colspan="6" class="text-center"> <img src="'+BASE_URL+'assets/img/no_data.svg'+'" width="400px" /> <br> Tidak Ada Data </td>';
                html += '</tr>';
            }
            $(createdAbsensiDOM.labelShowCreatedAbsensi).html(html);
        },
        getProgress: function(data){
            var countprogress = 100 / data.total_karyawan ;
            var result = countprogress;
            var percentage = data.total_absensi * result.toFixed(1);

            var html = '';
            html += '<label>Progress '+data.total_absensi+' dari '+data.total_karyawan+' Karyawan </label>';
            html += '<div class="progress">';
                html += '<div class="progress-bar bg-success" role="progressbar" style="width: '+percentage.toString()+'%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>';
            html += '</div>';  
            $(createdAbsensiDOM.labelProgress).html(html); 
        },
        widgetAbsensi: function(obj){
            var html = '';
            if(obj.length > 0){
                obj.forEach(function(item) {
                        html += '<div class="card bg-gradient-info  card-img-holder text-white">';
                            html += '<div class="card-body">';
                            html += '<h4 class="font-weight-normal mb-3">'+item.tgl_penggajian+'<i class="mdi mdi-bookmark mdi-24px float-right"></i></h4>';
                            html += '<h2 class="mb-2">'+item.status_penggajian+'</h2>';
                            html += '<h5>Di input oleh '+item.nama_admin+' </h5>';
                            html += '</div>';
                        html += '</div>';
                })
            }
            $(createdAbsensiDOM.labelWidgetAbsensi).html(html);
        },
        getDataOnModal: function(data){
            var html = '', no = 1;
            if(data.length > 0){
                data.forEach(function(item) {
                    html += '<tr>';
                      html += '<td> <input type="checkbox" value="'+item.nik+'" /></td>';
                      html += '<td>'+item.nik+'</td>';
                      html += '<td>'+item.nama_depan+'</td>';
                      html += '<td><button class="btn btn-gradient-primary btn-pilih-karyawan" data-nik="'+item.nik+'" > Pilih </button></td>';
                    html += '</tr>';
                });
            }
            $(createdAbsensiDOM.labelShowOnModalKaryawan).html(html);
        }
    }
})();


var createdAbsnsiController = (function(CreatedUI) {

    var createdAbsensiListener = function(){

        $(createdAbsensiDOM.btnPilihKaryawan).on('click', function() {
            load_karyawan(query = '', function(data) {
                CreatedUI.getDataOnModal(data);
            })
            $(createdAbsensiDOM.modalKaryawan).modal('show');
        });

        $(createdAbsensiDOM.modalKaryawan).on('click', '.btn-pilih-karyawan', function() {
            var nik = $(this).data('nik');
            $(createdAbsensiDOM.nik_karyawan).val(nik);
            $(createdAbsensiDOM.modalKaryawan).modal('hide');
            // $.notify('berhasil menambahkan', 'success');
        });

        $(createdAbsensiDOM.formSearchKaryawan).on('keyup', '#search_karyawan', function() {
            if($(this).val() !== ""){
                load_karyawan($(this).val(), function(data) {
                    CreatedUI.getDataOnModal(data);
                })
            }else{
                load_karyawan(query = '', function(data) {
                    CreatedUI.getDataOnModal(data);
                })
            }
            
        });

        $(createdAbsensiDOM.formAddPenggajian).validate(
            {
                rules:
                {
                    nik_karyawan:
                    {
                        required: true
                    },
                    tanggal_penggajian:
                    {
                        required: true
                    }
                },
                messages:
                {
                    nik_karyawan:
                    {
                        required: 'Nik Tidak Boleh Kosong'
                    },
                    tanggal_penggajian:
                    {
                        required: 'Tanggal Tidak Boleh Kosong'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color','red')
                    error.insertBefore(element)
                    console.log(element)
                },
                submitHandler: function(form){
                    $.ajax({
                        url: BASE_URL+'master/absensi/Absensi/created_absensi',
                        method:'post',
                        data: new FormData(form),
                        processData: false,
                        contentType: false,
                        cache: false,
                        async: false,
                        success: function(data){
                            var parse = JSON.parse(data);
                            if(parse.code === 200){
                                $.notify(parse.msg, 'success');
                                load_absensi_created();
                            }else{
                                $.notify(parse.msg, 'error');
                            }  
                        }
                    })
                }
            }
        );

        $(createdAbsensiDOM.modalKaryawan).on('click','#btn-pilih', function() {
            alert('cliked');
        })

    }

    var load_karyawan = function(query, callback){
        return $.ajax({
            url: BASE_URL+'master/karyawan/Karyawan/fetch_all',
            method: 'post',
            data: {query: query},
            dataType: 'json',
            success: function(data){
                callback(data);
            }
        })
    }


    var load_absensi_created = function(){
        $.ajax({
            url: BASE_URL+'master/absensi/Absensi/show_absensi_created/'+SEGMENT,
            method: 'get',
            dataType: 'json',
            success: function(data){
                CreatedUI.getAbsensiCreated(data);
            }
        })
    }

    var load_progress_absensi = function() {
        $.ajax({
            url: BASE_URL+'master/absensi/Absensi/progress_absensi/'+SEGMENT,
            method: 'post',
            dataType: 'json',
            success: function(data){
                CreatedUI.getProgress(data);
            }
        })
    }

    var load_widget_absensi = function() {
        $.ajax({
            url: BASE_URL+'master/absensi/Absensi/show_data_widget/'+SEGMENT,
            method: 'get',
            dataType: 'json',
            success: function(data){
                CreatedUI.widgetAbsensi(data);
            }
        })
    }

    return {
        init: function(){
            console.log('initialize app');
            createdAbsensiListener();
            load_absensi_created();
            load_progress_absensi();
            load_widget_absensi();
        }
    }

})(createdAbsensiUI);

$(document).ready(function() {
    createdAbsnsiController.init();
});