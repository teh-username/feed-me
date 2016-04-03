(function(){
    // global vars
    markers = [];

    // default lat, lng is on manila because why not?
    var coor = {lat: 14.5995, lng: 120.9842};

    // init map
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: coor,
        zoom: 12
    });

    // init marker
    var marker = new google.maps.Marker({
        position: coor,
        map: map,
        title: 'You are here',
        draggable:true,
        animation: google.maps.Animation.DROP
    });

    // add listener for marker
    google.maps.event.addListener(marker, 'dragend', function(){
        coor.lat = marker.getPosition().lat();
        coor.lng = marker.getPosition().lng();
    });

    // add listener on submit
    $('#submit_whatevs').on('click', function(){
        var url = '/get-places';
        var data = {
            radius: $('#radius').val(),
            lat: coor.lat,
            lng: coor.lng
        }

        $.param(data);
        $.post(url, data, function(data){
            if(data.is_successful){
                var restaurants = data.data.response.restaurants

                // remove previous markers
                for(var i=0; i<markers.length; i++){
                    markers[i].setMap(null);
                }

                if(restaurants.length >= 1){
                    var len = 10;
                    // pin markers
                    for(var i = 0; i < 10; i++){
                        console.log(restaurants[i].restaurant);
                        var res = restaurants[i].restaurant;
                        var loc = {lat: parseFloat(res.location.latitude), lng: parseFloat(res.location.longitude)};
                        markers.push(
                            new google.maps.Marker({
                                position: loc,
                                map: map,
                                title: res.name,
                                animation: google.maps.Animation.DROP
                            })
                        );
                    }
                }
                else{
                    alert('No close by :(');
                }
            }
            else{
                alert('Something went wrong, lemme cry for a bit');
            }
        })
    });
})()
