

class citiesManeger {

    getDatafromDB = async () => {
        let data = await $.get('/cities')
        return data
    }

    getCityData = async (city) => {
        let data = await $.get(`/mycity/${city}`)
        return data
    }

    getUserCity = async (latitude,longitude) =>{
        let data = await $.get(`/usercity/${latitude}/${longitude}`)
        return data
    }

    saveCity = async (data) => {
        let addCity = await $.post('/city', data)
        return addCity
    }

    removeCity = async (city) => {
     const remove = await  $.ajax({
            url: `/city/${city}`,
            type: 'DELETE',
            success: function(result) {
                alert(`Remove the city ${result.name}`)
            }
        });
    } 

    updateCity = async(city,dataCity) => {
        const update = await $.ajax({
            url:`/cityupdate/${city}`,
            data: dataCity,
            type:'PUT',
            success:function(){
                console.log('the city update')

            }
        });
    }
    
}