
<div class="row">
    <div class="col-lg-6" >

        <div class="col-md-12 stretch-card grid-margin">
            <div class="card bg-gradient-danger card-img-holder text-white">
            <div class="card-body">
                <h4 class="font-weight-normal mb-3">Total Karyawan
                <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5" id="total__karyawan">9</h2>
                <h6 class="card-text">Increased by 60%</h6>
            </div>
            </div>
        </div>

        <div class="col-md-12 stretch-card grid-margin">
            <div class="card bg-gradient-info card-img-holder text-white">
            <div class="card-body">           
                <h4 class="font-weight-normal mb-3">Gaji Process
                <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5" id="total__gaji__process">1</h2>
                <h6 class="card-text">Decreased by 10%</h6>
            </div>
            </div>
        </div>


        <div class="col-md-12 stretch-card grid-margin">
            <div class="card bg-gradient-success card-img-holder text-white">
            <div class="card-body">                             
                <h4 class="font-weight-normal mb-3">Gaji Approved
                <i class="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5" id="total__gaji__approved">9</h2>
                <h6 class="card-text">Increased by 5%</h6>
            </div>
            </div>
        </div>

        <div class="col-md-12 stretch-card grid-margin">
            <div class="card bg-gradient-success card-img-holder text-white">
            <div class="card-body">                             
                <h4 class="font-weight-normal mb-3">Menunggu ACC
                <i class="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5" id="total__gaji__waiting">9</h2>
                <h6 class="card-text">Increased by 5%</h6>
            </div>
            </div>
        </div>


    </div>




     <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Grafik Pengeluaran Gaji</h4>
                <canvas id="barChart" style="height:230px"></canvas>
            </div>
            </div>
         </div>
    </div>

</div>


<script src="<?= base_url('public/admin/dashboard.js') ?>" ></script>
<script src="<?= base_url('public/admin/main_dashboard.js') ?>" ></script>