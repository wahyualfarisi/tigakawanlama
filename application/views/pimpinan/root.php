<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Pimpinan page</title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="<?= base_url('assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css') ?> ">
  <link rel="stylesheet" href="<?= base_url('assets/vendors/css/vendor.bundle.base.css') ?> ">
  <!-- endinject -->
  <!-- inject:css -->
  <link rel="stylesheet" href="<?= base_url('assets/css/style.css') ?> ">
  <!-- endinject -->
  <link rel="shortcut icon" href="<?= base_url('assets/images/favicon.png') ?> " />
  <script>
    var BASE_URL = '<?php base_url() ?>'
  </script>
</head>
<body>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo" href="index.html"><img src="<?= base_url('assets/img/logo.jpeg') ?>" alt="logo"/></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-stretch">
        <div class="search-field d-none d-md-block">
          <form class="d-flex align-items-center h-100" action="#">
            <div class="input-group">
              <div class="input-group-prepend bg-transparent">
                  <i class="input-group-text border-0 mdi mdi-magnify"></i>                
              </div>
              <input type="text" class="form-control bg-transparent border-0" placeholder="Search projects">
            </div>
          </form>
        </div>
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <div class="nav-profile-img">
                
                <span class="availability-status online"></span>             
              </div>
              <div class="nav-profile-text">
                <p class="mb-1 text-black"> <?= $this->session->userdata('nama_lengkap') ?> </p>
              </div>
            </a>
          </li>
          <li class="nav-item d-none d-lg-block full-screen-link">
            <a class="nav-link">
              <i class="mdi mdi-fullscreen" id="fullscreen-button"></i>
            </a>
          </li>

           <li class="nav-item nav-logout d-none d-lg-block">
              <button class="btn btn-danger btn__logout "> <i class="mdi mdi-power"></i></button>            
          </li>
          
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item nav-profile">
            <a href="#" class="nav-link">
              <div class="nav-profile-image">
                
                <span class="login-status online"></span> <!--change to offline or busy as needed-->              
              </div>
              <div class="nav-profile-text d-flex flex-column">
                <span class="font-weight-bold mb-2"> <?= $this->session->userdata('nama_lengkap') ?> </span>
                <span class="text-secondary text-small">Pimpinan</span>
              </div>
              <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/dashboard">
              <span class="menu-title">Halaman Utama</span>
              <i class="mdi mdi-home menu-icon"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <span class="menu-title">Informasi</span>
              <i class="menu-arrow"></i>
              <i class="mdi mdi-crosshairs-gps menu-icon"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="#/approvalgaji">Informasi Gaji</a></li>
                <li class="nav-item"> <a class="nav-link" href="#/infokaryawan">Informasi Karyawan</a></li>
              </ul>
            </div>
          </li>

           <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#ui-karyawan" aria-expanded="false" aria-controls="ui-basic">
              <span class="menu-title">Laporan</span>
              <i class="menu-arrow"></i>
              <i class="mdi mdi-crosshairs-gps menu-icon"></i>
            </a>
            <div class="collapse" id="ui-karyawan">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="#/laporan">Lihat Laporan</a></li>
              </ul>
            </div>
          </li>
   
          
        </ul>
      </nav>
      <!-- partial -->
      <div class="main-panel">
        <div class="content-wrapper" id="content"></div>
       

        <div class="modal fade"  id="modalKaryawan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="modalKaryawan">Data Penerima Gaji</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div style="margin-top: 20px; margin-bottom: 20px;" >
                </div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                        <th>NIK</th>
                        <th>Nama Karyawan</th>
                        <th>Jabatan</th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody id="show-karyawan" ></tbody>
                  
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btn-pilih">Pilih</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>


        <div class="modal fade"  id="modalApprovedGaji" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="modalKaryawan">Konfirmasi Approved Gaji</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" id="content-modal">
                  <form id="form-approved-gaji">
                    <input type="hidden" name="tgl_penggajian" id="tgl_penggajian" class="">
                    <button type="submit" class="btn btn-gradient-info btn-block">Konfirmasi</button>
                  </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>


        <div class="modal fade"  id="modalRejectGaji" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="modalKaryawan">Konfirmasi Approved Gaji</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" id="content-modal">
                  <form id="form-reject-gaji">
                    <input type="hidden" name="tgl_penggajian" id="tgl_penggajian2" class="">
                    <button type="submit" class="btn btn-gradient-info btn-block">Konfirmasi</button>
                  </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade"  id="modalLogout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="modalKaryawan">Apakah anda yakin ingin keluar ? </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" id="content-modal">
                <a href="<?= base_url('App/logout') ?>" class="btn btn-danger btn-block"> 
                  Ya, Saya Ingin Keluar
                </a>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade"  id="modalUploadAbsensi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-md" role="document">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="modalKaryawan">Upload Absensi</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <form id="form-add-absensi" enctype="multipart/form-data">
                  <div class="form-group">
                      <label>Pilih file absensi</label>
                      <input type="file" name="file" class="form-control" accept=".xls, .xlsx" >
                  </div>
                  <button type="submit" class="btn btn-gradient-info btn-block " >UPLOAD</button>
              </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn__batal">Batal</button>
              </div>
            </div>
          </div>
        </div>


        <div class="modal fade"  id="modalPreviewUpload" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="modalKaryawan"> Preview Gaji </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="form-gajian">
                  <table class="table">
                    <thead>
                      <tr>
                          <th>NIK</th>
                          <th>Total Lemburan</th>
                          <th>Total Potongan</th>
                          <th>Total Gaji</th>
                        </tr>
                    </thead>
                    <tbody id="preview_list"></tbody>
                  </table>

                  
                    <div id="preview_list_absen"></div>





                  <button type="submit" class="btn btn-info" id="btn__simpan__absensi" > SIMPAN  </button>
                </form>
              
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn__batal">Batal</button>
              </div>
            </div>
          </div>
        </div>







        <footer class="footer">
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2017 <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap Dash</a>. All rights reserved.</span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="mdi mdi-heart text-danger"></i></span>
          </div>
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->

  <!-- plugins:js -->
  <script src="<?= base_url('assets/js/jquery.js') ?>"></script>
  <script src="<?= base_url('assets/vendors/js/vendor.bundle.base.js') ?> "></script>
  <script src="<?= base_url('assets/vendors/js/vendor.bundle.addons.js') ?> "></script>

  <script src="<?= base_url('assets/js/bootstrap.min.js') ?>"></script>
  <script src="<?= base_url('assets/js/jquery.validate.min.js') ?>"></script>
  <script src="<?= base_url('assets/js/notify.min.js') ?>" ></script>
  <!-- endinject -->
  <!-- Plugin js for this page-->
  <!-- End plugin js for this page-->
  <!-- inject:js -->
  <script src="<?= base_url('assets/js/off-canvas.js') ?> "></script>
  <script src="<?= base_url('assets/js/misc.js') ?> "></script>
  <script defer src="<?= base_url('assets/js/printArea.js') ?>" ></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <script src="<?= base_url('assets/js/dashboard.js') ?> "></script>
  <!-- End custom js for this page-->

    <script type="text/javascript">
        $(document).ready(function() {
          var loadContent = function(href) {
            if(href){
                $.get(`<?= base_url().'Pimpinan/' ?>${href}`, (content) => {
                    $('#content').html(content);
                })
            }else{
                location.hash = '#/dashboard';
            }
          }

          $(window).on('hashchange', function() {
            var href = location.hash.substr(2);
            loadContent(href);
          });

          if(location.href){
            var href = location.hash.substr(2);
            loadContent(href);
          }else{
            location.hash = '#/dashboard';
          }

           $('.btn__logout').click(function() {
              $('#modalLogout').modal('show')
            })

        });
        </script>
  
</body>

</html>
