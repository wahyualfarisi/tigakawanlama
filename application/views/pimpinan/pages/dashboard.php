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
<div class="col-md-4 stretch-card grid-margin">
    <div class="card bg-gradient-danger card-img-holder text-white">
    <div class="card-body">
        <h4 class="font-weight-normal mb-3"> Menunggu Validasi Gaji
        <i class="mdi mdi-chart-line mdi-24px float-right"></i>
        </h4>
        <h2 class="mb-5" id="total_validasi">1</h2>
    </div>
    </div>
</div>
<div class="col-md-4 stretch-card grid-margin">
    <div class="card bg-gradient-info card-img-holder text-white">
    <div class="card-body">
        <h4 class="font-weight-normal mb-3">Total Pengeluaran Gaji
        <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
        </h4>
        <h2 class="mb-5">45,000,000</h2>
        
    </div>
    </div>
</div>
</div>

<div class="row">
<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
    <div class="card-body">
        <h4 class="card-title">Grafik Penggajian 2019</h4>
        <canvas id="barChart" style="height:230px"></canvas>
    </div>
    </div>
</div>
</div>




<script src="<?= base_url('public/example/chart.js') ?>"></script>
<script defer src="<?= base_url('public/pimpinan/main_dashboard.js') ?>" ></script>

