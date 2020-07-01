import { LightningElement, api } from 'lwc';
import LANG from '@salesforce/i18n/lang';

export default class tableauvizlwcdemo extends LightningElement {

    translatedVizUrl;
    originalVizUrl;


    // This is where we got the list of values that LANG could be
    // https://help.salesforce.com/articleView?id=faq_getstart_what_languages_does.htm&type=5
    localizedWorkbookMap = {
        'https://public.tableau.com/views/Superstore-EN/Overview': {
            'fr': 'https://public.tableau.com/views/Superstore-fr/Vuedensemble'
        }
    };

    @api
    get vizUrl() {
        return this.originalVizUrl;
    }

    set vizUrl(val) {
        this.originalVizUrl = val;
        // Strips the query string when looking in the map for localized versions. We don't
        // localized the query string
        let path, query;
        [path, query] = val.split(/\?(.+)/);
        if ( (path in this.localizedWorkbookMap) && (LANG in this.localizedWorkbookMap[path])) {
            this.translatedVizUrl = this.localizedWorkbookMap[path][LANG];
            if (query) {
                this.translatedVizUrl += '?' + query;
            }
        } else {
            this.translatedVizUrl = val;
        }

        

    }

    @api
    get height() {
        // We can make this a real property if we want
        return 600;
    }
}