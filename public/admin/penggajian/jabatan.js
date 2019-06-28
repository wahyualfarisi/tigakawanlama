console.log('jabatan is running')

var jabatanUI = (function() {
    var jabatanDOM = {
        show: '#show__data__gaji',
        btnAdd: '#btn__add__jabatan',
        modal: [
            {
                modalJabatan: '#modalJabatan',
                modalEdit: '#modalEdit'
            }
        ],
        form:['#form__add__jabatan']
    }

   

    var formatRupiah = function(angka, prefix){
        var numberString = angka.replace(/[^,\d]/g, '').toString();
        var split        = numberString.split(',');
        var sisa         = split[0].length % 3;
        var rupiah       = split[0].substr(0, sisa);
        var ribuan       = split[0].substr(sisa).match(/\d{3}/gi);

        //
        if(ribuan){
            var seperator = sisa ? '.' : '';
            rupiah += seperator + ribuan.join('.')
        }
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '' )
    }



    return {
        getDOM: function(){
            return jabatanDOM;
        },
        retrieveDataJabatan: function(object){
            var html = '', no = 1;
            if(object.length > 0){
                object.forEach(function(item) {
                    html += '<tr>';
                         html += '<td>'+no+++' </td>';
                         html += '<td> '+item.nama_jabatan+' </td>';
                         html += '<td> '+formatRupiah(item.gaji)+' </td>';
                         html += '<td> '+formatRupiah(item.potongan)+' </td>';
                    html += '</tr>';
                })
            }
            $(jabatanDOM.show).html(html);
        }
    }
})()



var jabatanController = (function(UI) {
    var DOM = UI.getDOM();

    var urlAPI = {
        fetch_jabatan: BASE_URL+'master/Karyawan/Gaji/fetch_json',
        add: BASE_URL+'master/Karyawan/Gaji/add'
    }

    var setupEventListener = function(){
        
        //show modal add jabatan
        $(DOM.btnAdd).on('click', () => ModalAction(DOM.modal[0].modalJabatan, 'show'));

        //form add
        $(DOM.form[0]).validate({
            rules:
            {
                nama_jabatan:
                {
                    required: true
                },
                jumlah_gaji:
                {
                    required: true
                },
                potongan:
                {
                    required: true
                }
            },
            messages: {
                nama_jabatan:
                {
                    required: 'Nama Jabatan Tidak Boleh Kosong'
                },
                jumlah_gaji:
                {
                    required: 'Jumlah Gaji Harus Diisi'
                },
                potongan:
                {
                    required: 'Jumlah Potongan Harus Diisi'
                }
            },
            errorPlacement(error, element)
            {
                error.css('color','red')
                error.insertAfter(element)
            },
            submitHandler(form){
                add_jabatan(form, data => {
                    console.log(data);
                    var parse = JSON.parse(data);
                    parse.code === 200 ? $.notify(parse.msg, 'success') : $.notify(parse.msg, 'danger')
                    $(DOM.form[0])[0].reset()
                    fetch_jabatan()
                    ModalAction(DOM.modal[0].modalJabatan, 'hide') 
                });
            }
        })
    }





    var fetch_jabatan = function(){
        load(urlAPI.fetch_jabatan, function(data) {
           UI.retrieveDataJabatan(data);
        });
    }

    var add_jabatan = function(form, callback){
        $.ajax({
            url: urlAPI.add,
            method: 'post',
            data: new FormData(form),
            processData: false,
            contentType: false,
            cache: false,
            async: false,
            success: function(data){
                callback(data);
            }
        })
    }

   

    var ModalAction = function(modalName,method){
        $(modalName).modal(method);
    }


    var load = function(url, callback){
        $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                callback(data);
            }
        });
    }



    return {
        init: function(){
            console.log(DOM)
            fetch_jabatan()
            setupEventListener(); 
            
            
        }
        
    }
})(jabatanUI)


$(document).ready(function() {
    jabatanController.init()
})