<div class="page-header">
    <h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi mdi-calendar-multiple-check"></i>                 
        </span>
        Informasi Absensi
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
    <div class="col-md-3">
        <div class="card bg-gradient-info card-img-holder text-white">
            <div class="card-body">
                <h4 class="font-weight-normal mb-3">Absensi
                <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5" id="total__jumlah__absensi">$ 15,0000</h2>
                <h6 class="card-text">INFORMASI ABSENSI </h6>
            </div>
        </div>
    </div>
    <div class="col-md-9">
       

         <div class="card">
            <div class="card-body">
                <h4 class="card-title">Absensi</h4>
                <table class="table">
                <thead>
                    <tr>
                    <th>ID Absensi</th>
                    <th>Tanggal Penggajian</th>
                    <th>NIK</th>
                    <th>Nama Lengkap</th>
                    <th>Total Gaji</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody id="show__informasi__slip" ></tbody>
                </table>
            </div>
        </div>
   

    </div>
</div>
<script defer src="<?= base_url('public/myPlugin.js') ?>"></script>
<script defer src="<?= base_url('public/karyawan/absensi.js') ?>" ></script>