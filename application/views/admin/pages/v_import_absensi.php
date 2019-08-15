<h3 class="page-title animated fadeInLeft">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
       Import Absensi
 </h3>
<div style="margin-top: 30px;" ></div>

<div class="row animated fadeIn" >
    <div class="col-md-4 stretch-card grid-margin" id="labelWidgetAbsensi" >
        <!-- <div class="card bg-gradient-info  card-img-holder text-white">
            <div class="card-body">                             
                <h4 class="font-weight-normal mb-3">25 Juni 2019
                <i class="mdi mdi-bookmark mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-2">On Process</h2>
                <h5>3 Absensi Berhasil Di import</h5>
            </div>
        </div> -->
    </div>

    <div class="col-md-8 grid-margin" style="margin-top: 15px;">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Penggajian</h4>
                    <form id="form-add-penggajian">
                        <p class="card-description">
                        Periode Gaji <?= $this->uri->segment(3) ?>
                        </p>

                        <div class="form-group">
                            <label>Karyawan</label>
                            <input type="file" name="img[]" class="file-upload-default">
                            <div class="input-group col-xs-12">
                            <input type="text" class="form-control file-upload-info" id="nik_karyawan" name="nik_karyawan" readonly placeholder="Pilih Karyawan">
                            <span class="input-group-append">
                                <button class="file-upload-browse btn btn-primary" id="btn-pilih-karyawan" type="button">Pilih Karyawan</button>
                            </span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Tanggal Penggajian</label>
                                    <div class="col-sm-9">
                                    <input type="text" name="tanggal_penggajian" id="tanggal_penggajian" class="form-control" value="<?= $this->uri->segment(3) ?>" readonly />
                                    </div>
                                </div>
                                </div>
                                <div class="col-md-6">
                                <div class="form-group">
                                    <label>Status</label>
                                    <div class="col-sm-9">
                                    <input type="text" name="status" id="status" class="form-control" value="process" readonly />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-gradient-primary btn-fw">SIMPAN</button>
                    </form>
                </div>
            </div>
        </div>
</div>




<div class="col-12" id="labelProgress" >
    <label>Progress 1 dari 25 Karyawan </label>
    <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>

<div class="col-6" id="sectionACC" style="margin-top: 40px;" >
    <div class="form-group">
        <h5>Kirim ke owner</h5>
        <button class="btn btn-primary" id="btn-send-to-owner" >Kirim</button>
    </div>
</div>

<div class="col-lg-12 grid-margin stretch-card animated fadeInLeft" style="margin-top:20px;">
    <div class="card">
    <div class="card-body">
        <h4 class="card-title">Data Penerima Gaji</h4>
        <p class="card-description">
        </p>


        <table class="table table-striped">
        <thead>
            <tr>
                <th></th>
                <th>No</th>
                <th>Nik</th>
                <th>Nama Lengkap</th>
                <th>Jabatan</th>
                <th>Gaji yang diterima</th>
                <th>Status</th>
                <th>Absensi</th>
            </tr>
        </thead>
        <tbody id="show-created-absensi"></tbody>

    </div>
    </div>
</div>





<script>
    window.scrollTo(500,0)
</script>

<script>
    SEGMENT = '<?= $this->uri->segment(3) ?>';
</script>
<script src="<?= base_url('public/admin/absensi/absensi.js') ?>" ></script>



