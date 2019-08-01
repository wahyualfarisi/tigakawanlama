<h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
       Upload Absensi
 </h3>
<div class="col-lg-12 grid-margin stretch-card animated fadeIn" style="margin-top:20px;">
    <div class="card">
    <div class="card-body">
     <h4 class="card-title">Data Karyawan</h4>
        <div style="margin-top:20px; margin-bottom: 20px;">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Nik</th>
                        <th>Nama Lengkap</th>
                        <th>Kode Jabatan</th>
                        <th>Jabatan</th>
                        <th>Tanggal Penggajian</th>
                    </tr>
                    <tbody id="show-current-karyawan" ></tbody>
                </thead>
            </table>
        </div>

        <div id="section-upload">
            <h4 class="card-title" style="margin-top: 80px;">Import Absensi</h4>
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
        </div>

       
       

        <h4 class="card-title" style="margin-top: 80px;">Preview Absensi</h4>
        <div id="messages"></div>
        <form id="form-save-karyawan">
            <table class="table table-bordered">
                <input type="hidden" name="tgl_penggajian" value="<?= $_GET['tgl_penggajian'] ?>" >
                <input type="hidden" name="id_absensi" value="<?= $_GET['id_absensi'] ?>" >
                <input type="hidden" name="nik" value="<?= $_GET['nik'] ?>" >
                <thead>
                    <tr>
                        <th>NIK</th>
                        <th>Tanggal Absen</th>
                        <th>Jam Masuk</th>
                        <th>Jam Keluar</th>
                        <th>Scan Masuk</th>
                        <th>Scan Keluar</th>
                        <th>Terlambat</th>
                        <th>Total Lembur</th>
                        <th>Total Jam Kerja</th>
                    </tr>
                </thead>
                <tbody id="preview-absensi-karyawan"></tbody>
            </table>

            <div id="section-calc-gaji" style="margin-top: 40px;" >
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Total Lembur Perjam</label>
                                <input type="text" id="total_lembur_perjam" class="form-control" readonly>
                        </div>
                        <div class="form-group">
                            <label>Total Telat Perjam</label>
                                <input type="text"  id="total_telat_perjam" class="form-control" readonly>
                        </div>
                        <div class="form-group">
                            <label>Gaji  </label>
                                <input type="text" id="gaji" class="form-control" readonly>
                        </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group">
                        <label>Total Lemburan </label>
                            <input type="text" name="total_lembur" id="total_lembur" class="form-control" readonly>
                        </div>

                        <div class="form-group">
                            <label>Total Potongan</label>
                            <input type="text" name="potongan" id="potongan" class="form-control" readonly>
                        </div>
                    
                        <div class="form-group">
                            <label>Total Gaji Yang Diterima</label>
                            <input type="text" name="total_gaji" id="total_gaji" class="form-control" readonly >
                        </div>
                    </div>
                </div>
               

                
            </div>

            <div id="section-form-simpan-absensi" style="margin-top: 40px;" >
                <button type="submit" class="btn btn-primary" id="btn-save-absensi">SIMPAN</button>
            </div>
        </form>
       

    </div>
    </div>
</div>

<script>
    window.scrollTo(500,0)
    var GLOBAL_NIK = '<?= $_GET['nik'] ?>';
    var GLOBAL_TGL_PENGGAJIAN = '<?= $_GET['tgl_penggajian'] ?>';
</script>
<script src="<?= base_url('public/admin/absensi/uploadabsensi.js') ?>" ></script>