console.log("login is running"),$("#form-login").validate({rules:{email:{required:!0,email:!0},password:{required:!0},akses:{required:!0}},messages:{email:{required:"Email Tidak Boleh Kosong",email:"Email tidak valid"},password:{required:"Password tidak boleh kosong"},akses:{required:"Silahkan Pilih Akses"}},errorPlacement:function(e,s){e.css("color","red"),e.insertAfter(s)},submitHandler:function(e){$.ajax({url:BASE_URL+"App/loginprocess",method:"post",data:new FormData(e),processData:!1,contentType:!1,async:!1,cache:!1,beforeSend:function(){$("#btn-login").text("process ...")},success:function(e){var s=JSON.parse(e);200===s.code?($.notify(s.msg,"success"),setTimeout(function(){location.href=BASE_URL+s.toLocation},3e3)):($.notify(s.msg,"danger"),$("#btn-login").text("SIGN IN"))}})}}),$(document).ready(function(){$("#show-password").on("click",function(){$(this).is(":checked")?$("#password").attr("type","text"):$("#password").attr("type","password")})});