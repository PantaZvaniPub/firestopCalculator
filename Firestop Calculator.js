console.log("JS Connected");

var sirinaOtvora = 0;
var visinaOtvora = 0;
var precnikOtvora = 0;
var debljinaZida = 0;
var precnikCevi = 0;
var brojProdora = 0;
var kolicinaCT = 0;
var kolicinaACR = 0;
var kolicinaPene = 0;
var kolutovaTrake = 0;

// VARIJABLE

function precnikCeviSaTrakom() { return (precnikCevi + brojObmotaja()*9) };
function brojOtvoraPoKolutu() { return Math.floor( 10000/( precnikCeviSaTrakom() *3.14 *brojObmotaja) ) };

function brojObmotaja() {
	if(precnikCevi <= 75) { return 1 
	} else if(precnikCevi <=125) {return 2
	} else if(precnikCevi <=160) {return 3
	} else { alert("Cevi sa precnikom vecim od 160mm se ne mogu stititi na ovaj nacin") };
};

function koeficijentPeneKvadrat() {
	if( ( (sirinaOtvora*visinaOtvora) - Math.pow(precnikCeviSaTrakom()/2,2) *3.14) *debljinaZida *brojProdora <4000000 ) {
		return 4000000} 
	else if( ( ( sirinaOtvora*visinaOtvora - Math.pow(precnikCeviSaTrakom()/2,2)*3.14 ) *debljinaZida *brojProdora ) <32000000 ){
		return 5000000} 
	else { return 5320000}
};

function koeficijentPeneKrug() {
	if( ( (Math.pow(precnikOtvora/2,2)) - Math.pow(precnikCeviSaTrakom()/2,2) ) *3.14 *debljinaZida *brojProdora <4000000 ) {
		return 4000000} 
	else if( ( (Math.pow(precnikOtvora/2,2)) - Math.pow(precnikCeviSaTrakom()/2,2) ) *3.14 *debljinaZida *brojProdora <32000000 ){
		return 5000000} 
	else { return 5320000}
};


// Logika prikaza forme Krug/Kvadrat
function show(izabrano) {
    KvadratDiv.style.display='none';
    KrugDiv.style.display='none';
    eval(izabrano + "Div").style.display='inline-block'
};

//Kupljenje podataka iz formi i reset vrednosti na kraju racuna
function kvadratData(){
	sirinaOtvora = Number(document.forms["KvadratForma"]["sirinaOtvora"].value);
	visinaOtvora = Number(document.forms["KvadratForma"]["visinaOtvora"].value);
	debljinaZida = Number(document.forms["KvadratForma"]["debljinaZida"].value);
	precnikCevi = Number(document.forms["KvadratForma"]["precnikCevi"].value);
	brojProdora = Number(document.forms["KvadratForma"]["brojProdora"].value);
};

function krugData(){
	precnikOtvora = Number(document.forms["KrugForma"]["precnikOtvora"].value);
	precnikCevi = Number(document.forms["KrugForma"]["precnikCevi"].value);
	brojProdora = Number(document.forms["KrugForma"]["brojProdora"].value);
	debljinaZida = Number(document.forms["KrugForma"]["debljinaZida"].value);
};

function resetVrednosti(){
	sirinaOtvora = 0;
	visinaOtvora = 0;
	debljinaZida = 0;
	precnikCevi = 0;
	brojProdora = 0;
	precnikOtvora = 0;

};

//CORE Fje

function negoriveKvadrat(){

	kvadratData()

	kolicinaCT = (((sirinaOtvora*visinaOtvora)-(precnikCevi*precnikCevi/4))*2*1.5*brojProdora)/1000000;
	kolicinaACR = (3*sirinaOtvora+2*visinaOtvora-precnikCevi+precnikCevi*3.14)*debljinaZida*0.5*brojProdora/1000000;

	alert("Potrebno je " + Math.round(kolicinaCT*100)/100 + " kg smese CFS CT i \n" + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR");
	resetVrednosti();
};

function negoriveKvadratPena(){

	kvadratData()

	kolicinaPene = ((sirinaOtvora*visinaOtvora)-(Math.pow((precnikCevi/2),2)*3.14))*debljinaZida*brojProdora/koeficijentPeneKvadrat();
	
	alert("Potrebno je " + Math.round(kolicinaPene*1000)/1000 + " L pene CFS F FX odnosno " + Math.ceil(kolicinaPene/0.325) + " pakovanja od 325ml");
	resetVrednosti();
};

function negoriveKrug(){

	krugData()

	kolicinaACR = Math.pow((precnikOtvora - precnikCevi),2)*precnikOtvora*3.14*brojProdora/2000000;

	alert("Potrebno je " + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR");
	resetVrednosti();
};

function negoriveKrugPena(){

	krugData()

	kolicinaPene = ( ( (Math.pow(precnikOtvora/2,2)) - Math.pow(precnikCeviSaTrakom()/2,2) ) *3.14 *debljinaZida *brojProdora) /koeficijentPeneKrug();

	alert("Potrebno je " + Math.round(kolicinaPene*1000)/1000 + " L pene CFS F FX odnosno " + Math.ceil(kolicinaPene/0.325) + " pakovanja od 325ml");
	resetVrednosti();
};

function goriveKvadrat(){

	kvadratData()

	kolicinaCT = ( (sirinaOtvora*visinaOtvora)- (Math.pow( (precnikCeviSaTrakom/2) ,2) *2 *1.5 *brojProdora) )/1000000;
	kolicinaACR = ( 3*sirinaOtvora + 2*visinaOtvora + precnikCeviSaTrakom()*2.14 ) *debljinaZida *0.5 *brojProdora /1000000;
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	alert("Potrebno je " + Math.round(kolicinaCT*100)/100 + " kg smese CFS CT i \n" + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR i \n" + Math.round(kolutovaTrake*100)/100 + " kolutova trake CFS W EL (od 10m)");
	resetVrednosti();
};

function goriveKvadratPena(){

	kvadratData()

	kolicinaPene = ((sirinaOtvora*visinaOtvora)-(Math.pow((precnikCeviSaTrakom()/2),2)*3.14))*debljinaZida*brojProdora/koeficijentPeneKvadrat();
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	alert("Potrebno je " + Math.round(kolicinaPene*1000)/1000 + " L pene CFS F FX odnosno " + Math.ceil(kolicinaPene/0.325) + " pakovanja od 325ml i \n" + Math.round(kolutovaTrake*100)/100 + " kolutova trake CFS W EL (od 10m)");
	resetVrednosti();
};

function goriveKrug(){

	krugData()

	kolicinaACR = Math.pow((precnikOtvora - precnikCeviSaTrakom()),2)*precnikOtvora*3.14*brojProdora/2000000;
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	alert("Potrebno je " + Math.round(kolicinaACR*100)/100 + " L smese CFS ACR i \n" + Math.round(kolutovaTrake*100)/100 + " kolutova trake CFS W EL (od 10m)");
	resetVrednosti();
};

function goriveKrugPena(){

	krugData()

	kolicinaPene = ( ( (Math.pow(precnikOtvora/2,2)) - Math.pow(precnikCeviSaTrakom()/2,2) ) *3.14 *debljinaZida *brojProdora) /koeficijentPeneKrug();
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	alert("Potrebno je " + Math.round(kolicinaPene*1000)/1000 + " L pene CFS F FX odnosno " + Math.ceil(kolicinaPene/0.325) + " pakovanja od 325ml i \n" + Math.round(kolutovaTrake*100)/100 + " kolutova trake CFS W EL (od 10m)");
	resetVrednosti();
};


