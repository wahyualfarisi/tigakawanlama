(function() {
	const dashboardURL = (function() {
		var urlString = {
			countFetch: `${BASE_URL}master/Dashboard/count_qty`,
			fetch_dashboard: `${BASE_URL}master/Dashboard/dashboard_owner`,
			grafik: `${BASE_URL}master/Dashboard/grafik_penggajian`
		};
		return {
			getURL: () => urlString
		};
	})();

	const dashboardInterface = (function() {
		var domString = {
			countValidasi: "#total_validasi"
        };

        let TanggalPenggajian = [];
        let jumlahPegeluaran = []

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
                        datasets: [
                            {
                                label: "Total Pengeluaran",
                                data: jumlahPegeluaran,
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(54, 162, 235, 0.2)",
                                    "rgba(255, 206, 86, 0.2)",
                                    "rgba(75, 192, 192, 0.2)",
                                    "rgba(153, 102, 255, 0.2)",
                                    "rgba(255, 159, 64, 0.2)"
                                ],
                                borderColor: [
                                    "rgba(255,99,132,1)",
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(255, 206, 86, 1)",
                                    "rgba(75, 192, 192, 1)",
                                    "rgba(153, 102, 255, 1)",
                                    "rgba(255, 159, 64, 1)"
                                ],
                                borderWidth: 12,
                                fill: false
                            }
                        ]
                    };
        
                    var options = {
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ]
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
                        var barChartCanvas = $("#barChart")
                            .get(0)
                            .getContext("2d");
                        // This will get the first returned node in the jQuery collection.
                        var barChart = new Chart(barChartCanvas, {
                            type: "bar",
                            data: data,
                            options: options
                        });
                    }




                })
            }
           
        }

		return {
			getDOM: () => domString,
			retrieveFetchDashboard: data => {
				$("#total_validasi").html(data.menunggu_validasi);
				$("#total__pengeluaran").html(
					formatRupiah(data.total_pengeluaran[0].total_pengeluaran)
				);
            },
            retirieveGrafik: data => renderGrafik(data)
		};
	})();

	const dashboardController = (function(URL, UI) {
		const url = URL.getURL();
		const dom = UI.getDOM();

		//    const load_count_qty = () => getResource(url.countFetch, data => console.log(data) )

		const fetch_dashboard = () =>
            getResource(url.fetch_dashboard, data => UI.retrieveFetchDashboard(data));
            
        const load_grafik = () => getResource(url.grafik, data => UI.retirieveGrafik(data) );

		const getResource = (url, callback) => {
			$.ajax({
				url,
				method: "get",
				dataType: "json",
				success: function(data) {
					callback(data);
				}
			});
		};

		return {
			init: () => {
				// load_count_qty()
				fetch_dashboard();
                load_grafik()
				
			}
		};
	})(dashboardURL, dashboardInterface);

	dashboardController.init();
})();
