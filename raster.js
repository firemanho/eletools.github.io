// Put your custom code here
var bwlaenge = 0;
var bwbreite = 0;
var arla = 0;
var rlla = 0;
var arbb = 0;
var rlbb = 0;
var log = 0;
var log2 = 0;

function checkl()           //in float umwandeln 
{
	bwlaenge = parseFloat(document.getElementById("inputlaenge").value.replace(',', '.'));

    rasterrechnen();  
}

function checkb()           //in float umwandeln
{
	bwbreite = parseFloat(document.getElementById("inputbreite").value.replace(',', '.'));

    rasterrechnen()
}

function rasterrechnen()			// Raster berechnen
{

    if (bwlaenge && bwbreite > 0)
        {
            if (bwlaenge >= bwbreite)
                {
                    if (bwlaenge / bwbreite < 2)
                        {
                        log = Math.log(bwlaenge) / Math.log(10);
                        log2 = Math.pow(5,log);
                        arla = Math.round(bwlaenge / (0.2 * log2));
                        rlla = Math.round(bwlaenge / arla * 100) / 100;
                        arbb = Math.round((bwbreite / (rlla * 2) + 0.5));
                        rlbb = Math.round(bwbreite / arbb * 100) / 100;
                        }
                    else
                        {
                        log = Math.log(bwbreite) / Math.log(10);
                        log2 = Math.pow(5,log);
                        arbb = Math.round(bwbreite / (0.2 * log2));
                        rlbb = Math.round(bwbreite / arbb * 100) / 100;
                        arla = Math.round((bwlaenge / (rlbb * 2) + 0.5));
                        rlla = Math.round(bwlaenge / arla * 100) / 100;
                        }
                 }
            else
                {
                if (bwbreite / bwlaenge < 2)
                    {
                    log = Math.log(bwbreite) / Math.log(10);
                        log2 = Math.pow(5,log);
                        arbb = Math.round(bwbreite / (0.2 * log2));
                        rlbb = Math.round(bwbreite / arbb * 100) / 100;
                        arla = Math.round((bwlaenge / (rlbb * 2) + 0.5));
                        rlla = Math.round(bwlaenge / arla * 100) / 100;
                    }
                else
                    {
                    log = Math.log(bwlaenge) / Math.log(10);
                        log2 = Math.pow(5,log);
                        arla = Math.round(bwlaenge / (0.2 * log2));
                        rlla = Math.round(bwlaenge / arla * 100) / 100;
                        arbb = Math.round((bwbreite / (rlla * 2) + 0.5));
                        rlbb = Math.round(bwbreite / arbb * 100) / 100;
                    }
                } 
        }
    else
        {
            arla = 0;
            arbb = 0;
            rlla = 0;
            rlbb = 0;
        }
    document.getElementById("outputarla").firstChild.nodeValue=arla;
    document.getElementById("outputarbb").firstChild.nodeValue=arbb;
	rlla = rlla.toString().replace('.', ',');
	rlbb = rlbb.toString().replace('.', ',');
    document.getElementById("outputrlla").firstChild.nodeValue=rlla + " m";
 	document.getElementById("outputrlbb").firstChild.nodeValue=rlbb + " m";
}