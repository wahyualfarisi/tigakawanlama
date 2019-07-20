(function() {



    const dashboardURL = (function() {
        var urlString = {
            countFetch: `${BASE_URL}master/Dashboard/count_qty`
        }
        return {
            getURL: () => urlString
        }
    })();


    const dashboardInterface = (function() {
        var domString = {
            countValidasi: '#total_validasi'
        }
        return{
            getDOM: () => domString
        }
    })()

    const dashboardController = (function(URL, UI) {
       const url = URL.getURL()
       const dom = UI.getDOM()


       const load_count_qty = () => getResource(url.countFetch, data => console.log(data) )

   


       const getResource = (url, callback) => {
        $.ajax({
            url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                callback(data)
            }
        })
    }

       
       return {
           init: () => {
            load_count_qty()
           }
       }

    })(dashboardURL, dashboardInterface)

 
    dashboardController.init();



})()