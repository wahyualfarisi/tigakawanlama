<div class="page-header">
<h3 class="page-title">
    <span class="page-title-icon bg-gradient-primary text-white mr-2">
    <i class="mdi mdi-home"></i>                 
    </span>
    Detail Penggajian
</h3>
<nav aria-label="breadcrumb">
    <ul class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page">
        <span></span>Overview
        <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
    </li>
    </ul>
</nav>
</div>


<section class="main-detail">
    <div class="row">

            <div class="col-lg-8 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Penerima Gaji </h4>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>Jenis Kelamin</th>
                        <th>Jabatan</th>
                        <th>Total Gaji</th>
                      </tr>
                    </thead>
                    <tbody id="list__penerima__gaji" ></tbody>
                  </table>
                </div>
              </div>
            </div>



             <div class="col-lg-4">
                <a href="#/uploadabsensi/<?= $this->uri->segment(3) ?>" class="btn btn-gradient-info btn-block" >Upload Gaji Admin</a>

                <div class="card" style="margin-top: 40px; margin-bottom: 40px;">
                    <div class="card-body">
                        <div id="data__penggajian"></div>

                        <div class="row">
                            <div class="col-md-6">
                                    <button class="btn btn-info" >APPROVED</button>
                            </div>
                            <div class="col-md-6">
                                    <button class="btn btn-danger">REJECT</button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
    </div>
</section>

<section class="main-absensi row">

    <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
            <h4 class="card-title">Data Absensi</h4>
            <table class="table">
            <thead>
                <tr>
                <th class="bg-gradient-warning">
                    ID ABSENSI
                </th>
                <th class="bg-gradient-warning">
                    NIK
                </th>
                <th class="bg-gradient-warning">
                    Nama
                </th>
                <th colspan="4" class="text-center bg-gradient-info">
                    Jabatan
                </th>
                <th colspan="3" class="text-center bg-gradient-danger">
                    Gaji Karyawan
                </th>
                
               
                </tr>
            </thead>
            <thead>
                <tr>
                    <th class="bg-gradient-warning"></th>
                    <th class="bg-gradient-warning"></th>
                    <th class="bg-gradient-warning"></th>
                    <th class="text-center bg-gradient-info">Jabatan</th>
                    <th class="text-center bg-gradient-info">Gaji</th>
                    <th class="text-center bg-gradient-info">Potongan</th>
                    <th class="text-center bg-gradient-info">Lemburan</th>
                    <th class="bg-gradient-danger">
                    Total Potongan
                    </th>
                    <th class="bg-gradient-danger">
                        Total Lemburan
                    </th>
                    <th class="bg-gradient-danger">
                        Total Gaji
                    </th>
                 
                </tr>
              
            
            </thead>
            <tbody id="show__list__absensi">
               
            </tbody>
            </table>
        </div>
        </div>
    </div>
</section>
<script>
    var TGL_PENGGAJIAN = '<?= $this->uri->segment(3) ?>';
</script>
<script defer src="<?= base_url('public/myPlugin.js') ?>" ></script>
<script defer src="<?= base_url('public/pimpinan/detailgaji.js') ?>" ></script>
