// Rade Pantelic // pantelicrade@gmail.com

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
var komadaObujmica = 0;

// VARIJABLE

function precnikCeviSaTrakom() { return (precnikCevi + brojObmotaja()*9) };
function brojOtvoraPoKolutu() { return Math.floor( 10000/( precnikCeviSaTrakom() *3.14 *brojObmotaja()) ) };
function resenje(poruka) {
	document.getElementById('textResenja').value = document.getElementById('textResenja').value + poruka +"\n==============================\n";
};

function brojObmotaja() {
	if(precnikCevi <= 75) { return 1 
	} else if(precnikCevi <=125) {return 2
	} else if(precnikCevi <=160) {return 3
	} else { alert("Cevi sa precnikom vecim od 160mm se ne mogu stititi na ovaj nacin") };
};

function koeficijentPeneNegoriveKvadrat() {
	if( ( (sirinaOtvora*visinaOtvora) - Math.pow(precnikCevi/2,2) *3.14) *debljinaZida *brojProdora <4000000 ) {
		return 4000000} 
	else if( ( ( sirinaOtvora*visinaOtvora - Math.pow(precnikCevi/2,2)*3.14 ) *debljinaZida *brojProdora ) <32000000 ){
		return 5000000} 
	else { return 5320000}
};

function koeficijentPeneGoriveKvadrat() {
	if( ( (sirinaOtvora*visinaOtvora) - Math.pow(precnikCeviSaTrakom()/2,2) *3.14) *debljinaZida *brojProdora <4000000 ) {
		return 4000000} 
	else if( ( ( sirinaOtvora*visinaOtvora - Math.pow(precnikCeviSaTrakom()/2,2)*3.14 ) *debljinaZida *brojProdora ) <32000000 ){
		return 5000000} 
	else { return 5320000}
};

function koeficijentPeneNegoriveKrug() {
	if( ( (Math.pow(precnikOtvora/2,2)) - Math.pow(precnikCevi/2,2) ) *3.14 *debljinaZida *brojProdora <4000000 ) {
		return 4000000} 
	else if( ( (Math.pow(precnikOtvora/2,2)) - Math.pow(precnikCevi/2,2) ) *3.14 *debljinaZida *brojProdora <32000000 ){
		return 5000000} 
	else { return 5320000}
};

function koeficijentPeneGoriveKrug() {
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

//CORE Funkcije za racunanje materijala

//Stemani prodori

function negoriveKvadrat(){

	kvadratData()

	kolicinaCT = (sirinaOtvora*visinaOtvora-Math.pow(precnikCevi/2,2)*3.14)*2*1.1*1.4*brojProdora/1000000;
	kolicinaACR = (3*sirinaOtvora+2*visinaOtvora-precnikCevi+precnikCevi*3.14)*debljinaZida*0.4*brojProdora/1000000;

	resenje("Dimenzije otvora ŠxVxD: " + sirinaOtvora + "x" + visinaOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " 
		+ brojProdora + "\nPotreban materijal:\n-" +  Math.round(kolicinaCT*100)/100 + " kg CFS CT (2036605/2036607 6kg/18kg) \n-" + Math.round(kolicinaACR*100)/100 + " L CFS ACR (435859/435864 330mL/5L)");
	
	resetVrednosti();
};

function negoriveKvadratPena(){

	kvadratData()

	kolicinaPene = ( sirinaOtvora*visinaOtvora - Math.pow(precnikCevi/2,2)*3.14 ) *debljinaZida*brojProdora/koeficijentPeneNegoriveKvadrat();

	resenje("Dimenzije otvora ŠxVxD: " + sirinaOtvora + "x" + visinaOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " 
		+ brojProdora + "\nPotreban materijal:\n-" + Math.ceil(kolicinaPene/0.325) + " pak  CFS F FX (429802 325mL) tj. " + Math.round(kolicinaPene*1000)/1000 + " L");
	
	resetVrednosti();
};

function goriveKvadrat(){

	kvadratData()

	kolicinaCT = ((sirinaOtvora*visinaOtvora)-Math.pow(precnikCeviSaTrakom()/2,2)*3.14)*2*1.1*1.4*brojProdora/1000000;
	kolicinaACR = (3*sirinaOtvora+2*visinaOtvora- precnikCeviSaTrakom() +precnikCeviSaTrakom()*3.14)*debljinaZida*0.4*brojProdora/1000000;
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	resenje("Dimenzije otvora ŠxVxD: " + sirinaOtvora + "x" + visinaOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " 
		+ brojProdora + "\nPotreban materijal:\n-" +  Math.round(kolicinaCT*100)/100 + " kg CFS CT (2036605/2036607 6kg/18kg) \n-" + Math.round(kolicinaACR*100)/100 
		+ " L CFS ACR (435859/435864 330mL/5L) \n-" + Math.round(kolutovaTrake*100)/100 + " kolutova CFS W EL (429556 10m)");

	resetVrednosti();
};

function goriveKvadratPena(){

	kvadratData()

	kolicinaPene = ( sirinaOtvora*visinaOtvora - Math.pow(precnikCeviSaTrakom()/2,2)*3.14 ) *debljinaZida*brojProdora/koeficijentPeneGoriveKvadrat();
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	resenje("Dimenzije otvora ŠxVxD: " + sirinaOtvora + "x" + visinaOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " 
		+ brojProdora + "\nPotreban materijal:\n-" + Math.ceil(kolicinaPene/0.325) + " pak  CFS F FX (429802 325mL) tj. " + Math.round(kolicinaPene*1000)/1000 + " L \n-"
		+  Math.round(kolutovaTrake*100)/100 + " kolutova CFS W EL (429556 10m)");	

	resetVrednosti();
};

function goriveKvadratObujmice(){
	
	kvadratData()
	kolicinaCT = (sirinaOtvora*visinaOtvora-Math.pow(precnikCevi/2,2)*3.14)*2*1.1*1.4*brojProdora/1000000;
	komadaObujmica = brojProdora*2;

	resenje("Dimenzije otvora ŠxVxD: " + sirinaOtvora + "x" + visinaOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " 
		+ brojProdora + "\nPotreban materijal:\n-" +  Math.round(kolicinaCT*100)/100 + " kg CFS CT (2036605/2036607 6kg/18kg) \n-" + Math.round(kolicinaACR*100)/100 
		+ " L CFS ACR (435859/435864 330mL/5L\n-" + komadaObujmica + " kom CFS C (P) " + precnikCevi + "mm (435406-435412)");

	resetVrednosti();

};

function goriveKvadratPenaObujmice(){

	kvadratData()

	kolicinaPene = ( sirinaOtvora*visinaOtvora - Math.pow(precnikCevi/2,2)*3.14 ) *debljinaZida*brojProdora/koeficijentPeneNegoriveKvadrat();
	komadaObujmica = brojProdora*2;
	
	resenje("Dimenzije otvora ŠxVxD: " + sirinaOtvora + "x" + visinaOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " 
	+ brojProdora + "\nPotreban materijal:\n-" + Math.ceil(kolicinaPene/0.325) + " pak  CFS F FX (429802 325mL) tj. " + Math.round(kolicinaPene*1000)/1000 + " L \n-"
	+ komadaObujmica + " kom CFS C (P) " + precnikCevi + "mm (435406-435412)");	

	resetVrednosti();

};

//=================================================================
//Kernovani prodori

function negoriveKrug(){

	krugData()

	kolicinaACR = (Math.pow(precnikOtvora,2)-Math.pow(precnikCevi,2))*3.14*(precnikOtvora - precnikCevi)*brojProdora/2000000;

	resenje("Dimenzije otvora: ⌀" + precnikOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " + brojProdora + "\nPotreban materijal:\n-" 
		+ Math.round(kolicinaACR*100)/100 + " L CFS ACR (435859/435864 330mL/5L)");
	
	resetVrednosti();
};

function negoriveKrugPena(){

	krugData()

	kolicinaPene = (Math.pow(precnikOtvora/2,2) - Math.pow(precnikCevi/2,2)) *3.14 *debljinaZida *brojProdora /koeficijentPeneNegoriveKrug();

	resenje("Dimenzije otvora: ⌀" + precnikOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " + brojProdora + "\nPotreban materijal:\n-" 
		+ Math.ceil(kolicinaPene/0.325) + " pak  CFS F FX (429802 325mL) tj. " + Math.round(kolicinaPene*1000)/1000 + " L");

	resetVrednosti();
};


function goriveKrug(){

	krugData()

	kolicinaACR = (Math.pow(precnikOtvora,2)-Math.pow(precnikCeviSaTrakom(),2))*3.14*(precnikOtvora - precnikCeviSaTrakom())*brojProdora/2000000;
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	resenje("Dimenzije otvora: ⌀" + precnikOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " + brojProdora + "\nPotreban materijal:\n-" 
		+ Math.round(kolicinaACR*100)/100 + " L CFS ACR (435859/435864 330mL/5L) \n-" + Math.round(kolutovaTrake*100)/100 + " kolutova CFS W EL (429556 10m)");

	resetVrednosti();
};

function goriveKrugPena(){

	krugData()

	kolicinaPene = (Math.pow(precnikOtvora/2,2) - Math.pow(precnikCeviSaTrakom()/2,2)) *3.14 *debljinaZida *brojProdora/koeficijentPeneGoriveKrug();
	kolutovaTrake = brojProdora/brojOtvoraPoKolutu();

	resenje("Dimenzije otvora: ⌀" + precnikOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " + brojProdora + "\nPotreban materijal:\n-" 
		+ Math.ceil(kolicinaPene/0.325) + " pak  CFS F FX (429802 325mL) tj. " + Math.round(kolicinaPene*1000)/1000 + " L \n-" + Math.round(kolutovaTrake*100)/100 + " kolutova CFS W EL (429556 10m)");
	
	resetVrednosti();
};

function goriveKrugObujmice(){

	krugData()

	kolicinaACR = (Math.pow(precnikOtvora,2)-Math.pow(precnikCevi,2))*3.14*(precnikOtvora - precnikCevi)*brojProdora/2000000;
	komadaObujmica = brojProdora*2;

	resenje("Dimenzije otvora: ⌀" + precnikOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " + brojProdora + "\nPotreban materijal:\n-" 
		+ Math.round(kolicinaACR*100)/100 + " L CFS ACR (435859/435864 330mL/5L) \n-" + komadaObujmica + " kom CFS C (P) " + precnikCevi + "mm (435406-435412)");

	resetVrednosti();
};

function goriveKrugPenaObujmice(){

	krugData()

	kolicinaPene = (Math.pow(precnikOtvora/2,2) - Math.pow(precnikCevi/2,2)) *3.14 *debljinaZida *brojProdora /koeficijentPeneNegoriveKrug();
	komadaObujmica = brojProdora*2;

	resenje("Dimenzije otvora: ⌀" + precnikOtvora + "x" + debljinaZida + "mm \nPrecnik cevi: " + precnikCevi + " mm \nBroj Prodora: " + brojProdora + "\nPotreban materijal:\n-" 
		+ Math.ceil(kolicinaPene/0.325) + " pak  CFS F FX (429802 325mL) tj. " + Math.round(kolicinaPene*1000)/1000 + " L \n-" + komadaObujmica + " kom CFS C (P) " + precnikCevi + "mm (435406-435412)");

	resetVrednosti();
};
