import { TacheHtml } from "./tacheHtml.js";
import { ajoutTaches } from "./api.js";

export class Application {

    listeTachesHtml;

    constructor(taches) {
        this.listeTachesHtml = document.getElementById('listeTaches');
        taches.forEach(todo => {
            let tacheHtml = new TacheHtml(todo);
            this.listeTachesHtml.appendChild(tacheHtml.elementParentHTML);
        });

        const buttonAdd = document.getElementById("buttonAjoutTache");
        buttonAdd.addEventListener("click", (e) => {
            let inputAjoutTache = document.getElementById('inputAjoutTache');
            let maTache = { "titre": inputAjoutTache.value, "termine": false };
            ajoutTaches(maTache).then((rep) => {
                console.log(rep);
                maTache._id = rep.insertedId;
                let tacheHtml = new TacheHtml(maTache);
                this.listeTachesHtml.appendChild(tacheHtml.elementParentHTML);
            });   
        });
    }
}