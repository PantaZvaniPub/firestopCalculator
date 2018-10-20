var sirinaOtvora = 0;
var visinaOtvora = 0;
var precnikOtvora = 0;
var debljinaZida = 0;
var precnikCevi = 0;
var brojProdora = 0;
var brojObmotaja = 0;
var precnikCeviSaTrakom = 0;
var brojOtvoraPoKolutu = 0;
var kolicinaCT = 0;
var kolicinaACR = 0;
var kolutovaTrake = 0;


 function show(izabrano) {
    if (izabrano == "negoriveKvadrat") {
    negoriveKvadratDiv.style.display='inline-block';
    negoriveKrugDiv.style.display='none';
    goriveKvadratDiv.style.display='none';
    goriveKrugDiv.style.display='none';
    } else if(izabrano == "negoriveKrug") {
    negoriveKvadratDiv.style.display='none';
    negoriveKrugDiv.style.display='inline-block';
    goriveKvadratDiv.style.display='none';
    goriveKrugDiv.style.display='none';
    } else if (izabrano == "goriveKrug") {
    negoriveKvadratDiv.style.display='none';
    negoriveKrugDiv.style.display='none';
    goriveKvadratDiv.style.display='inline-block';
    goriveKrugDiv.style.display='none';    	
    } else if (izabrano == "goriveKvadrat") {
    negoriveKvadratDiv.style.display='none';
    negoriveKrugDiv.style.display='none';
    goriveKvadratDiv.style.display='none';
    goriveKrugDiv.style.display='inline-block'; 
	} else {
    negoriveKvadratDiv.style.display='none';
    negoriveKrugDiv.style.display='none';
    goriveKvadratDiv.style.display='none';
    goriveKrugDiv.style.display='none';		
	}
  }

function negoriveKvadrat(){

	sirinaOtvora = Number(document.forms["negoriveKvadratForma"]["sirinaOtvora"].value);
	visinaOtvora = Number(document.forms["negoriveKvadratForma"]["visinaOtvora"].value);
	debljinaZida = Number(document.forms["negoriveKvadratForma"]["debljinaZida"].value);
	precnikCevi = Number(document.forms["negoriveKvadratForma"]["precnikCevi"].value);
	brojProdora = Number(document.forms["negoriveKvadratForma"]["brojProdora"].value);

	kolicinaCT = (((sirinaOtvora*visinaOtvora)-(precnikCevi*precnikCevi/4))*2*1.5*brojProdora)/1000000;
	kolicinaACR = (3*sirinaOtvora+2*visinaOtvora-precnikCevi+precnikCevi*3.14)*debljinaZida*0.5*brojProdora/1000000;

	alert("Potrebno je " + Math.round(kolicinaCT*100)/100 + " kg smese CFS CT i \n" + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR");

};

function negoriveKrug(){

	precnikOtvora = Number(document.forms["negoriveKrugForma"]["precnikOtvora"].value);
	precnikCevi = Number(document.forms["negoriveKrugForma"]["precnikCevi"].value);
	brojProdora = Number(document.forms["negoriveKrugForma"]["brojProdora"].value);

	kolicinaACR = Math.pow((precnikOtvora - precnikCevi),2)*precnikOtvora*3.14*brojProdora/2000000;

	alert("Potrebno je " + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR");

};

function goriveKvadrat(){

	sirinaOtvora = Number(document.forms["goriveKvadratForma"]["sirinaOtvora"].value);
	visinaOtvora = Number(document.forms["goriveKvadratForma"]["visinaOtvora"].value);
	debljinaZida = Number(document.forms["goriveKvadratForma"]["debljinaZida"].value);
	precnikCevi = Number(document.forms["goriveKvadratForma"]["precnikCevi"].value);
	brojProdora = Number(document.forms["goriveKvadratForma"]["brojProdora"].value);
 
	if(precnikCevi <= 75){brojObmotaja = 1;
	} else if(precnikCevi <=125){brojObmotaja = 2;
	} else if(precnikCevi <=160){brojObmotaja = 3;
	} else { alert("Cevi sa precnikom vecim od 160mm se ne mogu stititi na ovaj nacin") };

	precnikCeviSaTrakom = precnikCevi + brojObmotaja*9
	brojOtvoraPoKolutu = Math.floor(10000/(precnikCeviSaTrakom*3.14*brojObmotaja));

	kolicinaCT = (((sirinaOtvora*visinaOtvora)-(precnikCeviSaTrakom*precnikCeviSaTrakom/4))*2*1.5*brojProdora)/1000000;
	kolicinaACR = (3*sirinaOtvora+2*visinaOtvora - precnikCeviSaTrakom + precnikCeviSaTrakom*3.14)*debljinaZida*0.5*brojProdora/1000000;
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu;

	alert("Potrebno je " + Math.round(kolicinaCT*100)/100 + " kg smese CFS CT i \n" + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR i \n" + Math.round(kolutovaTrake*100)/100 + " kolutova trake CFS W EL (od 10m)");

};

function goriveKrug(){

	precnikOtvora = Number(document.forms["goriveKrugForma"]["precnikOtvora"].value);
	precnikCevi = Number(document.forms["goriveKrugForma"]["precnikCevi"].value);
	brojProdora = Number(document.forms["goriveKrugForma"]["brojProdora"].value);

	if(precnikCevi <= 75){brojObmotaja = 1;
	} else if(precnikCevi <=125){brojObmotaja = 2;
	} else if(precnikCevi <=160){brojObmotaja = 3;
	} else { alert("Cevi sa precnikom vecim od 160mm se ne mogu stititi na ovaj nacin") };

	precnikCeviSaTrakom = precnikCevi + brojObmotaja*9;
	brojOtvoraPoKolutu = Math.floor(10000/(precnikCeviSaTrakom*3.14*brojObmotaja));

	kolicinaACR = Math.pow((precnikOtvora - precnikCeviSaTrakom),2)*precnikOtvora*3.14*brojProdora/2000000;
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu;

	alert("Potrebno je " + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR i \n" + Math.round(kolutovaTrake*100)/100 + " kolutova trake CFS W EL (od 10m)");

};

