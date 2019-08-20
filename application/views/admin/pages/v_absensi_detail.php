

<div class="col-lg-12 grid-margin stretch-card" style="margin-top: 40px;">
    <div class="card">
        <div class="card-body">
                <h4 class="card-title text-center">ABSENSI</h4>
                <table class="table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Tanggal Absen</th>
                        <th>Jam Masuk</th>
                        <th>Jam Keluar</th>
                        <th>Scan Masuk</th>
                        <th>Scan Keluar</th>
                        <th>Terlambat</th>
                        <th>Lemburan </th>
                      </tr>
                    </thead>
                    <tbody id="show__detail__absensi"></tbody>
                </table>

        </div>
    </div>
</div>
<script>
    var SEGMENT = '<?= $_GET['dataabsensi'] ?>';
</script>
<script src="<?= base_url('public/admin/absensi/detailabsensi.js')?>"></script>