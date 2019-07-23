
<div class="print text-right" style="margin-bottom: 40px;">
    <button class="btn btn-gradient-info" id="btn_print" >PRINT</button>
</div>

<div class="card" id="slip__gaji">
    <div class="card-body">
        <h4 class="card-title text-center">SLIP GAJI</h4>

        <div class="row" style="margin-top: 30px;">
            <div class="col-md-6" >

                <table class="table">
                    <tr>
                        <th>Nama</th>
                        <td id="nama__karyawan">Wahyu Alfarisi</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td id="email__karyawan"></td>
                    </tr>
                    <tr>
                        <th>Tanggal Lahir</th>
                        <td id="tanggal__lahir__karyawan"></td>
                    </tr>
                    <tr>
                        <th>Jenis Kelamin</th>
                        <td id="jk__karyawan"></td>
                    </tr>
                </table>

            </div>

            <div class="col-md-6">
                <table class="table">
                    <tr>
                        <th>No. Rekening</th>
                        <td id="no__rek__karyawan" ></td>
                    </tr>
                    <tr>
                        <th>Nama Bank</th>
                        <td id="nama__bank__karyawan" ></td>
                    </tr>
                    <tr>
                        <th>Atas Nama</th>
                        <td id="atas__nama__karyawan" ></td>
                    </tr>
                   
                </table>
            </div>

           

            <div class="col-md-6" style="margin-top: 30px;">
                <p>Deskripsi Pekerjaan</p>
                <table class="table">
                    <tr>
                        <th>Jabatan</th>
                        <td id="jabatan__karyawan" ></td>
                    </tr>
                    <tr>
                        <th>Gaji Jabatan</th>
                        <td id="gaji__jabatan"></td>
                    </tr>
                    <tr>
                        <th>Potongan</th>
                        <td id="potongan__karyawan"></td>
                    </tr>
                    <tr>
                        <th>Lemburan</th>
                        <td id="lemburan__karyawan"></td>
                    </tr>
                </table>
            </div>


            <div class="col-md-6" style="margin-top: 30px;">
                 <p>TOTAL </p>
                <table class="table">
                    <tr>
                        <th>Tanggal Penggajian</th>
                        <td id="tanggal__penggajian"></td>
                    </tr>
                    <tr>
                        <th>Total Gaji Yang Di terima</th>
                        <td id="total__gaji__yang__diterima"></td>
                    </tr>
                    <tr>
                        <th>Potongan</th>
                        <td id="total__potongan"></td>
                    </tr>
                    <tr>
                        <th>Lemburan</th>
                        <td id="total__lemburan"></td>
                    </tr>
                </table>
            </div>

        </div>

        

    </div>
</div>
<script>
    var SEGMENT = '<?= $this->uri->segment(3) ?>';

</script>
<script defer src="<?= base_url('public/myPlugin.js') ?>"></script>
<script defer src="<?= base_url('public/karyawan/printslip.js') ?> " ></script>