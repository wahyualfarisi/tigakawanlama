console.log('login is running');


$('#form-login').validate(
    {
        rules:
        {
            email: 
            {
                required: true,
                email: true
            },
            password:
            {
                required: true,
            },
            akses:
            {
                required: true
            }
        },
        messages: 
        {
            email:
            {
                required: 'Email Tidak Boleh Kosong',
                email: 'Email tidak valid'
            },
            password:
            {
                required: 'Password tidak boleh kosong'
            },
            akses:
            {
                required: 'Silahkan Pilih Akses'
            }
        },
        errorPlacement: function(error, element){
            error.css('color','red');
            error.insertAfter(element);
        },
        submitHandler: function(form){
            $.ajax({
                url: BASE_URL+'App/loginprocess',
                method: 'post',
                data: new FormData(form),
                processData: false,
                contentType: false,
                async: false,
                cache: false,
                beforeSend: function(){
                    $('#btn-login').text('process ...')
                },
                success: function(data){
                    var parse = JSON.parse(data);
                    if(parse.code === 200){
                        $.notify(parse.msg, 'success');
                        setTimeout(function() {
                            location.href = BASE_URL+parse.toLocation
                        }, 3000)
                        
                    }else{
                        $.notify(parse.msg, 'danger');
                        $('#btn-login').text('SIGN IN')
                    }
                }
            })
        }
    }
)

$(document).ready(function() {
   
    $('#show-password').on('click', function() {
        if($(this).is(':checked') ){
            $('#password').attr('type','text');
        }else{
            $('#password').attr('type','password');
        }
    })
 
   
})