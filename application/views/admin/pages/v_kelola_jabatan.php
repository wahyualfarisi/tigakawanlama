<h3 class="page-title animated fadeInLeft">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
       Kelola Jabatan
 </h3>


<div class="col-12" style="margin-top: 40px;">
    <button class="btn btn-gradient-primary btn-fw" id="btn__add__jabatan">Tambah Jabatan</button>
</div>

<div class="col-lg-12 grid-margin stretch-card" style="margin-top: 40px;">
    <div class="card">
        <div class="card-body">
                <h4 class="card-title">Informasi Jabatan</h4>
                <table class="table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Jabatan</th>
                        <th>Gaji</th>
                        <th>Potongan</th>
                        <th>Lemburan</th>
                      </tr>
                    </thead>
                    <tbody id="show__data__gaji"></tbody>
                </table>

        </div>
    </div>
</div>



<div class="modal fade"  id="modalJabatan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content ">
      <div class="modal-header">
        <h5 class="modal-title" id="modalKaryawan">Tambah Jabatan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="content-modal">
        <form id="form__add__jabatan">

            <div class="form-group">
                <label>Nama Jabatan</label>
                <input type="text" class="form-control" id="nama_jabatan" name="nama_jabatan">
            </div>
            <div class="form-group">
                <label>Jumlah Gaji</label>
                <input type="number" class="form-control" id="jumlah_gaji" name="jumlah_gaji" >
            </div>

            <div class="form-group">
                <label>Potongan (Per Jam)</label>
                <input type="number" class="form-control" id="potongan" name="potongan">
            </div>

            <div class="form-group">
                <label>Lemburan (Per Jam) </label>
                <input type="number" class="form-control" id="lemburan" name="lemburan">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade"  id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content ">
      <div class="modal-header">
        <h5 class="modal-title" id="modalKaryawan">Edit Jabatan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="content-modal">
        <form id="form__edit__jabatan">
            <input type="hidden" id="kode_jabatan_edit" name="kode_jabatan_edit">
            <div class="form-group">
                <label>Nama Jabatan</label>
                <input type="text" class="form-control" id="nama_jabatan_edit" name="nama_jabatan_edit">
            </div>
            <div class="form-group">
                <label>Jumlah Gaji</label>
                <input type="text" class="form-control" id="jumlah_gaji_edit" name="jumlah_gaji_edit" >
            </div>

            <div class="form-group">
                <label>Potongan (Per Jam) </label>
                <input type="text" class="form-control" id="potongan_edit" name="potongan_edit">
            </div>

             <div class="form-group">
                <label>Lemburan (Per Jam) </label>
                <input type="text" class="form-control" id="lemburan_edit" name="lemburan_edit">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade"  id="modalHapus" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content ">
      <div class="modal-header">
        <h5 class="modal-title" id="modalKaryawan">Konfirmasi Hapus</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="content-modal">
        <p>Anda yakin ingin menghapus data ini ?</p>
        <form id="form__hapus__jabatan">
          <input type="hidden" id="kode_jabatan" name="kode_jabatan">
          <div class="form-group">
            <label>Confirm</label>
            <input type="text" name="confirm" id="confirm" class="form-control" placeholder="konfirmasi dengan 'confirm' untuk melanjutkan ">
          </div>
          <button class="btn btn-gradient-primary" type="submit">SUBMIT</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<script src="<?= base_url('public/admin/penggajian/jabatan.js')?>"></script>