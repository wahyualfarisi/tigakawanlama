<h3 class="page-title animated fadeInLeft">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
       Kelola User
 </h3>


<div class="col-12" style="margin-top: 40px;">
    <button class="btn btn-gradient-primary btn-fw" id="btn__add__user">Tambah user</button>
</div>

<div class="col-lg-12 grid-margin stretch-card" style="margin-top: 40px;">
    <div class="card">
        <div class="card-body">

                <h4 class="card-title">Informasi User</h4>

                <table class="table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Nama Lengkap</th>
                        <th>Akses</th>
                        <th>Login Terakhir</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody id="show__user" ></tbody>
                </table>

        </div>
    </div>
</div>

<div class="modal fade"  id="modalAddUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content ">
      <div class="modal-header">
        <h5 class="modal-title" id="modalKaryawan">Tambah User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="content-modal">
        <form id="form__add__user">

            <div class="form-group">
                <label>Kode Admin</label>
                <input type="text" class="form-control" id="email" name="email">
            </div>

            <div class="form-group">
                <label>Nama Depan</label>
                <input type="text" class="form-control" id="nama_depan" name="nama_depan">
            </div>

            <div class="form-group">
                <label>Nama Belakang</label>
                <input type="text" class="form-control" id="nama_belakang" name="nama_belakang">
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="text" class="form-control" id="password" name="password" >
            </div>

            <div class="form-group">
                <label>Akses</label>
                <select name="akses" id="akses" class="form-control">
                    <option value="">--pilih akses--</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="OWNER">OWNER</option>
                </select>
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

<div class="modal fade"  id="modalEditUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content ">
      <div class="modal-header">
        <h5 class="modal-title" id="modalKaryawan">Tambah User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="content-modal">
        <form id="form__edit__user">
            <input type="hidden" id="kode_admin_edit" name="kode_admin_edit">

            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" id="email_edit" name="email_edit">
            </div>

            <div class="form-group">
                <label>Nama Depan</label>
                <input type="text" class="form-control" id="nama_depan_edit" name="nama_depan_edit">
            </div>

            <div class="form-group">
                <label>Nama Belakang</label>
                <input type="text" class="form-control" id="nama_belakang_edit" name="nama_belakang_edit">
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="text" class="form-control" id="password_edit" name="password_edit" >
            </div>

            <div class="form-group">
                <label>Akses</label>
                <select name="akses_edit" id="akses_edit" class="form-control">
                    <option value="">--pilih akses--</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="OWNER">OWNER</option>
                </select>
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


<script src="<?= base_url('public/myPlugin.js') ?>" ></script>
<script src="<?= base_url('public/admin/user/User.js') ?>" ></script>