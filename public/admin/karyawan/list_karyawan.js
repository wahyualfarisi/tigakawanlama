
var ListKaryawanDOM = {
    labelShowKaryawan: '#show-karyawan',
    formSearch: '#form_search_karyawan',
    fieldSearch: '#search_karyawan',
}

var listKaryawanUI = (function() {
    return {
        showKaryawan: function(obj){
            console.log(obj.length)
            var html = '';
            if(obj.length > 0){
                obj.forEach(function(item) {
                    html += '<div class="col-md-4 stretch-card grid-margin">';
                        html += '<div class="card bg-gradient-info card-img-holder text-white">';
                            html += '<div class="card-body">';
                                html += '<h4 class="font-weight-normal mb-3">'+item.nama_depan +' '+ item.nama_belakang + ' ';
                                html += '<i class="mdi mdi-account-outline mdi-24px float-right"></i>';
                                html += '</h4>';

                                html += '<h2 class="mb-5">'+item.nik+'</h2>';
                                html += '<p> '+item.email+' </p>';
                                html += '<h6 class="card-text">';
                                html += '<button class="btn btn-info" > Detail </button>';
                                html += '</h6>'
                            html += '</div>';
                        html += '</div>';

                    html += '</div>';
                })
            }else{
                html += '<div class="text-center" style="align-items: center, justify-content: center">';
                     html += '<img src="'+BASE_URL+'assets/img/no_data.svg'+'" width="200px" />';
                     html += '<p> Data Karyawan Tidak Di temukan </p>';
                html += '</div>';
            }

            $(ListKaryawanDOM.labelShowKaryawan).html(html);
        }
    }
})();


var listKaryawanController = (function(UIList) {
    var setupEventListKaryawan = function(){

        $(ListKaryawanDOM.formSearch).on('keyup', ListKaryawanDOM.fieldSearch, function(){
            if($(this).val() !== ""){
                loadListKaryawan($(this).val())
            }else{
                loadListKaryawan();
            }
        })


    }


    var loadListKaryawan = function(query){
        $.ajax({
            url: BASE_URL+'master/karyawan/Karyawan/fetch_all',
            method: 'post',
            data: {query: query},
            dataType: 'json',
            success: function(data){
                UIList.showKaryawan(data);
            }
        })
    }

    return {
        init: function(){
            console.log('initialize app');
            loadListKaryawan();
            setupEventListKaryawan();
        }
    }
})(listKaryawanUI);



$(document).ready(function() {
    listKaryawanController.init();
})