var areaLength = 0;
var areaWidth = 0;
var arla = 0;
var rlla = 0;
var arbb = 0;
var rlbb = 0;
var log = 0;
var log2 = 0;

function round(wert, dez) // rundet Werte auf die in dez angegebenen Stellen nach dem Komma
{
        wert = parseFloat(wert);
        if (!wert) return 0;
        dez = parseInt(dez);
        if (!dez) dez=0;
        var umrechnungsfaktor = Math.pow(10,dez);
        return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
}

function kommaZuPunkt(zahl) // Wandelt Kommas in Punkte um
{
        zahl = zahl.replace(',', '.');
        zahl = parseFloat(zahl);
        if (!zahl) return 0;
	return zahl;
}

function punktZuKomma(zeichenKette) // Wandelt Punkte in Kommas um
{
	return zeichenKette.toString().replace('.', ',');
}

function checkLength() // Eingabe checken und in Float umwandeln
{
	areaLength = kommaZuPunkt(document.getElementById("inputLength").value);
        if (areaLength < 0) {
                alert ("Die Zahl muss größer als Null sein!");
                areaLength = 0;
                document.getElementById("inputLength").value = "";
        }

	calcGrit();
}

function checkWidth() // Eingabe checken und in Float umwandeln
{
	areaWidth = kommaZuPunkt(document.getElementById("inputWidth").value);
	if (areaWidth < 0) {
                alert ("Die Zahl muss größer als Null sein!");
                areaWidth = 0;
                document.getElementById("inputWidth").value = "";
	}

	calcGrit()
}

function calcGrit() // Raster berechnen
{
	if (areaLength && areaWidth > 0) {
		if (areaLength >= areaWidth) {
			if (areaLength / areaWidth < 2) {
				log = Math.log(areaLength) / Math.log(10);
				log2 = Math.pow(5, log);
				arla = Math.round(areaLength / (0.2 * log2));
				rlla = round(areaLength / arla, 2);
				arbb = Math.round((areaWidth / (rlla * 2) + 0.5));
				rlbb = round(areaWidth / arbb, 2);
			} else {
				log = Math.log(areaWidth) / Math.log(10);
				log2 = Math.pow(5, log);
				arbb = Math.round(areaWidth / (0.2 * log2));
				rlbb = round(areaWidth / arbb, 2);
				arla = Math.round((areaLength / (rlbb * 2) + 0.5));
				rlla = round(areaLength / arla, 2);
			}
		} else {
			if (areaWidth / areaLength < 2) {
				log = Math.log(areaWidth) / Math.log(10);
				log2 = Math.pow(5, log);
				arbb = Math.round(areaWidth / (0.2 * log2));
				rlbb = round(areaWidth / arbb, 2);
				arla = Math.round((areaLength / (rlbb * 2) + 0.5));
				rlla = round(areaLength / arla, 2);
			} else {
				log = Math.log(areaLength) / Math.log(10);
				log2 = Math.pow(5, log);
				arla = Math.round(areaLength / (0.2 * log2));
				rlla = round(areaLength / arla, 2);
				arbb = Math.round((areaWidth / (rlla * 2) + 0.5));
				rlbb = round(areaWidth / arbb, 2);
			}
		}
	} else {
		arla = 0;
		arbb = 0;
		rlla = 0;
		rlbb = 0;
	}
	werteSchreiben();
}

function werteSchreiben()
{
        document.getElementById("outputarla").firstChild.nodeValue = arla; // Werte auf die Seite schreiben
	document.getElementById("outputarbb").firstChild.nodeValue = arbb;
	document.getElementById("outputrlla").firstChild.nodeValue = punktZuKomma(rlla) + " m";
	document.getElementById("outputrlbb").firstChild.nodeValue = punktZuKomma(rlbb) + " m";
}