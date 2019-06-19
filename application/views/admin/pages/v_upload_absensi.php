<h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
       Upload Absensi
 </h3>
<div class="col-lg-12 grid-margin stretch-card animated fadeIn" style="margin-top:20px;">
    <div class="card">
    <div class="card-body">
        <h4 class="card-title">Import Absensi</h4>

        <p class="card-description">
            <form id="form-upload-absensi" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Pilih File absensi</label>
                    <input type="hidden" name="id_absensi" value="<?=$_GET['id_absensi'] ?>">
                    <input type="file" class="form-control" name="file" accept=".xls, .xlsx">
                </div>
                <button type="submit" class="btn btn-primary">Upload</button>
            </form>
        </p>

        <h2 class="text-center">Preview Absensi</h2>
        <table class="table table-striped">
        <thead>
            <tr>
                <th>Tanggal Absen</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
                <th>Scan Masuk</th>
                <th>Scan Keluar</th>
                <th>Terlambat</th>
                <th>Total Jam Kerja</th>
            </tr>
        </thead>
        <tbody id="preview-absensi-karyawan"></tbody>

    </div>
    </div>
</div>

<script src="<?= base_url('public/admin/absensi/uploadabsensi.js') ?>" ></script>