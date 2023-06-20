let pitanja = [
    {
        pitanje: 'Što je u posjetnici Al Caponea navedeno kao njegovo zanimanje?',
        odgovori: [
            {odgovor: 'Prodavač rabljenog namještaja', tocan: true},
            {odgovor: 'Frizer', tocan: false},
            {odgovor: 'Zaštitar', tocan: false},
            {odgovor: 'Kuhar', tocan: false},
        ]
    },
    {
        pitanje: 'U kojoj državi se dogodila najveća avionska nesreća?',
        odgovori: [
            {odgovor: 'Japan', tocan: false},
            {odgovor: 'Brazil', tocan: false},
            {odgovor: 'Francuska', tocan: false},
            {odgovor: 'Španjolska', tocan: true},
        ]
    },
    {
        pitanje: 'Koje godine je potonuo Titanik?',
        odgovori: [
            {odgovor: '1912', tocan: true},
            {odgovor: '1812', tocan: false},
            {odgovor: '1816', tocan: false},
            {odgovor: '1916', tocan: false},
        ]
    },
    {
        pitanje: 'Koji je kemijski simbol za srebro?',
        odgovori: [
            {odgovor: 'Au', tocan: false},
            {odgovor: 'Sr', tocan: false},
            {odgovor: 'Ag', tocan: true},
            {odgovor: 'Si', tocan: false},
        ]
    },
    {
        pitanje: 'Koji je glumac osvojio najboljeg glumca Oscara za filmove Philadelphia (1993) i Forrest Gump (1994)?',
        odgovori: [
            {odgovor: 'Robert De Niro', tocan: false},
            {odgovor: 'Tom Hanks', tocan: true},
            {odgovor: 'Tom Cruise', tocan: false},
            {odgovor: 'Nicolas Cage', tocan: false},
        ]
    },
    {
        pitanje: 'Koliko igrača ima u vaterpolo ekipi?',
        odgovori: [
            {odgovor: '4', tocan: false},
            {odgovor: '6', tocan: false},
            {odgovor: '5', tocan: false},
            {odgovor: '7', tocan: true},
        ]
    },
    {
        pitanje: 'U kojoj državi je se održavalo svjetsko nogometno prvenstvo 2010. godine?',
        odgovori: [
            {odgovor: 'Južna Koreja', tocan: false},
            {odgovor: 'Južna Afrika', tocan: true},
            {odgovor: 'Južni Sudan', tocan: false},
            {odgovor: 'Kambodža', tocan: false},
        ]
    },
    {
        pitanje: 'Koliko srca ima hobotnica?',
        odgovori: [
            {odgovor: '1', tocan: false},
            {odgovor: '2', tocan: false},
            {odgovor: '3', tocan: true},
            {odgovor: '4', tocan: false},
        ]
    },
    {
        pitanje: 'Koji je maksimalni broj ljudi koji mogu igrati igru ​​Mouse Trap?',
        odgovori: [
            {odgovor: '3', tocan: false},
            {odgovor: '4', tocan: true},
            {odgovor: '5', tocan: false},
            {odgovor: '6', tocan: false},
        ]
    },
    {
        pitanje: 'Koji film iz 2008. godine u glavnoj ulozi Chritian Bale sadrži ovaj citat: "Vjerujem da vas sve što ne ubije, jednostavno učini ... strancima."',
        odgovori: [
            {odgovor: 'The Dark Knight', tocan: true},
            {odgovor: 'American psycho', tocan: false},
            {odgovor: 'Iron Man', tocan: false},
            {odgovor: 'Hancock', tocan: false},
        ]
    },
    {
        pitanje: 'Koji je glavni grad SAD-a?',
        odgovori: [
            {odgovor: 'New York', tocan: false},
            {odgovor: 'Washington DC', tocan: true},
            {odgovor: 'Los Angeles', tocan: false},
            {odgovor: 'Denver', tocan: false},
        ]
    },
    {
        pitanje: 'Koja je najveća planina u Sjevernoj Americi?',
        odgovori: [
            {odgovor: 'Mt. Logan', tocan: false},
            {odgovor: 'Orizaba', tocan: false},
            {odgovor: 'Denali', tocan: true},
            {odgovor: 'Mt. Foraker', tocan: false},
        ]
    }
]
ukupanBrojPitanja = pitanja.length;
//Postavljanje pitanja u local storage da se mogu dohvatiti kasnije nakon resetiranja kviza
localStorage.setItem('pitanja', JSON.stringify(pitanja));
const dalje = document.querySelector('.sljedece-pitanje');
dalje.disabled = true;
let pitanjeText = document.querySelector('.pitanje');
const odgovori = [
    document.querySelector('.odgovor1'),
    document.querySelector('.odgovor2'),
    document.querySelector('.odgovor3'),
    document.querySelector('.odgovor4')
];
let brojac = 0;

function odaberiPitanje(){
    brojac++;
    let odabir = Math.floor(Math.random() * pitanja.length);
    pitanjeText.innerHTML = String(brojac)+'. ' + pitanja[odabir].pitanje;
    for(let i = 0;i<4;i++){
        odgovori[i].innerHTML = pitanja[odabir].odgovori[i].odgovor;
    }
    //Postavljamo odabir u local storage da mu mozemo pristupiti izvan ove funkcije
    //, a da se ne promijeni odnosno da ga koristimo kada provjeravamo je li pitanje tocno
    localStorage.setItem('odabir', String(odabir));
    for(let i =0;i<4;i++){
        //Nakon odgovorenog prethodnog pitanja moramo uklaniti tocan i netocan klase
        odgovori[i].classList.remove('tocan');
        odgovori[i].classList.remove('netocan');
        odgovori[i].disabled = false;
    }
    dalje.disabled = true;
}

function jeLiTocan(indexOdgovora){
    //Ovdje koristimo odabir da znamo na kojem smo pitanju
    const odabir = Number(localStorage.getItem('odabir'));
    if(pitanja[odabir].odgovori[indexOdgovora].tocan){
        odgovori[indexOdgovora].classList.add('tocan');
        //Uklanjamo pitanje iz liste tako da se ne ponavljaju pitanja
        pitanja.splice(odabir,1);
        if(pitanja.length == 0){
            document.getElementById('polje-s-pitanjem').style.visibility = 'hidden';
            //Ovo je zato što stavljamo hidden a zelimo da se poruka nakon zavrsenog odgovaranja
            //prikaze na vrhu a ne ispod tog hidden polja 
            document.getElementById('polje-s-pitanjem').style.height = '1px';
            document.getElementById('kraj-kviza').style.visibility = 'visible';
            document.getElementById('poruka-na-kraju').innerHTML = 'Svaka čast';
            document.getElementById('odgovoreno-pitanja').innerHTML = ('Odgovorili ste točno na sva pitanja');
            brojac = 0;
        }
        dalje.disabled = false;
    }else{
        odgovori[indexOdgovora].classList.add('netocan'); //Ovo se na kraju ni ne vidi jer se prebaci pitanje
        document.getElementById('polje-s-pitanjem').style.visibility = 'hidden';
        document.getElementById('polje-s-pitanjem').style.height = '1px';
        document.getElementById('kraj-kviza').style.visibility = 'visible';
        dalje.disabled = false;

        if((brojac-1)<ukupanBrojPitanja/2){
            document.getElementById('poruka-na-kraju').innerHTML = 'Znanje ti je loše';
            document.getElementById('odgovoreno-pitanja').innerHTML = ('Broj točno odgovrenih pitanja: '+ String(brojac-1));
        }else{
            document.getElementById('poruka-na-kraju').innerHTML = 'Znanje ti je solidno';
            document.getElementById('odgovoreno-pitanja').innerHTML = ('Broj točno odgovrenih pitanja: '+ String(brojac-1));
        }
        brojac = 0;
    }
    //ni ovo se ne koristi u finalnoj verziji
    for(let i=0;i<4;i++){
        odgovori[i].disabled = true;
    }
    
}

function zapocniKviz(){
    pitanja = JSON.parse(localStorage.getItem('pitanja'));
    document.getElementById('pocetni-div').style.display = 'none';
    document.getElementById('polje-s-pitanjem').style.visibility = 'visible';
    document.getElementById('kraj-kviza').style.visibility = 'hidden';
    document.getElementById('polje-s-pitanjem').style.height = '90%';
}