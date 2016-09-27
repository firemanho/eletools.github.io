var spannung = 0;
var strom = 0;
var leistung = 0;
var phi = 1;
var maxspannungsfall = 3;
var spannungsfall = 0;
var kabellaenge = 50;
var absicherung = 0;
var querschnittspannungsfall = 0;
var querschnittverbraucher = 0;
var querschnittabsicherung = 0;
var faktor1 = 1;
var faktor2 = 1;
var faktor3 = 1;
var faktor4 = 1;
var bemessungsstromverbraucher = 0;
var bemessungsstromabsicherung = 0;
var bemessungsstrom = 0;
var verlegeart;   //kann wahrscheinlich gelöscht werden
var zahl;
var ruckgabe;

function netzwahl()														// Prüfen welcher Radio ausgewählt ist und entsprechent die Spannung setzten
{
	if(document.getElementById("radiogleichstrom").checked == true) 
		{
		spannung = 218;
		document.getElementById("inputphi").disabled = true;
		document.getElementById("inputphi").value = "";
		document.getElementById("elementphi").style.display = "none";		
		}
	if(document.getElementById("radiowechselstrom").checked == true)
		{
		spannung = 230;
		document.getElementById("inputphi").disabled = false;
		document.getElementById("inputphi").value = "1";
		document.getElementById("elementphi").style.display = "";		
		}
	if(document.getElementById("radiodrehstrom").checked == true)
		{
		spannung = 400;
		document.getElementById("inputphi").disabled = false;
		document.getElementById("inputphi").value = "1";
		document.getElementById("elementphi").style.display = "";		
		}
	document.getElementById("inputspannung").value = spannung;

	eingabe();
}

function eingabe()														// Liest die eingegebenen / Ausgewählten Werte ein und schreibt diese in Veriablen
{
	kommazupunkt(document.getElementById("inputspannung").value);		// Spannung
	spannung = ruckgabe;
	if ( spannung < 0 )
		{
		alert(unescape("Der Wert darf nicht kleiner als 0 sein!"));
		document.getElementById("inputspannung").value="0";
		spannung = 0;
		netzwahl();
		}

	kommazupunkt(document.getElementById("inputstrom").value);			// Strom
	strom = ruckgabe;
	if ( strom < 0 )
		{
		alert(unescape("Der Wert darf nicht kleiner als 0 sein!"));
		document.getElementById("inputstrom").value="0";
		strom = 0;
		}

	absicherung = $('#Absicherung').val();								// Absicherung

	kommazupunkt(document.getElementById("inputphi").value);			// Phi
	phi = ruckgabe;
	if ( phi > 1 || phi < 0 )
		{
		alert(unescape("Phi darf nicht gr%F6%DFer als 1 oder kleiner als 0 sein!"));
		document.getElementById("inputphi").value="1";
		phi = 1;
		}

	kommazupunkt(document.getElementById("inputmaxspannungsfall").value);	// Spannungsfall
	maxspannungsfall = ruckgabe;
	if ( maxspannungsfall < 0 )
		{
		alert(unescape("Der Wert darf nicht kleiner als 0 sein!"));
		document.getElementById("inputmaxspannungsfall").value="3";
		maxspannungsfall = 3;
		}
	
	kommazupunkt(document.getElementById("inputkabellaenge").value);	// Kabellänge
	kabellaenge = ruckgabe;
	if ( kabellaenge < 0 )
		{
		alert(unescape("Der Wert darf nicht kleiner als 0 sein!"));
		document.getElementById("inputkabellaenge").value="0";
		kabellaenge = 0;
		}

	function kommazupunkt(zahl)											// Wandelt Kommas in Punkte um
	{
		ruckgabe = parseFloat(zahl.replace(',', '.'));
		return ruckgabe;
	}

	kabelrechnen();
}

function kabelrechnen()													// Berechnung von Leistung und Querschnitt nach Spannungsfall
{
	if(document.getElementById("radiogleichstrom").checked == true) 
		{
		rechnegleichstrom();
		}
	if(document.getElementById("radiowechselstrom").checked == true)
		{
		rechnewechselstrom();
		}
	if(document.getElementById("radiodrehstrom").checked == true)
		{
		rechnedrehstrom();
		}

	function rechnegleichstrom()
		{
			leistung = Math.round ( spannung * strom * 100 ) / 100;
			spannungsfall = spannung / 100 * maxspannungsfall;
			querschnittspannungsfall = Math.round ( ( ( 2 * kabellaenge * strom ) / ( 56 * spannungsfall) ) * 100 ) / 100;
			querschnittspannungsfall = querschnittspannungsfall.toString().replace('.', ',');
		}

	function rechnewechselstrom()
		{
			leistung = Math.round ( spannung * strom * phi * 100 ) / 100;
			spannungsfall = spannung / 100 * maxspannungsfall;
			querschnittspannungsfall = Math.round ( ( ( 2 * kabellaenge * strom * phi ) / ( 56 * spannungsfall) ) * 100 ) / 100;
			querschnittspannungsfall = querschnittspannungsfall.toString().replace('.', ',');
		}
			
	function rechnedrehstrom()
		{
			leistung = Math.round ( spannung * strom * phi * 1.73205081 * 100 ) / 100;
			spannungsfall = spannung / 100 * maxspannungsfall;
			querschnittspannungsfall = Math.round ( ( ( 1.73205081 * kabellaenge * strom * phi ) / ( 56 * spannungsfall) ) * 100 ) / 100;
			querschnittspannungsfall = querschnittspannungsfall.toString().replace('.', ',');
		}
    
    querschnitt(strom);                                                 // Querschnitt nach Stromaufnahme Verbraucher berechnen
    querschnittverbraucher = quers;                                     // Ergebnis in entsprechende Variable schreiben
    bemessungsstromverbraucher = bemessungsstrom;						
    querschnitt(absicherung);											// Querschnitt nach Absicherung berechnen
    querschnittabsicherung = quers;										// Ergebnis in entsprechende Variable schreiben
    bemessungsstromabsicherung = bemessungsstrom;
	ausgabe();															// Alle Ergebnisse auf die Seite schreiben
}

function querschnitt(st)												// Auswahl des Querschnitts anhand des Bemessungsstromes und Verlegung / Häufung
{
	if($('#Kabeltyp').val() == 1)										// prüft ob Kabeltyp NYY ist, Auswahlmöglichkeiten anpassen
	{
		document.getElementById("elementverlegung1").style.display = "";		
		document.getElementById("elementtemp1").style.display = "";		
		document.getElementById("elementhaufung1").style.display = "";		
		document.getElementById("elementverlegung2").style.display = "none";		
		document.getElementById("elementtemp2").style.display = "none";		
		document.getElementById("elementhaufung2").style.display = "none";		
		document.getElementById("elementverlegung3").style.display = "none";		
		document.getElementById("elementtemp3").style.display = "none";		
		document.getElementById("elementhaufung3").style.display = "none";		
		faktor1 = $('#TempNYY').val();									// Faktoren einlesen
		faktor2 = $('#HaufungNYY').val();								// Faktoren einlesen
		bemessungsstrom = st / ( faktor1 * faktor2 * faktor3 * faktor4 );	// Bemessungsstrom berechnen
			
		if($('#Verlegung1').val() == 1)					                // prüft ob Verlegung Rohr oder Kanal ist (Tabelle 3 Verlegeart B2)
		{
			if(document.getElementById("radiogleichstrom").checked == true) 
			{
			einephase11();
			}
			if(document.getElementById("radiowechselstrom").checked == true)
			{
			einephase11();
			}
			if(document.getElementById("radiodrehstrom").checked == true)
			{
			dreiphasen11();
			}
		}

		if($('#Verlegung1').val() == 2)                 				// prüft ob Verlegung Wärmegedämmte Wand ist (Tabelle 3 Verlegeart A2)
		{
			if(document.getElementById("radiogleichstrom").checked == true) 
			{
			einephase12();
			}
			if(document.getElementById("radiowechselstrom").checked == true)
			{
			einephase12();
			}
			if(document.getElementById("radiodrehstrom").checked == true)
			{
			dreiphasen12();
			}
		}

		if($('#Verlegung1').val() == 3)                 				// prüft ob Verlegung auf gelochter Kabelrinne ist (Tabelle 4 Verlegeart E)
		{
			if(document.getElementById("radiogleichstrom").checked == true) 
			{
			einephase13();
			}
			if(document.getElementById("radiowechselstrom").checked == true)
			{
			einephase13();
			}
			if(document.getElementById("radiodrehstrom").checked == true)
			{
			dreiphasen13();
			}
		}

		if($('#Verlegung1').val() == 4)                 				// prüft ob Verlegung im Kabelschacht im Erdboden ist (Tabelle 4 Verlegeart D)
		{
			if(document.getElementById("radiogleichstrom").checked == true) 
			{
			einephase14();
			}
			if(document.getElementById("radiowechselstrom").checked == true)
			{
			einephase14();
			}
			if(document.getElementById("radiodrehstrom").checked == true)
			{
			dreiphasen14();
			}
		}
	}

	if($('#Kabeltyp').val() == 2)										// prüft ob Kabeltyp H07 ist, Auswahlmöglichkeiten anpassen
	{
		document.getElementById("elementverlegung2").style.display = "";		
		document.getElementById("elementtemp2").style.display = "";		
		document.getElementById("elementhaufung2").style.display = "";		
		document.getElementById("elementverlegung1").style.display = "none";		
		document.getElementById("elementtemp1").style.display = "none";		
		document.getElementById("elementhaufung1").style.display = "none";		
		document.getElementById("elementverlegung3").style.display = "none";		
		document.getElementById("elementtemp3").style.display = "none";		
		document.getElementById("elementhaufung3").style.display = "none";		
		faktor1 = $('#TempH07').val();									// Faktoren einlesen
		faktor2 = $('#HaufungH07').val();								// Faktoren einlesen
		bemessungsstrom = st / ( faktor1 * faktor2 * faktor3 * faktor4 );	// Bemessungsstrom berechnen

		if(document.getElementById("radiogleichstrom").checked == true) 
		{
		einephase21();
		}
		if(document.getElementById("radiowechselstrom").checked == true)
		{
		einephase21();
		}
		if(document.getElementById("radiodrehstrom").checked == true)
		{
		dreiphasen21();
		}

	}

	if($('#Kabeltyp').val() == 3)										// prüft ob Kabeltyp NHXH ist, Auswahlmöglichkeiten anpassen
	{
		document.getElementById("elementverlegung3").style.display = "";		
		document.getElementById("elementtemp3").style.display = "";		
		document.getElementById("elementhaufung3").style.display = "";		
		document.getElementById("elementverlegung1").style.display = "none";		
		document.getElementById("elementtemp1").style.display = "none";		
		document.getElementById("elementhaufung1").style.display = "none";		
		document.getElementById("elementverlegung2").style.display = "none";		
		document.getElementById("elementtemp2").style.display = "none";		
		document.getElementById("elementhaufung2").style.display = "none";		
		faktor1 = $('#TempNHXH').val();									// Faktoren einlesen
		faktor2 = $('#HaufungNHXH').val();								// Faktoren einlesen
		bemessungsstrom = st / ( faktor1 * faktor2 * faktor3 * faktor4 );	// Bemessungsstrom berechnen

		if($('#Verlegung3').val() == 1)					                // prüft ob Verlegung Rohr oder Kanal ist (Tabelle 3 Verlegeart B2)
		{
			if(document.getElementById("radiogleichstrom").checked == true) 
			{
			einephase31();
			}
			if(document.getElementById("radiowechselstrom").checked == true)
			{
			einephase31();
			}
			if(document.getElementById("radiodrehstrom").checked == true)
			{
			dreiphasen31();
			}
		}

		if($('#Verlegung3').val() == 2)                 				// prüft ob Verlegung Wärmegedämmte Wand ist (Tabelle 3 Verlegeart A2)
		{
			if(document.getElementById("radiogleichstrom").checked == true) 
			{
			einephase32();
			}
			if(document.getElementById("radiowechselstrom").checked == true)
			{
			einephase32();
			}
			if(document.getElementById("radiodrehstrom").checked == true)
			{
			dreiphasen32();
			}
		}

		if($('#Verlegung3').val() == 3)                 				// prüft ob Verlegung auf gelochter Kabelrinne ist (Tabelle 4 Verlegeart E)
		{
			if(document.getElementById("radiogleichstrom").checked == true) 
			{
			einephase33();
			}
			if(document.getElementById("radiowechselstrom").checked == true)
			{
			einephase33();
			}
			if(document.getElementById("radiodrehstrom").checked == true)
			{
			dreiphasen33();
			}
		}

	}

	function einephase11()												// Tabelle 3 Verlegeart B2
	{
		if(bemessungsstrom >= 394)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 394)
		{
			quers = "300";
		}
		if(bemessungsstrom < 344)
		{
			quers = "240";
		}
		if(bemessungsstrom < 294)
		{
			quers = "185";
		}
		if(bemessungsstrom < 258)
		{
			quers = "150";
		}
		if(bemessungsstrom < 232)
		{
			quers = "120";
		}
		if(bemessungsstrom < 201)
		{
			quers = "95";
		}
		if(bemessungsstrom < 168)
		{
			quers = "70";
		}
		if(bemessungsstrom < 133)
		{
			quers = "50";
		}
		if(bemessungsstrom < 111)
		{
			quers = "35";
		}
		if(bemessungsstrom < 90)
		{
			quers = "25";
		}
		if(bemessungsstrom < 69)
		{
			quers = "16";
		}
		if(bemessungsstrom < 52)
		{
			quers = "10";
		}
		if(bemessungsstrom < 38)
		{
			quers = "6";
		}
		if(bemessungsstrom < 30)
		{
			quers = "4";
		}
		if(bemessungsstrom < 23)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 16.5)
		{
			quers = "1,5";
		}
	}

	function dreiphasen11()												// Tabelle 3 Verlegeart B2
	{
		if(bemessungsstrom >= 339)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 339)
		{
			quers = "300";
		}
		if(bemessungsstrom < 297)
		{
			quers = "240";
		}
		if(bemessungsstrom < 255)
		{
			quers = "185";
		}
		if(bemessungsstrom < 225)
		{
			quers = "150";
		}
		if(bemessungsstrom < 206)
		{
			quers = "120";
		}
		if(bemessungsstrom < 179)
		{
			quers = "95";
		}
		if(bemessungsstrom < 149)
		{
			quers = "70";
		}
		if(bemessungsstrom < 118)
		{
			quers = "50";
		}
		if(bemessungsstrom < 99)
		{
			quers = "35";
		}
		if(bemessungsstrom < 80)
		{
			quers = "25";
		}
		if(bemessungsstrom < 62)
		{
			quers = "16";
		}
		if(bemessungsstrom < 46)
		{
			quers = "10";
		}
		if(bemessungsstrom < 34)
		{
			quers = "6";
		}
		if(bemessungsstrom < 27)
		{
			quers = "4";
		}
		if(bemessungsstrom < 20)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 15)
		{
			quers = "1,5";
		}
	}

	function einephase12()												// Tabelle 3 Verlegeart A2
	{
		if(bemessungsstrom >= 334)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 334)
		{
			quers = "300";
		}
		if(bemessungsstrom < 291)
		{
			quers = "240";
		}
		if(bemessungsstrom < 284)
		{
			quers = "185";
		}
		if(bemessungsstrom < 219)
		{
			quers = "150";
		}
		if(bemessungsstrom < 192)
		{
			quers = "120";
		}
		if(bemessungsstrom < 167)
		{
			quers = "95";
		}
		if(bemessungsstrom < 139)
		{
			quers = "70";
		}
		if(bemessungsstrom < 110)
		{
			quers = "50";
		}
		if(bemessungsstrom < 92)
		{
			quers = "35";
		}
		if(bemessungsstrom < 75)
		{
			quers = "25";
		}
		if(bemessungsstrom < 57)
		{
			quers = "16";
		}
		if(bemessungsstrom < 43)
		{
			quers = "10";
		}
		if(bemessungsstrom < 32)
		{
			quers = "6";
		}
		if(bemessungsstrom < 25)
		{
			quers = "4";
		}
		if(bemessungsstrom < 18.5)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 15.5)
		{
			quers = "1,5";
		}
	}

	function dreiphasen12()												// Tabelle 3 Verlegeart A2
	{
		if(bemessungsstrom >= 298)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 298)
		{
			quers = "300";
		}
		if(bemessungsstrom < 261)
		{
			quers = "240";
		}
		if(bemessungsstrom < 223)
		{
			quers = "185";
		}
		if(bemessungsstrom < 196)
		{
			quers = "150";
		}
		if(bemessungsstrom < 172)
		{
			quers = "120";
		}
		if(bemessungsstrom < 150)
		{
			quers = "95";
		}
		if(bemessungsstrom < 125)
		{
			quers = "70";
		}
		if(bemessungsstrom < 99)
		{
			quers = "50";
		}
		if(bemessungsstrom < 83)
		{
			quers = "35";
		}
		if(bemessungsstrom < 68)
		{
			quers = "25";
		}
		if(bemessungsstrom < 52)
		{
			quers = "16";
		}
		if(bemessungsstrom < 39)
		{
			quers = "10";
		}
		if(bemessungsstrom < 29)
		{
			quers = "6";
		}
		if(bemessungsstrom < 23)
		{
			quers = "4";
		}
		if(bemessungsstrom < 17.5)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 13)
		{
			quers = "1,5";
		}
	}

	function einephase13()												// Tabelle 4 Verlegeart E
	{
		if(bemessungsstrom >= 593)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 593)
		{
			quers = "300";
		}
		if(bemessungsstrom < 514)
		{
			quers = "240";
		}
		if(bemessungsstrom < 434)
		{
			quers = "185";
		}
		if(bemessungsstrom < 379)
		{
			quers = "150";
		}
		if(bemessungsstrom < 328)
		{
			quers = "120";
		}
		if(bemessungsstrom < 282)
		{
			quers = "95";
		}
		if(bemessungsstrom < 232)
		{
			quers = "70";
		}
		if(bemessungsstrom < 180)
		{
			quers = "50";
		}
		if(bemessungsstrom < 148)
		{
			quers = "35";
		}
		if(bemessungsstrom < 119)
		{
			quers = "25";
		}
		if(bemessungsstrom < 94)
		{
			quers = "16";
		}
		if(bemessungsstrom < 70)
		{
			quers = "10";
		}
		if(bemessungsstrom < 51)
		{
			quers = "6";
		}
		if(bemessungsstrom < 40)
		{
			quers = "4";
		}
		if(bemessungsstrom < 30)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 22)
		{
			quers = "1,5";
		}
	}

	function dreiphasen13()												// Tabelle 4 Verlegeart E
	{
		if(bemessungsstrom >= 497)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 497)
		{
			quers = "300";
		}
		if(bemessungsstrom < 430)
		{
			quers = "240";
		}
		if(bemessungsstrom < 364)
		{
			quers = "185";
		}
		if(bemessungsstrom < 319)
		{
			quers = "150";
		}
		if(bemessungsstrom < 276)
		{
			quers = "120";
		}
		if(bemessungsstrom < 238)
		{
			quers = "95";
		}
		if(bemessungsstrom < 196)
		{
			quers = "70";
		}
		if(bemessungsstrom < 153)
		{
			quers = "50";
		}
		if(bemessungsstrom < 126)
		{
			quers = "35";
		}
		if(bemessungsstrom < 101)
		{
			quers = "25";
		}
		if(bemessungsstrom < 80)
		{
			quers = "16";
		}
		if(bemessungsstrom < 60)
		{
			quers = "10";
		}
		if(bemessungsstrom < 43)
		{
			quers = "6";
		}
		if(bemessungsstrom < 34)
		{
			quers = "4";
		}
		if(bemessungsstrom < 25)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 18.5)
		{
			quers = "1,5";
		}
	}

	function einephase14()												// Tabelle 4 Verlegeart D
	{
		if(bemessungsstrom >= 379)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 379)
		{
			quers = "300";
		}
		if(bemessungsstrom < 336)
		{
			quers = "240";
		}
		if(bemessungsstrom < 292)
		{
			quers = "185";
		}
		if(bemessungsstrom < 261)
		{
			quers = "150";
		}
		if(bemessungsstrom < 231)
		{
			quers = "120";
		}
		if(bemessungsstrom < 204)
		{
			quers = "95";
		}
		if(bemessungsstrom < 173)
		{
			quers = "70";
		}
		if(bemessungsstrom < 140)
		{
			quers = "50";
		}
		if(bemessungsstrom < 119)
		{
			quers = "35";
		}
		if(bemessungsstrom < 99)
		{
			quers = "25";
		}
		if(bemessungsstrom < 78)
		{
			quers = "16";
		}
		if(bemessungsstrom < 60)
		{
			quers = "10";
		}
		if(bemessungsstrom < 46)
		{
			quers = "6";
		}
		if(bemessungsstrom < 37)
		{
			quers = "4";
		}
		if(bemessungsstrom < 29)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 22)
		{
			quers = "1,5";
		}
	}

	function dreiphasen14()												// Tabelle 4 Verlegeart D
	{
		if(bemessungsstrom >= 316)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 316)
		{
			quers = "300";
		}
		if(bemessungsstrom < 280)
		{
			quers = "240";
		}
		if(bemessungsstrom < 243)
		{
			quers = "185";
		}
		if(bemessungsstrom < 217)
		{
			quers = "150";
		}
		if(bemessungsstrom < 192)
		{
			quers = "120";
		}
		if(bemessungsstrom < 169)
		{
			quers = "95";
		}
		if(bemessungsstrom < 143)
		{
			quers = "70";
		}
		if(bemessungsstrom < 116)
		{
			quers = "50";
		}
		if(bemessungsstrom < 98)
		{
			quers = "35";
		}
		if(bemessungsstrom < 82)
		{
			quers = "25";
		}
		if(bemessungsstrom < 64)
		{
			quers = "16";
		}
		if(bemessungsstrom < 50)
		{
			quers = "10";
		}
		if(bemessungsstrom < 38)
		{
			quers = "6";
		}
		if(bemessungsstrom < 30)
		{
			quers = "4";
		}
		if(bemessungsstrom < 24)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 18)
		{
			quers = "1,5";
		}
	}

	function einephase21()												// Tabelle 13 Spalte 5
	{
		if(bemessungsstrom >= 509)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 509)
		{
			quers = "300";
		}
		if(bemessungsstrom < 447)
		{
			quers = "240";
		}
		if(bemessungsstrom < 378)
		{
			quers = "185";
		}
		if(bemessungsstrom < 335)
		{
			quers = "150";
		}
		if(bemessungsstrom < 292)
		{
			quers = "120";
		}
		if(bemessungsstrom < 250)
		{
			quers = "95";
		}
		if(bemessungsstrom < 211)
		{
			quers = "70";
		}
		if(bemessungsstrom < 169)
		{
			quers = "50";
		}
		if(bemessungsstrom < 135)
		{
			quers = "35";
		}
		if(bemessungsstrom < 109)
		{
			quers = "25";
		}
		if(bemessungsstrom < 82)
		{
			quers = "16";
		}
		if(bemessungsstrom < 62)
		{
			quers = "10";
		}
		if(bemessungsstrom < 44)
		{
			quers = "6";
		}
		if(bemessungsstrom < 35)
		{
			quers = "4";
		}
		if(bemessungsstrom < 26)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 19.5)
		{
			quers = "1,5";
		}
		if(bemessungsstrom < 15.5)
		{
			quers = "1";
		}
	}

	function dreiphasen21()												// Tabelle 13 Spalte 7
	{
			if(bemessungsstrom >= 430)
			{
				quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
			}
			if(bemessungsstrom < 430)
			{
				quers = "300";
			}
			if(bemessungsstrom < 377)
			{
				quers = "240";
			}
			if(bemessungsstrom < 319)
			{
				quers = "185";
			}
			if(bemessungsstrom < 282)
			{
				quers = "150";
			}
			if(bemessungsstrom < 246)
			{
				quers = "120";
			}
			if(bemessungsstrom < 210)
			{
				quers = "95";
			}
			if(bemessungsstrom < 178)
			{
				quers = "70";
			}
			if(bemessungsstrom < 143)
			{
				quers = "50";
			}
			if(bemessungsstrom < 114)
			{
				quers = "35";
			}
			if(bemessungsstrom < 92)
			{
				quers = "25";
			}
			if(bemessungsstrom < 69)
			{
				quers = "16";
			}
			if(bemessungsstrom < 52)
			{
				quers = "10";
			}
			if(bemessungsstrom < 37)
			{
				quers = "6";
			}
			if(bemessungsstrom < 30)
			{
				quers = "4";
			}
			if(bemessungsstrom < 22)
			{
				quers = "2,5";
			}
			if(bemessungsstrom < 16)
			{
				quers = "1,5";
			}
			if(bemessungsstrom < 13)
			{
				quers = "1";
			}
		}

	function einephase31()												// Tabelle 5 Verlegeart B2
	{
		if(bemessungsstrom >= 532)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 532)
		{
			quers = "300";
		}
		if(bemessungsstrom < 459)
		{
			quers = "240";
		}
		if(bemessungsstrom < 384)
		{
			quers = "185";
		}
		if(bemessungsstrom < 334)
		{
			quers = "150";
		}
		if(bemessungsstrom < 305)
		{
			quers = "120";
		}
		if(bemessungsstrom < 265)
		{
			quers = "95";
		}
		if(bemessungsstrom < 221)
		{
			quers = "70";
		}
		if(bemessungsstrom < 175)
		{
			quers = "50";
		}
		if(bemessungsstrom < 146)
		{
			quers = "35";
		}
		if(bemessungsstrom < 119)
		{
			quers = "25";
		}
		if(bemessungsstrom < 91)
		{
			quers = "16";
		}
		if(bemessungsstrom < 69)
		{
			quers = "10";
		}
		if(bemessungsstrom < 51)
		{
			quers = "6";
		}
		if(bemessungsstrom < 40)
		{
			quers = "4";
		}
		if(bemessungsstrom < 30)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 22)
		{
			quers = "1,5";
		}
	}

	function dreiphasen31()												// Tabelle 5 Verlegeart B2
	{
		if(bemessungsstrom >= 455)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 455)
		{
			quers = "300";
		}
		if(bemessungsstrom < 398)
		{
			quers = "240";
		}
		if(bemessungsstrom < 340)
		{
			quers = "185";
		}
		if(bemessungsstrom < 300)
		{
			quers = "150";
		}
		if(bemessungsstrom < 268)
		{
			quers = "120";
		}
		if(bemessungsstrom < 233)
		{
			quers = "95";
		}
		if(bemessungsstrom < 194)
		{
			quers = "70";
		}
		if(bemessungsstrom < 154)
		{
			quers = "50";
		}
		if(bemessungsstrom < 128)
		{
			quers = "35";
		}
		if(bemessungsstrom < 105)
		{
			quers = "25";
		}
		if(bemessungsstrom < 80)
		{
			quers = "16";
		}
		if(bemessungsstrom < 60)
		{
			quers = "10";
		}
		if(bemessungsstrom < 44)
		{
			quers = "6";
		}
		if(bemessungsstrom < 35)
		{
			quers = "4";
		}
		if(bemessungsstrom < 26)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 19.5)
		{
			quers = "1,5";
		}
	}

	function einephase32()												// Tabelle 5 Verlegeart A2
	{
		if(bemessungsstrom >= 442)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 442)
		{
			quers = "300";
		}
		if(bemessungsstrom < 386)
		{
			quers = "240";
		}
		if(bemessungsstrom < 329)
		{
			quers = "185";
		}
		if(bemessungsstrom < 290)
		{
			quers = "150";
		}
		if(bemessungsstrom < 253)
		{
			quers = "120";
		}
		if(bemessungsstrom < 220)
		{
			quers = "95";
		}
		if(bemessungsstrom < 183)
		{
			quers = "70";
		}
		if(bemessungsstrom < 145)
		{
			quers = "50";
		}
		if(bemessungsstrom < 121)
		{
			quers = "35";
		}
		if(bemessungsstrom < 99)
		{
			quers = "25";
		}
		if(bemessungsstrom < 76)
		{
			quers = "16";
		}
		if(bemessungsstrom < 57)
		{
			quers = "10";
		}
		if(bemessungsstrom < 42)
		{
			quers = "6";
		}
		if(bemessungsstrom < 33)
		{
			quers = "4";
		}
		if(bemessungsstrom < 25)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 18.5)
		{
			quers = "1,5";
		}
	}

	function dreiphasen32()												// Tabelle 5 Verlegeart A2
	{
		if(bemessungsstrom >= 396)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 396)
		{
			quers = "300";
		}
		if(bemessungsstrom < 346)
		{
			quers = "240";
		}
		if(bemessungsstrom < 295)
		{
			quers = "185";
		}
		if(bemessungsstrom < 259)
		{
			quers = "150";
		}
		if(bemessungsstrom < 227)
		{
			quers = "120";
		}
		if(bemessungsstrom < 197)
		{
			quers = "95";
		}
		if(bemessungsstrom < 164)
		{
			quers = "70";
		}
		if(bemessungsstrom < 130)
		{
			quers = "50";
		}
		if(bemessungsstrom < 109)
		{
			quers = "35";
		}
		if(bemessungsstrom < 89)
		{
			quers = "25";
		}
		if(bemessungsstrom < 68)
		{
			quers = "16";
		}
		if(bemessungsstrom < 51)
		{
			quers = "10";
		}
		if(bemessungsstrom < 38)
		{
			quers = "6";
		}
		if(bemessungsstrom < 30)
		{
			quers = "4";
		}
		if(bemessungsstrom < 22)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 16.5)
		{
			quers = "1,5";
		}
	}

	function einephase33()												// Tabelle 6 Verlegeart E
	{
		if(bemessungsstrom >= 741)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 741)
		{
			quers = "300";
		}
		if(bemessungsstrom < 641)
		{
			quers = "240";
		}
		if(bemessungsstrom < 542)
		{
			quers = "185";
		}
		if(bemessungsstrom < 473)
		{
			quers = "150";
		}
		if(bemessungsstrom < 410)
		{
			quers = "120";
		}
		if(bemessungsstrom < 352)
		{
			quers = "95";
		}
		if(bemessungsstrom < 289)
		{
			quers = "70";
		}
		if(bemessungsstrom < 225)
		{
			quers = "50";
		}
		if(bemessungsstrom < 185)
		{
			quers = "35";
		}
		if(bemessungsstrom < 149)
		{
			quers = "25";
		}
		if(bemessungsstrom < 115)
		{
			quers = "16";
		}
		if(bemessungsstrom < 86)
		{
			quers = "10";
		}
		if(bemessungsstrom < 63)
		{
			quers = "6";
		}
		if(bemessungsstrom < 49)
		{
			quers = "4";
		}
		if(bemessungsstrom < 36)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 26)
		{
			quers = "1,5";
		}
	}

	function dreiphasen33()												// Tabelle 6 Verlegeart E
	{
		if(bemessungsstrom >= 621)
		{
			quers = "Die Berechnung kann nicht mit dem Programm ausgeführt werden!";
		}
		if(bemessungsstrom < 621)
		{
			quers = "300";
		}
		if(bemessungsstrom < 538)
		{
			quers = "240";
		}
		if(bemessungsstrom < 456)
		{
			quers = "185";
		}
		if(bemessungsstrom < 399)
		{
			quers = "150";
		}
		if(bemessungsstrom < 346)
		{
			quers = "120";
		}
		if(bemessungsstrom < 298)
		{
			quers = "95";
		}
		if(bemessungsstrom < 246)
		{
			quers = "70";
		}
		if(bemessungsstrom < 192)
		{
			quers = "50";
		}
		if(bemessungsstrom < 158)
		{
			quers = "35";
		}
		if(bemessungsstrom < 127)
		{
			quers = "25";
		}
		if(bemessungsstrom < 100)
		{
			quers = "16";
		}
		if(bemessungsstrom < 75)
		{
			quers = "10";
		}
		if(bemessungsstrom < 54)
		{
			quers = "6";
		}
		if(bemessungsstrom < 42)
		{
			quers = "4";
		}
		if(bemessungsstrom < 32)
		{
			quers = "2,5";
		}
		if(bemessungsstrom < 23)
		{
			quers = "1,5";
		}
	}

	return quers;
}

function ausgabe()														// nach Berechnung die Werte auf die Seite schreiben
{
	document.getElementById("outputleistung").firstChild.nodeValue = leistung;
	document.getElementById("outputquerschnittspannungsfall").firstChild.nodeValue = querschnittspannungsfall + " mm²";	
	document.getElementById("outputquerschnittverbraucher").firstChild.nodeValue = querschnittverbraucher + " mm²";	
	document.getElementById("outputquerschnittabsicherung").firstChild.nodeValue = querschnittabsicherung + " mm²";	
}
