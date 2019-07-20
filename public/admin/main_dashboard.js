(function() {

    const dashboardURL = (function() {
        urlString = {
            countFetch: `${BASE_URL}master/Dashboard/count_qty`
        }
        return {
            getURL: () => urlString
        }
    })()

    const dashboardInterface = (function() {
        domString = {
            html: {
                total_karyawan: '#total__karyawan',
                gaji_process: '#total__gaji__process',
                gaji_waiting: '#total__gaji__waiting',
                gaji_approved: '#total__gaji__approved'
            }
        }


        return {
            getDOM: () => domString,
            retrieveCount: data => {
                console.log(data);
                $(domString.html.total_karyawan).text(data.total_karyawan)
                $(domString.html.gaji_process).text(data.count_process);
                $(domString.html.gaji_waiting).text(data.count_waiting)
                $(domString.html.gaji_approved).text(data.count_approved)
            }
        }
    })()


    const dashboardController = (function(URL,UI) {
        const url = URL.getURL()
        const dom = UI.getDOM()

        const eventListener = function(){

        }

        const load_count_qty = () => getResource(url.countFetch, data =>  UI.retrieveCount(data));


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
                console.log(dom);
                console.log(url)
                load_count_qty()
            }
        }
    })(dashboardURL, dashboardInterface)

    $(document).ready(function() {
        dashboardController.init()
    })



})()
