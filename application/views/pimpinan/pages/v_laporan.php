<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form id="form-lihat-laporan">
                    <div class="form-group">
                        <label>Dari Bulan</label>
                        <select name="dari_bulan" id="dari_bulan" class="form-control">   
                            <option value="">-- Pilih Bulan -- </option>
                            <option value="1">Januari</option>
                            <option value="2">Februari</option>
                            <option value="3">Maret</option>
                            <option value="4">April</option>
                            <option value="5">Mei</option>
                            <option value="6">Juni</option>
                            <option value="7">Juli</option>
                            <option value="8">Agustus</option>
                            <option value="9">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Sampai Bulan</label>
                        <select name="sampai_bulan" id="sampai_bulan" class="form-control">   
                            <option value="">-- Pilih Bulan -- </option>
                            <option value="1">Januari</option>
                            <option value="2">Februari</option>
                            <option value="3">Maret</option>
                            <option value="4">April</option>
                            <option value="5">Mei</option>
                            <option value="6">Juni</option>
                            <option value="7">Juli</option>
                            <option value="8">Agustus</option>
                            <option value="9">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-gradient-info">Lihat Laporan</button>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="showbuttonlaporan" style="margin-top: 40px;">
<button class="btn btn-gradient-info" id="btn_print_laporan">PRINT</button>
</div>

<div class="card" style="margin-top: 50px;" id="areaprint">
    
    <div class="card-body">
        <div class="">
            <img src="<?= base_url('assets/img/logo.jpeg') ?>" alt=""><br>
            <h4 class="text-center">LAPORAN PENGGAJIAN </h4>
            <div class="col-md-12">
                <table class="table">
                         <thead>
                             <tr>
                                <th>No.</th>
                                <th>ID Penggajian</th>
                                <th>NIK</th>
                                <th>Nama Karyawan</th>
                                <th>Tanggal Penggajian</th>
                                <th>Jabatan</th>
                                <th>Total Potongan</th>
                                <th>Total Lemburan</th>
                                <th>Total Gaji</th>
                            </tr>
                        </thead>
                        <tbody id="show__laporan"></tbody>
                   
                </table>
            </div>
        </div>
    </div>
</div>


<script src="<?= base_url('public/myPlugin.js') ?>"></script>
<script src="<?= base_url('public/pimpinan/laporan1.js') ?>"></script>
