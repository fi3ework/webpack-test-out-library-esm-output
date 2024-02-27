import 'dayjs/locale/es';
var Calendar = {
    formatYear: 'YYYY',
    formatMonth: 'M/YYYY',
    monthBeforeYear: true,
    today: 'Hoy',
    view: {
        month: 'Mes',
        year: 'Año',
        week: 'Semana',
        day: 'Fecha',
    },
    month: {
        long: {
            January: 'Enero',
            February: 'Febrero',
            March: 'Marzo',
            April: 'Abril',
            May: 'Mayo',
            June: 'Junio',
            July: 'Julio',
            August: 'Agosto',
            September: 'Septiembre',
            October: 'Octubre',
            November: 'Noviembre',
            December: 'Diciembre',
        },
        short: {
            January: 'Ene',
            February: 'Feb',
            March: 'Mar',
            April: 'Abr',
            May: 'May',
            June: 'Jun',
            July: 'Jul',
            August: 'Ago',
            September: 'Sep',
            October: 'Oct',
            November: 'Nov',
            December: 'Dic',
        },
    },
    week: {
        long: {
            self: 'Semana',
            monday: 'Lunes',
            tuesday: 'Martes',
            wednesday: 'Miércoles',
            thursday: 'Jueves',
            friday: 'Viernes',
            saturday: 'Sábado',
            sunday: 'Domingo',
        },
        short: {
            self: 'Semana',
            monday: 'Lun',
            tuesday: 'Mar',
            wednesday: 'Mié',
            thursday: 'Jue',
            friday: 'Vie',
            saturday: 'Sáb',
            sunday: 'Dom',
        },
    },
};
export default {
    locale: 'es-ES',
    dayjsLocale: 'es',
    Calendar: Calendar,
    DatePicker: {
        Calendar: Calendar,
        placeholder: {
            date: 'Seleccionar fecha',
            week: 'Seleccionar semana',
            month: 'Elegir un mes',
            year: 'Elegir un año',
            quarter: 'Seleccionar trimestre',
        },
        placeholders: {
            date: ['Fecha inicial', 'Fecha final'],
            week: ['Semana inicial', 'Semana final'],
            month: ['Mes inicial', 'Mes final'],
            year: ['Año inicial', 'Año final'],
            quarter: ['Trimestre inicial', 'Trimestre final'],
        },
        selectTime: 'Seleccionar hora',
        selectDate: 'Seleccionar fecha',
        today: 'Hoy',
        now: 'Ahora',
        ok: 'Aceptar',
    },
    Drawer: {
        okText: 'Aceptar',
        cancelText: 'Cancelar',
    },
    Empty: {
        noData: 'No hay datos',
    },
    Modal: {
        okText: 'Aceptar',
        cancelText: 'Cancelar',
    },
    Pagination: {
        goto: 'Ir a',
        page: 'Página',
        countPerPage: '/ página',
        total: '{0} en total',
        prev: 'pagina anterior',
        next: 'siguiente página',
        currentPage: 'página {0}',
        prevSomePages: 'Retroceder {0} páginas',
        nextSomePages: 'Avanzar {0} páginas',
        pageSize: 'número de página',
    },
    Popconfirm: {
        okText: 'Aceptar',
        cancelText: 'Cancelar',
    },
    Table: {
        okText: 'Aceptar',
        resetText: 'Reiniciar',
        sortAscend: 'Click para ordenar en orden ascendente',
        sortDescend: 'Click para ordenar en orden descendente',
        cancelSort: 'Click para cancelar ordenamiento',
    },
    TimePicker: {
        ok: 'Aceptar',
        placeholder: 'Seleccionar hora',
        placeholders: ['Hora inicial', 'Hora final'],
        now: 'Ahora',
    },
    Progress: {
        success: 'Completado',
        error: 'Fallido',
    },
    Upload: {
        start: 'Comienzo',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        reupload: 'Haga clic para intentarlo de nuevo',
        upload: 'Haga clic para cargar',
        preview: 'Vista Previa',
        drag: 'Haga clic o arrastre los archivos para cargarlos aquí',
        dragHover: 'Libera el archivo y empieza a subir',
        error: 'Fallar',
    },
    Typography: {
        copy: 'Copiar',
        copied: 'Copiado',
        edit: 'Editar',
        fold: 'Pliegue',
        unfold: 'Expandir',
    },
    Transfer: {
        resetText: 'Reiniciar',
    },
    ImagePreview: {
        fullScreen: 'Pantalla completa',
        rotateRight: 'Gira a la derecha',
        rotateLeft: 'Girar a la izquierda',
        zoomIn: 'Acercar',
        zoomOut: 'Alejar',
        originalSize: 'Tamaño original',
    },
};
