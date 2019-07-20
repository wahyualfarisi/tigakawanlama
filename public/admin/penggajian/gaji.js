var PenggajianDom = {
    labelShowDataGaji: '#show-data-gaji',
    fieldSearch: '#search_data_gaji',
    formSearchGaji : '#form_search_gaji',
    formAddPenggajian: '#form-add-penggajian',
    fieldStatus: '#status_penggajian'
}
var convertDateIndo = {
    hari: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
    bulan: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
}


var PenggajianUI = (function() {

    function tanggalIndo(day, date, month, year){
        return convertDateIndo.hari[day] +', ' + date + ' '+ convertDateIndo.bulan[month] +' '+year;
    }
    
    return {
        retrieveDataPenggajian: function(obj){
            var html = '', bgGradient, locationbutton, cancelButton;
            if(obj.length > 0 ){
            
                obj.forEach(function(item) {
                    
                    var year = new Date(item.tgl_penggajian).getFullYear();
                    var day  = new Date(item.tgl_penggajian).getDay();
                    var month = new Date(item.tgl_penggajian).getMonth();
                    var date = new Date(item.tgl_penggajian).getDate();

                    cancelButton = `<button class="btn btn-danger btn-sm btn__batal__penggajian" data-id="${item.tgl_penggajian}"> Batal </button>`;

                    if(item.status_penggajian === 'process'){
                        status     = 'Menunggu Upload absensi';
                        bgGradient = 'bg-gradient-info';
                        locationbutton = '<a href="#/importabsensi/'+item.tgl_penggajian+' " class="btn btn-info btn-sm" > Import Absensi </a>';
                        
                    }else{
                        status     = 'Menunggu Approved Owner';
                        bgGradient = 'bg-gradient-success';
                        locationbutton = '';
                        
                    }


                    html += '<div class="col-md-4 stretch-card grid-margin">';
                    html += '<div class="card '+bgGradient+'  card-img-holder text-white">';
                        html += '<div class="card-body">';
                            html += '<h4 class="font-weight-normal mb-3">'+tanggalIndo(day, date, month, year)+ ' ';
                            html += '<i class="mdi mdi-account-outline mdi-24px float-right"></i>';
                            html += '</h4>';

                            html += '<h3 class="mb-5">'+item.status_penggajian+'</h3>';
                            html += '<p> '+status+' </p>';
                            html += '<h6 class="card-text">';
                            html += `<div class="row"> 
                                        <div class="col-md-6">
                                              ${locationbutton} 
                                        </div>
                                        <div class="col-md-6" >
                                               ${cancelButton}
                                        </div>
                                        
                                     </div>
                            `;
                            html += '</h6>'
                        html += '</div>';
                    html += '</div>';
                html += '</div>';

                });
            }else{
                html += '<div class="text-center" style="align-items: center, justify-content: center">';
                     html += '<img src="'+BASE_URL+'assets/img/no_data.svg'+'" width="200px" />';
                     html += '<p> Data Penggajian tidak di temukan </p>';
                html += '</div>';
            }

            $(PenggajianDom.labelShowDataGaji).html(html);
        }
    }




})();




var PenggajianController = (function(UIPenggajian) {

    var setupEventListener = function(){

        $('#form-add-penggajian').validate(
            {
                rules:
                {
                    tanggal_penggajian:
                    {
                        required: true
                    },
                    created_by:
                    {
                        required: true
                    }
                },
                messages:
                {
                    tanggal_penggajian:
                    {
                        required: 'Harap Isi Periode Penggajian'
                    },
                    created_by:
                    {
                        required: 'Hak akses tidak ada'
                    }
                },
                errorPlacement: function(error, element){
                    error.css('color', 'red')
                    error.insertAfter(element)
                },
                submitHandler: function(form){
                    $.ajax({
                        url: BASE_URL+'master/penggajian/Penggajian/add',
                        method: 'post',
                        data: new FormData(form),
                        processData: false,
                        contentType: false,
                        async: false,
                        cache: false,
                        success: function(data){
                            var parse = JSON.parse(data);
                            
                            if(parse.code === 200){
                                $.notify(parse.msg, 'success');
                                load_data_penggajian();
                            }else{
                                $.notify(parse.msg, 'info');
                            }
                        }
                    })
                }
            }
        );


        $(PenggajianDom.formSearchGaji).on('keyup', PenggajianDom.fieldSearch, function() {
            load_data_penggajian($(this).val())
        });

        $(PenggajianDom.fieldStatus).on('change', function() {
            load_data_penggajian($(this).val())
        });

        $('#show-data-gaji').on('click', '.btn__batal__penggajian', function() {
           var id = $(this).data('id');
           getResource(BASE_URL+'master/penggajian/Penggajian/delete', id, data => {
            if(data.code === 200){
                $.notify(data.msg, 'success');
                load_data_penggajian();
            }else{
                $.notify(data.msg, 'info');
            }
           } );
         
        })
        

    }


    // var load_data_penggajian = function(query){
    //     $.ajax({
    //         url: BASE_URL+'master/penggajian/Penggajian/fetch_data',
    //         method: 'post',
    //         data: {query: query },
    //         dataType: 'json',
    //         success: function(data){
    //             UIPenggajian.retrieveDataPenggajian(data)
    //         }
    //     })
    // }

    const load_data_penggajian = (query) => getResource(BASE_URL+'master/penggajian/Penggajian/fetch_data', query, data => UIPenggajian.retrieveDataPenggajian(data) );


    const getResource = (url, query, callback) => {
        $.ajax({
            url,
            method: 'post',
            data: {query: query},
            dataType: 'json',
            success: function(data){
                callback(data)
            }
        })
    }

    return {
        init: function(){
            console.log('initlaize app')
            setupEventListener();
            load_data_penggajian();
        }
    }

})(PenggajianUI);

$(document).ready(function() {
    PenggajianController.init();
})