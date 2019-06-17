<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Purple Admin</title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="<?= base_url('assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css') ?> ">
  <link rel="stylesheet" href="<?= base_url('assets/vendors/css/vendor.bundle.base.css') ?> ">
  <!-- endinject -->
  <!-- plugin css for this page -->
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <link rel="stylesheet" href="<?= base_url('assets/css/style.css') ?> ">
  <!-- endinject -->
  <link rel="shortcut icon" href="<?= base_url('assets/images/favicon.png') ?> " />
   <style>
    #myProgress {
    width: 100%;
    background-color: #ddd;
    }

  #myBar {
    width: 1%;
    height: 30px;
  }
   </style>
</head>

<body>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth">
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="brand-logo">
                <img src="<?= base_url('assets/img/logo.jpeg') ?>">
              </div>
              <h4>Hello! let's get started</h4>
              <form class="pt-3" id="form-login">
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" name="email" id="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" name="password" id="password" placeholder="Password">
                </div>

                <div class="form-group">
                  <select name="akses" id="akses" class="form-control form-control-lg">
                      <option value=""> Pilih Akses </option>
                      <option value="karyawan">Karyawan</option>
                      <option value="admin">Administrator</option>
                      <option value="owner">Owner</option>
                  </select>
                </div>

                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input" id="show-password">
                      Tampilkan password
                    </label>
                  </div>
                  
                </div>

                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" id="btn-login">SIGN IN</button>
                </div>

                <div id="myProgress">
                  <div id="myBar" class="btn-gradient-primary"></div>
                </div>
                
              
                <div class="text-center mt-4 font-weight-light">
                  Don't have an account? <a href="register.html" class="text-primary">Create</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
  <!-- plugins:js -->
  <script src="<?= base_url('assets/js/jquery.js') ?>"></script>
  <script src="<?= base_url('assets/js/jquery.validate.min.js') ?>"></script>
  <!-- endinject -->
  <!-- inject:js -->
  <script src="<?= base_url('assets/js/off-canvas.js') ?> "></script>
  <script src="<?= base_url('assets/js/misc.js')  ?>"></script>
  <script src="<?= base_url('assets/js/notify.min.js') ?>" ></script>
  <script>
    var BASE_URL = '<?= base_url() ?>';
  </script>
  <script src="<?= base_url('dist/auth/login.js') ?>" ></script>
  <!-- endinject -->
</body>

</html>
