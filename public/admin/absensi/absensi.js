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
    formAddPenggajian: '#form-add-penggajian',
    formDeleteAbsensi: '#form-delete',
    sectionACC: '#sectionACC',
    btnSendingOwner: '#btn-send-to-owner',
    modalNotif: '#modalNotif',
    modalDelete: '#modalDelete',
    contentModal: '#content-modal',
    btn_delete_absensi: '.btn-delete-absensi'
}


var createdAbsensiUI = (function() {

    var formatRupiah = function(angka, prefix){
        var numberString = angka.replace(/[^,\d]/g, '').toString()
        var split        = numberString.split(',')
        var sisa         = split[0].length % 3 
        var rupiah       = split[0].substr(0, sisa)
        var ribuan       = split[0].substr(sisa).match(/\d{3}/gi)

        if(ribuan) {
            var seperator = sisa ? '.' : ''
            rupiah += seperator + ribuan.join('.')

        }
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah
        return prefix == undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '' )
    }

    return {
        getAbsensiCreated: function(obj){
            var html, no = 1, labelAbsensi, totalGaji, resultGaji;

            if(obj.length > 0 ){
                obj.forEach(function(item) {
                    if(item.status === 'success'){
                        labelAbsensi = '<a href="#/absensi/'+item.id_absensi+' " class="btn btn-gradient-success btn-fw btn-sm"> Lihat Absensi </a>';
                        
                    }else{
                        labelAbsensi = '<a href="#/uploadabsensi?nik='+item.nik+'&&tgl_penggajian='+SEGMENT+'&&id_absensi='+item.id_absensi+' " class="btn btn-gradient-primary btn-fw"> Upload Absensi </a>';
                    }
                    
                    totalGaji = parseInt(item.total_gaji);
                    isNaN(totalGaji) ? resultGaji = '-' :  resultGaji =  formatRupiah(totalGaji.toString()) ;

                    
                    html += '<tr>';
                        html += '<td><button data-idabsensi="'+item.id_absensi+'" class="btn-delete-absensi"> <i class="mdi mdi-delete-forever"> </i> </button> </td>';
                        html += '<td>'+no+++' </td>';
                        html += '<td>'+item.nik+'</td>'
                        html += '<td>'+item.nama_lengkap+'</td>';
                        html += '<td>'+item.nama_jabatan+' </td>';
                        html += '<td>'+resultGaji+' </td>';
                        html += '<td>'+item.status+' </td>';
                        html += '<td>'+labelAbsensi+' </td>';
                    html += '</tr>';
                })
            }else{
                html += '<tr>';
                     html += '<td colspan="7" class="text-center"> <img src="'+BASE_URL+'assets/img/no_data.svg'+'" width="400px" /> <br> Tidak Ada Data </td>';
                html += '</tr>';
            }
            $(createdAbsensiDOM.labelShowCreatedAbsensi).html(html);
        },
        getProgress: function(data){
            var text = '';
            if(data.total_absensi === data.total_karyawan) {
                $(createdAbsensiDOM.sectionACC).css('display','block')
                text += '(Completed)'
            }else{
                text += '';
            }
            var countprogress = 100 / data.total_karyawan ;
            var result = countprogress;
            var percentage = data.total_absensi * result.toFixed(1);

            var html = '';
            html += '<label>Progress '+data.total_absensi+' dari '+data.total_karyawan+' Karyawan '+text+'</label>';
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
                      html += '<td> <input type="checkbox" name="nik[]" value="'+item.nik+'"  /> </td>';
                      html += '<td>'+item.nik+'</td>';
                      html += '<td>'+item.nama_depan+'</td>';
                      html += '<td>'+item.nama_jabatan+'</td>';
                      html += '<td></td>';
                    html += '</tr>';
                });
            }else{
                html += 'Tidak Ada Lagi Data Karyawan';
            }
            $(createdAbsensiDOM.labelShowOnModalKaryawan).html(html);
        }
    }
})();


var createdAbsnsiController = (function(CreatedUI) {
    var URI = {
        deleteAbsensi: BASE_URL+'master/absensi/Absensi/deleteAbsensi',
        importBanyak: BASE_URL+'master/absensi/Absensi/importbanyajKaryawan'
    }
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
                        beforeSend: function(){
                            console.log('sedang menambahkan ...');
                        },
                        success: function(data){
                            console.log('sukses');
                            load_absensi_created();
                            var parse = JSON.parse(data);
                            if(parse.code === 200){
                                $.notify(parse.msg, 'success');
                                $(createdAbsensiDOM.nik_karyawan).val("")
                            }else{
                                $.notify(parse.msg, 'error');
                            }  
                            
                        }
                    })
                }
            }
        );

        /**
         * ACC to owner On Modal
         */
        $(createdAbsensiDOM.btnSendingOwner).on('click', function() {
            var html = '';
            html += '<div>';
                html += '<p> Data absensi untuk penggajian '+SEGMENT+' siap di kirim ke owner ? ';
                html += '<div>';
                    html += '<button class="btn btn-primary btn-kirim" > Lanjutkan </button>'
                html += '</div>';
            html += '</div>';
            $(createdAbsensiDOM.contentModal).html(html)
            $(createdAbsensiDOM.modalNotif).modal('show')
        });

        /**
         * sending ACC to Owner
         */
        $(createdAbsensiDOM.modalNotif).on('click', '.btn-kirim', function() {
           $.ajax({
               url: BASE_URL+'master/absensi/Absensi/waiting_approved',
               method: 'post',
               data: {status: 'waiting', tgl: SEGMENT},
               success: function(data){
                    var parse = JSON.parse(data)
                    if(parse.code === 200){
                        $.notify(parse.msg, 'success')
                        location.hash = '#/penggajian'
                        $(createdAbsensiDOM.modalNotif).modal('hide')
                    }else{
                        $.notify(parse.msg, 'error')
                    }
               }
           })
        })

        /**
         * show modal delete absensi
         */
        $(createdAbsensiDOM.labelShowCreatedAbsensi).on('click', createdAbsensiDOM.btn_delete_absensi, function() {
            var idabsensi = $(this).data('idabsensi');
            $('#idTarget').val(idabsensi)
            ModalAction($(createdAbsensiDOM.modalDelete), 'show')

        })

        /**
         * event on submit to execute delete absensi
         */
        $(createdAbsensiDOM.formDeleteAbsensi).on('submit', function(e) {
            e.preventDefault() 
            var confirm = $('#confirm').val();
            if(confirm !== 'confirm') return $.notify('Konfirmasi Salah', 'danger')

            postData(URI.deleteAbsensi, this, function(data) {
               var parse = JSON.parse(data)
               if(parse.code === 200){
                   ModalAction(createdAbsensiDOM.modalDelete, 'hide')
                   $.notify(parse.msg, 'success')
                   load_absensi_created()
                   load_progress_absensi()
                   $(createdAbsensiDOM.sectionACC).css('display','none')
               }else{
                    $.notify(parse.msg, 'danger')
               }
            })
        });

        $('#btn-pilih').on('click', function() {
            var nik = [], html = '';
            $.each($("input[name='nik[]']:checked"), function() {
                nik.push($(this).val() )
            } )
            if(nik.length > 0){
                ModalAction(createdAbsensiDOM.modalKaryawan, 'hide')

                //loping value
                nik.forEach(item => {
                    html += `
                        <input type="hidden" name="nik[]" value="${item}"  />
                    `;
                })
                html += `
                    <div class="form-group">
                        <input type="hidden" class="form-control" value="process" name="status" />
                    </div>
                    <div class="form-group">
                        <input type="hidden" class="form-control" value="${SEGMENT}" name="tgl_penggajian" />
                    </div>

                `;
                html += `<button class="btn btn-info btn-block" > TAMBAHKAN </button>`;
                $('#form-add-karyawan').html(html)

                ModalAction('#modalAddKaryawan', 'show')
            }else{
                alert('silahkan ceklis karyawan ');
            }
        })

        $('#check_all').on('click', function() {
            $('input:checkbox').not(this).prop('checked', this.checked);
        })

        $('.btn__batal').on('click', function() {
            ModalAction('#modalAddKaryawan', 'hide')
            ModalAction(createdAbsensiDOM.modalKaryawan, 'show')
        })

        $('#form-add-karyawan').on('submit', function(e) {
            e.preventDefault();
            postData(URI.importBanyak, this, function(data) {
                var parse = JSON.parse(data);
                if(parse.status){
                    ModalAction('#modalAddKaryawan','hide')
                    load_absensi_created()
                    load_progress_absensi();
                    load_widget_absensi();
                    fetch_absensi_karyawan()
                }
            })
        })



    }


    const  load_karyawan = (query, callback) => {
        return $.ajax({
            url: BASE_URL+'master/absensi/Absensi/show_current_karyawan/'+SEGMENT,
            method: 'post',
            data: {query: query},
            dataType: 'json',
            success: function(data){
                console.log(data);
                callback(data);
            }
        })
    }


    const load_absensi_created = () => {
        $.ajax({
            url: BASE_URL+'master/absensi/Absensi/show_absensi_created/'+SEGMENT,
            method: 'get',
            dataType: 'json',
            success: function(data){
                CreatedUI.getAbsensiCreated(data);
            }
        })
    }

    const load_progress_absensi = () => {
        $.ajax({
            url: BASE_URL+'master/absensi/Absensi/progress_absensi/'+SEGMENT,
            method: 'post',
            dataType: 'json',
            success: function(data){
                CreatedUI.getProgress(data);
            }
        })
    }

    const load_widget_absensi =  () => {
        $.ajax({
            url: BASE_URL+'master/absensi/Absensi/show_data_widget/'+SEGMENT,
            method: 'get',
            dataType: 'json',
            success: function(data){
                CreatedUI.widgetAbsensi(data);
            }
        })
    }

    const fetch_absensi_karyawan = () => {
        console.log(SEGMENT)
    }

    var postData = function(url, form, callback) {
        $.ajax({
            url: url,
            method: 'post',
            data: new FormData(form),
            processData: false,
            contentType: false,
            async: false,
            cache: false,
            success: function(data){
                callback(data)
            }
        })
    }

    const load = (url, callback) => {
        $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                callback(data)
            }
        })
    }

    var ModalAction = function(modalName, method){
        $(modalName).modal(method)
    }

    return {
        init: function(){
            console.log('initialize app');
            createdAbsensiListener();
            load_absensi_created();
            load_progress_absensi();
            load_widget_absensi();
            fetch_absensi_karyawan()
        }
    }

})(createdAbsensiUI);

$(document).ready(function() {
    $(createdAbsensiDOM.sectionACC).css('display','none')
    createdAbsnsiController.init();
});