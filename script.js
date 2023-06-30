window.onload = function(){

  document.getElementById("resultTable").style.display = "none";
  const fetchButton = document.querySelector("#fetchButton")

  const getData = function() {
    event.preventDefault();
    fetch("https://api.zachmig.com/country?name=United_States_of_America")
      .then(res => res.json())
      .then(data => {
        if (document.getElementById("resultTable").rows.length > 1) {
          document.getElementById("resultTable").deleteRow(1);
        }
        
        loadTableData(data);

        document.getElementById("resultTable").style.display = "block";
        

      })
      .catch(error => console.log(error))
  }

  fetchButton.addEventListener("click", getData)


};


//Populate result table
function loadTableData(jsonData) {
  const table = document.getElementById("tableBody");
  let row = table.insertRow();

  let cell = row.insertCell(0);
  cell.innerHTML = jsonData.name;
  cell = row.insertCell(1);
  cell.innerHTML = jsonData.popM;
  cell = row.insertCell(2);
  cell.innerHTML = jsonData.sizeKM2;
  cell = row.insertCell(3);
  cell.innerHTML = jsonData.birthRate;
  cell = row.insertCell(4);
  cell.innerHTML = jsonData.avgElevationMeters;
  cell = row.insertCell(5);
  cell.innerHTML = jsonData.isLandlocked;
  cell = row.insertCell(6);
  cell.innerHTML = jsonData.gdpM;
  cell = row.insertCell(7);
  cell.innerHTML = jsonData.importM;
  cell = row.insertCell(8);
  cell.innerHTML = jsonData.exportM;
  cell = row.insertCell(9);
  cell.innerHTML = jsonData.standingArmyK;
  cell = row.insertCell(10);
  cell.innerHTML = jsonData.navalDispTons;
  cell = row.insertCell(11);
  cell.innerHTML = jsonData.numWarplanes;
  cell = row.insertCell(12);
  cell.innerHTML = jsonData.continent.name;
  cell = row.insertCell(13);
  cell.innerHTML = jsonData.religion.name;
  cell = row.insertCell(14)
  cell.innerHTML = jsonData.ethnicity.name;
  cell = row.insertCell(15);
  cell.innerHTML = jsonData.language.name;
  cell = row.insertCell(16);
  cell.innerHTML = jsonData.government.name;
  cell = row.insertCell(17);
  cell.innerHTML = jsonData.tradeBloc.name;
  cell = row.insertCell(18);
  cell.innerHTML = jsonData.alliance.name;

}



window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (window.pageYOffset >= 100) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

