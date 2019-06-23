<h3 class="page-title animated fadeInLeft">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
        <i class="mdi mdi-account-outline"></i>                 
        </span>
       Detail Karyawan
 </h3>


 <div class="col-12 grid-margin animated fadeIn" style="margin-top: 60px;">

    <div class="card">
        <div class="card-body">
            <form id="form-add-karyawan">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">NIK</label>
                        <div class="col-sm-9">
                             <input type="text" name="nik" id="nik" maxlength="10" class="form-control onlynumber" readonly/>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                            <input type="text" id="email" name="email"  class="form-control " readonly />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Nama Depan</label>
                        <div class="col-sm-9">
                             <input type="text" name="nama_depan" id="nama_depan" class="form-control" readonly />
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Nama Belakang</label>
                        <div class="col-sm-9">
                            <input type="text" id="nama_belakang" name="nama_belakang"  class="form-control" readonly />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Jenis Kelamin</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="jenis_kelamin" readonly>
                                <option value="L">Laki - Laki</option>
                                <option value="P">Female</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Tanggal Lahir</label>
                        <div class="col-sm-9">
                        <input type="date" id="tanggal_lahir" name="tanggal_lahir" class="form-control" placeholder="dd/mm/yyyy" readonly/>
                        </div>
                    </div>
                </div>
            </div>

             <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Alamat</label>
                        <div class="col-sm-9">
                             <input type="text" name="alamat" id="alamat" class="form-control" readonly />
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Tanggal Gabung</label>
                        <div class="col-sm-9">
                        <input type="date" id="tanggal_gabung" name="tanggal_gabung" class="form-control" placeholder="dd/mm/yyyy readonly" readonly/>
                        </div>
                    </div>
                </div>
            </div>

             <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">No. Telp</label>
                        <div class="col-sm-9">
                             <input type="text" name="no_telp" id="no_telp" class="form-control onlynumber" readonly />
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Agama</label>
                        <div class="col-sm-9">
                            <input type="text" id="agama" name="agama"  class="form-control" readonly />
                        </div>
                    </div>
                </div>
            </div>

             <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">No. Rekening</label>
                        <div class="col-sm-9">
                             <input type="text" name="no_rekening" maxlength="15" id="no_rekening" class="form-control onlynumber" readonly />
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Nama Bank</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="nama_bank" readonly>
                                <option value="">Pilih Bank</option>
                                <option value="BCA">BCA</option>
                                <option value="MANDIRI">MANDIRI</option>
                                <option value="BRI">BRI</option>
                                <option value="BNI">BNI</option>
                                <option value="BCA">BCA</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

             <div class="row">
                <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Atas Nama</label>
                        <div class="col-sm-9">
                             <input type="text" name="atas_nama" id="atas_nama" class="form-control" readonly />
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Kode Jabatan</label>
                        <div class="col-sm-9" >
                            <select class="form-control" name="kode_jabatan" id="kode_jabatan">

                            </select>
                        </div>
                        
                    </div>
                </div>
            </div>

        
            <button style="display: none" type="submit" class="btn btn-gradient-primary btn-fw">UPDATE</button>


            </form>
            
        </div>
    </div>
</div>


<div class="col-12">
    <button type="button" class="btn btn-gradient-warning btn-fw">Edit</button>
    <button type="button" class="btn btn-gradient-danger btn-fw">Delete</button>
</div>

<script>
    window.scrollTo(500,0)
</script>

