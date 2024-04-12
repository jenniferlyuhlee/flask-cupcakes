const BASE_URL = "http://localhost:5000/api";

/* Returns HTML for cupcake list item*/
function cupcakeHTML(cupcake){
    return `
    <div class ="m-3 text-center">
        <li class="d-flex align-items-center justify-content-center">
        ${cupcake.flavor} (${cupcake.size}) - ${cupcake.rating}/10
        <button data-id ="${cupcake.id}" class="delete-button btn btn-danger ml-2">Delete</button></li>
        <img width="200px" src="${cupcake.image}" alt="${cupcake.flavor} cupcake">
    </div>  
    `
}

/* Put cupcakes on page */
async function showCupcakes(){
    const cupcakesResp = await axios.get(`${BASE_URL}/cupcakes`);
    const cupcakesData = cupcakesResp.data.cupcakes
    for (let cupcakeData of cupcakesData){
        const cupcake = $(cupcakeHTML(cupcakeData))
        $("#cupcakes-list").append(cupcake)
    }
}
showCupcakes()

/* Handles create cupcake form submission */
async function createCupcake(evt){
    evt.preventDefault()
    let flavor = $("#flavor").val()
    let size = $("#size").val()
    let rating = $("#rating").val()
    let image = $("#image").val()
    //utilizing form data makes axios post request to API to create cupcake
    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`,
        {flavor, size, rating, image}
    );
    //updates interface to reflect new cupcake
    const newCupcake= $(cupcakeHTML(newCupcakeResp.data.cupcake));
    $("#cupcakes-list").append(newCupcake)
    $("#create-cupcake-form").trigger("reset");
}
$("#create-cupcake-form").on("submit", createCupcake);

/* Handles delete cupcake event */
async function deleteCupcake(evt){
    if ($(evt.target).is("button")){
        const cupcakeId= $(evt.target).data('id')
        await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
        $(evt.target).closest('div').remove()
    }
}

$("#cupcakes-list").on("click",deleteCupcake)
