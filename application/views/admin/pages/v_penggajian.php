<h3 class="page-title animated fadeIn">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
       Penggajian
 </h3>
<div class="col-12 grid-margin animated fadeIn" style="margin-top: 15px;">
    <div class="card">
        <div class="card-body">
             <h4 class="card-title">Penggajian</h4>
             <form id="form-add-penggajian">
                <p class="card-description">
                   Periode Gaji
                </p>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Tanggal Penggajian</label>
                            <div class="col-sm-9">
                            <input type="date" name="tanggal_penggajian" id="tanggal_penggajian" class="form-control" />
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Status</label>
                            <div class="col-sm-9">
                            <input type="text" name="status" class="form-control" value="process" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Dibuat Oleh</label>
                            <div class="col-sm-9">
                            <input type="text" name="created_by" id="created_by" class="form-control" value="<?= $this->session->userdata('nama_lengkap') ?>"  readonly/>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label"></label>
                                    <div class="col-sm-9">
                                    <button type="submit" class="btn btn-gradient-primary"> Buat Data Gaji </button>
                                    </div>
                            </div>
                     </div>
                </div>
              </form>
        </div>
    </div>
</div>

<div class="col-12" >
    <h3 class="page-title">Cari Data Gaji</h3>
    <form id="form_search_gaji" style="margin-top: 20px;">
            <div class="input-group col-xs-12">
                <input type="text" name="search_data_gaji" id="search_data_gaji" class="form-control file-upload-info" placeholder="Cari Data Gaji">
            </div>
    </form>
    
</div>

<div class="col-3" style="margin-top: 20px;">
        <select name="status_penggajian" id="status_penggajian" class="form-control">
            <option value="">-- sort data --</option>
            <option value="process">Process</option>
            <option value="waiting">Waiting</option>
            <option value="approved">Approved</option>
        </select>
</div>


<div class="col-12 animated fadeIn">
    <div class="row"  style="margin-top: 30px;" id="show-data-gaji">
         <!-- <div class="col-md-4 stretch-card grid-margin">
                <div class="card bg-gradient-info  card-img-holder text-white">
                <div class="card-body">                             
                    <h4 class="font-weight-normal mb-3">25 Juni 2019
                    <i class="mdi mdi-bookmark mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">On Process</h2>
                    <h5>3 Absensi Berhasil Di import</h5>
                    <h6 class="card-text">
                        <button class="btn btn-info" > Import Absensi </button>
                    </h6>
                </div>
                </div>
            </div> -->
    </div>
</div>

<script src="<?= base_url('public/admin/penggajian/gaji.js') ?>"></script>

