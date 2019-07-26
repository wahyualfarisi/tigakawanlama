(function() {

    const dashboardURL = (function() {
        urlString = {
            countFetch: `${BASE_URL}master/Dashboard/count_qty`,
            grafik: `${BASE_URL}master/Dashboard/grafik_penggajian`
        }
        return {
            getURL: () => urlString
        }
    })()

    const dashboardInterface = (function() {
        let TanggalPenggajian = [];
        let jumlahPegeluaran = []
        var domString = {
            html: {
                total_karyawan: '#total__karyawan',
                gaji_process: '#total__gaji__process',
                gaji_waiting: '#total__gaji__waiting',
                gaji_approved: '#total__gaji__approved',
                showListPengeluaran: '#show__list__pengeluaran'
            }
        }

        const formatDate = date => {
            var months   = ['Januari','Februari','Maret', 'April',' Mei', 'Juni', 'Juli','Agustus','September','Oktober','November','Desember'];
            var getMonth = new Date(date).getMonth();
            return months[getMonth];
        }

        const renderGrafik = data => {
            if(data.length > 0){
                data.forEach(item => {
                    TanggalPenggajian.push(formatDate(item.tgl_penggajian))
                    jumlahPegeluaran.push(item.total_pengeluaran)

                    var data = {
                        labels: TanggalPenggajian,
                        datasets: [{
                          label: '# of Votes',
                          data: jumlahPegeluaran,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                          ],
                          borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 1,
                          fill: false
                        }]
                      };
                      var options = {
                        scales: {
                          yAxes: [{
                            ticks: {
                              beginAtZero: true
                            }
                          }]
                        },
                        legend: {
                          display: false
                        },
                        elements: {
                          point: {
                            radius: 0
                          }
                        }
                    
                      };
                    
                    if ($("#barChart").length) {
                        var barChartCanvas = $("#barChart").get(0).getContext("2d");
                        // This will get the first returned node in the jQuery collection.
                        var barChart = new Chart(barChartCanvas, {
                          type: 'bar',
                          data: data,
                          options: options
                        });
                      }


                })
            }
            
        }

        const renderList = data => {
            let html = ''
            if(data.length > 0){
                data.forEach(item => {
                    html += `
                        <tr>
                            <td> ${formatDate(item.tgl_penggajian)} </td>
                            <td> ${formatRupiah(item.total_pengeluaran) } </td>
                        </tr>
                    `;
                })
            }
            $(domString.html.showListPengeluaran).html(html)
        }


        return {
            getDOM: () => domString,
            retrieveCount: data => {
                console.log(data);
                $(domString.html.total_karyawan).text(data.total_karyawan)
                $(domString.html.gaji_process).text(data.count_process);
                $(domString.html.gaji_waiting).text(data.count_waiting)
                $(domString.html.gaji_approved).text(data.count_approved)
            },
            retrieveGrafik: data => {
                renderGrafik(data)
                renderList(data)
            }
        }
    })()


    const dashboardController = (function(URL,UI) {
        const url = URL.getURL()
        const dom = UI.getDOM()

        const eventListener = function(){

        }

        const load_count_qty = () => getResource(url.countFetch, data =>  UI.retrieveCount(data));

        const load_grafik = () => getResource(url.grafik, data => UI.retrieveGrafik(data) );


        const getResource = (url, callback) => {
            $.ajax({
                url,
                method: 'post',
                dataType: 'json',
                success: function(data){
                    callback(data)
                }
            })
        }



        return {
            init: () => {
                load_count_qty()
                load_grafik()

                



            }
        }
    })(dashboardURL, dashboardInterface)

    $(document).ready(function() {
        dashboardController.init()
    })



})()
