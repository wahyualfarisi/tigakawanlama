
    <h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
        List Karyawan
    </h3>



    <form id="form_search_karyawan" style="margin-top: 20px;">
        <div class="input-group col-xs-12">
            <input type="text" name="search_karyawan" id="search_karyawan" class="form-control file-upload-info" placeholder="Cari Karyawan">
            
        </div>
    </form>

    <div style="margin-top: 40px;">
        <a href="#/tambahkaryawan" class="btn btn-gradient btn-info">Tambah Karyawan</a>
    </div>

<div class="row animated fadeIn" style="margin-top: 30px;" id="show-karyawan"></div>
<script src="<?= base_url('dist/admin/karyawan/karyawan.min.js') ?>" ></script>


