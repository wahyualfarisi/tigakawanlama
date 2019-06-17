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
                    $('#btn-login').css('display','none');
                },
                success: function(data){
                    var parse = JSON.parse(data);
                    if(parse.code === 200){
                        $('#myProgress').css('display','block');
                        $.notify(parse.msg, 'success');
                        move(parse.toLocation);                        
                    }else{
                        $.notify(parse.msg, 'danger');
                        $('#btn-login').css('display','block');
                        $('#btn-login').text('SIGN IN')
                    }
                }
            })
        }
    }
)

function move(tolocation) {
    var elem = document.getElementById("myBar");   
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
        location.href = BASE_URL+tolocation;
      }
    }
  }

$(document).ready(function() {
    $('#myProgress').css('display','none');
    $('#show-password').on('click', function() {
        if($(this).is(':checked') ){
            $('#password').attr('type','text');
        }else{
            $('#password').attr('type','password');
        }
    })
 
   
})