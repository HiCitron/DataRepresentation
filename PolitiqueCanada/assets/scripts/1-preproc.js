"use strict";

/**
 * Fichier permettant de traiter les données provenant du fichier CSV.
 */


/**
 * Précise le domaine et la plage de couleurs pour l'échelle qui est utilisées pour distinguer les partis politiques.
 *
 * @param color     Échelle de couleurs.
 * @param parties   Les informations à utiliser sur les différents partis.
 */
function colorScale(color, parties) {
  // TODO: Préciser le domaine de l'échelle en y associant chacun des partis politique de la liste spécifiée en paramètre.
  //       De plus, préciser la gamme de couleurs en spécifiant les couleurs utilisées par chacun des partis.
  
  color.domain(parties.map(function(d){ return d.name;}));
  color.range(parties.map(function(d){return d.color;}));

}

/**
 * Convertit chacun des nombres provenant du fichier CSV en type "number".
 *
 * @param data      Données provenant du fichier CSV.
 */
function convertNumbers(data) {
  // TODO: Convertir les propriétés "id" et "votes" en type "number" pour chacun des éléments de la liste.
  data.forEach(function(d){
  	d.id = parseInt(d.id);
  	d.votes = parseInt(d.votes);
  });
}

/**
 * Réorganise les données a
 *  de combiner les résultats pour une même circonsription.
 *
 * @param data      Données provenant du fichier CSV.
 * @return {Array}  Les données réorganisées qui seront utilisées. L'élément retourné doit être un tableau d'objets
 *                  comptant 338 entrées, c'est-à-dire, une entrée par circonscription. Chacune des entrées devra
 *                  présenter les résultats pour chacun des candidats triés en ordre décroissant (du candidat ayant
 *                  obtenu le plus de votes à celui en ayant reçu le moins). L'objet retourné doit avoir la forme suivante:
 *
 *                  [
 *                    {
 *                      id: number              // Le numéro de la circonscription
 *                      name: string,           // Le nom de la circonscription
 *                      results: [              // Le tableau contenant les résultats pour les candidats s'étant présentés.
 *                                              // *** Ce tableau doit être trié en ordre décroissant de votes. ***
 *                        {
 *                          candidate: string,  // Le nom du candidat
 *                          votes: number,      // Le nombre de votes obtenus pour le candidat
 *                          percent: string,    // Le pourcentage des votes obtenus par le candidat
 *                          party: string       // Le parti politique du candidat
 *                        },
 *                        ...
 *                      ]
 *                    },
 *                    ...
 *                  ]
 */
function createSources(data) {
  // TODO: Retourner l'objet ayant le format demandé. Assurez-vous de trier le tableau "results" pour chacune des entrées
  //       en ordre décroissant de votes (le candidat gagnant doit être le premier élément du tableau).
  var narr = [];
  data.push(data[0]);
  var currentName = data[0].name;
  var currentEntries = [ data[0] ];
  for (var i =  1; i < data.length; i++) {
    if (currentName !=  data[i].name) {
      currentName = data[i].name
      var NewFormattedEntry = {};
      NewFormattedEntry["id"] = data[i-1].id;
      NewFormattedEntry["name"] = data[i-1].name;
      NewFormattedEntry["results"] = [];
      currentEntries.sort(function(a,b){ return b.votes - a.votes; });
      for (var k = 0; k < currentEntries.length; k++) {
        var NewFormattedResult = {};
        NewFormattedResult["candidate"] = currentEntries[k].candidate;
        NewFormattedResult["votes"] = currentEntries[k].votes;
        NewFormattedResult["percent"] = currentEntries[k].percent;
        NewFormattedResult["party"] = currentEntries[k].party;
        NewFormattedEntry["results"].push(NewFormattedResult);
      }
      narr.push( NewFormattedEntry );
      currentEntries = [ data[i] ];
    } else {
      currentEntries.push( data[i] );
    }
  }
  return narr;
}
