"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dayjs/locale/it");
var Calendar = {
    formatYear: 'YYYY',
    formatMonth: 'MMM YYYY',
    monthBeforeYear: true,
    today: 'Oggi',
    view: {
        month: 'Mese',
        year: 'Anno',
        week: 'Settimana',
        day: 'Giorno',
    },
    month: {
        long: {
            January: 'Gennaio',
            February: 'Febbraio',
            March: 'Marzo',
            April: 'Aprile',
            May: 'Maggio',
            June: 'Giugno',
            July: 'Luglio',
            August: 'Agosto',
            September: 'Settembre',
            October: 'Ottobre',
            November: 'Novembre',
            December: 'Dicembre',
        },
        short: {
            January: 'Gen',
            February: 'Feb',
            March: 'Mar',
            April: 'Apr',
            May: 'Mag',
            June: 'Giu',
            July: 'Lug',
            August: 'Ago',
            September: 'Set',
            October: 'Ott',
            November: 'Nov',
            December: 'Dic',
        },
    },
    week: {
        long: {
            self: 'Settimana',
            monday: 'Lunedì',
            tuesday: 'Martedì',
            wednesday: 'Mercoledì',
            thursday: 'Giovedì',
            friday: 'Venerdì',
            saturday: 'Sabato',
            sunday: 'Domenica',
        },
        short: {
            self: 'Settimana',
            monday: 'Lun',
            tuesday: 'Mar',
            wednesday: 'Mer',
            thursday: 'Gio',
            friday: 'Ven',
            saturday: 'Sab',
            sunday: 'Dom',
        },
    },
};
exports.default = {
    locale: 'it-IT',
    dayjsLocale: 'it',
    Calendar: Calendar,
    DatePicker: {
        Calendar: Calendar,
        placeholder: {
            date: 'Seleziona una data',
            week: 'Seleziona la settimana',
            month: 'Seleziona un mese',
            year: 'Seleziona un anno',
            quarter: 'Selezionare il trimestre',
        },
        placeholders: {
            date: ['Data di inizio', 'Data di fine'],
            week: ['Settimana di inizio', 'Settimana di fine'],
            month: ['Mese di inizio', 'Mese di fine'],
            year: ['Anno di inizio', 'Anno di fine'],
            quarter: ['Trimestre di inizio', 'Trimestre di fine'],
        },
        selectTime: 'Seleziona un orario',
        selectDate: 'Seleziona una data',
        today: 'Oggi',
        now: 'Ora',
        ok: 'OK',
    },
    Drawer: {
        okText: 'OK',
        cancelText: 'Annulla',
    },
    Empty: {
        noData: 'Nessun dato',
    },
    Modal: {
        okText: 'OK',
        cancelText: 'Annulla',
    },
    Pagination: {
        goto: 'vai a',
        page: '',
        countPerPage: '/ pagina',
        total: 'Totale {0}',
        prev: 'pagina precedente',
        next: 'pagina successiva',
        currentPage: 'pagina {0}',
        prevSomePages: 'Torna alla pagina {0}',
        nextSomePages: 'Vai avanti di {0} pagine',
        pageSize: 'numero di pagina',
    },
    Popconfirm: {
        okText: 'OK',
        cancelText: 'Annulla',
    },
    Table: {
        okText: 'OK',
        resetText: 'Ripristina',
        sortAscend: 'Clicca per ordinare in modo ascendente',
        sortDescend: 'Clicca per ordinare in modo discendente',
        cancelSort: 'Clicca per eliminare i filtri',
    },
    TimePicker: {
        ok: 'OK',
        placeholder: 'Seleziona un orario',
        placeholders: ['Orario di inizio', 'Orario di chiusura'],
        now: 'Ora',
    },
    Progress: {
        success: 'Successo',
        error: 'Fallire',
    },
    Upload: {
        start: 'Inizio',
        cancel: 'Annulla',
        delete: 'Elimina',
        reupload: 'Fare clic per riprovare',
        upload: 'Fare clic per caricare',
        preview: 'Anteprima',
        drag: 'Fare clic o trascinare i file da caricare qui',
        dragHover: 'Libera il file e inizia a caricare',
        error: 'Caricamento non riuscito',
    },
    Typography: {
        copy: 'Copia',
        copied: 'Copia effettuata',
        edit: 'Modifica',
        fold: 'Piega',
        unfold: 'Espandi',
    },
    Transfer: {
        resetText: 'Ripristina',
    },
    ImagePreview: {
        fullScreen: 'A schermo intero',
        rotateRight: 'Ruota a destra',
        rotateLeft: 'Ruotare a sinistra',
        zoomIn: 'Ingrandire',
        zoomOut: 'Rimpicciolire',
        originalSize: 'Misura originale',
    },
};
