<div class="row">
    <div class="col-12">
        <span class="d-flex align-items-center purchase-popup">
        <p> Selamat datang <?= $this->session->userdata('nama_lengkap') ?> </p>
        </span>
    </div>
</div>

<div class="page-header">
    <h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-home"></i>                 
        </span>
        Dashboard
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

<div class="row">
<div class="col-md-5 grid-margin stretch-card">
    <div class="card">
    <div class="card-body">
        <h4>Absensi</h4>

         <table class="table">
            <thead>
                <tr>
                    <th>ID Absensi</th>
                    <th>NIK</th>
                    <th>Tanggal Import</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="show__list__absensi" > </tbody>
         </table>


    </div>
    </div>
</div>
<div class="col-md-7 grid-margin stretch-card">
    <div class="card">
    <div class="card-body">
    <h4>Gaji</h4>
    <table class="table">
            <thead>
                <tr>
                    <th>ID Penggajian</th>
                    <th>ID Absensi</th> 
                    <th>Total Potongan</th>
                    <th>Total Lemburan</th>
                    <th>Total Gaji</th>
                </tr>
            </thead>
            <tbody id="show__list__gaji"></tbody>
         </table>                                            
    </div>
    </div>
</div>
</div>

<script>
    var NIK = $this->session->userdata('nik');
</script>

<script src="<?= base_url('public/myPlugin.js') ?>" ></script>
<script src="<?= base_url('public/karyawan/main_dashboard.js') ?>" ></script>

