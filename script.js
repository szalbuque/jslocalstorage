/* Storage objects are simple key-value stores, similar to objects, 
but they stay intact through page loads. 
The keys and the values are always strings (note that, as with objects, integer keys will be 
automatically converted to strings). You can access these values like an object, 
or with the Storage.getItem() and Storage.setItem() methods. */
/* Exemplo:
These three lines all set the (same) colorSetting entry:

localStorage.colorSetting = '#a4509b';
localStorage['colorSetting'] = '#a4509b';
localStorage.setItem('colorSetting', '#a4509b'); */

/*  It's recommended to use the Web Storage API (setItem, getItem, removeItem, key, length) 
to prevent the pitfalls associated with using plain objects as key-value stores.*/

/* The two mechanisms within Web Storage are as follows:

--> sessionStorage: maintains a separate storage area for each given origin that's available 
for the duration of the page session (as long as the browser is open, including page reloads and restores).

--> localStorage: does the same thing, but persists even when the browser is closed and reopened.*/

/* Here is a function that detects whether localStorage is both supported and available:*/

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

/* Usando a função: */
var lista = [['cor','azul'],['comida','arroz']];
var lista2 = [];
var storage = window['localStorage'];
storage.clear();
console.log("lista: ",lista);
if (storageAvailable('localStorage')) {
  // Armazena os itens do array lista no localStorage
  alert("está disponível");
  lista.forEach(function(item,i) {
  	console.log("item:",item)
  	storage.setItem(item[0],item[1])
	})
  
  console.log("storage:",storage);
  // Armazena o conteúdo do localStorage no array lista2
  for (var i=0; i<storage.length; i++) {
  	chave = storage.key(i);
  	lista2.push([chave,storage.getItem(chave)]);
  }
 
  console.log("lista2:",lista2);
}
else {
  // Too bad, no localStorage for us
  alert("não está disponível");
}
